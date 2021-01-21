const path = require('path');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const User = require('./models/userModel');
const createError = require('http-errors');
const mySession = require('express-session');
const cookieParser = require('cookie-parser');
const localStrategy = require('passport-local');
const methodOverride = require('method-override');

const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');
const commentsRouter = require('./routes/comments');
const categoriesRouter = require('./routes/categories');
const credentialsRouter = require('./routes/credentials');
const dataFetcherRouter = require('./routes/dataFetcher');

const app = express();

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// database configuration
mongoose.connect('mongodb://localhost/my_blogs',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// passport configuration
app.use(mySession({
  secret: "this is the new blogs app",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass variable to all the routers
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', blogsRouter);
app.use('/', commentsRouter);
app.use('/', categoriesRouter);
app.use('/', credentialsRouter);
app.use('/', dataFetcherRouter);
app.use('/users', usersRouter);

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