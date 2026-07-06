const STORY = {
    1: {
        event: "start",
        title: "Tag 1",
        journal: "start",
        quote: "start",
        mood: "hopeful"
    },

    3: {
        event: "routine",
        title: "Tag 3",
        journal: "early",
        quote: "start",
        mood: "focused"
    },

    7: {
        event: "first_week",
        title: "Eine Woche geschafft",
        journal: "weekOne",
        quote: "motivation",
        achievement: "Erste Woche geschafft",
        mood: "proud"
    },

    10: {
        event: "double_digits",
        title: "Zweistellig",
        journal: "middle",
        quote: "motivation",
        mood: "strong"
    },

    14: {
        event: "halfway",
        title: "Halbzeit voraus",
        journal: "middle",
        quote: "halftime",
        mood: "determined"
    },

    15: {
        event: "mid_challenge_surprise",
        title: "Tag 15",
        journal: "midChallengeSurprise",
        quote: "halftime",
        mood: "serious"
    },

    21: {
        event: "three_weeks",
        title: "Drei Wochen geschafft",
        journal: "late",
        quote: "motivation",
        mood: "proud"
    },

    28: {
        event: "endspurt",
        title: "Endspurt erreicht",
        journal: "endspurt",
        quote: "endspurt",
        mood: "intense"
    },

    30: {
        event: "almost_there",
        title: "Morgen ist es soweit",
        journal: "endspurt",
        quote: "endspurt",
        mood: "electric"
    },

    31: {
        event: "victory",
        title: "Finaltag",
        journal: "final",
        quote: "festival",
        achievement: "Mission erfolgreich",
        mood: "victory"
    }
};

function getStory(day) {
    return STORY[day] || null;
}

function getStoryEvent(day) {
    return getStory(day)?.event || null;
}