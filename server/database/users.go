package db

import (
	"context"

	"github.com/Kaivv1/chill-room/types"
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
				INSERT INTO users (id, username)
				VALUES ($1, $2)
				RETURNING *;
				`
	var user types.User
	err := p.db.QueryRowContext(ctx, query,
		args.ID.String(),
		args.Username,
	).Scan(
		&user.ID,
		&user.Username,
	)
	return user, err
}
