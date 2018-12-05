require("babel-core/register");
if (!global._babelPolyfill) {
	require('babel-polyfill');
}

let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require("mongoose");
let appRoot = require('app-root-path');
var cors = require('cors');

let apiRouter = require('./routes/apiRouter');
let redirectRouter = require('./routes/redirectRouter');
let defaultSheduler = require('./sheduler/defaultSheduler');
let defaultErrorHandler = require('./handlers/defaultErrorHandler');
let winston = require('./logger/winston');
let config = require("./config");

let app = express();



app.use(cors());
app.use(logger('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use(redirectRouter);
app.use(express.static(path.join(appRoot.toString(), 'client/dist/client')));
app.all('/*', (req, res) => res.status(200).sendFile(path.join(appRoot.toString(), './client/dist/client/index.html')));
app.use(defaultErrorHandler);


mongoose.connect(config.db.connectionString, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', winston.error.bind(winston, 'database connection error!'));
db.on('connected', winston.info.bind(winston, 'app connected to database'));


app.listen(config.app.port, function () {
  winston.info(`app listening on port: ${config.app.port}`);
  });

defaultSheduler();

module.exports = app;

