let errorHelper = require("./errorHelper");

function defaultErrorHandler(err, req, res, next) {
    console.log(errorHelper(err));
    res.status(errorHelper(err).code).send(errorHelper(err));
}

module.exports = defaultErrorHandler;

