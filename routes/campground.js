let express = require('express');
let router = express.Router();

let campground = require('../models/campground');
let comment = require('../models/comment');
let user = require('../models/user');

const isloggedin = (req,res,next) => {
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login');
  }
}


router.get('/campgrounds' , (req , res) => {
  campground.find({} , (err,foundCampground) => {
    if(err){
      console.log('Something went wrong');
    }else{
      res.render('campground/campgrounds' , {campground : foundCampground});
    }
  })
})

router.get('/campgrounds/new' , isloggedin , (req , res) => {
  res.render('campground/newCampground');
})

router.get('/campgrounds/:id' , (req , res) => {
  campground.findById(req.params.id).populate('comment').exec((err , foundCampground) => {
    if(err){
      console.log('running');
    }else{
      console.log('campground found');
      res.render('campground/show' , {campground : foundCampground});
    }
  });
});

//Edit route

router.get('/campgrounds/:id/edit' , (req,res) => {
  campground.findById(req.params.id , (err , foundCampground) => {
    if(err){
      console.log('Something went wrong');
    }else{
      res.render('campground/edit' , {campground : foundCampground});
    }
  })
})

router.put('/campgrounds/:id/edit' , (req,res) => {
  campground.findByIdAndUpdate(req.params.id , req.body.campground , (err , updatedCampground) => {
    if(err){
      console.log('campground not updated');
    }else{
      res.redirect(`/campgrounds/${updatedCampground._id}`);
    }
  })
});



router.post('/createCampground' , (req , res) => {
  campground.create(req.body.campground , (err,campground) => {
    if(err){
      console.log('Campground not created');
    }else{
      campground.owner.push(req.user);
      campground.save();
      res.redirect('/campgrounds');
    }
  })
})

router.delete('/campgrounds/:id/delete' , (req , res) => {
  campground.findByIdAndRemove(req.params.id , (err , deletedCampground) => {
    console.log(deletedCampground);
    res.redirect('/campgrounds')
  })
})

module.exports = router;