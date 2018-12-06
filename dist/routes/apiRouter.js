'use strict';

var express = require('express');
var router = express.Router();

var redirectController = require('../controllers/redirectController');
var apiController = require("../controllers/apiController");

// body.url body.shortUrl?
router.post('/generateShortUrl', apiController.generateShortUrl);
// query.shortUrl
router.get('/existShortUrl', apiController.existShortUrl);

router.get('/all', apiController.getAllUrls);

// body.url
router.post('/validateUrl', apiController.testUrlStatus);

router.get('/redirectUrl/:redirectPath', apiController.getRedirectUrl);

module.exports = router;