let mongoose = require('mongoose');
let comment = require('./comment');
let user = require('./user');

let campgroundSchema = new mongoose.Schema({
  title : String,
  image : String,
  price : String,
  description : String,
  comment : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'comment'
    }
  ],
  owner : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
})

let campground = mongoose.model('campground' , campgroundSchema);

 module.exports = campground;