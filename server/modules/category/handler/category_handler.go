package handler

import (
	"go-modular/internal/pkg/middleware"
	"go-modular/internal/pkg/utils"
	"go-modular/modules/category/domain/service"
	"go-modular/modules/category/dto/request"
	"strconv"

	"github.com/labstack/echo/v4"
)

type CategoryHandler struct {
	service service.CategoryService
	res     utils.Response
}

func NewCategoryHandler(s service.CategoryService) *CategoryHandler {
	return &CategoryHandler{
		service: s,
		res:     utils.Response{},
	}
}

// GetAllCategories godoc
// @Summary      Get all categories
// @Description  Retrieve a list of all categories
// @Tags         categories
// @Produce      json
// @Success      200 {object} utils.Response "Categories retrieved successfully"
// @Failure      500 {object} utils.Response "Internal server error"
// @Router       /categories [get]
func (h *CategoryHandler) GetAllCategories(c echo.Context) error {
	categories, err := h.service.GetAllCategories(c.Request().Context())
	if err != nil {
		return h.res.InternalServerErrorResponse(c, "Failed to get categories")
	}
	return h.res.SuccessResponse(c, categories, "Categories retrieved successfully")
}

// GetCategoryByID godoc
// @Summary      Get a category by ID
// @Description  Retrieve a single category by its ID
// @Tags         categories
// @Produce      json
// @Param        id path int true "Category ID"
// @Success      200 {object} utils.Response "Category retrieved successfully"
// @Failure      400 {object} utils.Response "Invalid category ID"
// @Failure      404 {object} utils.Response "Category not found"
// @Router       /categories/{id} [get]
func (h *CategoryHandler) GetCategoryByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return h.res.BadRequestResponse(c, "Invalid category ID")
	}
	category, err := h.service.GetCategoryByID(c.Request().Context(), uint(id))
	if err != nil {
		return h.res.NotFoundResponse(c, "Category not found")
	}
	return h.res.SuccessResponse(c, category, "Category retrieved successfully")
}

// CreateCategory godoc
// @Summary      Create a new category
// @Description  Add a new category to the database
// @Tags         categories
// @Accept       json
// @Produce      json
// @Param        request body request.CreateCategoryRequest true "Category creation payload"
// @Success      201 {object} utils.Response "Category created successfully"
// @Failure      400 {object} utils.Response "Invalid request body or validation failed"
// @Failure      500 {object} utils.Response "Internal server error"
// @Router       /categories [post]
func (h *CategoryHandler) CreateCategory(c echo.Context) error {
	var req request.CreateCategoryRequest
	if err := c.Bind(&req); err != nil {
		return h.res.BadRequestResponse(c, "Invalid request body")
	}
	if err := c.Validate(&req); err != nil {
		return h.res.BadRequestResponse(c, err.Error())
	}

	category, err := h.service.CreateCategory(c.Request().Context(), req)
	if err != nil {
		return h.res.InternalServerErrorResponse(c, "Failed to create category")
	}
	return h.res.CreatedResponse(c, category, "Category created successfully")
}

// UpdateCategory godoc
// @Summary      Update a category
// @Description  Update an existing category by its ID
// @Tags         categories
// @Accept       json
// @Produce      json
// @Param        id path int true "Category ID"
// @Param        request body request.UpdateCategoryRequest true "Category update payload"
// @Success      200 {object} utils.Response "Category updated successfully"
// @Failure      400 {object} utils.Response "Invalid category ID, request body, or validation failed"
// @Failure      500 {object} utils.Response "Internal server error"
// @Router       /categories/{id} [put]
func (h *CategoryHandler) UpdateCategory(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return h.res.BadRequestResponse(c, "Invalid category ID")
	}

	var req request.UpdateCategoryRequest
	if err := c.Bind(&req); err != nil {
		return h.res.BadRequestResponse(c, "Invalid request body")
	}
	if err := c.Validate(&req); err != nil {
		return h.res.BadRequestResponse(c, err.Error())
	}

	category, err := h.service.UpdateCategory(c.Request().Context(), uint(id), req)
	if err != nil {
		return h.res.InternalServerErrorResponse(c, "Failed to update category")
	}
	return h.res.SuccessResponse(c, category, "Category updated successfully")
}

// DeleteCategory godoc
// @Summary      Delete a category
// @Description  Delete a category by its ID
// @Tags         categories
// @Produce      json
// @Param        id path int true "Category ID"
// @Success      200 {object} utils.Response "Category deleted successfully"
// @Failure      400 {object} utils.Response "Invalid category ID"
// @Failure      500 {object} utils.Response "Internal server error"
// @Router       /categories/{id} [delete]
func (h *CategoryHandler) DeleteCategory(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return h.res.BadRequestResponse(c, "Invalid category ID")
	}

	err = h.service.DeleteCategory(c.Request().Context(), uint(id))
	if err != nil {
		return h.res.InternalServerErrorResponse(c, "Failed to delete category")
	}
	return h.res.SuccessResponse(c, nil, "Category deleted successfully")
}

func (h *CategoryHandler) RegisterRoutes(e *echo.Echo, basePath string) {
	group := e.Group(basePath+"/categories", middleware.Auth)

	group.GET("", h.GetAllCategories)
	group.GET("/:id", h.GetCategoryByID)
	group.POST("", h.CreateCategory)
	group.PUT("/:id", h.UpdateCategory)
	group.DELETE("/:id", h.DeleteCategory)
}
