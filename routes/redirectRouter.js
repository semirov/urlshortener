let express = require('express');
let router = express.Router();

let redirectController = require('../controllers/redirectController');

router.get('*', redirectController.checkRedirectUrl);

module.exports = router;