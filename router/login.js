const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

let router = express.Router();

router.get('/', (req, res) => {
  // console.log('Login');
  res.render('pages/Login');
});

router.post('/', (req, res) => {

    let name = req.body['userName'];
    let pwd = req.body['userPassword'];

    // console.log(name);
    // console.log(pwd);
    if (!name || !pwd) {
        res.render('pages/Login.ejs', {error: 'No Username or Password'});
        return;
    }

    // console.log(api_path + '/user/login');
    request.post({
        url: api_path + '/user/login',
        form: {
            username: name,
            password: pwd
        }
    }, (err, response, body) => {

        if (err) {
            res.render('pages/Login.ejs', {error: 'Request failed'});
            return;
        }

        data = JSON.parse(body);
        if (data.err) {
            res.render('pages/Login.ejs', {error: 'Wrong Password or Username'});
            return;
        }

        res.cookie('token', data.token);
        res.cookie('name', name);
        // res.cookie('image', data.image);
        res.cookie('userID',data.ID);
        res.redirect('/');
    });
});

/*
router.get('/cookies', (req, res) => {
    console.log(req.cookies.token);
    if (req.cookies.token) {
        res.send(req.cookies.token);
    } else {
        res.redirect('/login');
    }
});

*/
/*
router.get('/forget', function (req, res) {
    res.clearCookie('remember');
    res.redirect('/');
});
//*/

router.post('/register', (req, res) => {
    let name = req.body['userName'];
    let pwd = req.body['userPassword'];
    let email = req.body['userEmail'];

    if (!name || !pwd || !email) {
      res.render('pages/Login.ejs', {error: 'No Username or Password'});
      return;
    }

    // console.log(api_path + '/user/login');

    request.post({
        url: api_path + '/user/register',
        form: {
          username: name,
          password: pwd
        }
    }, (err, response, body) => {
        if (err) {
          console.log(err);
          res.render('pages/Login.ejs', {error: 'Request failed'});
          return;
        }

        data = JSON.parse(body);
        if (data.err) {
          res.render('pages/Login.ejs', {error: 'Wrong Password or Username'});
          return;
        }

        res.render('pages/Login.ejs', {message: 'Register complete'});
    });
});
module.exports = router;
