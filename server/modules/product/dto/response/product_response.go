package response

import (
	"go-modular/modules/product/domain/entity"
	"time"

	"github.com/google/uuid"
)

// ProductResponse represents the response format for a product
type ProductResponse struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	Stock       int       `json:"stock"`
	Price       float64   `json:"price"`
	InStock     bool      `json:"in_stock"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ProductListResponse represents the response format for a list of products with pagination
type ProductListResponse struct {
	Products    []ProductResponse `json:"products"`
	Total       int64             `json:"total"`
	Page        int               `json:"page"`
	Limit       int               `json:"limit"`
	TotalPages  int               `json:"total_pages"`
	HasNext     bool              `json:"has_next"`
	HasPrevious bool              `json:"has_previous"`
}

// ProductStockResponse represents the response for stock operations
type ProductStockResponse struct {
	ID            uuid.UUID `json:"id"`
	Name          string    `json:"name"`
	PreviousStock int       `json:"previous_stock"`
	CurrentStock  int       `json:"current_stock"`
	StockChange   int       `json:"stock_change"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// OrderProcessResponse represents the response for order processing
type OrderProcessResponse struct {
	ProductID      uuid.UUID `json:"product_id"`
	ProductName    string    `json:"product_name"`
	OrderQuantity  int       `json:"order_quantity"`
	RemainingStock int       `json:"remaining_stock"`
	OrderProcessed bool      `json:"order_processed"`
	ProcessedAt    time.Time `json:"processed_at"`
}

// ProductSearchResponse represents the response for product search
type ProductSearchResponse struct {
	Query       string            `json:"query"`
	ResultCount int               `json:"result_count"`
	Products    []ProductResponse `json:"products"`
}

// ProductStatisticsResponse represents product statistics
type ProductStatisticsResponse struct {
	TotalProducts      int64   `json:"total_products"`
	ProductsInStock    int64   `json:"products_in_stock"`
	ProductsOutOfStock int64   `json:"products_out_of_stock"`
	TotalStockValue    float64 `json:"total_stock_value"`
	LowStockProducts   int64   `json:"low_stock_products"`
}

// FromEntity converts a product entity to product response
func FromEntity(product *entity.Product) ProductResponse {
	return ProductResponse{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Image:       product.Image,
		Stock:       product.Stock,
		Price:       product.Price,
		InStock:     product.Stock > 0,
		CreatedAt:   product.CreatedAt,
		UpdatedAt:   product.UpdatedAt,
	}
}

// FromEntities converts a slice of product entities to product responses
func FromEntities(products []*entity.Product) []ProductResponse {
	responses := make([]ProductResponse, len(products))
	for i, product := range products {
		responses[i] = FromEntity(product)
	}
	return responses
}

// NewProductListResponse creates a new product list response with pagination
func NewProductListResponse(products []*entity.Product, total int64, page, limit int) ProductListResponse {
	totalPages := int((total + int64(limit) - 1) / int64(limit))
	hasNext := page < totalPages
	hasPrevious := page > 1

	return ProductListResponse{
		Products:    FromEntities(products),
		Total:       total,
		Page:        page,
		Limit:       limit,
		TotalPages:  totalPages,
		HasNext:     hasNext,
		HasPrevious: hasPrevious,
	}
}

// NewProductStockResponse creates a stock operation response
func NewProductStockResponse(product *entity.Product, previousStock, stockChange int) ProductStockResponse {
	return ProductStockResponse{
		ID:            product.ID,
		Name:          product.Name,
		PreviousStock: previousStock,
		CurrentStock:  product.Stock,
		StockChange:   stockChange,
		UpdatedAt:     product.UpdatedAt,
	}
}

// NewOrderProcessResponse creates an order processing response
func NewOrderProcessResponse(product *entity.Product, quantity int, processed bool) OrderProcessResponse {
	return OrderProcessResponse{
		ProductID:      product.ID,
		ProductName:    product.Name,
		OrderQuantity:  quantity,
		RemainingStock: product.Stock,
		OrderProcessed: processed,
		ProcessedAt:    time.Now(),
	}
}

// NewProductSearchResponse creates a search response
func NewProductSearchResponse(query string, products []*entity.Product) ProductSearchResponse {
	return ProductSearchResponse{
		Query:       query,
		ResultCount: len(products),
		Products:    FromEntities(products),
	}
}

// NewProductStatisticsResponse creates a statistics response
func NewProductStatisticsResponse(totalProducts, inStock, outOfStock, lowStock int64, totalValue float64) ProductStatisticsResponse {
	return ProductStatisticsResponse{
		TotalProducts:      totalProducts,
		ProductsInStock:    inStock,
		ProductsOutOfStock: outOfStock,
		TotalStockValue:    totalValue,
		LowStockProducts:   lowStock,
	}
}
