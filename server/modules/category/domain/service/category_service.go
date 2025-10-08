package service

import (
	"context"
	"go-modular/modules/category/domain/entity"
	"go-modular/modules/category/domain/repository"
	"go-modular/modules/category/dto/request"
	"go-modular/modules/category/dto/response"
)

type CategoryService interface {
	GetAllCategories(ctx context.Context) ([]response.CategoryResponse, error)
	GetCategoryByID(ctx context.Context, id uint) (response.CategoryResponse, error)
	CreateCategory(ctx context.Context, req request.CreateCategoryRequest) (response.CategoryResponse, error)
	UpdateCategory(ctx context.Context, id uint, req request.UpdateCategoryRequest) (response.CategoryResponse, error)
	DeleteCategory(ctx context.Context, id uint) error
}

type categoryServiceImpl struct {
	repo repository.CategoryRepository
}

func NewCategoryService(repo repository.CategoryRepository) CategoryService {
	return &categoryServiceImpl{repo: repo}
}

func (s *categoryServiceImpl) GetAllCategories(ctx context.Context) ([]response.CategoryResponse, error) {
	categories, err := s.repo.FindAll(ctx)
	if err != nil {
		return nil, err
	}
	var categoryResponses []response.CategoryResponse
	for _, category := range categories {
		categoryResponses = append(categoryResponses, response.CategoryResponse{
			ID:   category.ID,
			Name: category.Name,
		})
	}
	return categoryResponses, nil
}

func (s *categoryServiceImpl) GetCategoryByID(ctx context.Context, id uint) (response.CategoryResponse, error) {
	category, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return response.CategoryResponse{}, err
	}
	return response.CategoryResponse{
		ID:   category.ID,
		Name: category.Name,
	}, nil
}

func (s *categoryServiceImpl) CreateCategory(ctx context.Context, req request.CreateCategoryRequest) (response.CategoryResponse, error) {
	newCategory := &entity.Category{
		Name: req.Name,
	}
	err := s.repo.Create(ctx, newCategory)
	if err != nil {
		return response.CategoryResponse{}, err
	}
	return response.CategoryResponse{
		ID:   newCategory.ID,
		Name: newCategory.Name,
	}, nil
}

func (s *categoryServiceImpl) UpdateCategory(ctx context.Context, id uint, req request.UpdateCategoryRequest) (response.CategoryResponse, error) {
	category, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return response.CategoryResponse{}, err
	}
	category.Name = req.Name
	err = s.repo.Update(ctx, category)
	if err != nil {
		return response.CategoryResponse{}, err
	}
	return response.CategoryResponse{
		ID:   category.ID,
		Name: category.Name,
	}, nil
}

func (s *categoryServiceImpl) DeleteCategory(ctx context.Context, id uint) error {
	_, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, id)
}
