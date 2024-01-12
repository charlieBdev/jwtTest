DROP DATABASE IF EXISTS authtodolist_test;
DROP DATABASE IF EXISTS authtodolist;

CREATE DATABASE authtodolist_test;
CREATE DATABASE authtodolist;

-- insert fake users - has to be single quotes!

-- INSERT INTO users (user_name, user_email, user_password) VALUES (
--   'henry', 'henry@gmail.com', 'henry123'
-- );

-- INSERT INTO users (user_name, user_email, user_password) VALUES (
--   'bob', 'bob@gmail.com', 'bob123'
-- );

-- insert todos

-- INSERT INTO todos (user_id, description)
-- VALUES ('08152886-28a8-48f4-9bf2-8d0ba5b96c6f', 'take out trash'),
-- ('08152886-28a8-48f4-9bf2-8d0ba5b96c6f', 'chill');

-- join for get a users todos (dashboard)

-- SELECT users.user_name, todos.description
-- FROM users
-- INNER JOIN todos ON todos.user_id = users.user_id;