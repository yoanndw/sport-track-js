var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(`Index: user=${JSON.stringify(req.session.Auth)}`);
    res.render('index', { user: req.session.Auth });
});

module.exports = router;
