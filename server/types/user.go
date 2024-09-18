package types

import "time"

type User struct {
	Id        int
	CreatedAt time.Time
	Name      string
}
