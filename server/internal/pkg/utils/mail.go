package utils

import (
	"fmt"
	"net/smtp"
	"strings"
	"sync"
)

type EmailConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	From     string
}

type EmailSender struct {
	config EmailConfig
	auth   smtp.Auth
}

var (
	mailHost     = "smtp.gmail.com"
	mailPort     = 587
	mailUsername = "rafia9005@gmail.com"
	mailPassword = "zyaacqkxvbyrrefy"
	mailFrom     = "rafia9005@gmail.com"
)

var (
	globalEmailSender     *EmailSender
	globalEmailSenderOnce sync.Once
	globalEmailSenderErr  error
)

func NewEmailSenderFromVars() *EmailSender {
	cfg := EmailConfig{
		Host:     mailHost,
		Port:     mailPort,
		Username: mailUsername,
		Password: mailPassword,
		From:     mailFrom,
	}
	return NewEmailSender(cfg)
}

func GetGlobalEmailSender() (*EmailSender, error) {
	globalEmailSenderOnce.Do(func() {
		globalEmailSender = NewEmailSenderFromVars()
	})
	return globalEmailSender, nil
}

func ResetGlobalEmailSender() {
	globalEmailSender = nil
	globalEmailSenderErr = nil
	globalEmailSenderOnce = sync.Once{}
}

func NewEmailSender(cfg EmailConfig) *EmailSender {
	auth := smtp.PlainAuth("", cfg.Username, cfg.Password, cfg.Host)
	return &EmailSender{
		config: cfg,
		auth:   auth,
	}
}

func (s *EmailSender) Send(to []string, subject, body string) error {
	addr := fmt.Sprintf("%s:%d", s.config.Host, s.config.Port)

	headers := map[string]string{
		"From":         s.config.From,
		"To":           strings.Join(to, ","),
		"Subject":      subject,
		"MIME-Version": "1.0",
		"Content-Type": "text/html; charset=\"UTF-8\"",
	}

	var msg strings.Builder
	for k, v := range headers {
		msg.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	msg.WriteString("\r\n" + body)

	return smtp.SendMail(addr, s.auth, s.config.From, to, []byte(msg.String()))
}
