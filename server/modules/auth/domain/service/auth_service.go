package service

import (
	"context"
	"errors"
	"fmt"
	"go-modular/internal/pkg/jwt"
	"go-modular/internal/pkg/utils"
	tokenEntity "go-modular/modules/auth/domain/entity"
	tokenRepo "go-modular/modules/auth/domain/repository"
	"go-modular/modules/users/domain/entity"
	"go-modular/modules/users/domain/repository"
	"time"
)

// Errors
var (
	ErrUserNotFound     = errors.New("user not found")
	ErrTokenNotFound    = errors.New("token not found")
	ErrEmailAlreadyUsed = errors.New("email already in use")
	ErrInvalidPassword  = errors.New("invalid password")
	ErrTokenExpired     = errors.New("token expired")
)

// AuthService handles user authentication
type AuthService struct {
	userRepo  repository.UserRepository
	jwt       jwt.JWT
	tokenRepo tokenRepo.AuthRepository
}

// NewAuthService creates a new AuthService
func NewAuthService(userRepo repository.UserRepository, tokenRepo tokenRepo.AuthRepository) *AuthService {
	if userRepo == nil {
		panic("userRepo cannot be nil")
	}
	return &AuthService{
		userRepo:  userRepo,
		tokenRepo: tokenRepo,
	}
}

// CreateUser creates a new user
func (s *AuthService) CreateUser(ctx context.Context, user *entity.User) error {
	if user.Email == "" || user.Password == "" {
		return errors.New("email and password cannot be empty")
	}

	existingUser, err := s.userRepo.FindByEmail(ctx, user.Email)
	if err != nil && err != repository.ERR_RECORD_NOT_FOUND {
		return err
	}
	if existingUser != nil {
		return ErrEmailAlreadyUsed
	}

	// Hash the password before saving the user
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword

	return s.userRepo.Create(ctx, user)
}

// ProcessLogin handles user login and password verification
func (s *AuthService) ProcessLogin(ctx context.Context, email, password string) (*entity.User, error) {
	// Validate input
	if email == "" || password == "" {
		return nil, errors.New("email and password cannot be empty")
	}

	// Find user by email
	existingUser, err := s.userRepo.FindByEmail(ctx, email)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	// Compare the provided password with the hashed password in the database
	if !utils.CompareHashAndPassword(existingUser.Password, password) {
		return nil, ErrInvalidPassword
	}

	// Return the authenticated user
	return existingUser, nil
}

func (s *AuthService) ChangePassword(ctx context.Context, userID uint, password string) (*entity.User, error) {
	if password == "" {
		return nil, errors.New("password cannot be empty")
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	user, err := s.userRepo.FindByID(ctx, userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	user.Password = hashedPassword

	err = s.userRepo.Update(ctx, user)
	if err != nil {
		return nil, errors.New("failed to update password")
	}

	return user, nil
}

func (s *AuthService) RequestPasswordReset(ctx context.Context, email string) (string, error) {
	user, err := s.userRepo.FindByEmail(ctx, email)
	if err != nil {
		return "", ErrUserNotFound
	}

	tokenEntityLast, err := s.tokenRepo.FindLatestByUserID(ctx, user.ID)
	if err == nil && tokenEntityLast != nil {
		if time.Since(tokenEntityLast.CreatedAt) < 10*time.Hour {
			nextAllowed := tokenEntityLast.CreatedAt.Add(10 * time.Hour)
			return "", fmt.Errorf("You can only request password reset once every 10 hours. Try again at %v", nextAllowed.Format(time.RFC1123))
		}
	}

	token := utils.GenerateRandomToken(32)
	tokenEntity := tokenEntity.NewTokenPassword(token, user.ID)
	err = s.tokenRepo.Create(ctx, tokenEntity)
	if err != nil {
		return "", err
	}

	return token, nil
}

// ResetPassword resets password using token and new password
func (s *AuthService) ResetPassword(ctx context.Context, token, newPassword string) error {
	tokenEntity, err := s.tokenRepo.FindByToken(ctx, token)
	if err != nil {
		return ErrTokenNotFound
	}

	if time.Since(tokenEntity.CreatedAt) > 10*time.Hour {
		return ErrTokenExpired
	}

	user, err := s.userRepo.FindByID(ctx, tokenEntity.UserID)
	if err != nil {
		return ErrUserNotFound
	}

	hashedPassword, err := utils.HashPassword(newPassword)
	if err != nil {
		return errors.New("failed to hash password")
	}

	user.Password = hashedPassword
	err = s.userRepo.Update(ctx, user)
	if err != nil {
		return errors.New("failed to update password")
	}

	_ = s.tokenRepo.Delete(ctx, tokenEntity.ID)

	return nil
}

func (s *AuthService) CheckResetTokenValid(ctx context.Context, token string) error {
	tokenEntity, err := s.tokenRepo.FindByToken(ctx, token)
	if err != nil {
		return ErrTokenNotFound
	}
	if time.Since(tokenEntity.CreatedAt) > 30*time.Minute {
		return ErrTokenExpired
	}
	return nil
}
