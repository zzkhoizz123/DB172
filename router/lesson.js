const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const dateFormat = require('dateformat');
const querystring = require('querystring');
const url = require('url');
const queryString = require('query-string');

let router = express.Router();


router.use('/', function (req, res, next) {
  courseid = req.query.courseid;
  request.get({
        url: api_path + '/course/' + courseid,

  }, (err, response, body) => {
        if (err) {
          res.render('pages/Course', { data: req.header_data, somecourses: req.body_data.somecourses});
              return;
        }

        yourcourse = JSON.parse(body);
        console.log(yourcourse);
      //  req.cookie('EmptyCourse', 1);

        if (yourcourse.err) {
          res.render('pages/Lesson', { data: req.header_data, emptycourse : req.cookies.emptycourse });
              return;
        }

        res.cookie('yourcourse', yourcourse);
  });
  next();
})


router.get('/', function (req, res) {
  //console.log('Hello World Home');

  classid = req.query.classid;

  queryStr = queryString.stringify(req.query);

//  console.log(queryStr);

  request.get({
        url: api_path + '/lesson?' + queryStr,

  }, (err, response, body) => {
        if (err) {
          res.render('pages/Lesson', { data: req.header_data, somecourses : req.body_data.somecourses});
              return;
        }

        lesson = JSON.parse(body);
        //console.log(lesson);


        if (lesson.err) {

          res.render('pages/Lesson', {
            data: req.header_data,
            lesson : lesson,
            yourcourse : yourcourse
           });
              return;
        }

      //  res.cookie('courseid', courseID);
      //  res.cookie('classid', classID);

        res.render('pages/Lesson', { data : req.header_data, lesson : lesson});
  });
});




module.exports = router;
