var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var config = require("./config");



var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist/client')));

app.use('/', indexRouter);

mongoose.connect(config.db.path(), { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error!'));
db.on('connected', console.log.bind(console, 'app connected to database!'));

app.listen(config.app.port, function () {
    console.log(`Urlshortener listening on port: ${config.app.port}`);
  });

module.exports = app;

// test
