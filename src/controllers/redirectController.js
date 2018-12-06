let urlModel = require('../models/urlModel');

async function checkRedirectUrl(req, res, next) {
    let shortUrl = req.path.slice(1);
    console.log(shortUrl);
    let document = await urlModel.findOne({shortUrl: shortUrl});
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