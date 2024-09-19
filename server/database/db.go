package db

import (
	"context"
	"database/sql"
	"log"

	_ "github.com/lib/pq"

	"github.com/Kaivv1/chill-room/types"
)

type DBFuncs interface {
	CreateUser(types.User, context.Context) (types.User, error)
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
