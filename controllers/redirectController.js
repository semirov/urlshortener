let urlModel = require('../models/urlModel');

async function checkRedirectUrl(req, res, next) {
    let cutUrl = req.path.slice(1);
    let document = await urlModel.findOne({cutUrl: cutUrl});
    if(!document) {
        return next();
    }
    let fullUrl = document.get('fullUrl');
    let requestCount = document.get('requestCount');
    document.requestCount = requestCount + 1;
    await document.save();
    res.redirect(fullUrl);
}


module.exports.checkRedirectUrl = checkRedirectUrl;