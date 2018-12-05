'use strict';

var express = require('express');
var router = express.Router();

var redirectController = require('../controllers/redirectController');

router.get('*', redirectController.checkRedirectUrl);

module.exports = router;