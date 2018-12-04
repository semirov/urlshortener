let errorHelper = require("./errorHelper");

function defaultErrorHandler(err, req, res, next) {
    console.error(`DEFAULT ERROR HANDLER: ${err}`);
    res.status(errorHelper(err).code).send(errorHelper(err));
}

module.exports = defaultErrorHandler;

