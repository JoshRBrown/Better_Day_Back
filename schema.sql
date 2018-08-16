CREATE TABLE users (
  user_id serial PRIMARY KEY,
  user_name varchar(20) NOT NULL,
  password varchar(15) NOT NULL
);

CREATE TABLE posts (
  post_id serial PRIMARY KEY,
  title varchar,
  category varchar,
  content varchar,
  user_id int REFERENCES users(user_id)
);
