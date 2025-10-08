package repository

import (
	"context"
	"errors"
	"go-modular/internal/pkg/database"
	"go-modular/modules/product/domain/entity"

	"github.com/google/uuid"
)

var (
	ERR_RECORD_NOT_FOUND = errors.New("record not found")
)

type ProductRepositoryImpl struct{}

// Create implements ProductRepository.
func (r ProductRepositoryImpl) Create(ctx context.Context, product *entity.Product) error {
	return database.DB.WithContext(ctx).Create(product).Error
}

// Delete implements ProductRepository.
func (r ProductRepositoryImpl) Delete(ctx context.Context, id uuid.UUID) error {
	return database.DB.WithContext(ctx).Delete(&entity.Product{}, "id = ?", id).Error
}

// GetAll implements ProductRepository.
func (r ProductRepositoryImpl) GetAll(ctx context.Context, limit, offset int) ([]*entity.Product, error) {
	var products []*entity.Product
	result := database.DB.WithContext(ctx).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&products)
	if result.Error != nil {
		return nil, result.Error
	}
	return products, nil
}

// GetByID implements ProductRepository.
func (r ProductRepositoryImpl) GetByID(ctx context.Context, id uuid.UUID) (*entity.Product, error) {
	var product entity.Product
	result := database.DB.WithContext(ctx).Where("id = ?", id).First(&product)
	if result.Error != nil {
		if result.RowsAffected == 0 {
			return nil, ERR_RECORD_NOT_FOUND
		}
		return nil, result.Error
	}
	return &product, nil
}

// GetByName implements ProductRepository.
func (r ProductRepositoryImpl) GetByName(ctx context.Context, name string) ([]*entity.Product, error) {
	var products []*entity.Product
	result := database.DB.WithContext(ctx).
		Where("name ILIKE ?", "%"+name+"%").
		Order("created_at DESC").
		Find(&products)
	if result.Error != nil {
		return nil, result.Error
	}
	return products, nil
}

// GetInStock implements ProductRepository.
func (r ProductRepositoryImpl) GetInStock(ctx context.Context, limit, offset int) ([]*entity.Product, error) {
	var products []*entity.Product
	result := database.DB.WithContext(ctx).
		Where("stock > 0").
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&products)
	if result.Error != nil {
		return nil, result.Error
	}
	return products, nil
}

// Update implements ProductRepository.
func (r ProductRepositoryImpl) Update(ctx context.Context, product *entity.Product) error {
	return database.DB.WithContext(ctx).Save(product).Error
}

// Count implements ProductRepository.
func (r ProductRepositoryImpl) Count(ctx context.Context) (int64, error) {
	var count int64
	result := database.DB.WithContext(ctx).Model(&entity.Product{}).Count(&count)
	return count, result.Error
}

// UpdateStock implements ProductRepository.
func (r ProductRepositoryImpl) UpdateStock(ctx context.Context, id uuid.UUID, stock int) error {
	result := database.DB.WithContext(ctx).
		Model(&entity.Product{}).
		Where("id = ?", id).
		Update("stock", stock)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return ERR_RECORD_NOT_FOUND
	}
	return nil
}

func NewProductRepositoryImpl() ProductRepository {
	return ProductRepositoryImpl{}
}
