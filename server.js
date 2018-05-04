const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const path = require('path');
//let router = express.Router();
var homerouter = require('./router/home.js');
var loginrouter = require('./router/login.js');
var subjectrouter = require('./router/subject.js');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('my secret here'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use('/subject', subjectrouter);
app.use('/login', loginrouter);
app.use('/', homerouter);

app.all('/*', (req, res) => {
  res.send('Not found');
});

app.listen(3000); // this is port
