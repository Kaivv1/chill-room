package types

import (
	"github.com/google/uuid"
	"time"
)

// type User struct {
// 	Id        uuid.UUID
// 	CreatedAt time.Time
// 	UpdatedAt time.Time
// 	Username  string
// 	Email     string
// 	Password  string
// }

// type UserJson struct {
// 	Id        uuid.UUID `json:"id"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"updated_at"`
// 	Username  string    `json:"username"`
// 	Email     string    `json:"email"`
// 	Password  string    `json:"password"`
// }

// func UserToUserJson(u *User) UserJson {
// 	return UserJson{
// 		Id:        u.Id,
// 		CreatedAt: u.CreatedAt,
// 		UpdatedAt: u.UpdatedAt,
// 		Username:  u.Username,
// 		Email:     u.Email,
// 		Password:  u.Password,
// 	}
// }

type User struct {
	ID         uuid.UUID
	Created_At time.Time
	Username   string
}
