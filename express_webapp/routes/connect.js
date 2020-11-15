const express = require("express");
const router = express.Router();

const userDao = require("sport-track-db").user_dao;

router.get("/", (req, res, next) => {
    res.render("connect_form");
});

router.post("/", (req, res, next) => {
    let email = req.body.email;
    let password = req.body.pswd;

    userDao.identifyUser(email, password, (err, rows) => {
        // User found
        if (rows.length != 0) {
            let user = rows[0];

            console.log(`User connected: ${JSON.stringify(user)}`);
            req.session.Auth = user;
            console.log(`Session user: ${JSON.stringify(req.session.Auth)}`);

            res.render("connect_validation");
        } else {
            res.render("connect_err");
        }
    });
});

module.exports = router;