CREATE DATABASE authtodolist;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

CREATE TABLE todos (
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    complete BOOLEAN DEFAULT false,
    date_completed TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- insert fake users - has to be single quotes!

INSERT INTO users (user_name, user_email, user_password) VALUES (
  'henry', 'henry@gmail.com', 'henry123'
);

INSERT INTO users (user_name, user_email, user_password) VALUES (
  'bob', 'bob@gmail.com', 'bob123'
);

-- insert todos

INSERT INTO todos (user_id, description)
VALUES ('08152886-28a8-48f4-9bf2-8d0ba5b96c6f', 'take out trash'),
('08152886-28a8-48f4-9bf2-8d0ba5b96c6f', 'chill');

-- join for get a users todos (dashboard)

SELECT users.user_name, todos.description
FROM users
INNER JOIN todos ON todos.user_id = users.user_id;