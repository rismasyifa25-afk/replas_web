package repository

import (
	"context"
	"errors"
	"go-modular/internal/pkg/database"
	"go-modular/modules/auth/domain/entity"

	"gorm.io/gorm"
)

var (
	ERR_RECORD_NOT_FOUND = errors.New("record not found")
)

type AuthRepositoryImpl struct{}

func (r *AuthRepositoryImpl) Create(ctx context.Context, token *entity.TokenPassword) error {
	return database.DB.WithContext(ctx).Create(token).Error
}

func (r *AuthRepositoryImpl) Delete(ctx context.Context, id uint) error {
	return database.DB.WithContext(ctx).Delete(&entity.TokenPassword{}, id).Error
}

func (r *AuthRepositoryImpl) FindByID(ctx context.Context, id uint) (*entity.TokenPassword, error) {
	var token entity.TokenPassword
	result := database.DB.WithContext(ctx).First(&token, id)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, ERR_RECORD_NOT_FOUND
	}
	return &token, result.Error
}

func (r *AuthRepositoryImpl) FindByToken(ctx context.Context, tokenStr string) (*entity.TokenPassword, error) {
	var token entity.TokenPassword
	result := database.DB.WithContext(ctx).Where("token = ?", tokenStr).First(&token)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, ERR_RECORD_NOT_FOUND
	}
	return &token, result.Error
}

func (r *AuthRepositoryImpl) Update(ctx context.Context, token *entity.TokenPassword) error {
	return database.DB.WithContext(ctx).Save(token).Error
}

func NewAuthRepositoryImpl() AuthRepository {
	return &AuthRepositoryImpl{}
}

func (r *AuthRepositoryImpl) FindLatestByUserID(ctx context.Context, userID uint) (*entity.TokenPassword, error) {
	var token entity.TokenPassword
	result := database.DB.WithContext(ctx).
		Where("user_id = ?", userID).
		Order("created_at desc").
		First(&token)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, ERR_RECORD_NOT_FOUND
	}
	return &token, result.Error
}
