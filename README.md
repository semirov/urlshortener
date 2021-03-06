

# urlshortener

1. The application checks the reachability of the entered URL by performing a direct request.

2. The application generates a short unique link for the entered URL

3. Short link can be set by user.

4. Application validate if requested short url is not in use yet.

5. Application store original and short url pair in DB. User than can share short url with other users and once they try to access short url they  redirected to original url

6. The default short link lifetime is 15 days

7. All events are written to the log


Have a look at the [DEMO SITE](https://sfv-urlshortener.herokuapp.com/)
> Sometimes you have to wait, Heroku often puts the application on standby.

### Getting Started

Before start you need:
* [Node.js and npm](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/download-center/community) database on local or somewhere

Clone this repo

```
git clone https://github.com/semirov/urlshortener.git
```
Navigate to app directory
```
cd %YOU_PATH%/urlshortener
```
Install depencies
```
npm install
```
Run app
```
npm start
```
Check http://localhost:3000

### Run dev

To start server in dev mode (run in app root) -- run on http://localhost:3000
```
npm run start:dev
```
To start client in dev mode (run in client directory) -- run on http://localhost:4200 

install depencies for client
```
npm install
```
```
ng serve
```

### Build app
build client (run in client directory)
```
ng build --prod
```
build server (run in app root)
```
npm run build
```

### App config
If you need, change config files 
* for server: URLShortener\src\config.js
* for client: URLShortener\client\src\environments

### Build docker container
* create env.list file in project root folder and set credentials
 ```
DB_PASSWORD=********
DB_USERNAME=********
APP_BASE_URL=%if not type, use dafault url%
```

### Build from docker-compose
#### Build for Dev
```
git clone https://github.com/semirov/urlshortener.git
```
```
docker-compose up
```
#### Build for Production
```
git clone https://github.com/semirov/urlshortener.git
```
Create env.list file in root folder and set credentials
 ```
DB_PASSWORD=********
DB_USERNAME=********
APP_BASE_URL=%if not specify, use default http:\\localhost%
```
Up docker-compose (use master branch from remote git repository)
```
docker-compose -f docker-compose.prod.yml up --build app
```

## Built With

* [Express](https://expressjs.com/ru/) - The web framework for node.js server
* [Mongoose](https://mongoosejs.com/) - ODM for Mongoose database
* [Angular 7](https://angular.io/) - The web framework for client
* [ng-bootstrap](https://ng-bootstrap.github.io/#/home) - Bootstap 4 for Angular

## Authors

* **Filipp Semirov** - *Initial work* - [semirov](https://github.com/semirov)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

