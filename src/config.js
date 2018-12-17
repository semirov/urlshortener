let winston = require('./logger/winston');

const env = process.env.NODE_ENV || 'dev';
winston.info("Use NODE_ENV: " + env);
const dev = {
  app: {
    baseUrl: 'http://localhost:4200',
    port: process.env.PORT || 3000
  },
  db: {
    connectionString: 'mongodb://localhost:27017/urlshortener'
  },
  settings: {
    expiresDate: 15
  }
};

const test = {
  app: {
    baseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
    port: 3000
  },
  db: {
    connectionString: 'mongodb://localhost:27017/urlshortener_test'
  },
  settings: {
    expiresDate: 1
  }
};

const production = {
  app: {
    baseUrl: process.env.APP_BASE_URL || 'http://localhost',
    port: process.env.PORT || 80
  },
  db: {
    connectionString: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-ijg1l.mongodb.net/urlshortener?retryWrites=true`
  },
  settings: {
    expiresDate: 15
  }
};


const config = {
  dev,
  test,
  production
};

module.exports = config[env];