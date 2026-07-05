/* =====================================================
   NO BEER CHALLENGE 2026
   script.js
===================================================== */

const TARGET_DATE = new Date(   "2026-07-31T14:00:00");
const START_DATE = new Date("2026-07-01T00:00:00");

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


function pad(value) {
  return String(value).padStart(2, "0");
}

let lastQuote = "";

function personalize(text) {
  return text
    .replaceAll("{player1}", player1)
    .replaceAll("{player2}", player2);
}

function setRandomQuote() {
  let quote = quotes[Math.floor(Math.random() * quotes.length)];

  let attempts = 0;

  while (quote === lastQuote && attempts < 10) {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
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
}
function updateJournal(now) {
  const dayMs = 1000 * 60 * 60 * 24;
  const currentDay = Math.floor((now - START_DATE) / dayMs) + 1;

  let title = "Challenge läuft";
  let text = "Jeder Tag ohne Bier zählt.";

  if (currentDay <= 1) {
    title = "Tag 1";
    text = "Heute beginnt die Challenge. Kein Bier. Ein Ziel.";
  } else if (currentDay < 7) {
    title = `Tag ${currentDay}`;
    text = "Die ersten Tage sind geschafft. Jetzt wird Durchhalten zur Routine.";
  } else if (currentDay === 7) {
    title = "Eine Woche geschafft";
    text = "Sieben Tage ohne Bier. Stark. Genau so weiter.";
  } else if (currentDay < 14) {
    title = `Tag ${currentDay}`;
    text = "Die Challenge nimmt Fahrt auf. Das Festival rückt näher.";
  } else if (currentDay === 14) {
    title = "Zwei Wochen stark";
    text = "Die Hälfte ist fast greifbar. Jetzt bloß nicht nachlassen.";
  } else if (currentDay < 21) {
    title = `Tag ${currentDay}`;
    text = "Der schwierigste Teil liegt hinter euch. Der Countdown arbeitet für euch.";
  } else if (currentDay === 21) {
    title = "Drei Wochen geschafft";
    text = "Das ist kein Versuch mehr. Das ist Disziplin.";
  } else if (currentDay < 30) {
    title = `Tag ${currentDay}`;
    text = "Endspurt-Gefühl liegt in der Luft. Bald knistert das Lagerfeuer.";
  } else if (currentDay === 30) {
    title = "Morgen ist es soweit";
    text = "Noch einmal schlafen. Der erste Schluck wartet schon.";
  } else {
    title = "Finaltag";
    text = "Heute wird Geschichte geschrieben. Acoustic Campfire Festival wartet.";
  }

  journalTitle.textContent = title;
  journalText.textContent = text;
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
