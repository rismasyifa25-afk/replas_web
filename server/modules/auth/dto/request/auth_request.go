package request

type ResetRequest struct {
	Email string `json:"email" validate:"required,email"`
}

type SetNewPasswordRequest struct {
	Token    string `json:"token" validate:"required"`
	Password string `json:"password" validate:"required"`
}
