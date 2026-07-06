const STORY = {

    1: { event: "start" },

    3: { event: "routine" },

    7: { event: "first_week" },

    10: { event: "double_digits" },

    14: { event: "halfway" },

    21: { event: "three_weeks" },

    28: { event: "endspurt" },

    30: { event: "almost_there" },

    31: { event: "victory" }

};

function getStoryEvent(day) {
    return STORY[day]?.event || null;
}