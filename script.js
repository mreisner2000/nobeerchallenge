/* =====================================================
   NO BEER CHALLENGE 2026
   script.js
===================================================== */

const TARGET_DATE = CONFIG.targetDate;
const START_DATE = CONFIG.startDate;

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const motivation = document.getElementById("motivation");
const finished = document.getElementById("finished");
const main = document.querySelector("main");
const journalTitle = document.getElementById("journalTitle");
const journalText = document.getElementById("journalText");
const endspurtBanner = document.getElementById("endspurtBanner");

const achievementToast = document.getElementById("achievementToast");
const achievementText = document.getElementById("achievementText");

function pad(value) {
  return String(value).padStart(2, "0");
}

let lastQuote = "";

function personalize(text) {
  return text
    .replaceAll("{player1}", player1)
    .replaceAll("{player2}", player2);
}


function getChallengeDay() {
    const dayMs = 1000 * 60 * 60 * 24;
    return Math.floor((new Date() - START_DATE) / dayMs) + 1;
}


function getChallengeDay() {
    const dayMs = 1000 * 60 * 60 * 24;
    return Math.floor((new Date() - START_DATE) / dayMs) + 1;
}

function setRandomQuote() {


  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  const challengeDay = getChallengeDay();

let category = "motivation";

// Challenge-Phasen
if (challengeDay >= 25 && quoteCategories.endspurt?.length > 0) {
    category = "endspurt";
}
else if (challengeDay >= 14 && challengeDay < 21 && quoteCategories.halftime?.length > 0) {
    category = "halftime";
}
else if (challengeDay >= 1 && challengeDay <= 3 && quoteCategories.start?.length > 0) {
    category = "start";
}

// Wochenende
if ((day === 5 || day === 6) && Math.random() < CONFIG.probabilities.quotes.festival) {
    category = "festival";
}

// Abend-Humor
if (hour >= 18 && Math.random() < CONFIG.probabilities.quotes.humor) {
    category = "humor";
}

// Golden Message
if (Math.random() < CONFIG.probabilities.quotes.golden) {
    category = "golden";
}

    let list = quoteCategories[category];

    // Falls die Kategorie noch leer ist → Motivation verwenden
    if (!list || list.length === 0) {
        list = quoteCategories.motivation;
    }

    let quote = list[Math.floor(Math.random() * list.length)];

    let attempts = 0;

    while (quote === lastQuote && attempts < 10) {
        quote = list[Math.floor(Math.random() * list.length)];
        attempts++;
    }

    lastQuote = quote;

    motivation.textContent = personalize(quote);

}



function animateNumber(element) {
  element.animate(
    [
      { transform: "scale(1.12)", opacity: 0.65 },
      { transform: "scale(1)", opacity: 1 }
    ],
    {
      duration: 180,
      easing: "ease-out"
    }
  );
}

