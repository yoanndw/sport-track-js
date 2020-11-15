const express = require('express');
const router = express.Router();

const activityDao = require("sport-track-db").activity_dao;
const distM = require("sport-track-db").dist_json;

router.get('/', function (req, res, next) {
    let user = req.session.Auth;

    activityDao.findByUser(user.email, function (rows) {
        console.log("calling users render");

        // Convert db's time (in seconds) to string
        let activities = [];
        for (let act of rows) {
            act.dureeTot = distM.hoursSecToString(act.dureeTot);

            activities.push(act);
        }

        res.render('activities', { activities: activities });
    });
});

module.exports = router;