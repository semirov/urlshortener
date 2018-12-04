let errorHelper = require("./errorHelper");
let winston = require('../logger/winston');

function defaultErrorHandler(err, req, res, next) {
    winston.error(err);
    res.status(errorHelper(err).code).send(errorHelper(err));
    
}

module.exports = defaultErrorHandler;

