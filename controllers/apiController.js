let shortid = require("shortid");
let fullUrlModel = require('../models/fullUrlModel');

async function generateCutUrl(req, res, next) {
    if (req.query.url === undefined) {
        return next('NO_URL_IN_QUERY');
    }
    try {
        const fullUrlDocument = await new fullUrlModel({ fullUrl: 'test2'}).save();
        res.send({test: shortid.generate(), test2: fullUrlDocument});
    } catch (e) {
        console.log(e);
        next({code: 'CATH', trace: e})
    }
}





module.exports.generateCutUrl = generateCutUrl;