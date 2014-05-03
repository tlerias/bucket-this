var express = require('express');
var router = express.Router();
var models = require('../models/');


/* GET home page. */
router.get('/', function(req, res) {
  var is_deleted = req.query.deleted, is_updated = req.query.updated, deleted, updated, urlName = req.query.url_name;

  is_deleted==="true" ? deleted = true : deleted = false;
  is_updated==="true" ? updated = true : updated = false;
  models.Card.find({}, null, { sort : { 'create_date' : -1 }}, function(err, cards) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Bucket This!', cards : cards, deleted: deleted, url_name: urlName, updated: updated});
    }
  });
});

router.get('/add', function(req, res) {
  models.Card.find({}, null, { sort : { 'create_date' : -1 }}, function(err, cards) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Bucket This!', cards : cards, show_form: true});
    }
  })
});

router.post('/add/submit', function(req, res) {
  var title = req.body.cardTitle, content = req.body.cardContent;
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
  io.sockets.emit("new_card", {
    title: title,
    content: content
  });
  res.redirect('/');
});

router.post('/delete/:id', function(req, res) {
    id = req.params.id;
    models.Card.findByIdAndRemove(id, function(err){
      if(err){
        console.log(err.message);
      } else{
        res.redirect('/?deleted=true');
      }
    });
});

router.post('/edit/:id', function(req, res) {
    var id = req.params.id;
    models.Card.findById(id, function(err, card){
      if(err){
        console.log(err.message);
      } else{
        res.render('edit', { title: 'Edit Card', card : card, show_form: true});
      }
    });
});

router.post('/edit_submit/:id', function(req, res) {
    var new_title = req.body.cardTitle, new_body = req.body.cardContent, id = req.params.id;
    models.Card.findByIdAndUpdate(id, {title: new_title, content: new_body}, function(err, card) {
    res.redirect('/?updated=true');
    });
});
module.exports = router;
