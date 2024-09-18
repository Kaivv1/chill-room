start: 
	go build -o out && ./out
goose-up:
	cd database/migrations && goose postgres "postgres://postgres:postgres@host.docker.internal:5432/chill-room?sslmode=disable" up
goose-down:
	cd database/migrations && goose postgres "postgres://postgres:postgres@host.docker.internal:5432/chill-room?sslmode=disable" down
	