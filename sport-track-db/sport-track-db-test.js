const conn = require("./sport-track-db");

let db = conn.db;
let userDao = conn.user_dao;
let activityDao = conn.activity_dao;
let activityEntryDao = conn.activity_entry_dao;

//activityEntryDao.delete(12, console.log);
//activityEntryDao.findAll(console.log);