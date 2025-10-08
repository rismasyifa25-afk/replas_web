package product

import (
	"go-modular/internal/pkg/bus"
	"go-modular/internal/pkg/logger"
	"go-modular/modules/product/domain/entity"
	"go-modular/modules/product/domain/repository"
	"go-modular/modules/product/domain/service"
	"go-modular/modules/product/handler"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Module implements the application Module interface for the product module
type Module struct {
	db             *gorm.DB
	logger         *logger.Logger
	productService *service.ProductService
	productHandler *handler.ProductHandler
	event          *bus.EventBus
}

// Name returns the name of the module
func (m *Module) Name() string {
	return "product"
}

// Initialize initializes the module
func (m *Module) Initialize(db *gorm.DB, log *logger.Logger, event *bus.EventBus) error {
	m.db = db
	m.logger = log
	m.event = event

	m.logger.Info("Initializing product module")

	// Initialize repositories
	productRepo := repository.NewProductRepositoryImpl()
	m.logger.Debug("Product repository initialized")

	// Initialize services
	m.productService = service.NewProductService(productRepo)
	m.logger.Debug("Product service initialized")

	// Initialize handlers
	m.productHandler = handler.NewProductHandler(m.logger, m.event, m.productService)
	m.logger.Debug("Product handler initialized")

	// Register event listeners
	m.logger.Info("Registering product module event listeners")

	m.logger.Info("Product module initialized successfully")
	return nil
}

// RegisterRoutes registers the module's routes
func (m *Module) RegisterRoutes(e *echo.Echo, basePath string) {
	m.logger.Info("Registering product routes at %s/products", basePath)
	m.productHandler.RegisterRoutes(e, basePath)
	m.logger.Debug("Product routes registered successfully")
}

// Migrations returns the module's migrations
func (m *Module) Migrations() error {
	m.logger.Info("Registering product module migrations")
	return m.db.AutoMigrate(&entity.Product{})
}

// Logger returns the module's logger
func (m *Module) Logger() *logger.Logger {
	return m.logger
}

// NewModule creates a new product module
func NewModule() *Module {
	return &Module{}
}
