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
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

app.get('/posts', (req, res) => {
  db.getPosts()
    .then((data) => {
      console.log(data)
      res.send(data)
    })
});

app.get('/posts/:id', (req, res) => {
  let id = req.params.id;
  db.getPostById(id)
    .then((data) => {
      res.send(data)
    })
})

app.post('/user', (req, res) => {
  let input = req.body;
  let user = input.userName;
  let password = input.password;
  db.getUserByName(user)
    .then((data) => {
      if(!data) {
        db.insertUser(user, password)
          .then((data) => {
            res.send(data);
          })
          .catch(console.log)

      } else {
        res.send(data)
      }
    }) .catch(console.log)
})

app.delete('/posts/:id', (req, res) => {
  console.log(req.params)
  let id = req.params.id;
  db.deletePostById(id)
    .then((data) => {
      res.send(data);
    })
})

app.post('/post', (req, res) => {
  let input = req.body;
  let title = input.title;
  let category = input.categories;
  let content = input.content;
  let user = input.user_id;
  db.insertPost(title, category, content, user)
    .then((data) => {
      res.send(data)
    }).catch(console.log)
  res.send('post added')
})



app.listen(5000, () => {
  console.log('Your server is up and running on port 5000')
})