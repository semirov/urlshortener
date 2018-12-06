'use strict';

require("babel-core/register");
if (!global._babelPolyfill) {
  require('babel-polyfill');
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var appRoot = require('app-root-path');
var cors = require('cors');

var apiRouter = require('./routes/apiRouter');
var redirectRouter = require('./routes/redirectRouter');
var defaultSheduler = require('./sheduler/defaultSheduler');
var defaultErrorHandler = require('./handlers/defaultErrorHandler');
var winston = require('./logger/winston');
var config = require("./config");

var app = express();

app.use(cors());
app.use(logger('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
// app.use(redirectRouter);
app.use(express.static(path.join(appRoot.toString(), 'client/dist/client')));
app.all('/*', function (req, res) {
  return res.status(200).sendFile(path.join(appRoot.toString(), './client/dist/client/index.html'));
});
app.use(defaultErrorHandler);

mongoose.connect(config.db.connectionString, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', winston.error.bind(winston, 'database connection error!'));
db.on('connected', winston.info.bind(winston, 'app connected to database'));

app.listen(config.app.port, function () {
  winston.info('app listening on port: ' + config.app.port);
});

defaultSheduler();

module.exports = app;