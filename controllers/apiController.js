let shortid = require("shortid");

let urlModel = require('../models/urlModel');
let config = require("../config.js");
let rp = require('request-promise');

async function generateShortUrl(req, res, next) {
    let url = req.body.url;
    let shortUrl = req.body.shortUrl;
    try {
        let isUrlValid = await urlIsValid(url);
        if (!isUrlValid) {
            return next('INVALID_URL');
        } 
        let shortUrl = await genereateShortUrl();
        let urlDocument = await new urlModel({ shortUrl, fullUrl: testHttpPrefix(url) }).save();
        res.send({
            fullUrl: urlDocument.fullUrl,
            shortUrl: `http://${config.app.baseUrl}:${config.app.port}/${urlDocument.shortUrl}`
        });

    } catch (e) {
        console.error(e);
        next('ERROR_IN_GENERATE_CUT_URL');
    }
}

async function existShortUrl(req, res, next) {
    let shortUrl = req.query.shortUrl;
    if (shortUrl === undefined) {
        return next('CUTURL_UNDEFINED');
    }
    return await isShortUrlExist(shortUrl);
}


async function isShortUrlExist(url) {
    let count = await urlModel.countDocuments({ shortUrl: url });
    if (count === 0) {
        return false;
    }
    return true;
}


async function genereateShortUrl() {
    let newSequenceElem = shortid.generate();
    let count = await urlModel.countDocuments({ shortUrl: newSequenceElem });
    if (count === 0) {
        return newSequenceElem;
    } else {
        return await genereateShortUrl();
    }
}


async function urlIsValid(url) {
    if (url === undefined) { return false; }
    let options = { method: 'GET', uri: testHttpPrefix(url), resolveWithFullResponse: true };
    try {
        let res = await rp(options);
        let statusCode = res.statusCode;
        if (statusCode < 200 || statusCode > 299) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }

}

function testHttpPrefix(url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    } else {
        return `http://${url}`;
    }
}


module.exports.generateShortUrl = generateShortUrl;
module.exports.existShortUrl = existShortUrl;