-- +goose Up
CREATE TABLE users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE INDEX username_idx ON users(username);
CREATE INDEX email_idx ON users(email);

-- +goose Down
DROP INDEX username_idx;
DROP INDEX email_idx;
DROP TABLE users;

