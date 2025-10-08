package handler

import (
	"go-modular/internal/pkg/bus"
	"go-modular/internal/pkg/logger"
	"go-modular/internal/pkg/middleware"
	"go-modular/modules/product/domain/entity"
	"go-modular/modules/product/domain/service"
	"go-modular/modules/product/dto/request"
	"go-modular/modules/product/dto/response"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

// ProductHandler handles HTTP requests for products
type ProductHandler struct {
	productService *service.ProductService
	log            *logger.Logger
	event          *bus.EventBus
}

// NewProductHandler creates a new product handler
func NewProductHandler(log *logger.Logger, event *bus.EventBus, productService *service.ProductService) *ProductHandler {
	return &ProductHandler{
		productService: productService,
		log:            log,
		event:          event,
	}
}

// GetAllProducts godoc
// @Summary      Get all products
// @Description  Retrieve a list of all products with pagination
// @Tags         products
// @Produce      json
// @Param        page query int false "Page number" default(1)
// @Param        limit query int false "Number of items per page" default(10)
// @Success      200 {object} response.ProductListResponse "Successfully retrieved products"
// @Failure      400 {object} map[string]string "Invalid query parameters"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products [get]
func (h *ProductHandler) GetAllProducts(c echo.Context) error {
	ctx := c.Request().Context()

	// Parse pagination parameters
	page, _ := strconv.Atoi(c.QueryParam("page"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	if limit < 1 {
		limit = 10
	}

	offset := (page - 1) * limit

	// Get products
	products, err := h.productService.GetAllProducts(ctx, limit, offset)
	if err != nil {
		h.log.Error("Failed to get all products", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Get total count
	total, err := h.productService.GetProductCount(ctx)
	if err != nil {
		h.log.Error("Failed to get product count", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Create response
	resp := response.NewProductListResponse(products, total, page, limit)
	return c.JSON(http.StatusOK, resp)
}

// GetProduct godoc
// @Summary      Get a product by ID
// @Description  Retrieve a single product by its ID
// @Tags         products
// @Produce      json
// @Param        id path string true "Product ID (UUID)"
// @Success      200 {object} response.ProductResponse "Successfully retrieved product"
// @Failure      400 {object} map[string]string "Invalid product ID"
// @Failure      404 {object} map[string]string "Product not found"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/{id} [get]
func (h *ProductHandler) GetProduct(c echo.Context) error {
	ctx := c.Request().Context()

	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		h.log.Warn("Invalid product ID", "id", c.Param("id"))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	product, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to get product", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, response.FromEntity(product))
}

// CreateProduct godoc
// @Summary      Create a new product
// @Description  Add a new product to the database
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        request body request.CreateProductRequest true "Product creation payload"
// @Success      201 {object} response.ProductResponse "Successfully created product"
// @Failure      400 {object} map[string]string "Invalid request body or validation failed"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products [post]
func (h *ProductHandler) CreateProduct(c echo.Context) error {
	ctx := c.Request().Context()

	req := new(request.CreateProductRequest)
	if err := c.Bind(req); err != nil {
		h.log.Warn("Failed to bind request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := c.Validate(req); err != nil {
		h.log.Warn("Request validation failed", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	product := entity.NewProduct(req.Name, req.Description, req.Image, req.Stock, req.Price)
	err := h.productService.CreateProduct(ctx, product)
	if err != nil {
		h.log.Error("Failed to create product", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Publish event
	h.event.Publish(bus.Event{Type: "product.created", Payload: product})
	h.log.Info("Product created", "id", product.ID, "name", product.Name)

	return c.JSON(http.StatusCreated, response.FromEntity(product))
}

// UpdateProduct godoc
// @Summary      Update a product
// @Description  Update an existing product by its ID
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        id path string true "Product ID (UUID)"
// @Param        request body request.UpdateProductRequest true "Product update payload"
// @Success      200 {object} response.ProductResponse "Successfully updated product"
// @Failure      400 {object} map[string]string "Invalid product ID, request body, or validation failed"
// @Failure      404 {object} map[string]string "Product not found"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/{id} [put]
func (h *ProductHandler) UpdateProduct(c echo.Context) error {
	ctx := c.Request().Context()

	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		h.log.Warn("Invalid product ID", "id", c.Param("id"))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	req := new(request.UpdateProductRequest)
	if err := c.Bind(req); err != nil {
		h.log.Warn("Failed to bind request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := c.Validate(req); err != nil {
		h.log.Warn("Request validation failed", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	product, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to get product for update", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Update product fields
	product.Name = req.Name
	product.Description = req.Description
	product.Image = req.Image
	product.Stock = req.Stock
	product.Price = req.Price

	err = h.productService.UpdateProduct(ctx, product)
	if err != nil {
		h.log.Error("Failed to update product", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Publish event
	h.event.Publish(bus.Event{Type: "product.updated", Payload: product})
	h.log.Info("Product updated", "id", product.ID, "name", product.Name)

	return c.JSON(http.StatusOK, response.FromEntity(product))
}

// DeleteProduct godoc
// @Summary      Delete a product
// @Description  Delete a product by its ID
// @Tags         products
// @Produce      json
// @Param        id path string true "Product ID (UUID)"
// @Success      204 "Successfully deleted product"
// @Failure      400 {object} map[string]string "Invalid product ID"
// @Failure      404 {object} map[string]string "Product not found"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/{id} [delete]
func (h *ProductHandler) DeleteProduct(c echo.Context) error {
	ctx := c.Request().Context()

	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		h.log.Warn("Invalid product ID", "id", c.Param("id"))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	err = h.productService.DeleteProduct(ctx, id)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to delete product", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Publish event
	h.event.Publish(bus.Event{Type: "product.deleted", Payload: map[string]interface{}{"id": id}})
	h.log.Info("Product deleted", "id", id)

	return c.NoContent(http.StatusNoContent)
}

// SearchProducts godoc
// @Summary      Search products by name
// @Description  Search for products by their name
// @Tags         products
// @Produce      json
// @Param        name query string true "Product name to search for"
// @Success      200 {object} response.ProductSearchResponse "Successfully retrieved products"
// @Failure      400 {object} map[string]string "Missing search parameter"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/search [get]
func (h *ProductHandler) SearchProducts(c echo.Context) error {
	ctx := c.Request().Context()

	name := c.QueryParam("name")
	if name == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Name parameter is required"})
	}

	products, err := h.productService.SearchProductsByName(ctx, name)
	if err != nil {
		h.log.Error("Failed to search products", "name", name, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	resp := response.NewProductSearchResponse(name, products)
	return c.JSON(http.StatusOK, resp)
}

// GetProductsInStock godoc
// @Summary      Get products in stock
// @Description  Retrieve products that are currently in stock with pagination
// @Tags         products
// @Produce      json
// @Param        page query int false "Page number" default(1)
// @Param        limit query int false "Number of items per page" default(10)
// @Success      200 {object} response.ProductListResponse "Successfully retrieved products in stock"
// @Failure      400 {object} map[string]string "Invalid query parameters"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/in-stock [get]
func (h *ProductHandler) GetProductsInStock(c echo.Context) error {
	ctx := c.Request().Context()

	// Parse pagination parameters
	page, _ := strconv.Atoi(c.QueryParam("page"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	if limit < 1 {
		limit = 10
	}

	offset := (page - 1) * limit

	// Get products in stock
	products, err := h.productService.GetProductsInStock(ctx, limit, offset)
	if err != nil {
		h.log.Error("Failed to get products in stock", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Get total count
	total, err := h.productService.GetProductCount(ctx)
	if err != nil {
		h.log.Error("Failed to get product count", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Create response
	resp := response.NewProductListResponse(products, total, page, limit)
	return c.JSON(http.StatusOK, resp)
}

// UpdateStock godoc
// @Summary      Update product stock
// @Description  Update the stock quantity of a product
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        id path string true "Product ID (UUID)"
// @Param        request body request.UpdateStockRequest true "Stock update payload"
// @Success      200 {object} response.ProductStockResponse "Successfully updated stock"
// @Failure      400 {object} map[string]string "Invalid product ID, request body, or validation failed"
// @Failure      404 {object} map[string]string "Product not found"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/{id}/stock [patch]
func (h *ProductHandler) UpdateStock(c echo.Context) error {
	ctx := c.Request().Context()

	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		h.log.Warn("Invalid product ID", "id", c.Param("id"))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	req := new(request.UpdateStockRequest)
	if err := c.Bind(req); err != nil {
		h.log.Warn("Failed to bind request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := c.Validate(req); err != nil {
		h.log.Warn("Request validation failed", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Get current product for previous stock
	product, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to get product for stock update", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	previousStock := product.Stock
	stockChange := req.Stock - previousStock

	err = h.productService.UpdateProductStock(ctx, id, req.Stock)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to update product stock", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Get updated product
	updatedProduct, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		h.log.Error("Failed to get updated product", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Publish event
	h.event.Publish(bus.Event{Type: "product.stock.updated", Payload: updatedProduct})
	h.log.Info("Product stock updated", "id", id, "previous", previousStock, "current", req.Stock)

	resp := response.NewProductStockResponse(updatedProduct, previousStock, stockChange)
	return c.JSON(http.StatusOK, resp)
}

// ProcessOrder godoc
// @Summary      Process order
// @Description  Process an order by reducing product stock
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        id path string true "Product ID (UUID)"
// @Param        request body request.ProcessOrderRequest true "Order processing payload"
// @Success      200 {object} response.OrderProcessResponse "Successfully processed order"
// @Failure      400 {object} map[string]string "Invalid product ID, request body, validation failed, or insufficient stock"
// @Failure      404 {object} map[string]string "Product not found"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/{id}/order [post]
func (h *ProductHandler) ProcessOrder(c echo.Context) error {
	ctx := c.Request().Context()

	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		h.log.Warn("Invalid product ID", "id", c.Param("id"))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	req := new(request.ProcessOrderRequest)
	if err := c.Bind(req); err != nil {
		h.log.Warn("Failed to bind request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := c.Validate(req); err != nil {
		h.log.Warn("Request validation failed", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	err = h.productService.ProcessOrder(ctx, id, req.Quantity)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		if err == service.ErrInvalidData {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request or insufficient stock"})
		}
		h.log.Error("Failed to process order", "id", id, "quantity", req.Quantity, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Get updated product
	product, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		h.log.Error("Failed to get updated product after order", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Publish event
	h.event.Publish(bus.Event{Type: "product.order.processed", Payload: map[string]interface{}{
		"product":  product,
		"quantity": req.Quantity,
	}})
	h.log.Info("Order processed", "id", id, "quantity", req.Quantity, "remaining_stock", product.Stock)

	resp := response.NewOrderProcessResponse(product, req.Quantity, true)
	return c.JSON(http.StatusOK, resp)
}

// RestockProduct godoc
// @Summary      Restock product
// @Description  Add stock to a product
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        id path string true "Product ID (UUID)"
// @Param        request body request.RestockRequest true "Restock payload"
// @Success      200 {object} response.ProductStockResponse "Successfully restocked product"
// @Failure      400 {object} map[string]string "Invalid product ID, request body, or validation failed"
// @Failure      404 {object} map[string]string "Product not found"
// @Failure      500 {object} map[string]string "Internal server error"
// @Router       /products/{id}/restock [post]
func (h *ProductHandler) RestockProduct(c echo.Context) error {
	ctx := c.Request().Context()

	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		h.log.Warn("Invalid product ID", "id", c.Param("id"))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product ID"})
	}

	req := new(request.RestockRequest)
	if err := c.Bind(req); err != nil {
		h.log.Warn("Failed to bind request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := c.Validate(req); err != nil {
		h.log.Warn("Request validation failed", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Get current product for previous stock
	product, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to get product for restock", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	previousStock := product.Stock

	err = h.productService.RestockProduct(ctx, id, req.Quantity)
	if err != nil {
		if err == service.ErrProductNotFound {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
		}
		h.log.Error("Failed to restock product", "id", id, "quantity", req.Quantity, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Get updated product
	updatedProduct, err := h.productService.GetProductByID(ctx, id)
	if err != nil {
		h.log.Error("Failed to get updated product after restock", "id", id, "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Publish event
	h.event.Publish(bus.Event{Type: "product.restocked", Payload: map[string]interface{}{
		"product":  updatedProduct,
		"quantity": req.Quantity,
	}})
	h.log.Info("Product restocked", "id", id, "quantity", req.Quantity, "new_stock", updatedProduct.Stock)

	resp := response.NewProductStockResponse(updatedProduct, previousStock, req.Quantity)
	return c.JSON(http.StatusOK, resp)
}

// RegisterRoutes registers the product routes
func (h *ProductHandler) RegisterRoutes(e *echo.Echo, basePath string) {
	group := e.Group(basePath+"/products", middleware.Auth)

	// Basic CRUD operations
	group.GET("", h.GetAllProducts)
	group.GET("/:id", h.GetProduct)
	group.POST("", h.CreateProduct)
	group.PUT("/:id", h.UpdateProduct)
	group.DELETE("/:id", h.DeleteProduct)

	// Search and filtering
	group.GET("/search", h.SearchProducts)
	group.GET("/in-stock", h.GetProductsInStock)

	// Stock management
	group.PATCH("/:id/stock", h.UpdateStock)
	group.POST("/:id/order", h.ProcessOrder)
	group.POST("/:id/restock", h.RestockProduct)
}
