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

function getPendingAchievement() {
  if (!CONFIG.effects.achievements) {
    return null;
  }

  const currentDay = getChallengeDay();
  const story = getStory(currentDay);

  if (story?.achievement) {
    const storyAchievementKey = `achievement-story-${story.event}`;

    if (!localStorage.getItem(storyAchievementKey)) {
      return {
        text: story.achievement,
        key: storyAchievementKey
      };
    }
  }

  return achievements.find((achievement) => {
    const storageKey = `achievement-${achievement.id}`;

    return currentDay >= achievement.day && !localStorage.getItem(storageKey);
  }) || null;
}


function tryShowAchievement() {
  const achievement = getPendingAchievement();

  if (!achievement) {
    return false;
  }

  localStorage.setItem(achievement.key, "shown");
  showAchievement(achievement.text);

  return true;
}

