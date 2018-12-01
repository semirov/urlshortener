let shortid = require("shortid");
let fullUrlModel = require('../models/fullUrlModel');

function generateCutUrl(req, res, next) {
    if (req.query.url === undefined) {
        return next('NO_URL_IN_QUERY');
    }
     const fullUrlDocument = fullUrlModel.create({
        fullUrl: 'test'
    });
    console.log(req.query);
    fullUrlDocument.then(doc -> {
    res.send({test: shortid.generate(), test2: doc});
    });
    // next();
}





module.exports.generateCutUrl = generateCutUrl;