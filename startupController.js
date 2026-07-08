// =====================================================
// STARTUP CONTROLLER
// Central orchestration for initial page events
// =====================================================


function runStartupSequence() {
 const startupSteps = [
    tryShowFinaleExperience,
    tryShowFinal24Hours,
    tryShowStoryEvent,
    tryShowAchievement,
    tryShowCampfireMoment
];

  for (const step of startupSteps) {
    if (typeof step === "function" && step()) {
      return;
    }
  }

  showDefaultState();
}

function showDefaultState() {
  // intentionally empty
}