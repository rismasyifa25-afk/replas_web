package repository

import (
	"context"
	"go-modular/modules/auth/domain/entity"
)

type AuthRepository interface {
	Create(ctx context.Context, token *entity.TokenPassword) error
	Delete(ctx context.Context, id uint) error
	FindByID(ctx context.Context, id uint) (*entity.TokenPassword, error)
	FindByToken(ctx context.Context, token string) (*entity.TokenPassword, error)
	Update(ctx context.Context, token *entity.TokenPassword) error
	FindLatestByUserID(ctx context.Context, userID uint) (*entity.TokenPassword, error)
}
