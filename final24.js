function tryShowFinal24Hours() {
  const now = new Date();
  const target = new Date(CONFIG.targetDate);
  const final24Start = new Date(target.getTime() - 24 * 60 * 60 * 1000);

  if (now < final24Start || now >= target) {
    return false;
  }

  showFinal24Hours();
  return false;
}

function showFinal24Hours() {
  document.body.classList.add("final-24-active");
  updateFinal24Title();
}

function updateFinal24Title() {
  const title = document.getElementById("heroTitle");
  const subtitle = document.getElementById("heroSubtitle");

  if (!title || !subtitle) {
    return;
  }

  //
  // Titel
  //

  title.classList.add("title-fade-out");

  setTimeout(() => {
    title.innerHTML = `
      THE FINAL
      <span>24 HOURS</span>
    `;

    title.classList.remove("title-fade-out");
    title.classList.add("title-fade-in");
  }, 500);

  //
  // Untertitel
  //

  setTimeout(() => {

    subtitle.classList.add("title-fade-out");

    setTimeout(() => {

      subtitle.innerHTML = `
        Tomorrow,<br>
        everything changes.
      `;

      subtitle.classList.remove("title-fade-out");
      subtitle.classList.add("title-fade-in");

    }, 500);

  }, 1200);
}