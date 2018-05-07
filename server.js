const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
//let router = express.Router();
var homerouter = require('./router/home.js');
var loginrouter = require('./router/login.js');
var subjectrouter = require('./router/subject.js');
var profilerouter = require('./router/profile.js');


let app = express();

if (!process.env.PRODUCTION)
    global.api_path = 'http://localhost:8080/api/v1';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('my secret here'));
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

//*
app.use('/*', (req, res, next) => {
  // query user name
  // query user id
  // query user image link
  if (!req.cookies.token) {
    res.cookie('token', null);
    res.cookie('userID', null);
    res.cookie('name', null);
    res.cookie('image', null);
    console.log(req.cookies);

  //  console.log(req.header_data.token);
    req.header_data = {};

    next();
  }

  else {
    // console.log(req.cookies);
    req.header_data = {};
    req.header_data.image = req.cookies.image;
    req.header_data.name = req.cookies.name;
    req.header_data.userID = req.cookies.userID;
    req.header_data.token = req.cookies.token;
    next();
  }
});
//*/

app.use('/*', (req, res, next) => {
    // get top 5
    next();
});

app.use('/subject', subjectrouter);
app.use('/login', loginrouter);
app.use('/profile', profilerouter);
app.use('/', homerouter);

app.all('/*', (req, res) => {
  res.render('pages/404');
});

app.listen(process.env.PORT || 3000); // this is port
