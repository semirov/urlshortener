let express = require('express');
let router = express.Router();

let apiController = require("../controllers/apiController");

// query.url
router.post('/generateShortUrl', apiController.generateShortUrl);
// query.shortUrl
router.get('/existShortUrl', apiController.existShortUrl);

router.get('/all', apiController.getAllUrls);


module.exports = router;