package model

import "github.com/google/uuid"

// defines methods the handler layer expects
type UserService interface {
	Get(uid uuid.UUID) (*User, error)
}

// defines methods the service layer expects
type UserRepository interface {
	FindByID(uid uuid.UUID) (*User, error)
}
