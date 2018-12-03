let express = require('express');
let router = express.Router();

let apiCountroller = require("../controllers/apiController");


router.get('/generateCutUrl', apiCountroller.generateCutUrl);


module.exports = router;