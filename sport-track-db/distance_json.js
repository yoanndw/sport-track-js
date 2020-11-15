module.exports = {
    calculDistance2PointsGPS: function (lat1, long1, lat2, long2) {
        lat1 = Math.PI / 180.0 * lat1;
        long1 = Math.PI / 180.0 * long1;

        lat2 = Math.PI / 180.0 * lat2;
        long2 = Math.PI / 180.0 * long2;

        let r = 6378.137 * 1000.0; // km -> m
        return r * Math.acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2) * Math.cos(lat1) * Math.cos(long2 - long1));
    },

    calculDistanceTrajet: function (activity) {
        let dataRows = activity.data;

        let dist = 0;
        for (let i = 0; i + 1 < dataRows.length; i++) {
            let current = dataRows[i];
            let next = dataRows[i + 1];

            let lat1 = current.latitude;
            let long1 = current.longitude;

            let lat2 = next.latitude;
            let long2 = next.longitude;

            dist += this.calculDistance2PointsGPS(lat1, long1, lat2, long2);
        }

        return dist;
    },

    stringToHoursSec: function (sTime) {
        let numbers = sTime.split(':');
        let h = numbers[0];
        let m = numbers[1];
        let s = numbers[2];

        return (h * 3600) + (m * 60) + s;
    },

    hoursSecToString: function (time) {
        let m = Math.floor(time / 60);
        let s = time % 60;

        let h = Math.floor(m / 60);
        m %= 60;

        return h + ':' + m + ':' + s;
    },

    calculDureeActivite: function (rawActivity) {
        let dataRows = rawActivity.data;

        let sStartTime = dataRows[0].time;
        let sEndTime = dataRows[dataRows.length - 1].time;

        let start = this.stringToHoursSec(sStartTime);
        let end = this.stringToHoursSec(sEndTime);

        return end - start;
    }
};

/////////////////////////////////////////
/*let activity = {
    activity: {
        date: "01/09/2018",
        description: "IUT -> RU"
    },
    data: [
        { time: "13:00:00", cardio_frequency: 99, latitude: 47.644795, longitude: -2.776605, altitude: 18 },
        { time: "13:00:05", cardio_frequency: 100, latitude: 47.646870, longitude: -2.778911, altitude: 18 },
        { time: "13:00:10", cardio_frequency: 102, latitude: 47.646197, longitude: -2.780220, altitude: 18 },
        { time: "13:00:15", cardio_frequency: 100, latitude: 47.646992, longitude: -2.781068, altitude: 17 },
        { time: "13:00:20", cardio_frequency: 98, latitude: 47.647867, longitude: -2.781744, altitude: 16 },
        { time: "13:00:25", cardio_frequency: 103, latitude: 47.648510, longitude: -2.780145, altitude: 16 }
    ]
};

console.log(calculDistanceTrajet(activity));*/