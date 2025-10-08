package validator

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator"
)

type CustomValidator struct {
	validator *validator.Validate
}

func NewCustomValidator() *CustomValidator {
	return &CustomValidator{
		validator: validator.New(),
	}
}

func (cv *CustomValidator) Validate(i interface{}) error {
	err := cv.validator.Struct(i)
	if err == nil {
		return nil
	}

	if errs, ok := err.(validator.ValidationErrors); ok {
		validationErrors := make(map[string]string)
		for _, e := range errs {
			field := e.Field()
			if jsonTag := e.StructField(); jsonTag != "" {
				if tag := e.StructField(); tag != "" {
					field = toSnakeCase(e.Field())
				}
			}
			validationErrors[strings.ToLower(field)] = e.Tag() // e.g. "required", "email", "min"
		}
		return ValidationError{Errors: validationErrors}
	}

	return err
}

func toSnakeCase(s string) string {
	var output []rune
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			output = append(output, '_')
		}
		output = append(output, r)
	}
	return strings.ToLower(string(output))
}

type ValidationError struct {
	Errors map[string]string
}

func (e ValidationError) Error() string {
	return fmt.Sprintf("validation error: %+v", e.Errors)
}
