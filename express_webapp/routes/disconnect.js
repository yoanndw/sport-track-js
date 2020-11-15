const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    req.session.Auth = undefined;
    res.render("disconnect");
});

module.exports = router;