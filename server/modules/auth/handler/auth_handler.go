package handler

import (
	"context"
	"fmt"
	"go-modular/internal/pkg/bus"
	"go-modular/internal/pkg/jwt"
	"go-modular/internal/pkg/logger"
	"go-modular/internal/pkg/utils"
	"go-modular/internal/pkg/validator"
	"go-modular/modules/auth/domain/service"
	authRequest "go-modular/modules/auth/dto/request"
	"go-modular/modules/users/domain/entity"
	"go-modular/modules/users/dto/request"
	"go-modular/modules/users/dto/response"

	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	authService *service.AuthService
	log         *logger.Logger
	event       *bus.EventBus
	jwt         jwt.JWT
	r           *utils.Response
}

func NewAuthHandler(log *logger.Logger, event *bus.EventBus, authService *service.AuthService, jwt jwt.JWT) *AuthHandler {
	return &AuthHandler{
		authService: authService,
		log:         log,
		event:       event,
		jwt:         jwt,
		r:           &utils.Response{},
	}
}

func (h *AuthHandler) Handle(event bus.Event) {
	fmt.Printf("User created: %v", event.Payload)
}

// Register handles user registration.
//
// @Summary      Register a new user
// @Description  Create a new user account
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body request.CreateUserRequest true "User registration payload"
// @Success      200 {object} utils.Response "User registration success"
// @Failure      400 {object} utils.Response "Validation failed"
// @Failure      409 {object} utils.Response "Email already in use"
// @Failure      500 {object} utils.Response "Internal server error"
// @Router       /auth/register [post]
func (h *AuthHandler) Register(c echo.Context) error {
	h.log.Info("Handling register request")

	req := new(request.CreateUserRequest)
	if err := c.Bind(req); err != nil {
		h.log.Error("Failed to bind request:", err)
		return h.r.BadRequestResponse(c, err.Error())
	}

	if err := c.Validate(req); err != nil {
		h.log.Error("Validation failed:", err)
		if vErr, ok := err.(validator.ValidationError); ok {
			return h.r.BadRequestResponse(c, vErr.Errors)
		}
		return h.r.BadRequestResponse(c, err.Error())
	}

	h.log.Debug("Request validated successfully:", req)

	user := entity.NewUser(req.Name, req.Email, req.Phone, req.Password)
	err := h.authService.CreateUser(c.Request().Context(), user)
	if err != nil {
		if err == service.ErrEmailAlreadyUsed {
			h.log.Warn("Email already in use:", req.Email)
			return h.r.ConflictResponse(c, "Email already in use")
		}
		h.log.Error("Failed to create user:", err)
		return h.r.InternalServerErrorResponse(c, err.Error())
	}

	h.log.Debug("User created successfully:", user)

	h.event.Publish(bus.Event{Type: "user.created", Payload: user})
	h.log.Debug("Event 'user.created' published successfully")

	return h.r.SuccessResponse(c, map[string]interface{}{
		"user": response.FromEntity(user),
	}, "User registered successfully")
}

// Login handles user authentication.
//
// @Summary      Login user
// @Description  Authenticate user and return token
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body request.LoginRequest true "User login payload"
// @Success      200 {object} utils.Response "Login success"
// @Failure      400 {object} utils.Response "Validation failed"
// @Failure      401 {object} utils.Response "Invalid credentials"
// @Failure      500 {object} utils.Response "Internal server error"
// @Router       /auth/login [post]
func (h *AuthHandler) Login(c echo.Context) error {
	h.log.Info("Handling login request")

	req := new(request.LoginRequest)
	if err := c.Bind(req); err != nil {
		h.log.Error("Failed to bind request:", err)
		return h.r.BadRequestResponse(c, err.Error())
	}

	if err := c.Validate(req); err != nil {
		h.log.Error("Validation failed:", err)
		if vErr, ok := err.(validator.ValidationError); ok {
			return h.r.BadRequestResponse(c, vErr.Errors)
		}
		return h.r.BadRequestResponse(c, err.Error())
	}

	h.log.Debug("Request validated successfully:", req)

	user, err := h.authService.ProcessLogin(c.Request().Context(), req.Email, req.Password)
	if err != nil {
		if err == service.ErrUserNotFound || err == service.ErrInvalidPassword {
			h.log.Warn("Invalid email or password for:", req.Email)
			return h.r.UnauthorizedResponse(c, "Invalid email or password")
		}
		h.log.Error("Failed to process login:", err)
		return h.r.InternalServerErrorResponse(c, err.Error())
	}

	h.log.Debug("User authenticated successfully:", user)

	exp := h.jwt.ExpirationTime()
	tokenData := map[string]interface{}{
		"user_id": user.ID,
		"email":   user.Email,
		"name":    user.Name,
		"role":    user.Role,
	}

	token, err := h.jwt.GenerateToken(tokenData)
	if err != nil {
		h.log.Error("Failed to generate token:", err)
		return h.r.InternalServerErrorResponse(c, err.Error())
	}

	return h.r.SuccessResponse(c, map[string]interface{}{
		"token": token,
		"exp":   exp,
		"user":  response.FromEntity(user),
	}, "Login successful")
}

