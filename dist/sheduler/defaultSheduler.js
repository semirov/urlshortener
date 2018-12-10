'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var schedule = require('node-schedule');
var urlModel = require('../models/urlModel');
var winston = require('../logger/winston');

function defaultSheduler() {
    var jobs = [];
    jobs.push(removeOldUrls());

    winston.info('sheduler started');
}

function removeOldUrls() {
    return schedule.scheduleJob('0 * * * *', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var removeResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return urlModel.deleteMany({ expiresDate: { $lt: new Date() } }).exec();

                    case 2:
                        removeResult = _context.sent;

                        if (removeResult.n > 0) {
                            winston.info('SHEDULER: removed ' + removeResult.n + ' recordrs');
                        }

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));
}

module.exports = defaultSheduler;