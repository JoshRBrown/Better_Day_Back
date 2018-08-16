const db = require('./db');
const express = require('express');
const app = express();
const rp = require('request-promise');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

app.use(cors({
  origin: ['*'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.get('/posts', (req, res) => {
  db.getPosts()
    .then((data) => {
      res.send(data)
    })
});


app.listen(5000, () => {
  console.log('Your server is up and running on port 5000')
})