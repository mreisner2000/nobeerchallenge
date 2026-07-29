const CONFIG = {
    player1: "Markus",
    player2: "Theresa",

    challengeName: "No Beer Challenge",
    festivalName: "Acoustic Campfire Festival",

    startDate: new Date("2026-07-01T00:00:00"),
    targetDate: new Date("2026-07-29T14:00:00"),

    journalRefreshTime: 15 * 60 * 1000,

   probabilities: {

    journal: {
        golden: 0.03,
        easterEgg: 0.01
    },

    quotes: {
        humor: 0.25,
        festival: 0.20,
        personal: 0.12,
        golden: 0.08
    }

},

timing: {

    achievementDuration: 6200,

    quoteRefreshMinutes: 15,

    heartbeatInterval: 15000

},

effects: {

    achievements: true,

    heartbeat: true,

    confetti: true,

    campfireMode: true

},

developer: {
    enabled: false,
    forceChallengeDay: null,
    forceStoryEvent: null
}
};