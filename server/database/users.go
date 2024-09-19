package db

import (
	"context"

	"github.com/Kaivv1/chill-room/types"
)

func (p *PostgresDB) CreateUser(args types.User, ctx context.Context) (types.User, error) {
	query := `
	INSERT INTO users (id, created_at, updated_at, username, email, password)
	VALUES ($1, $2, $3, $4, $5, $6)
	RETURNING *;
	`
	row := p.db.QueryRowContext(ctx, query,
		args.Id,
		args.CreatedAt,
		args.UpdatedAt,
		args.Username,
		args.Email,
		args.Password,
	)
	var user types.User
	err := row.Scan(
		&user.Id,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.Username,
		&user.Email,
		&user.Password,
	)
	return user, err
}
