"use strict";

var winston = require('./logger/winston');

var env = process.env.NODE_ENV; // 'dev' or 'prod'
winston.info("Use NODE_ENV: " + env);
winston.info("Use DB_USERNAME: " + process.env.DB_USERNAME);
var dev = {
  app: {
    baseUrl: 'http://localhost',
    port: process.env.PORT || 3000
  },
  db: {
    connectionString: 'mongodb://localhost:27017/urlshortener'
  },
  settings: {
    expiresDate: 15
  }
};

var production = {
  app: {
    baseUrl: process.env.APP_BASE_URL || 'http://localhost',
    port: process.env.PORT || 80
  },
  db: {
    connectionString: "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0-ijg1l.mongodb.net/urlshortener?retryWrites=true"
  },
  settings: {
    expiresDate: 15
  }
};

var config = {
  dev: dev,
  production: production
};

function fullPath() {
  return "mongodb://" + this.host + ":" + this.port + "/" + this.name;
}

module.exports = config[env];