// =====================================================
// STARTUP CONTROLLER
// Central orchestration for initial page events
// =====================================================

function runStartupSequence() {
  const startupSteps = [
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