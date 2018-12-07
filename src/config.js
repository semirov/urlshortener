let winston = require('./logger/winston');

const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'prod'
winston.info("Use NODE_ENV: " + env);
winston.info("Use DB_USERNAME: " + process.env.DB_USERNAME);
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
  production,
};

module.exports = config[env];