// RequestResetPassword godoc
// @Summary      Request password reset
// @Description  Send a password reset link to the user's email
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authRequest.ResetRequest true "Email to send reset link to"
// @Success      200 {object} utils.Response "Password reset instructions sent to your email"
// @Failure      400 {object} utils.Response "Validation failed"
// @Router       /auth/reset-password/request [post]
func (h *AuthHandler) RequestResetPassword(c echo.Context) error {
	var req authRequest.ResetRequest
	if err := c.Bind(&req); err != nil {
		return h.r.BadRequestResponse(c, err.Error())
	}
	if err := c.Validate(&req); err != nil {
		return h.r.BadRequestResponse(c, err.Error())
	}

	token, err := h.authService.RequestPasswordReset(c.Request().Context(), req.Email)
	if err != nil {
		return h.r.BadRequestResponse(c, err.Error())
	}

	link := "http://localhost:5173/reset-password?token=" + token
	sender := utils.NewEmailSenderFromVars()
	subject := "Reset Your Password"
	body := "Click this link to reset your password: <a href='" + link + "'>" + link + "</a>"

	if err := sender.Send([]string{req.Email}, subject, body); err != nil {
		fmt.Println("Failed to send email:", err)
	}

	return h.r.SuccessResponse(c, nil, "Password reset instructions sent to your email")
}

// ResetPassword godoc
// @Summary      Reset user password
// @Description  Set a new password using a reset token
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authRequest.SetNewPasswordRequest true "Token and new password"
// @Success      200 {object} utils.Response "Password has been reset successfully"
// @Failure      400 {object} utils.Response "Invalid request or token"
// @Router       /auth/reset-password [post]
func (h *AuthHandler) ResetPassword(c echo.Context) error {
	var req authRequest.SetNewPasswordRequest
	if err := c.Bind(&req); err != nil {
		return h.r.BadRequestResponse(c, err.Error())
	}
	if err := c.Validate(&req); err != nil {
		return h.r.BadRequestResponse(c, err.Error())
	}

	err := h.authService.ResetPassword(context.Background(), req.Token, req.Password)
	if err != nil {
		return h.r.BadRequestResponse(c, err.Error())
	}

	return h.r.SuccessResponse(c, nil, "Password has been reset successfully")
}

// CheckResetTokenValid godoc
// @Summary      Check reset password token validity
// @Description  Check if a password reset token is valid
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        token query string true "Reset token"
// @Success      200 {object} utils.Response "Token valid"
// @Failure      400 {object} utils.Response "Token not provided"
// @Failure      404 {object} utils.Response "Token not found"
// @Failure      410 {object} utils.Response "Token expired"
// @Router       /auth/reset-password/check-token [get]
func (h *AuthHandler) CheckResetTokenValid(c echo.Context) error {
	token := c.QueryParam("token")
	if token == "" {
		return h.r.BadRequestResponse(c, "token is required")
	}

	err := h.authService.CheckResetTokenValid(c.Request().Context(), token)
	if err != nil {
		if err == service.ErrTokenNotFound {
			return h.r.NotFoundResponse(c, "token not found")
		}
		if err == service.ErrTokenExpired {
			return h.r.GoneResponse(c, "token expired")
		}
		return h.r.InternalServerErrorResponse(c, err.Error())
	}

	return h.r.SuccessResponse(c, nil, "Token is valid")
}

func (h *AuthHandler) RegisterRoutes(e *echo.Echo, basePath string) {
	group := e.Group(basePath + "/auth")
	group.POST("/register", h.Register)
	group.POST("/login", h.Login)
	group.POST("/reset-password", h.ResetPassword)
	group.GET("/reset-password/check-token", h.CheckResetTokenValid)
	group.POST("/reset-password/request", h.RequestResetPassword)
}
