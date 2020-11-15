var express = require("express");
var router = express.Router();

var userDao = require("sport-track-db").user_dao;

router.get('/', (req, res, next) => {
    res.render("add_user_form");
});

router.post('/', (req, res, next) => {
    //console.log(`POST on add_user`);
    let user = [
        req.body.email,

        req.body.lname,
        req.body.fname,

        req.body.birth_date,
        req.body.gender,

        req.body.size,
        req.body.weight,

        req.body.pswd
    ];

    userDao.findByKey(req.body.email, (err, rows) => {
        if (rows.length == 0) {
            userDao.insert(user, () => {
                console.log(`Inserted user in database: ${JSON.stringify(user)}`);
                res.render("add_user_validation");
            });
        } else {
            res.render("add_user_err", { email: req.body.email });
        }
    });

});

module.exports = router;