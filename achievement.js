const achievements = [
    { day: 1, id: "day-1", text: "Der erste Schritt" },
    { day: 3, id: "day-3", text: "Die Routine beginnt" },
    { day: 7, id: "day-7", text: "Erste Woche geschafft" },
    { day: 10, id: "day-10", text: "Zweistellig" },
    { day: 14, id: "day-14", text: "Halbzeit voraus" },
    { day: 21, id: "day-21", text: "Drei Wochen Disziplin" },
    { day: 28, id: "day-28", text: "Endspurt erreicht" },
    { day: 30, id: "day-30", text: "Nur noch einmal schlafen" }
];

function getChallengeDay() {
    if (CONFIG.developer.enabled && CONFIG.developer.forceChallengeDay) {
        return CONFIG.developer.forceChallengeDay;
    }

    const dayMs = 1000 * 60 * 60 * 24;
    return Math.floor((new Date() - CONFIG.startDate) / dayMs) + 1;
}



function showAchievement(text) {
    const achievementToast = document.getElementById("achievementToast");
    const achievementText = document.getElementById("achievementText");

    if (!achievementToast || !achievementText) {
        return;
    }

    achievementText.textContent = text;

    achievementToast.classList.remove("hidden");
    achievementToast.classList.remove("show");

    void achievementToast.offsetWidth;

    achievementToast.classList.add("show");

    setTimeout(() => {
        achievementToast.classList.add("hidden");
        achievementToast.classList.remove("show");
    }, CONFIG.timing.achievementDuration);
}

function checkAchievements() {
    if (!CONFIG.effects.achievements) {
        return;
    }

    const currentDay = getChallengeDay();
    const story = getStory(currentDay);

    if (story?.achievement) {
    const storyAchievementKey = `achievement-story-${story.event}`;

    if (!localStorage.getItem(storyAchievementKey)) {
        localStorage.setItem(storyAchievementKey, "shown");
        window.achievementShownOnLoad = true;
        showAchievement(story.achievement);
    }
}

    achievements.forEach((achievement) => {
        if (currentDay >= achievement.day) {
            const storageKey = `achievement-${achievement.id}`;

            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, "shown");
                window.achievementShownOnLoad = true;
                showAchievement(achievement.text);
            }
        }
    });
}