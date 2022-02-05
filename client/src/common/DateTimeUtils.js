var DateTimeUtils = {

    diffBetweenDateTimes: function (futureDateTime, currentDateTime) {
        var result = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }

        if (futureDateTime < currentDateTime) {
            return result;
        }

        var delta = Math.abs(futureDateTime - currentDateTime) / 1000;

        // calculate (and subtract) whole days
        result.days = Math.floor(delta / 86400);
        delta -= result.days * 86400;

        // calculate (and subtract) whole hours
        result.hours = Math.floor(delta / 3600) % 24;
        delta -= result.hours * 3600;

        // calculate (and subtract) whole minutes
        result.minutes = Math.floor(delta / 60) % 60;
        delta -= result.minutes * 60;

        // what's left is seconds
        result.seconds = Math.floor(delta % 60);

        return result;
    }

};
export { DateTimeUtils as default };
