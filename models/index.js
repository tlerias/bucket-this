var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bucketthis');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Card, User;
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  title: String,
  url_name: String,
  owner_id: String,
  content: String,
  create_date: {type: Date, default: Date.now}
});

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String
});

Card = mongoose.model('Card', cardSchema);
User = mongoose.model('User', userSchema);

module.exports = {"Card": Card, "User": User};
