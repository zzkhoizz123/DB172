const express = require('express');
var router = express.Router();
const path = require('path');

router.use(express.static(path.join('views/Home')));

/*
router.use('/*', (req, res, next) => {
    // middleware find 8 popular courses

    next();
});
*/

router.get('/', function (req, res) {
  console.log(req.header_data);
  res.render('pages/Home', { data: req.header_data});
});

router.get('/about', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/About', { data: req.header_data});
});

router.get('/lecturer', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/Lecturer', { data: req.header_data});
});

router.get('/profile', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/Profile', { data: req.header_data});
});

module.exports = router;
