'use strict';

var express = require('express');
var router = express.Router();

var apiController = require("../controllers/apiController");

// body.url body.shortUrl?
router.post('/generateShortUrl', apiController.generateShortUrl);
// query.shortUrl
router.get('/existShortUrl', apiController.existShortUrl);
// body.url
router.post('/validateUrl', apiController.testUrlStatus);

router.get('/redirectUrl/:redirectPath', apiController.getRedirectUrl);

router.get('/all', apiController.getAllUrls);

module.exports = router;