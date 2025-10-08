package service

import (
	"context"
	"errors"
	"go-modular/modules/product/domain/entity"
	"go-modular/modules/product/domain/repository"
	"time"

	"github.com/google/uuid"
)

// Service errors
var (
	ErrProductNotFound = errors.New("product not found")
	ErrInvalidData     = errors.New("invalid product data")
)

// ProductService handles business logic for products
type ProductService struct {
	repo repository.ProductRepository
}

// NewProductService creates a new product service
func NewProductService(repo repository.ProductRepository) *ProductService {
	return &ProductService{
		repo: repo,
	}
}

// CreateProduct creates a new product
func (s *ProductService) CreateProduct(ctx context.Context, product *entity.Product) error {
	// Validate product data
	if err := s.validateProduct(product); err != nil {
		return err
	}

	return s.repo.Create(ctx, product)
}

// GetProductByID retrieves a product by its ID
func (s *ProductService) GetProductByID(ctx context.Context, id uuid.UUID) (*entity.Product, error) {
	product, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return nil, ErrProductNotFound
		}
		return nil, err
	}
	return product, nil
}

// GetAllProducts retrieves all products with pagination
func (s *ProductService) GetAllProducts(ctx context.Context, limit, offset int) ([]*entity.Product, error) {
	return s.repo.GetAll(ctx, limit, offset)
}

// UpdateProduct updates an existing product
func (s *ProductService) UpdateProduct(ctx context.Context, product *entity.Product) error {
	// Check if product exists
	_, err := s.repo.GetByID(ctx, product.ID)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return ErrProductNotFound
		}
		return err
	}

	// Validate product data
	if err := s.validateProduct(product); err != nil {
		return err
	}

	return s.repo.Update(ctx, product)
}

// DeleteProduct deletes a product by its ID
func (s *ProductService) DeleteProduct(ctx context.Context, id uuid.UUID) error {
	// Check if product exists
	_, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return ErrProductNotFound
		}
		return err
	}

	return s.repo.Delete(ctx, id)
}

// SearchProductsByName searches products by name
func (s *ProductService) SearchProductsByName(ctx context.Context, name string) ([]*entity.Product, error) {
	if name == "" {
		return nil, ErrInvalidData
	}
	return s.repo.GetByName(ctx, name)
}

// GetProductsInStock retrieves products that are in stock
func (s *ProductService) GetProductsInStock(ctx context.Context, limit, offset int) ([]*entity.Product, error) {
	return s.repo.GetInStock(ctx, limit, offset)
}

// GetProductCount returns the total number of products
func (s *ProductService) GetProductCount(ctx context.Context) (int64, error) {
	return s.repo.Count(ctx)
}

// UpdateProductStock updates the stock of a product
func (s *ProductService) UpdateProductStock(ctx context.Context, id uuid.UUID, stock int) error {
	// Check if product exists
	product, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return ErrProductNotFound
		}
		return err
	}

	// Validate stock
	if stock < 0 {
		return ErrInvalidData
	}

	product.Stock = stock
	product.UpdatedAt = time.Now()
	return s.repo.Update(ctx, product)
}

// ProcessOrder processes an order by reducing stock
func (s *ProductService) ProcessOrder(ctx context.Context, id uuid.UUID, quantity int) error {
	// Get product
	product, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return ErrProductNotFound
		}
		return err
	}

	// Validate quantity
	if quantity <= 0 {
		return ErrInvalidData
	}

	// Check if we can fulfill the order
	if product.Stock < quantity {
		return ErrInvalidData // Use ErrInvalidData for insufficient stock
	}

	// Reduce stock
	product.Stock -= quantity
	product.UpdatedAt = time.Now()

	// Update product in repository
	return s.repo.Update(ctx, product)
}

// RestockProduct adds stock to a product
func (s *ProductService) RestockProduct(ctx context.Context, id uuid.UUID, quantity int) error {
	// Get product
	product, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err == repository.ERR_RECORD_NOT_FOUND {
			return ErrProductNotFound
		}
		return err
	}

	// Validate quantity
	if quantity <= 0 {
		return ErrInvalidData
	}

	// Add stock
	product.Stock += quantity
	product.UpdatedAt = time.Now()

	// Update product in repository
	return s.repo.Update(ctx, product)
}

// GetLowStockProducts returns products with stock below threshold
func (s *ProductService) GetLowStockProducts(ctx context.Context, threshold int, limit, offset int) ([]*entity.Product, error) {
	// This would require a new repository method, for now return empty
	// You can implement GetLowStock in repository if needed
	return []*entity.Product{}, nil
}

// validateProduct validates product data
func (s *ProductService) validateProduct(product *entity.Product) error {
	if product.Name == "" {
		return ErrInvalidData
	}
	if product.Price < 0 {
		return ErrInvalidData
	}
	if product.Stock < 0 {
		return ErrInvalidData
	}
	return nil
}
