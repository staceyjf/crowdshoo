var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // creates the cookie so needs a .env
var passport = require('passport'); // hands AOut
var methodOverride = require('method-override'); // mounting this to be able to delete
var MongoStore = require('connect-mongo');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database'); // config database connection 
require('./config/passport'); // connecting to passport

// require routers here
var indexRouter = require('./routes/index');
var venuesRouter = require('./routes/venues');
var ratingsRouter = require('./routes/ratings');
var bestTimeRouter = require('./routes/bestTimeAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mounting the middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  })
}));

// mounting passport
app.use(passport.initialize()); // init passport as middleware
app.use(passport.session()); // enables passports session support which means the user doesn't have to continually log over different requests

// instead of having to pass req.user every time we render a template by using res.locals object
app.use(function(req, res, next){
  res.locals.user = req.user; // this gives us a 'user 'variable we can use in our views (.ejs)
  next();
})

// add additional routers here as they need to be below the middleware
app.use('/', indexRouter);
app.use('/venues', venuesRouter);
// Mount these routers to root because not all 
// paths for a related/nested resource begin the same
app.use('/', ratingsRouter);
app.use('/', bestTimeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
