const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

let router = express.Router();

router.get('/:userID', function (req, res) {
//  console.log(req.params.userID);
  var myid = req.params.userID;

  if(!myid){
    res.render('pages/Login.ejs', {error: 'something went wrong with your id'});
    return;
  }

  request.get({
    url: api_path + '/user/me',
    id : myid

  }, (err, response, body) => {
    if(err){
      res.render('pages/Login.ejs', {error: 'Request failed'});
      return;
    }

    data = JSON.parse(body);
    //console.log("data: " + data.err);
    if (data.err) {
        res.render('pages/Login.ejs', {error: 'something went wrong'});
        return;
    }

  /*  res.cookie('DOB', data.token);
    res.cookie('name', name);
    // res.cookie('image', data.image);
    res.cookie('userID', 10);
    res.redirect('/');*/
  });

  res.render('pages/Profile', { data: req.header_data});
});

router.get('/logout', function (req, res) {
  res.clearCookie('token');
  console.log("logout");
  res.redirect('/');
});

module.exports = router;
