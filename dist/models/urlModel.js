"use strict";

var mongoose = require("mongoose");
var config = require("../config");
var shortid = require("shortid");

var urlSchema = new mongoose.Schema({
    fullUrl: {
        type: String
    },
    shortUrl: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    expiresDate: {
        type: Date,
        default: new Date(+new Date() + config.settings.expiresDate * 24 * 60 * 60 * 1000)
    },
    requestCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('url', urlSchema);