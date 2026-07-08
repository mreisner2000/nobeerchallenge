const CAMPFIRE_MOMENTS = [
    {
        id: "morning-return",
        when: (context) => true,
        probability: 1,
        text: "Schön, dass ihr wieder da seid."
    },
    {
        id: "friday-evening",
        when: (context) => context.isFriday && context.isEvening,
        probability: 0.65,
        text: "Heute riecht irgendwo ein Grill."
    },
    {
        id: "saturday",
        when: (context) => context.isSaturday,
        probability: 0.45,
        text: "Das Wochenende sitzt schon am Feuer."
    },
    {
        id: "sunday-evening",
        when: (context) => context.isSunday && context.isEvening,
        probability: 0.75,
        text: "Der Sonntag verabschiedet sich langsam."
    },
    {
        id: "last-week",
        when: (context) => context.lastWeek,
        probability: 0.45,
        text: "Das Festival ist schon fast zu hören."
    },
    {
        id: "final-day",
        when: (context) => context.daysRemaining <= 1,
        probability: 1,
        text: "Heute ist kein normaler Tag."
    }
];

function getCampfireMoment() {
    const context = getDateContext();

    const possibleMoments = CAMPFIRE_MOMENTS.filter((moment) => {
        return moment.when(context);
    });

    for (const moment of possibleMoments) {
        if (Math.random() < moment.probability) {
            return moment.text;
        }
    }

    return null;
}

function showCampfireMoment(text) {
    const element = document.getElementById("ambientMessage");

    if (!element || !text) {
        return;
    }

    element.textContent = text;

    element.classList.remove("hidden");
    element.classList.remove("show");

    void element.offsetWidth;

    element.classList.add("show");

    setTimeout(() => {
        element.classList.add("hidden");
        element.classList.remove("show");
    }, 5600);
}

function runCampfireMoment() {
    const moment = getCampfireMoment();

    if (!moment) {
        return false;
    }

    showCampfireMoment(moment);
    return true;
}

function tryShowCampfireMoment() {
    return runCampfireMoment();
}