const express = require('express');
const bodyParser = require('body-parser');
let router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
  console.log('Login');
  // res.send('Login/index');
  res.render('pages/Login.ejs');
});

router.post('/', (req, res) => {
  console.log(req.body.userEmail);
  if (req.body.userEmail == 'khoi@sdsd') {
    //router.use(express.static(path.join('views/Home')));
    res.cookie('remember', 1, { maxAge: 600000, httpOnly: true });
    console.log('hi Hello World');
    res.redirect('/');
  }
  //else
  //res.render('Login/index.html');
  // add script
});


router.get('/cookies', (req, res) => {
      if (req.cookies.remember) {
        res.send('Remembered :). Click to <a href="/login/forget">forget</a>!.');
      } else {
        res.redirect('/login');
      }
    });

router.get('/forget', function (req, res) {
    res.clearCookie('remember');
    res.redirect('/');
    });



router.post('/register', (req, res) => {
  console.log('Register ' + req.body.userEmail);
  res.redirect('/');
});
module.exports = router;
