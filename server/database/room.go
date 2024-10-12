package db

import (
	"context"
	"errors"
	"log"

	"github.com/Kaivv1/chill-room/types"
)

func (p *PostgresDB) CreateDbRoom(args types.Room, ctx context.Context) (types.Room, error) {
	query := `
	INSERT INTO rooms (
	  id,
		created_at,
		updated_at,
		name,
		is_active,
		last_active_at,
		creator_id
	)
	VALUES ($1, $2, $3, $4, $5, $6, $7)
	RETURNING *;	
	`
	var room types.Room
	err := p.db.QueryRowContext(ctx, query,
		args.ID,
		args.Created_At,
		args.Updated_At,
		args.Name,
		args.Is_Active,
		args.Last_Active_At,
		args.Creator_ID,
	).Scan(
		&room.ID,
		&room.Created_At,
		&room.Updated_At,
		&room.Name,
		&room.Is_Active,
		&room.Last_Active_At,
		&room.Creator_ID,
	)
	return room, err
}

func (p *PostgresDB) UserJoinsRoom(args types.Room_User, ctx context.Context) error {
	query := `
  INSERT INTO rooms_users (
	id, created_at, user_id, room_id
	) VALUES ($1, $2, $3, $4);
  `
	result, err := p.db.ExecContext(ctx, query,
		args.ID,
		args.Created_At,
		args.User_ID,
		args.Room_ID,
	)
	if err != nil {
		log.Printf("Error occured while adding rooms_users row in db: %s", err.Error())
		return err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		log.Println(err)
		return err
	}
	if rows != 1 {
		err = errors.New("more than 1 row was affected")
		log.Println(err)
		return err
	}
	return nil
}
