var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// instance of mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connect to mongodb 
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

// import all routes 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lmsCoursesRouter = require('./routes/lmsCourses');
var moduleCoursesRouter = require('./routes/moduleCourses');
var crashCoursesRouter = require('./routes/crashCourses'); 
var schoolRouter = require('./routes/school');
  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", express.static(path.join(__dirname, 'angular')));
app.use("/document", express.static(path.join(__dirname, './document')));
app.use("/module-note", express.static(path.join(__dirname, './module-note')));

app.use(cors());
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/lmsCourses', lmsCoursesRouter);
app.use('/moduleCourses', moduleCoursesRouter);
app.use('/crashCourses', crashCoursesRouter);
app.use('/schools', schoolRouter);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

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
