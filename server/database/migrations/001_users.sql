-- +goose Up

create table users (
  id uuid primary key,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  username text unique not null,
  email text unique not null,
  password varchar(255) not null
);

create index user_email_idx on users(email); 
create index user_username_idx on users(username); 

-- +goose Down

drop table users;
