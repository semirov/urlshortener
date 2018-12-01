


function checkRedirectUrl(req, res, next) {
    console.log(req.path);
    next();
}


module.exports.checkRedirectUrl = checkRedirectUrl;