const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const axios = require('axios');

class User{
  constructor(email = '', password = ''){
    this.id = '';
    this.email = email;
    this.password = password;
  }
}

class UserRepository{
  constructor(data = []){
    this._users = data;
  }

  /**
   * Find user by email and password;
   */
  findUser(email = '', password = ''){
    let user = this._users.filter(x => x.email == email && x.password == password);
    user = user.length >= 1 ? user[0] : false;

    return user;
  }

  getUsers(){
    let users = this._users;

    return users;
  }

  addUser(user){
    let isEmpty = !(user && user.email && user.password);
    let exists = this._users.filter(x => x.email == user.email).length >= 1;
    if(!exists && !isEmpty){
      user.id = this._lastId();
      this._users.push(user);

      return user;
    }

    return 'failed';
  }

  _lastId(){
    let id = 1;

    if(this._users.length < 1){
      return id;
    }

    id = this._users[this._users.length - 1].id + 1;

    return id;
  }
}

let users = new UserRepository();

const secret = 'scb1l#!-lime-pie';

app.use(express.static(__dirname + '/dist/auth-test-task'));
app.use(bodyParser.json());
app.use(expressJwt({secret: secret}).unless({path: ['/api/auth','/api/register','/support', '/', '/*', '/api/currency/ranges', '/api/currency/exchanges', '/api/validate' ]}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'auth-test-task','/index.html'));
});

app.get('/*', (req, res) =>{
  res.sendfile(path.join(__dirname));
});

app.post('/api/auth', (req, res) =>{
  const body = req.body;

  const user = users.findUser(body.email, body.password);
  if(!user) return res.sendStatus(401);

  var token = jwt.sign({userID: user.id}, secret, {expiresIn: '1h'});
  res.send({token});
});

app.post('/api/register', (req, res) =>{
  let body = req.body;
  let user = new User(body.email, body.password);
  user = users.addUser(user);

  if(user == 'failed'){
    return res.sendStatus(401);
  }

  var token = jwt.sign({userID: user.id}, secret, {expiresIn: '1h'});
  res.send({token});
});

app.get('/api/transactions', (req, res) =>{
  axios.get('https://api.myjson.com/bins/x3678')
  .then(response => {
    res.send(response.data);
    res.type("json");
  })
  .catch(error => {
    res.send(error);
  });
});

app.post('/api/validate', (req, res) => {
    var emailPattern = new RegExp('^[^g][a-zA-Z][^g]+@[^g][a-zA-Z][^g]+?.[a-zA-Z]{2,3}$');
    var isValid = emailPattern.test(req.body.email);
    res.send({isValid});
});

app.get('/api/transactions/:name', (req, res) =>{
  var transactionsName = req.params.name;

  axios.get('https://api.myjson.com/bins/x3678')
  .then(response => {
    let data = response.data.filter(x => x.name == transactionsName);
    res.send(data);
    res.type("json");
  })
  .catch(error => {
    res.send(error);
  });
});

app.get('/api/currency/exchanges', (req, res) =>{
  axios.get('https://api.myjson.com/bins/12zd38')
  .then(response => {
    res.send(response.data);
    res.type("json");
  })
  .catch(error => {
    res.send(error);
  });
});

app.get('/api/currency/ranges', (req, res) =>{
  axios.get('https://api.myjson.com/bins/1ckfxg')
  .then(response => {
    res.send(response.data);
    res.type("json");
  })
  .catch(error => {
    res.send(error);
  });
});

app.listen(8001, () =>{
  console.log('Running on port 8001!')
});
