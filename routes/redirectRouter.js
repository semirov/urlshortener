let express = require('express');
let router = express.Router();

let redirectController = require('../controllers/redirectController');

router.get('*', function(req, res, next) {
    redirectController.checkRedirectUrl(req, res, next);
});

module.exports = router;