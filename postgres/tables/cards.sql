BEGIN TRANSACTION;

CREATE TABLE cards (
    id serial PRIMARY KEY,
    title VARCHAR(100),
    content VARCHAR(5000),
    created TIMESTAMP NOT NULL,
    folder_id integer not null references folders(id)
);

COMMIT;

