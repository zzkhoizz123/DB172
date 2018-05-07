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
                  user_info: user_info // cai du lieu cua user
            });

            /*  res.cookie('DOB', data.token);
              res.cookie('name', name);
              // res.cookie('image', data.image);
              res.cookie('userID', 10);
              res.redirect('/');*/
      });


});

router.get('/logout', function(req, res) {
      res.clearCookie('token');
      res.redirect('/');
});

module.exports = router;
