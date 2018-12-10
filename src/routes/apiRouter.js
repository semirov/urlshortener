let express = require('express');
let router = express.Router();

let apiController = require("../controllers/apiController");

// body.url body.shortUrl?
router.post('/generateShortUrl', apiController.generateShortUrl);
// query.shortUrl
router.get('/existShortUrl', apiController.existShortUrl);
// body.url
router.post('/validateUrl', apiController.testUrlStatus);

router.get('/redirectUrl/:redirectPath', apiController.getRedirectUrl);

router.get('/all', apiController.getAllUrls);

module.exports = router;