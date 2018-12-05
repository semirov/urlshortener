'use strict';

var appRoot = require('app-root-path');
var winston = require('winston');

var customLogFormat = winston.format.printf(function (info) {
  return info.timestamp + ' ' + info.level + ': ' + info.message;
});

var options = {
  file: {
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), customLogFormat),
    filename: appRoot + '/logs/app.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.simple()
  }
};

var logger = winston.createLogger({
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
  exitOnError: false
});

logger.stream = {
  write: function write(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;