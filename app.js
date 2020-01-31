var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

const url = config.mongoUrl;

const vehicleRouter = require('./routes/vehicleRouter');
const clientRouter = require('./routes/clientRouter');
const reserveRouter = require('./routes/reserveRouter');

//for connecting to the mongo db
mongoose.connect(url).then((db) => {
  console.log("Connected to the server successfully");
}, (err) => {
  console.log(err);
});

var app = express();

// app.all('*', (req, res, next) => {
//   if(req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://'+ req.hostname + ':' + app.get('secPort')+ req.url);
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/vehicles', vehicleRouter);
app.use('/clients', clientRouter);
app.use('/reservation', reserveRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
