const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const dateFormat = require('dateformat');

let router = express.Router();

router.get('/', function (req, res) {
  //console.log('Hello World Home');

  request.get({
        url: api_path + '/course',
  }, (err, response, body) => {
        if (err) {
          res.render('pages/Home', { data: req.header_data});
              return;
        }

        somecourse = JSON.parse(body);
      //  console.log(somecourse);

        if (somecourse.err) {
            res.render('pages/Home', { data: req.header_data});
              return;
        }

        for (var i = 0; i < somecourse.length; i++) {
          var day = dateFormat(somecourse[i].CreateDate, "dd-mm-yyyy");
          somecourse[i].CreateDate = day;
        } // end for

          res.cookie('somecourses', somecourse);
          //console.log(req.body_data.somecourses);

        res.render('pages/Course', { data : req.header_data, somecourses : somecourse});

  });

});

router.post('/', function (req, res) {
  //console.log('Hello World Home');

  var Coname = req.body['Coname'];
  var teacherID = req.cookies.userID;

  request.post({
        url: api_path + '/course',
        form: {
            Cname: Coname,
            teacherid: teacherID
        }
  }, (err, response, body) => {
        if (err) {
              res.redirect('/course');
              return;
        }

        data = JSON.parse(body);
        //console.log(data.err);

        if (data.err) {
          res.redirect('/course');
          return;
        }
        res.redirect('/course');
  });

})


module.exports = router;
