package db

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"time"

	"github.com/Kaivv1/chill-room/types"
)

type DBFuncs interface {
	Get() *types.User
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

func (p *PostgresDB) Get() *types.User {
	return &types.User{
		Id:        1,
		Name:      "Foo",
		CreatedAt: time.Now().UTC(),
	}
}
