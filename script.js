/* =====================================================
   NO BEER CHALLENGE 2026
   script.js
===================================================== */

const TARGET_DATE = new Date("2026-07-31T10:00:00");
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

const quotes = [
  "Kein Bier. Keine Ausreden.",
  "Legenden trinken später.",
  "Der erste Schluck wird legendär.",
  "Heute wieder gewonnen.",
  "Disziplin schlägt Durst.",
  "Jeder Tag bringt euch näher.",
  "Gemeinsam bis zum Festival.",
  "Nicht aufgeben.",
  "Fast geschafft.",
  "Der Grill wartet schon.",
  "Das erste Bier schmeckt nur einmal.",
  "No Beer. No Excuses.",
  "Durchhalten zahlt sich aus.",
  "Ihr seid stärker als das Feierabendbier.",
  "Nur noch ein kleines Stück."
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function setRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  motivation.textContent = quotes[index];
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
}

function showFinishedScreen() {
  main.style.display = "none";
  finished.classList.remove("hidden");
}

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;

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
