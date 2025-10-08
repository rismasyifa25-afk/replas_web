package jwt

import (
	"fmt"
	"time"

	gojwt "github.com/golang-jwt/jwt"
)

type JWT interface {
	GenerateToken(data map[string]interface{}) (string, error)
	ValidateToken(token string) (map[string]interface{}, error)
	ExpirationTime() int64
}

type JWTImpl struct {
	SignatureKey string
	Expiration   int
}

func NewJWTImpl(signatureKey string, expiration int) JWT {
	return &JWTImpl{SignatureKey: signatureKey, Expiration: expiration}
}

func (j *JWTImpl) GenerateToken(data map[string]interface{}) (string, error) {
	var mySigningKey = []byte(j.SignatureKey)
	token := gojwt.New(gojwt.SigningMethodHS256)
	claims := token.Claims.(gojwt.MapClaims)

	for key, value := range data {
		claims[key] = value
	}

	expirationDuration := time.Duration(j.Expiration) * 24 * time.Hour * 7
	expirationTime := time.Now().Add(expirationDuration).Unix()
	claims["exp"] = expirationTime

	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func (j *JWTImpl) ValidateToken(tokenString string) (map[string]interface{}, error) {
	token, err := gojwt.Parse(tokenString, func(token *gojwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*gojwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(j.SignatureKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(gojwt.MapClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	// Expiration check
	exp, ok := claims["exp"].(float64)
	if !ok {
		return nil, fmt.Errorf("token missing exp")
	}
	if time.Now().Unix() > int64(exp) {
		return nil, fmt.Errorf("token expired")
	}

	return claims, nil
}

func (j *JWTImpl) ExpirationTime() int64 {
	expirationDuration := time.Duration(j.Expiration) * 24 * time.Hour * 7
	return time.Now().Add(expirationDuration).Unix()
}
