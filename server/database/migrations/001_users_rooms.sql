-- +goose Up

CREATE TABLE users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  username VARCHAR(255) UNIQUE NOT NULL
);
CREATE INDEX users_username_idx ON users(username);

CREATE TABLE rooms (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  name VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL,
  last_active_at TIMESTAMP NULL, 
  creator_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX rooms_creator_id_idx ON rooms(creator_id);

CREATE TABLE rooms_users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  UNIQUE(user_id, room_id)
);

-- +goose Down

DROP TABLE rooms_users;
DROP TABLE rooms;
DROP TABLE users;
-- DROP INDEX rooms_users_user_id_idx;
-- DROP INDEX rooms_users_room_id_idx;
-- DROP INDEX users_username_idx;
-- DROP INDEX rooms_creator_id_idx;