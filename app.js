let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require("mongoose");

let apiRouter = require('./routes/apiRouter');
let redirectRouter = require('./routes/redirectRouter');
let defaultErrorHandler = require('./handlers/defaultErrorHandler')

let config = require("./config");

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use(redirectRouter);
app.use(express.static(path.join(__dirname, 'client/dist/client')));
app.all('/*', (req, res) => res.status(200).sendFile(path.join(__dirname, 'client/dist/client/index.html')));
app.use(defaultErrorHandler);


mongoose.connect(config.db.connectionString, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error!'));
db.on('connected', console.log.bind(console, 'app connected to database!'));


app.listen(config.app.port, function () {
    console.log(`Urlshortener listening on port: ${config.app.port}`);
  });

module.exports = app;

