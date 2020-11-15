const fs = require("fs");
const express = require("express");
const formidable = require("formidable");

const router = express.Router();

const activityDao = require("sport-track-db").activity_dao;
const activityEntryDao = require("sport-track-db").activity_entry_dao;
//const upload = multer(/* { dest: "/uploads" } */);

const distanceModule = require("sport-track-db").dist_json;

router.get('/', (req, res, next) => {
    res.render("upload");
});

router.post('/', (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        } else {
            let file = files["activity_file"];
            let path = file.path;

            let content = fs.readFileSync(path);
            let json = JSON.parse(content);

            // Insert
            /*let fkActivity = Date.now();

            for (let i = 0; i < json.data.length; i++) {
                let id = Date.now();
                let time = distanceModule.stringToHoursSec(json.data[i].time);
                let cardioFreq = json.data[i].cardio_frequency;
                let latitude = json.data[i].latitude;
                let longitude = json.data[i].longitude;
                let altitude = json.data[i].altitude;
                let values = [id, time, cardioFreq, latitude, longitude, altitude, fkActivity];
                activityEntryDao.insert(values, console.log)
            }

            // Global activity data
            let distance = distanceModule.calculDistanceTrajet(json);
            let duree = distanceModule.calculDureeActivite(json);

            let values = [fkActivity, json.activity.date, json.activity.description, req.session.Auth.email, distance, duree];
            activityDao.insert(values, console.log);*/

            // Activity
            let idAct = Date.now();
            let actValues = [
                idAct,
                json.activity.date,
                json.activity.description,
                req.session.Auth.email,
                distanceModule.calculDistanceTrajet(json),
                distanceModule.calculDureeActivite(json)
            ];

            activityDao.insert(actValues, () => {
                // Entries
                for (const i in json.data) {
                    let currentData = json.data[i];

                    let idEntry = Date.now() + i;
                    let time = distanceModule.stringToHoursSec(currentData.time);
                    let freq = currentData.cardio_frequency;
                    let latitude = currentData.latitude;
                    let longitude = currentData.longitude;
                    let altitude = currentData.altitude;

                    let entryValues = [
                        idEntry,
                        time,
                        freq,
                        latitude,
                        longitude,
                        altitude,
                        idAct
                    ];

                    activityEntryDao.insert(entryValues, console.log);
                }
            });

            res.render("upload_validation");
        }
    })
});

module.exports = router;