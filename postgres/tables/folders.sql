BEGIN TRANSACTION;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    title VARCHAR(255),
    created TIMESTAMP NOT NULL,
    user_id integer not null references users(id)
);

COMMIT;
