let mongoose = require('mongoose');
let user = require('./user');

let commentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
      ref:'user'
  }
});

let comment = mongoose.model('comment' , commentSchema);

// console.log(comment);

module.exports = comment;