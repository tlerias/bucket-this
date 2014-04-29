var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var models = require('../models/');
  models.Card.find({}, null, { sort : { 'create_date' : -1 }}, function(err, cards) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Bucket This!', cards : cards});
    }
  });
});

router.get('/add', function(req, res) {
  var models = require('../models/');
  models.Card.find({}, null, { sort : { 'create_date' : -1 }}, function(err, cards) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Bucket This!', cards : cards, show_form: true});
    }
  })
});

router.post('/submit', function(req, res) {
  var models = require('../models/');
  var title = req.body.cardTitle;
  var content = req.body.cardContent;
  var generateUrlName = function(title){
    if(typeof title !== 'undefined' && title !== ""){
      return title.replace(/[\s]/g, "-");
    } else {
      return Math.random().toString(36).substring(2,7);
    }
  }
  var url_name = generateUrlName(title);

  var p = new models.Card({ "title": title, "content":content, "url_name": url_name});
  p.save();
  res.redirect('/');
});

module.exports = router;
