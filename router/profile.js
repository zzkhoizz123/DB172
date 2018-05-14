const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

let router = express.Router();

router.get('/', function(req, res) {
      var token = req.cookies.token;

      if (!token) {
            res.render('pages/Login.ejs', {
                  error: 'something went wrong with your id'
            });
            return;
      }

      request.get({
            url: api_path + '/user/me',
            headers: {
                  'x-access-token': req.cookies.token
            }
      }, (err, response, body) => {
            if (err) {
                  res.render('pages/Login.ejs', {
                        error: 'Request failed'
                  });
                  return;
            }

            user_info = JSON.parse(body);
            console.log(user_info);
            if (user_info.err) {
                  res.render('pages/Login.ejs', {
                        error: 'something went wrong'
                  });
                  return;
            }

            res.render('pages/Profile', {
                  data: req.header_data, // data la cai trong header, luon phai co
                  user_info: user_info, // cai du lieu cua user
                  user_password: req.cookies.password
            });
      });
});

router.post('/reset_password', function(req, res) {

  console.log('hi');

  var pass = req.body['curpsw'];
  var newpass = req.body['newpsw'];
  var repass = req.body['repsw'];
  var name = req.cookies.name;

  if (!name || !pass || !newpass) {
    res.render('pages/Login.ejs', {error: 'login wrong'});
    return;
  }

  if (!pass || !newpass) {
    res.redirect('/profile');
    console.log('retype wrong');
    return;
  }
  if (newpass != repass) {
      res.redirect('/profile');
      console.log('retype wrong');
    return;
  }
    request.post({
      url: api_path + '/user/me/reset_password',
      headers: {
          'x-access-token': req.cookies.token
      },
      form: {
          username: name,
          password: pass,
          new_password: newpass
        }
      }, (err, response, body) => {

      if (err) {
          res.redirect('/profile');
          return;
      }

      data = JSON.parse(body);
      if (data.err) {
          res.render('pages/Login.ejs', {
          error: 'Wrong Password or Username',
          data: req.header_data // data la cai trong header, luon phai co
        });
          return;
      }

      console.log(data.message);
      res.redirect('/profile');
  });
});

router.get('/logout', function(req, res) {
      res.clearCookie('token');
      res.redirect('/');
});

module.exports = router;
