const express = require('express');
var router = express.Router();
const path = require('path');

router.use(express.static(path.join('views/Style')));

router.get('/', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/Subject');

});

router.get('/lesson', function (req, res) {
  //console.log('Hello World Home');
  res.render('pages/Lesson');
});


module.exports = router;
