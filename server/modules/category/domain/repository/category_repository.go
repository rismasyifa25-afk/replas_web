package repository

import (
	"context"
	"go-modular/modules/category/domain/entity"
)

type CategoryRepository interface {
	FindAll(ctx context.Context) ([]*entity.Category, error)
	FindByID(ctx context.Context, id uint) (*entity.Category, error)
	Create(ctx context.Context, category *entity.Category) error
	Update(ctx context.Context, category *entity.Category) error
	Delete(ctx context.Context, id uint) error
}
