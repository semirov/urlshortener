const env = process.env.NODE_ENV; // 'dev' or 'prod'
console.log("Use NODE_ENV: " + env);
const dev = {
  app: {
    baseUrl: 'localhost',
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
    baseUrl: process.env.APP_BASE_URL || 'localhost',
    port: process.env.PORT || 80
  },
  db: {
    connectionString: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
    @cluster0-shard-00-00-ijg1l.mongodb.net:27017,
    cluster0-shard-00-01-ijg1l.mongodb.net:27017,
    cluster0-shard-00-02-ijg1l.mongodb.net:27017/urlshortener
    ?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
  },
  settings: {
    expiresDate: 15
  }
};

const config = {
  dev,
  production,
};

function fullPath() {
  return `mongodb://${this.host}:${this.port}/${this.name}`;
}

module.exports = config[env];