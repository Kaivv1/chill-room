package db

import (
	"context"
	"database/sql"
	"log"

	"github.com/Kaivv1/chill-room/types"
	_ "github.com/lib/pq"
)

type DBFuncs interface {
	CreateUser(types.User, context.Context) (types.User, error)
	CheckEmail(string, context.Context) bool
	GetUserPassword(string, context.Context) string
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
