package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Kaivv1/chill-room/api"
	"github.com/Kaivv1/chill-room/database"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("env variables did not load")
	}
	port := os.Getenv("PORT")
	db_url := os.Getenv("DB_URL")

	db, err := db.NewPostgresDB(db_url)
	if err != nil {
		log.Fatalln(err)
	}

	server := api.NewServer(port, db)
	fmt.Printf("Server runnin on port :%s\n", port)
	log.Fatal(server.Start())
}
