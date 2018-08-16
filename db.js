const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'betterday',
    user: '',
    password: ''
}
const db = pgp(cn);


function insertUser(username, password) {
  return db.one('INSERT INTO users (user_name, password) VALUES ($1, $2) returning user_id;', [username, password]);
};

function insertPost(title, category, password, user_id) {
  return db.one('INSERT INTO posts (title, category, content, user_id) VALUES($1, $2, $3, $4);', [title, category, password, user_id]);
};

function getPosts() {
  return db.any('SELECT * FROM posts;')
};

function getUserByName(user_name) {
  return db.oneOrNone('SELECT user_id FROM users where user_name = $1;', [user_name]);
};

function getPostById(id) {
  return db.one('SELECT * FROM posts WHERE post_id = $1;', [id])
}

function deletePostById(id) {
  return db.oneOrNone('DELETE FROM posts WHERE post_id = $1;', [id]);
}


module.exports = {
  insertUser,
  insertPost,
  getPosts,
  getUserByName,
  getPostById,
  deletePostById
};