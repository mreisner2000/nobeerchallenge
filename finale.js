function tryShowFinaleExperience() {
  const now = new Date();
  const target = new Date(CONFIG.targetDate);

  if (now < target) {
    return false;
  }

  showFinaleExperience();
  return true;
}

function showFinaleExperience() {
  document.body.classList.add("finale-active");
  setupFinaleButton();
}

function setupFinaleButton() {
  const button = document.getElementById("finalButton");

  if (!button) {
    return;
  }

  button.addEventListener("click", startCinemaIntro);
}

function startCinemaIntro() {
  const finished = document.getElementById("finished");
  const cinemaIntro = document.getElementById("cinemaIntro");
  const line1 = document.getElementById("cinemaLine1");
  const line2 = document.getElementById("cinemaLine2");

  if (!cinemaIntro || !line1 || !line2) {
    return;
  }

  if (finished) {
    finished.style.transition = "opacity 1.2s ease";
finished.style.opacity = "0";
    }

setTimeout(() => {
    finished.classList.add("hidden");
}, 1200);
  

  cinemaIntro.classList.remove("hidden");

requestAnimationFrame(() => {
    cinemaIntro.classList.add("show");
});

  setTimeout(() => {
    line1.classList.remove("hidden");
    requestAnimationFrame(() => {
        line1.classList.add("show");
    });
}, 1200);

 setTimeout(() => {
    line2.classList.remove("hidden");
    requestAnimationFrame(() => {
        line2.classList.add("show");
    });
}, 3900);

setTimeout(() => {
  startFinalPhotoScene();
}, 7600);
}

function startFinalPhotoScene() {

  
  const cinemaIntro = document.getElementById("cinemaIntro");
  const finalPhotoScene = document.getElementById("finalPhotoScene");
  const finalPhoto = document.getElementById("finalPhoto");
  const finalMessage = document.getElementById("finalMessage");
  const finished = document.getElementById("finished");
  const finalMusic = document.getElementById("finalMusic");
  const finalThanks = document.getElementById("finalThanks");
  const step2 = document.getElementById("finalMessageStep2");
  const step3 = document.getElementById("finalMessageStep3");
  const step4 = document.getElementById("finalMessageStep4");

  finalPhotoScene?.classList.remove("show");

finalPhoto?.classList.remove(
  "show",
  "full-color",
  "ken-burns"
);

finalMessage?.classList.add("hidden");
finalMessage?.classList.remove("active");

finalThanks?.classList.remove("show");

[step2, step3, step4].forEach((step) => {
  if (!step) return;

  step.classList.remove(
    "show",
    "fade-out"
  );
});

  if (finished) {
    finished.classList.add("hidden");
    finished.style.opacity = "1";
  }

  if (!finalPhotoScene || !finalPhoto) {
    return;
  }

  finalPhotoScene.classList.remove("hidden");

// Erzwingt den Ausgangszustand vor der neuen Animation.
void finalPhotoScene.offsetWidth;

requestAnimationFrame(() => {
  finalPhotoScene.classList.add("show");
});

  setTimeout(() => {
    finalPhoto.classList.add("show");
  }, 350);

  setTimeout(() => {
  finalPhoto.classList.add("full-color");
  }, 1700);

  if (finalMusic) {
    finalMusic.volume = 0;

    finalMusic.play()
      .then(() => {
        fadeInFinalMusic(finalMusic, 0.45, 5000);
      })
      .catch(() => {});
  }

  if (cinemaIntro) {
    cinemaIntro.style.transition = "opacity 2s ease";
    cinemaIntro.style.opacity = "0";

    setTimeout(() => {
      cinemaIntro.classList.add("hidden");
    }, 2000);
  }

  setTimeout(() => {
  finalPhoto.classList.add("ken-burns");
  }, 5200);

  if (finalMessage) {
  setTimeout(() => {
    startFinalMessageSequence();
  }, 5600);
  }
}

function fadeInFinalMusic(audio, targetVolume = 0.45, duration = 5000) {
  const startTime = performance.now();

  function updateVolume(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    audio.volume = targetVolume * progress;

    if (progress < 1) {
      requestAnimationFrame(updateVolume);
    }
  }

  requestAnimationFrame(updateVolume);
}

function startFinalMessageSequence() {
  const finalMessage = document.getElementById("finalMessage");
  const finalThanks = document.getElementById("finalThanks");
  const step2 = document.getElementById("finalMessageStep2");
  const step3 = document.getElementById("finalMessageStep3");
  const step4 = document.getElementById("finalMessageStep4");

  if (!finalMessage || !finalThanks || !step2 || !step3 || !step4) {
    return;
  }

finalMessage.classList.remove("hidden");
finalMessage.classList.remove("active");

// Browser rendert zuerst den unsichtbaren Ausgangszustand.
void finalMessage.offsetWidth;

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    finalMessage.classList.add("active");
    finalThanks.classList.add("show");
  });
});

  // Schritt 2 erscheint
  setTimeout(() => {
    step2.classList.add("show");
  }, 1700);

  // Schritt 2 blendet nach fünf Sekunden aus
  setTimeout(() => {
    step2.classList.add("fade-out");
  }, 9300);

  // Schritt 3 erscheint
  setTimeout(() => {
    step3.classList.add("show");
  }, 11100);

  // Schritt 3 blendet nach fünf Sekunden aus
  setTimeout(() => {
    step3.classList.add("fade-out");
  }, 17700);

  // Schritt 4 erscheint und bleibt stehen
  setTimeout(() => {
    step4.classList.add("show");
  }, 19500);

  setTimeout(() => {
    const finalWishStar = document.getElementById("finalWishStar");
    finalWishStar?.classList.add("glow");
  }, 23000);

  setTimeout(() => {
    const finalEdhLogo = document.getElementById("finalEdhLogo");
    finalEdhLogo?.classList.add("show");
  }, 26000);
}