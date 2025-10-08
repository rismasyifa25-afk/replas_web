package repository

import (
	"context"
	"go-modular/modules/product/domain/entity"

	"github.com/google/uuid"
)

// ProductRepository defines the contract for product data operations
type ProductRepository interface {
	// Create creates a new product
	Create(ctx context.Context, product *entity.Product) error

	// GetByID retrieves a product by its ID
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Product, error)

	// GetAll retrieves all products with pagination
	GetAll(ctx context.Context, limit, offset int) ([]*entity.Product, error)

	// Update updates an existing product
	Update(ctx context.Context, product *entity.Product) error

	// Delete deletes a product by its ID
	Delete(ctx context.Context, id uuid.UUID) error

	// GetByName retrieves products by name (for search functionality)
	GetByName(ctx context.Context, name string) ([]*entity.Product, error)

	// GetInStock retrieves products that are in stock
	GetInStock(ctx context.Context, limit, offset int) ([]*entity.Product, error)

	// Count returns the total number of products
	Count(ctx context.Context) (int64, error)

	// UpdateStock updates the stock of a product
	UpdateStock(ctx context.Context, id uuid.UUID, stock int) error
}
