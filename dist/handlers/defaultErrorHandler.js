"use strict";

var errorHelper = require("./errorHelper");
var winston = require('../logger/winston');

function defaultErrorHandler(err, req, res, next) {
    winston.warn(err);
    res.status(errorHelper(err).code).send(errorHelper(err));
}

module.exports = defaultErrorHandler;