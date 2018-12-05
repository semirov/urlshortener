let express = require('express');
let router = express.Router();

let apiController = require("../controllers/apiController");

// body.url body.shortUrl?
router.post('/generateShortUrl', apiController.generateShortUrl);
// query.shortUrl
router.get('/existShortUrl', apiController.existShortUrl);


router.get('/all', apiController.getAllUrls);


module.exports = router;