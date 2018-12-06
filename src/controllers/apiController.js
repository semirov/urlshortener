let shortid = require("shortid");
let requestPromise = require('request-promise');

let urlModel = require('../models/urlModel');
let config = require("../config.js");
/**
 * Сreates a short URL from a long URL and send response
 * @param {*} req req.body.url - full url, req.body.shortUrl - custom short url
 * @param {*} res 
 * @param {*} next 
 */
async function generateShortUrl(req, res, next) {
    try {
        let url = req.body.url;
        let customShortUrl = req.body.shortUrl;
        let isUrlValid = await urlIsValid(url);
        if (!isUrlValid) {
            return next('INVALID_URL');
        }
        let shortUrl;
        if (customShortUrl) {
            let isCustomUrlExist = await isShortUrlExist(customShortUrl);
            if (isCustomUrlExist) { return next('SHORT_URL_ALREDY_EXIST'); }
            shortUrl = customShortUrl;
        } else {
            shortUrl = await genereateShortUrl();
        }
        let fullUrl = fixHttpPrefix(url);
        let urlDocument = await new urlModel({ shortUrl, fullUrl }).save();
        let redirectUrl = generateFullRedirectUrl(urlDocument.shortUrl);
        res.send({
            fullUrl: urlDocument.fullUrl,
            shortUrl: redirectUrl,
        });
    } catch (e) {
        console.error(e);
        next('ERROR_IN_GENERATE_CUT_URL');
    }
}

/**
 * Check if short url exists and send response
 * @param {*} req req.query.shortUrl - checked short url
 * @param {*} res 
 * @param {*} next 
 * @returns {boolean}
 */
async function existShortUrl(req, res, next) {
    let shortUrl = req.query.shortUrl;
    if (shortUrl === undefined) {
        return next('SHORTURL_UNDEFINED');
    }
    const result = await isShortUrlExist(shortUrl);
    res.send(result);
}

/**
 * Get all urls and send response
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getAllUrls(req, res, next) {
    let allUrls = await urlModel.find().select({_id: false, expiresDate: false, __v: false}).exec();
    res.send(allUrls);
}

/**
 * Return true if url exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function testUrlStatus(req, res, next) {
    try {
        let url = req.body.url;
        let customShortUrl = req.body.shortUrl;
        let isUrlValid = await urlIsValid(url);
        res.send(isUrlValid);
    } catch (e) {
        next('ERROR_IN_VALIDATE_URL');
    }
}


/**
 * Check if short url exists
 * @param {string} url 
 * @returns {boolean}
 */
async function isShortUrlExist(url) {
    let count = await urlModel.countDocuments({ shortUrl: url }).exec();
    if (count === 0) { 
        return false; 
    }
    return true;
}

/**
 * Generate unique short string
 * @returns {string}
 */
async function genereateShortUrl() {
    let newSequenceElem = shortid.generate();
    let isUrlExist = await isShortUrlExist(newSequenceElem);
    if (!isUrlExist) { return newSequenceElem; }
    return await genereateShortUrl();
}

/**
 * Сhecks URL for reachability
 * @param {string} url 
 * @returns {boolean}
 */
async function urlIsValid(url) {
    if (url === undefined) { return false; }
    let options = { method: 'GET', uri: fixHttpPrefix(url), resolveWithFullResponse: true };
    try {
        let res = await requestPromise(options);
        let statusCode = res.statusCode;
        if (statusCode < 200 || statusCode > 299) { return false; }
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * checks for protocol inside the string 
 * @param {string} url 
 * @returns {string} checked url
 */
function fixHttpPrefix(url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    } else {
        return `http://${url}`;
    }
}

/**
 * Generate full url from short url
 * @param {string} shortUrl 
 * @returns {string} full url
 */
function generateFullRedirectUrl(shortUrl) {
    if (process.env.NODE_ENV == 'production') {
        return `${config.app.baseUrl}/${shortUrl}`
    } else {
        return `${config.app.baseUrl}:${config.app.port}/${shortUrl}`
    }
}


module.exports.generateShortUrl = generateShortUrl;
module.exports.existShortUrl = existShortUrl;
module.exports.getAllUrls = getAllUrls;
module.exports.testUrlStatus = testUrlStatus;