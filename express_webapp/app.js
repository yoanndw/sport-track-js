var express = require('express');
var session = require("express-session");

var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addUserRouter = require('./routes/add_user');
var connectRouter = require("./routes/connect");
var disconnectRouter = require("./routes/disconnect");
var uploadRouter = require("./routes/upload");
var activitiesRouter = require("./routes/activities");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "cequetuveux",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    connectedUser: null
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/add_user', addUserRouter);
app.use('/connect', connectRouter);
app.use('/disconnect', disconnectRouter);
app.use('/upload', uploadRouter);
app.use('/activities', activitiesRouter);

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
