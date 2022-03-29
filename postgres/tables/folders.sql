BEGIN TRANSACTION;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    created TIMESTAMP NOT NULL,
    user_id integer not null references users(id)
);

COMMIT;
