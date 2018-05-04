const express = require('express');
var router = express.Router();
const path = require('path');

router.use(express.static(path.join('views/Home')));

router.get('/', function (req, res) {
  console.log('Hello World Home');
  //res.sendFile(path.join('/vHome.html'));
  res.render('pages/Home');
  //res.sendFile(path.join('/views/Home/Home.html'));
});

router.get('/about', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/About');
});

router.get('/lecturer', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/Lecturer');
});

router.get('/profile', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/Profile');
});

module.exports = router;
