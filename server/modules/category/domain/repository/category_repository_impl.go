package repository

import (
	"context"
	"go-modular/modules/category/domain/entity"

	"gorm.io/gorm"
)

type CategoryRepositoryImpl struct {
	DB *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &CategoryRepositoryImpl{DB: db}
}

func (r *CategoryRepositoryImpl) FindAll(ctx context.Context) ([]*entity.Category, error) {
	var categories []*entity.Category
	err := r.DB.WithContext(ctx).Find(&categories).Error
	return categories, err
}

func (r *CategoryRepositoryImpl) FindByID(ctx context.Context, id uint) (*entity.Category, error) {
	var category entity.Category
	err := r.DB.WithContext(ctx).First(&category, id).Error
	if err != nil {
		return nil, err
	}
	return &category, nil
}

func (r *CategoryRepositoryImpl) Create(ctx context.Context, category *entity.Category) error {
	return r.DB.WithContext(ctx).Create(category).Error
}

func (r *CategoryRepositoryImpl) Update(ctx context.Context, category *entity.Category) error {
	return r.DB.WithContext(ctx).Save(category).Error
}

func (r *CategoryRepositoryImpl) Delete(ctx context.Context, id uint) error {
	return r.DB.WithContext(ctx).Delete(&entity.Category{}, id).Error
}
