const db = require('./sqlite_connection');

let ActivityEntryDAO = function () { };
ActivityEntryDAO.prototype.insert = function (values, callback) {
    db.all("INSERT INTO ActivityData VALUES (?, ?, ?, ?, ?, ?, ?)", values, (err) => {
        if (err) {
            console.log(err);
        } else {
            callback();
        }
    });
};

ActivityEntryDAO.prototype.update = function (key, values, callback) {
    db.all(`UPDATE ActivityData
    SET time = ?,
        cardioFreq = ?,
        latitude = ?,
        longitude = ?,
        altitude = ?,
        fkActivity = ?
    WHERE idData = ?`,
        [
            values[1], // time
            values[2], // freq
            values[3], // lat
            values[4], // long
            values[5], // alt
            values[6], // activity
            key
        ],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                callback();
            }
        }
    );
}

ActivityEntryDAO.prototype.delete = function (key, callback) {
    db.all("DELETE FROM ActivityData WHERE idData = ? ", key, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback();
        }
    });
}

ActivityEntryDAO.prototype.findAll = function (callback) {
    db.all("SELECT * FROM ActivityData", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            callback(rows);
        }
    });
};

ActivityEntryDAO.prototype.findByKey = function (key, callback) {
    db.all("SELECT * FROM Activity WHERE idData = ?", key, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            callback(rows);
        }
    });
};

ActivityEntryDAO.prototype.findByActivity = function (activity, callback) {
    db.all("SELECT * FROM ActivityData WHERE fkActivity = ?", activity, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            callback(rows);
        }
    });
};

var dao = new ActivityEntryDAO();
module.exports = dao;