package entity

import (
	"time"

	"github.com/google/uuid"
)

// Product represents a product entity
type Product struct {
	ID          uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description" gorm:"type:text"`
	Stock       int       `json:"stock" gorm:"not null;default:0"`
	Price       float64   `json:"price" gorm:"not null"`
	Image       string    `json:"image"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

// TableName returns the table name for GORM
func (*Product) TableName() string {
	return "products"
}

// NewProduct creates a new product instance
func NewProduct(name, description, image string, stock int, price float64) *Product {
	return &Product{
		ID:          uuid.New(),
		Name:        name,
		Description: description,
		Stock:       stock,
		Price:       price,
		Image:       image,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
}
