'use strict';

var checkRedirectUrl = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var shortUrl, document, fullUrl, requestCount;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        shortUrl = req.path.slice(1);
                        _context.next = 3;
                        return urlModel.findOne({ shortUrl: shortUrl });

                    case 3:
                        document = _context.sent;

                        if (document) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 6:
                        fullUrl = document.get('fullUrl');
                        requestCount = document.get('requestCount');

                        document.requestCount = requestCount + 1;
                        _context.next = 11;
                        return document.save();

                    case 11:
                        res.redirect(fullUrl);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkRedirectUrl(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var urlModel = require('../models/urlModel');

module.exports.checkRedirectUrl = checkRedirectUrl;