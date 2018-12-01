var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({test: 'test'});
});

module.exports = router;


// redirect to url

router.get('/redirect', function(req, res, next) {
    res.redirect('http://google.ru');
});

