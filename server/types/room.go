package types

import (
	"time"

	"github.com/google/uuid"
)

type Room struct {
	ID             uuid.UUID
	Created_At     time.Time
	Updated_At     time.Time
	Name           string
	Is_Active      bool
	Last_Active_At time.Time
	Creator_ID     uuid.UUID
}

type Room_User struct {
	ID         uuid.UUID
	Created_At time.Time
	User_ID    uuid.UUID
	Room_ID    uuid.UUID
}
