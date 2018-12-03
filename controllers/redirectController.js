
function checkRedirectUrl(req, res, next) {
    console.log(req.path);
    // res.redirect('http://www.google.ru');
    next();
}


module.exports.checkRedirectUrl = checkRedirectUrl;