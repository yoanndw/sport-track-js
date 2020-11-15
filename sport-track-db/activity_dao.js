const db = require('./sqlite_connection');

let ActivityDAO = function () { };
ActivityDAO.prototype.insert = function (values, callback) {
    db.all("INSERT INTO Activity VALUES (?, ?, ?, ?, ?, ?)", values, (err) => {
        if (err) {
            console.log(err);
        } else {
            callback();
        }
    });
};

ActivityDAO.prototype.update = function (key, values, callback) {
    db.all(`UPDATE Activity 
    SET actDate = ?,
        description = ?,
        user = UPPER(?),
        distanceTot = ?,
        dureeTot = ?
    WHERE idActivity = ?`,
        [
            values[1], // date
            values[2], // desc
            values[3], // user
            values[4], // dist
            values[5], // duree
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

ActivityDAO.prototype.delete = function (key, callback) {
    db.all("DELETE FROM Activity WHERE idActivity = ? ", key, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback();
        }
    });
}

ActivityDAO.prototype.findAll = function (callback) {
    db.all("SELECT * FROM Activity", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            callback(rows);
        }
    });
};

ActivityDAO.prototype.findByKey = function (key, callback) {
    db.all("SELECT * FROM Activity WHERE idActivity = ?", key, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            callback(rows);
        }
    });
};

ActivityDAO.prototype.findByUser = function (user, callback) {
    db.all("SELECT * FROM Activity WHERE UPPER(user) = UPPER(?)", user, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            callback(rows);
        }
    });
};

var dao = new ActivityDAO();
module.exports = dao;