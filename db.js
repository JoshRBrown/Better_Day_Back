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
  return db.one('INSERT INTO users (username, password) VALUES ($1, $2);', [username, password]);
};

function insertPost(title, category, password, user_id) {
  return db.one('INSERT INTO posts (title, category, content, user_id) VALUES($1, $2, $3, $4);', [title, category, password, user_id]);
};

function getPosts() {
  return db.any('SELECT * FROM posts;')
};


module.exports = {
  insertUser,
  insertPost,
  getPosts
};