package entity

import "time"

type TokenPassword struct {
	ID        uint      `gorm:"primarykey"`
	Token     string    `gorm:"type:varchar(255)" json:"token"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (*TokenPassword) TableName() string {
	return "token_passwords"
}

func NewTokenPassword(token string, userID uint) *TokenPassword {
	now := time.Now()
	return &TokenPassword{
		Token:     token,
		UserID:    userID,
		CreatedAt: now,
		UpdatedAt: now,
	}
}
