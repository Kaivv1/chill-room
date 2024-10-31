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

func (p *PostgresDB) CheckEmail(email string, ctx context.Context) bool {
	query := `
	SELECT EXISTS (
	  SELECT FROM users
		WHERE email = $1 
	);
	`
	var exists bool
	err := p.db.QueryRowContext(ctx, query, email).Scan(&exists)
	if err != nil {
		return false
	}
	return exists
}

func (p *PostgresDB) GetUserPassword(email string, ctx context.Context) string {
	query := `
	SELECT password FROM users
	WHERE email = $1;
	`
	var pass string
	err := p.db.QueryRowContext(ctx, query, email).Scan(&pass)
	if err != nil {
		return ""
	}
	return pass
}
