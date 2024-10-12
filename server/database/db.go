package db

import (
	"context"
	"database/sql"
	"log"

	"github.com/google/uuid"
	_ "github.com/lib/pq"

	"github.com/Kaivv1/chill-room/types"
)

type DBFuncs interface {
	// CreateUser(types.User, context.Context) (types.User, error)
	CreateDbUser(types.User, context.Context) (types.User, error)
	DeleteDbUser(uuid.UUID, context.Context) error
	UserJoinsRoom(types.Room_User, context.Context) error
	CreateDbRoom(types.Room, context.Context) (types.Room, error)
}

type PostgresDB struct {
	db *sql.DB
}

func NewPostgresDB(db_url string) (*PostgresDB, error) {
	db, err := sql.Open("postgres", db_url)
	if err != nil {
		log.Println("Cannot connect to db")
		return nil, err
	}
	if err := db.Ping(); err != nil {
		log.Println("Error while pinging db")
		return nil, err
	}
	return &PostgresDB{
		db: db,
	}, nil
}
