package auth

import (
	"go-modular/internal/pkg/bus"
	"go-modular/internal/pkg/config"
	"go-modular/internal/pkg/logger"
	"go-modular/modules/auth/domain/entity"
	authRepos "go-modular/modules/auth/domain/repository"
	"go-modular/modules/auth/domain/service"
	"go-modular/modules/auth/handler"
	"go-modular/modules/users/domain/repository"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Module struct {
	db          *gorm.DB
	logger      *logger.Logger
	authService *service.AuthService
	authHandler *handler.AuthHandler
	event       *bus.EventBus
}

func (m *Module) Name() string {
	return "auth"
}

func (m *Module) Initialize(db *gorm.DB, log *logger.Logger, event *bus.EventBus) error {
	m.db = db
	m.logger = log
	m.event = event

	// Initialize repositories
	userRepo := repository.NewUserRepositoryImpl()
	authRepo := authRepos.NewAuthRepositoryImpl()

	// Initialize services
	m.authService = service.NewAuthService(userRepo, authRepo)

	// Initialize JWT
	jwtService := config.GetJWTService()

	// Initialize handlers
	m.authHandler = handler.NewAuthHandler(m.logger, m.event, m.authService, jwtService)

	m.logger.Info("Auth module initialized successfully")
	return nil
}

func (m *Module) RegisterRoutes(e *echo.Echo, basePath string) {
	if m.authHandler == nil {
		m.logger.Error("AuthHandler is nil, cannot register routes")
		return
	}
	m.authHandler.RegisterRoutes(e, basePath)
}

func (m *Module) Migrations() error {
	return m.db.AutoMigrate(&entity.TokenPassword{})
}

func (m *Module) Logger() *logger.Logger {
	return m.logger
}

func NewModule() *Module {
	return &Module{}
}
