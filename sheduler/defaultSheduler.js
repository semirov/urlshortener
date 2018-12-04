var schedule = require('node-schedule');
let urlModel = require('../models/urlModel');

function defaultSheduler() {
    let jobs = [];
    jobs.push(removeOldUrls());

    console.log('sheduler started');
}

function removeOldUrls() {
    return schedule.scheduleJob('5 * * * * *', async function () {
        let removeResult = await urlModel.deleteMany({ expiresDate: { $lt: new Date() } }).exec();
        if (removeResult.n > 0) {
            console.log(`SHEDULER: removed ${removeResult.n} recordrs`);
        }
    });
}


module.exports = defaultSheduler;