'use strict';

/**
 * Сreates a short URL from a long URL and send response
 * @param {*} req req.body.url - full url, req.body.shortUrl - custom short url
 * @param {*} res 
 * @param {*} next 
 */
var generateShortUrl = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var url, customShortUrl, isUrlValid, shortUrl, isCustomUrlExist, fullUrl, urlDocument, redirectUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        url = req.body.url;
                        customShortUrl = req.body.shortUrl;
                        _context.next = 5;
                        return urlIsValid(url);

                    case 5:
                        isUrlValid = _context.sent;

                        if (isUrlValid) {
                            _context.next = 8;
                            break;
                        }

                        return _context.abrupt('return', next('INVALID_URL'));

                    case 8:
                        shortUrl = void 0;

                        if (!customShortUrl) {
                            _context.next = 18;
                            break;
                        }

                        _context.next = 12;
                        return isShortUrlExist(customShortUrl);

                    case 12:
                        isCustomUrlExist = _context.sent;

                        if (!isCustomUrlExist) {
                            _context.next = 15;
                            break;
                        }

                        return _context.abrupt('return', next('SHORT_URL_ALREDY_EXIST'));

                    case 15:
                        shortUrl = customShortUrl;
                        _context.next = 21;
                        break;

                    case 18:
                        _context.next = 20;
                        return genereateShortUrl();

                    case 20:
                        shortUrl = _context.sent;

                    case 21:
                        fullUrl = fixHttpPrefix(url);
                        _context.next = 24;
                        return new urlModel({ shortUrl: shortUrl, fullUrl: fullUrl }).save();

                    case 24:
                        urlDocument = _context.sent;
                        redirectUrl = generateFullRedirectUrl(urlDocument.shortUrl);

                        res.send({
                            fullUrl: urlDocument.fullUrl,
                            shortUrl: redirectUrl
                        });
                        _context.next = 33;
                        break;

                    case 29:
                        _context.prev = 29;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);
                        next('ERROR_IN_GENERATE_CUT_URL');

                    case 33:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 29]]);
    }));

    return function generateShortUrl(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Check if short url exists and send response
 * @param {*} req req.query.shortUrl - checked short url
 * @param {*} res 
 * @param {*} next 
 * @returns {boolean}
 */


var existShortUrl = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var shortUrl, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        shortUrl = req.query.shortUrl;

                        if (!(shortUrl === undefined)) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return', next('SHORTURL_UNDEFINED'));

                    case 3:
                        _context2.next = 5;
                        return isShortUrlExist(shortUrl);

                    case 5:
                        result = _context2.sent;

                        res.send(result);

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function existShortUrl(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Get all urls and send response
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */


var getAllUrls = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var allUrls;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return urlModel.find().select({ _id: false, expiresDate: false, __v: false }).exec();

                    case 2:
                        allUrls = _context3.sent;

                        res.send(allUrls);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getAllUrls(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * Return true if url exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */


var testUrlStatus = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var url, customShortUrl, isUrlValid;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        url = req.body.url;
                        customShortUrl = req.body.shortUrl;
                        _context4.next = 5;
                        return urlIsValid(url);

                    case 5:
                        isUrlValid = _context4.sent;

                        res.send(isUrlValid);
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](0);

                        next('ERROR_IN_VALIDATE_URL');

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[0, 9]]);
    }));

    return function testUrlStatus(_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * Check if short url exists
 * @param {string} url 
 * @returns {boolean}
 */


var isShortUrlExist = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url) {
        var count;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return urlModel.countDocuments({ shortUrl: url }).exec();

                    case 2:
                        count = _context5.sent;

                        if (!(count === 0)) {
                            _context5.next = 5;
                            break;
                        }

                        return _context5.abrupt('return', false);

                    case 5:
                        return _context5.abrupt('return', true);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function isShortUrlExist(_x13) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * Generate unique short string
 * @returns {string}
 */


var genereateShortUrl = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var newSequenceElem, isUrlExist;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        newSequenceElem = shortid.generate();
                        _context6.next = 3;
                        return isShortUrlExist(newSequenceElem);

                    case 3:
                        isUrlExist = _context6.sent;

                        if (isUrlExist) {
                            _context6.next = 6;
                            break;
                        }

                        return _context6.abrupt('return', newSequenceElem);

                    case 6:
                        _context6.next = 8;
                        return genereateShortUrl();

                    case 8:
                        return _context6.abrupt('return', _context6.sent);

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function genereateShortUrl() {
        return _ref6.apply(this, arguments);
    };
}();

/**
 * Сhecks URL for reachability
 * @param {string} url 
 * @returns {boolean}
 */


var urlIsValid = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(url) {
        var options, res, statusCode;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        if (!(url === undefined)) {
                            _context7.next = 2;
                            break;
                        }

                        return _context7.abrupt('return', false);

                    case 2:
                        options = { method: 'GET', uri: fixHttpPrefix(url), resolveWithFullResponse: true };
                        _context7.prev = 3;
                        _context7.next = 6;
                        return requestPromise(options);

                    case 6:
                        res = _context7.sent;
                        statusCode = res.statusCode;

                        if (!(statusCode < 200 || statusCode > 299)) {
                            _context7.next = 10;
                            break;
                        }

                        return _context7.abrupt('return', false);

                    case 10:
                        return _context7.abrupt('return', true);

                    case 13:
                        _context7.prev = 13;
                        _context7.t0 = _context7['catch'](3);
                        return _context7.abrupt('return', false);

                    case 16:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[3, 13]]);
    }));

    return function urlIsValid(_x14) {
        return _ref7.apply(this, arguments);
    };
}();

/**
 * checks for protocol inside the string 
 * @param {string} url 
 * @returns {string} checked url
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var shortid = require("shortid");
var requestPromise = require('request-promise');

var urlModel = require('../models/urlModel');
var config = require("../config.js");function fixHttpPrefix(url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    } else {
        return 'http://' + url;
    }
}

/**
 * Generate full url from short url
 * @param {string} shortUrl 
 * @returns {string} full url
 */
function generateFullRedirectUrl(shortUrl) {
    if (process.env.NODE_ENV == 'production') {
        return config.app.baseUrl + '/' + shortUrl;
    } else {
        return config.app.baseUrl + ':' + config.app.port + '/' + shortUrl;
    }
}

module.exports.generateShortUrl = generateShortUrl;
module.exports.existShortUrl = existShortUrl;
module.exports.getAllUrls = getAllUrls;
module.exports.testUrlStatus = testUrlStatus;