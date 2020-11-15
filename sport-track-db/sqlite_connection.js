const express = require("express");
let path = require("path");
let sqlite3 = require("sqlite3").verbose();
express.Router();

//Database connexion
let db = new sqlite3.Database(
    path.resolve(__dirname, "../sport_track.db"),
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            console.log("Database connexion fail!" + err.message);
        } else {
            console.log("Database connexion succeeded!");
        }
    }
);
module.exports = db;
console.log(db);


