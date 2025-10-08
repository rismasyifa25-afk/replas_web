package category

import (
	"go-modular/internal/pkg/bus"
	"go-modular/internal/pkg/logger"
	"go-modular/modules/category/domain/entity"
	"go-modular/modules/category/domain/repository"
	"go-modular/modules/category/domain/service"
	"go-modular/modules/category/handler"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Module implements the application Module interface for the category module
type Module struct {
	db              *gorm.DB
	logger          *logger.Logger
	categoryService service.CategoryService
	categoryHandler *handler.CategoryHandler
	event           bus.EventBus
}

// Name returns the name of the module
func (m *Module) Name() string {
	return "category"
}

// Initialize initializes the module
func (m *Module) Initialize(db *gorm.DB, log *logger.Logger, event *bus.EventBus) error {
	m.db = db
	m.logger = log
	m.event = *event

	categoryRepo := repository.NewCategoryRepository(db)
	m.categoryService = service.NewCategoryService(categoryRepo)
	m.categoryHandler = handler.NewCategoryHandler(m.categoryService)

	return nil
}

// RegisterRoutes registers the module's routes
func (m *Module) RegisterRoutes(e *echo.Echo, basePath string) {
	m.categoryHandler.RegisterRoutes(e, basePath)
}

// Migrations returns the module's migrations
func (m *Module) Migrations() error {
	return m.db.AutoMigrate(&entity.Category{})
}

// Logger returns the module's logger
func (m *Module) Logger() *logger.Logger {
	return m.logger
}

// NewModule creates a new category module
func NewModule() *Module {
	return &Module{}
}
