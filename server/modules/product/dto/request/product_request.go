package request

// CreateProductRequest represents the request body for creating a product
type CreateProductRequest struct {
	Name        string  `json:"name" validate:"required,min=1,max=255"`
	Description string  `json:"description" validate:"max=1000"`
	Image       string  `json:"image" validate:"omitempty,url"`
	Stock       int     `json:"stock" validate:"required,min=0"`
	Price       float64 `json:"price" validate:"required,min=0"`
}

// UpdateProductRequest represents the request body for updating a product
type UpdateProductRequest struct {
	Name        string  `json:"name" validate:"required,min=1,max=255"`
	Description string  `json:"description" validate:"max=1000"`
	Image       string  `json:"image" validate:"omitempty,url"`
	Stock       int     `json:"stock" validate:"required,min=0"`
	Price       float64 `json:"price" validate:"required,min=0"`
}

// UpdateStockRequest represents the request body for updating product stock
type UpdateStockRequest struct {
	Stock int `json:"stock" validate:"required,min=0"`
}

// ProcessOrderRequest represents the request body for processing an order
type ProcessOrderRequest struct {
	Quantity int `json:"quantity" validate:"required,min=1"`
}

// RestockRequest represents the request body for restocking a product
type RestockRequest struct {
	Quantity int `json:"quantity" validate:"required,min=1"`
}

// SearchRequest represents the request body for searching products
type SearchRequest struct {
	Name string `json:"name" validate:"required,min=1"`
}

// GetProductsRequest represents the request query parameters for getting products
type GetProductsRequest struct {
	Page  int `query:"page" validate:"omitempty,min=1"`
	Limit int `query:"limit" validate:"omitempty,min=1,max=100"`
}

// GetLowStockRequest represents the request for getting low stock products
type GetLowStockRequest struct {
	Threshold int `json:"threshold" validate:"required,min=1"`
	Page      int `query:"page" validate:"omitempty,min=1"`
	Limit     int `query:"limit" validate:"omitempty,min=1,max=100"`
}
