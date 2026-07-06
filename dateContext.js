function getDateContext() {

    const now = new Date();

    const weekday = now.getDay();
    const hour = now.getHours();

    const daysRemaining = Math.ceil(
        (CONFIG.targetDate - now) / (1000 * 60 * 60 * 24)
    );

    return {

        now,

        weekday,

        hour,

        isMonday: weekday === 1,

        isTuesday: weekday === 2,

        isWednesday: weekday === 3,

        isThursday: weekday === 4,

        isFriday: weekday === 5,

        isSaturday: weekday === 6,

        isSunday: weekday === 0,

        isWeekend:
            weekday === 5 ||
            weekday === 6 ||
            weekday === 0,

        isMorning:
            hour >= 5 && hour < 11,

        isAfternoon:
            hour >= 11 && hour < 17,

        isEvening:
            hour >= 17 && hour < 22,

        isNight:
            hour >= 22 || hour < 5,

        daysRemaining,

        lastWeek:
            daysRemaining <= 7,

        final24Hours:
            CONFIG.targetDate - now <=
            24 * 60 * 60 * 1000

    };

}