function updateProgress(now) {
  const total = TARGET_DATE - START_DATE;
  const current = now - START_DATE;

  let percent = (current / total) * 100;
  percent = Math.max(0, Math.min(100, percent));

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${Math.floor(percent)} % geschafft`;
  updateMilestones(percent);
  updateCampfireMode(percent);
}
let lastJournal = "";
let journalCacheTime = 0;
const JOURNAL_REFRESH_TIME = CONFIG.journalRefreshTime;


function updateJournal(now) {

    const currentTime = now.getTime();

    if (
        lastJournal !== "" &&
        currentTime - journalCacheTime < JOURNAL_REFRESH_TIME
    ) {
        return;
    }

    const dayMs = 1000 * 60 * 60 * 24;
    let currentDay = Math.floor((now - START_DATE) / dayMs) + 1;
const storyEvent = getStoryEvent(currentDay);
    let category = "middle";
    let title = `Tag ${currentDay}`;

    if (now < START_DATE) {
        category = "beforeStart";
        title = "Challenge startet bald";
    }
    else if (currentDay <= 1) {
        category = "start";
        title = "Tag 1";
    }
    else if (currentDay < 7) {
        category = "early";
    }
    else if (currentDay === 7) {
        category = "weekOne";
        title = "Eine Woche geschafft";
    }
    else if (currentDay < 21) {
        category = "middle";
    }
    else if (currentDay < 30) {
        category = "late";
    }
    else if (currentDay === 30) {
        category = "endspurt";
        title = "Morgen ist es soweit";
    }
    else {
        category = "final";
        title = "Finaltag";
    }

    if (Math.random() < CONFIG.probabilities.journal.golden) {
    category = "golden";
}

if (Math.random() < CONFIG.probabilities.journal.easterEgg) {
    category = "easterEggs";
    title = "🎉 Überraschung!";
}

    const list = journalEntries[category];

    let text = list[Math.floor(Math.random() * list.length)];

    while (text === lastJournal && list.length > 1) {
        text = list[Math.floor(Math.random() * list.length)];
    }

    lastJournal = text;
    journalCacheTime = currentTime;

    journalTitle.textContent = title;
    journalText.textContent = personalize(text);
}


function updateMilestones(percent) {
  const milestones = document.querySelectorAll(".milestone");
  milestones.forEach((milestone) => {
    const targetPercent = parseFloat(milestone.dataset.percent);
    if (percent >= targetPercent) {
      milestone.classList.add("active");
    } else {
      milestone.classList.remove("active");
    }
  });
}

function showFinishedScreen(){

    document.body.classList.add("finished-mode");

    main.style.display="none";

    finished.classList.remove("hidden");

    launchConfetti();

}


function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;
  updateEndspurtMode(diff);

  if (diff <= 0) {
    showFinishedScreen();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  animateNumber(secondsEl);
  updateProgress(now);
  updateJournal(now);

}

function updateEndspurtMode(diff) {
  const oneDay = 1000 * 60 * 60 * 24;

  if (diff > 0 && diff <= oneDay) {
    document.body.classList.add("endspurt");
    endspurtBanner.classList.remove("hidden");
  } else {
    document.body.classList.remove("endspurt");
    endspurtBanner.classList.add("hidden");
  }
}

/* =====================================================
   FIRE PARTICLES
===================================================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = canvas.width / 2 + (Math.random() - 0.5) * 260;
    this.y = canvas.height - 90;
    this.radius = Math.random() * 3 + 1;
    this.speedY = Math.random() * 2.2 + 0.8;
    this.speedX = (Math.random() - 0.5) * 1.1;
    this.opacity = Math.random() * 0.75 + 0.25;
    this.life = Math.random() * 120 + 80;
    this.maxLife = this.life;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.life -= 1;

    if (this.life <= 0 || this.y < -20) {
      this.reset();
    }
  }

  draw() {
    const fade = this.life / this.maxLife;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 170, 55, ${this.opacity * fade})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = "rgba(255, 120, 0, 0.9)";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function createParticles() {
  particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

/* =====================================================
   START
===================================================== */

resizeCanvas();
createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

setRandomQuote();
setInterval(setRandomQuote, 20000);

updateCountdown();
setInterval(updateCountdown, 1000);

checkAchievements();

/* ===================================
   CONFETTI
=================================== */

function launchConfetti(){

    for(let i=0;i<220;i++){

        setTimeout(()=>{

            createConfetti();

        },i*12);

    }

}

function createConfetti(){

    const piece=document.createElement("div");

    piece.className="confetti";

    piece.style.left=Math.random()*100+"vw";

    piece.style.background=
    ["#ff8c1a","#ffd36e","#ffffff","#ff4d00"][Math.floor(Math.random()*4)];

    piece.style.animationDuration=
    (3+Math.random()*3)+"s";

    document.body.appendChild(piece);

    setTimeout(()=>{

        piece.remove();

    },6000);

}

