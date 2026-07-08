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

  if (finished) {
  finished.classList.add("hidden");
  finished.style.opacity = "1";
}

  if (!finalPhotoScene || !finalPhoto) {
    return;
  }

  finalPhotoScene.classList.remove("hidden");

  requestAnimationFrame(() => {
    finalPhotoScene.classList.add("show");
    finalPhoto.classList.add("show");
  });

  if (finalMusic) {
  finalMusic.volume = 0.45;
  finalMusic.play().catch(() => {});
}

  if (cinemaIntro) {
    cinemaIntro.style.transition = "opacity 2s ease";
    cinemaIntro.style.opacity = "0";

    setTimeout(() => {
      cinemaIntro.classList.add("hidden");
    }, 2000);
  }

  if (finalMessage) {
    setTimeout(() => {
      finalMessage.classList.remove("hidden");
      finalMessage.classList.add("show");
    }, 4200);
  }
}