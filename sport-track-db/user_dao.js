var db = require("./sqlite_connection");
var UserDAO = function () {
    this.insert = function (values, callback) {
        db.all(
            "INSERT INTO USER VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            values,
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    callback();
                }
            }
        );
    };

    this.update = function (key, values, callback) {
        db.all(
            "UPDATE USER SET LASTNAME = ?, FIRSTNAME = ?, BIRTHDATE = ?, GENDER = ?,  SIZE = ?,WEIGHT = ?, PASSWORD = ? WHERE EMAIL = ?",
            [
                values[0],
                values[1],
                values[2],
                values[3],
                values[4],
                values[5],
                values[7],
                key,
            ],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    callback();
                }
            }
        );
    };

    this.delete = function (key, callback) {
        db.all("DELETE FROM USER WHERE UPPER(EMAIL) = UPPER(?)", key, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                callback();
            }
        });
    };

    this.findAll = function (callback) {
        db.all("SELECT * FROM USER", function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                callback(err, rows);
            }
        });
    };

    this.findByKey = function (key, callback) {
        db.all("SELECT * FROM USER WHERE UPPER(EMAIL) = UPPER(?)", key, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                callback(err, rows);
            }
        });
    };

    this.identifyUser = function (email, pass, callback) {
        db.all("SELECT * FROM User WHERE UPPER(email) = UPPER(?) AND password = ?", [email, pass], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                callback(err, rows);
            }
        });
    };
};

var dao = new UserDAO();
module.exports = dao;