package model

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	UID       uuid.UUID `db:"uid" json:"uid"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"password"`
	Name      string    `db:"name" json:"name"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
}
