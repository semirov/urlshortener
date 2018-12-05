'use strict';

var express = require('express');
var router = express.Router();

var apiController = require("../controllers/apiController");

// body.url body.shortUrl?
router.post('/generateShortUrl', apiController.generateShortUrl);
// query.shortUrl
router.get('/existShortUrl', apiController.existShortUrl);

router.get('/all', apiController.getAllUrls);

module.exports = router;