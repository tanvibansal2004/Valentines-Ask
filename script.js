let pages;

function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (pages) pages.forEach(p => p.classList.remove("active"));
  target.classList.add("active");
  if (id === "p3" && typeof resetEnvelope === "function") resetEnvelope();
  if (id === "p5" && typeof resetProposal === "function") resetProposal();
}

function init() {
  pages = document.querySelectorAll(".page");

  /* MEMORIES – photos from assets/photos */
  const photoFiles = [
    "assets/photos/IMG_1764329779686.JPEG",
    "assets/photos/IMG_1764342547427.JPEG",
    "assets/photos/IMG_1770152098955.JPEG",
    "assets/photos/IMG_1770152129092.JPEG",
    "assets/photos/IMG_1770152145011.JPEG",
    "assets/photos/IMG_1770152167359.JPEG"
  ];
  const grid = document.getElementById("mem-grid");
  if (grid) {
    grid.innerHTML = "";
    photoFiles.forEach((src) => {
      const d = document.createElement("div");
      d.className = "mem-tile";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      d.appendChild(img);
      grid.appendChild(d);
    });
  }

  /* ENVELOPE LOGIC – click envelope opens letter (p4) */
  const envWrap = document.getElementById("env-wrap");
  function resetEnvelope() {}
  if (envWrap) {
    envWrap.addEventListener("click", () => goTo("p4"));
  }
  window.resetEnvelope = resetEnvelope;

  /* PROPOSAL LOGIC */
  const noBtn = document.getElementById("noBtn");
  const result = document.getElementById("result");
  const proposalBtns = document.getElementById("proposal-btns");
  const valentineQuestion = document.getElementById("valentine-question");
  const playAgainBtn = document.getElementById("play-again-btn");
  function resetProposal() {
    if (result) {
      result.textContent = "";
      result.classList.remove("result-yay");
    }
    if (proposalBtns) proposalBtns.style.display = "flex";
    if (valentineQuestion) valentineQuestion.style.display = "block";
    if (playAgainBtn) playAgainBtn.style.display = "none";
    if (noBtn) {
      noBtn.style.transform = "translate(0,0)";
    }
  }
  window.resetProposal = resetProposal;

  if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
      const min = 200;
      const max = 200;
      const distance = Math.random() * (max - min) + min;
      const angle = Math.random() * Math.PI * 2;
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;
      noBtn.style.transition = "transform 0.3s ease";
      noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  window.yesAnswer = function () {
    if (proposalBtns) proposalBtns.style.display = "none";
    if (valentineQuestion) valentineQuestion.style.display = "none";
    if (playAgainBtn) playAgainBtn.style.display = "inline-block";
    if (result) {
      result.textContent = "Yay!! I Love You so much Toto!!";
      result.classList.add("result-yay");
    }
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}