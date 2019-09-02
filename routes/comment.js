let express = require('express');
let router = express.Router();

let campground = require('../models/campground');
let comment = require('../models/comment');

router.get('/campgrounds/:id/comments/new' , (req , res) => {
  res.render('comment/newComment' , {campground_id:req.params.id});
})

router.post('/campgrounds/:campground_id/createComment' , (req , res) => {
  campground.findById(req.params.campground_id , (err , foundCampground) => {


    
    comment.create({
      text : req.body.text,
      author : req.user
    } , (err , createdComment) => {
      foundCampground.comment.push(createdComment);
      foundCampground.save();
      res.redirect(`/campgrounds/${req.params.campground_id}`);
    })


    // newComment.save();
    // foundCampground.comment.push(newComment);
    // foundCampground.save();
    // console.log('worked . ..')
    // res.send('comment created');

  })
})

router.get('/campgrounds/:campground_id/comments/:comment_id/edit' , (req,res) => {
  comment.findById(req.params.comment_id , (err , comment) => {
    if(err){
      console.log('Something went wrong');
    }else{
      // console.log(req.body.comment_ids);
      res.render('comment/editComment' , {campground_id : req.params.campground_id , comment : comment})
    }
  })
})

router.put('/campgrounds/:campground_id/comments/:comment_id' , (req,res) => {
  comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , (err , comment) => {
    console.log('It ran . . . ');
    if(err){
      console.log('Something went wrong');
    }else{
      res.redirect(`/campgrounds/${req.params.campground_id}`);
    }
  })
})


router.delete('/campgrounds/:campground_id/comments/:comment_id' , (req , res) => {
  comment.findByIdAndRemove(req.params.comment_id , (err , comment) => {
    res.redirect(`/campgrounds/${req.params.campground_id}`)
  })
})



module.exports = router;