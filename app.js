let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let localStrategy = require('passport-local');
let passportLocalMongoose = require('passport-local-mongoose');
let campgroundModel = require('./models/campground');
let commmentModel = require('./models/comment');
let User = require('./models/user');
let methodOverride = require('method-override');


let app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yelpcamp' , {useNewUrlParser: true})

app.use(methodOverride('_method'))

let campgroundRoute = require('./routes/campground');
let commentRoute = require('./routes/comment');

app.use(require('express-session')({
  secret:'is it necessary',
  resave: false,
  saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next) => {
  res.locals.currentUser = req.user;
  // console.log('mw ran ....');
  next();
})

app.use(campgroundRoute);
app.use(commentRoute);



app.get('/', (req,res) => {
  res.render('landing');
})

app.get('/signup' , (req,res)=>{
  res.render('signup');
})

app.post('/register' , (req,res) => {
  User.register(new User({username : req.body.username}),req.body.password , (err , User) => {
    if(err){
      console.log('something went wrong');
      return res.redirect('/signup')
    }else{
      passport.authenticate('local')(req,res , () => {
        res.redirect('/campgrounds');
      })
    }
  })
})

app.get('/login' , (req,res) => {
  res.render('login');
})

app.post('/login' , passport.authenticate('local' , {
  successRedirect : '/campgrounds',
  failureRedirect : '/login'
}) ,(req,res) => {

})

//Logout Route

app.get('/logout' , (req , res) => {
  req.logout();
  res.redirect('/campgrounds');
})

// starting server
app.listen(3000, () => {
  console.log('server started. . . ');
});

