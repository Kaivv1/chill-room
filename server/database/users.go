package db

import (
	"context"
	"errors"

	"github.com/Kaivv1/chill-room/types"
	"github.com/google/uuid"
)

// func (p *PostgresDB) CreateUser(args types.User, ctx context.Context) (types.User, error) {
// 	query := `
// 	INSERT INTO users (id, created_at, updated_at, username, email, password)
// 	VALUES ($1, $2, $3, $4, $5, $6)
// 	RETURNING *;
// 	`
// 	row := p.db.QueryRowContext(ctx, query,
// 		args.Id,
// 		args.CreatedAt,
// 		args.UpdatedAt,
// 		args.Username,
// 		args.Email,
// 		args.Password,
// 	)
// 	var user types.User
// 	err := row.Scan(
// 		&user.Id,
// 		&user.CreatedAt,
// 		&user.UpdatedAt,
// 		&user.Username,
// 		&user.Email,
// 		&user.Password,
// 	)
// 	return user, err
// }

//	func (p *PostgresDB) DoesGuestIdMatchUserId(id string, ctx context.Context) (bool, error) {
//		query := `
//	  SELECT EXISTS (
//		  SELECT 1 FROM users
//			WHERE id = $1
//		);
//	  `
//		var exists bool
//		err := p.db.QueryRowContext(ctx, query, id).Scan(&exists)
//		if err != nil {
//			return false, err
//		}
//		return exists, nil
//	}
func (p *PostgresDB) CreateDbUser(args types.User, ctx context.Context) (types.User, error) {
	query := `
				INSERT INTO users (id, created_at, username)
				VALUES ($1, $2, $3)
				RETURNING *;
				`
	var user types.User
	err := p.db.QueryRowContext(ctx, query,
		args.ID,
		args.Created_At,
		args.Username,
	).Scan(
		&user.ID,
		&user.Created_At,
		&user.Username,
	)
	return user, err
}

func (p *PostgresDB) DeleteDbUser(id uuid.UUID, ctx context.Context) error {
	query := `
	DELETE FROM users
	WHERE id = $1;
	`
	result, err := p.db.ExecContext(ctx, query, &id)
	if err != nil {
		return err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows != 1 {
		return errors.New("only 1 user row was supposed to be deleted")
	}
	return nil
}
