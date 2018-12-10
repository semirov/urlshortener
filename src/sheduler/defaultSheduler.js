var schedule = require('node-schedule');
let urlModel = require('../models/urlModel');
let winston = require('../logger/winston');

function defaultSheduler() {
    let jobs = [];
    jobs.push(removeOldUrls());

    winston.info('sheduler started');
}

function removeOldUrls() {
    return schedule.scheduleJob('0 * * * *', async function () {
        let removeResult = await urlModel.deleteMany({ expiresDate: { $lt: new Date() } }).exec();
        if (removeResult.n > 0) {
            winston.info(`SHEDULER: removed ${removeResult.n} recordrs`);
        }
    });
}


module.exports = defaultSheduler;