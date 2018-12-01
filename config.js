const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
 app: {
   port: 3000
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'urlshortener',
   path: fullPath,
 },
 settings: {
  expiresDate: 15
 }
};

// если понадобиться отдельный конфиг на тест
const test = dev;

const prod = {
 app: {
   port: 80
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'urlshortener',
   path: fullPath.call(this),
 },
 settings: {
  expiresDate: 15
 }
};

const config = {
 dev,
 test,
 prod,
};

function fullPath() {
   return `mongodb://${this.host}:${this.port}/${this.name}`;
}

module.exports = config[env];