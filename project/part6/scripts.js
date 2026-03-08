// ==========================
// NAV MENU
// ==========================
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  if (!nav) return;
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // CREATE MODAL
  // ==========================
  function createModal() {
    const modal = document.createElement("div");
    modal.id = "dfModal";
    modal.className = "modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="modal__backdrop" data-close="true"></div>
      <div class="modal__panel">
        <button class="modal__close" data-close="true">×</button>
        <img class="modal__img" id="dfModalImg" alt="">
        <div class="modal__content">
          <h3 id="dfModalTitle"></h3>
          <p id="dfModalMeta"></p>
          <p id="dfModalDesc"></p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    return {
      modal,
      img: modal.querySelector("#dfModalImg"),
      title: modal.querySelector("#dfModalTitle"),
      meta: modal.querySelector("#dfModalMeta"),
      desc: modal.querySelector("#dfModalDesc")
    };
  }

  const modalRefs = createModal();
  const modal = modalRefs.modal;

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

// ==========================
// JSON LOAD FOR FOCUS SECTION
// ==========================
const bigCard = document.getElementById("bigCard");
const stackCard = document.getElementById("stackCard");
const miniGrid = document.getElementById("miniGrid");

if (!bigCard && !stackCard && !miniGrid) return;

fetch("https://sawelch2027.github.io/project/part6/json/workouts.json")
  .then(res => res.json())
  .then(data => {

    console.log("JSON Loaded:", data);

    // ✅ Use ALL items (no category filter)
    const items = Array.isArray(data) ? data : [];

    // BIG
const big = items.find(item => item.layout === "big");
if (big && bigCard) {
  bigCard.innerHTML = `
    <img src="${big.img_name}" alt="${big.title}">
    <div class="focus-card__bar">
      <div>
        <h3>${big.title}</h3>
        <p class="workout-meta">
          <span class="legend">${big.icon}</span>
          ${big.level} · ${big.minutes} min
        </p>

        <div class="featured-actions">
          <a class="btn-dark" href="${big.page || '#'}">Begin →</a>
          <a class="btn-light" href="#">Bookmark</a>
        </div>
      </div>
    </div>
  `;

  // If you want the whole card clickable too:
  bigCard.addEventListener("click", () => {
    // ✅ Morning Mobility goes to its page
    if (big.title === "Morning Mobility" && big.page) {
      window.location.href = big.page;
      return;
    }

    // otherwise keep your modal behavior
    modalRefs.img.src = big.img_name;
    modalRefs.title.textContent = big.title;
    modalRefs.meta.textContent = `${big.icon} ${big.level} · ${big.minutes} min`;
    modalRefs.desc.textContent = big.desc;
    openModal();
  });

  // Prevent card click when pressing the buttons
  bigCard.querySelectorAll(".featured-actions a").forEach(a => {
    a.addEventListener("click", (e) => e.stopPropagation());
  });
}
    // STACK
const stack = items.find(item => item.layout === "stack");
if (stack && stackCard) {
  stackCard.innerHTML = `
    <img src="${stack.img_name}" alt="${stack.title}">
    <div class="focus-card__stacktext">
      <h3>${stack.title}</h3>
      <p class="workout-meta">
        <span class="legend">${stack.icon}</span>
        ${stack.level} · ${stack.minutes} min
      </p>

      <div class="featured-actions">
        <a class="btn-dark" href="${stack.page || '#'}">Begin →</a>
        <a class="btn-light" href="#">Bookmark</a>
      </div>
    </div>
  `;

  // stop card click when clicking buttons
  stackCard.querySelectorAll(".featured-actions a").forEach(a => {
    a.addEventListener("click", (e) => e.stopPropagation());
  });

  // card click (modal or whatever)
  stackCard.addEventListener("click", () => {
    modalRefs.img.src = stack.img_name;
    modalRefs.title.textContent = stack.title;
    modalRefs.meta.textContent = `${stack.icon} ${stack.level} · ${stack.minutes} min`;
    modalRefs.desc.textContent = stack.desc;
    openModal();
  });
}

// MINI
const minis = items.filter(item => item.layout === "mini");

if (miniGrid) {
  miniGrid.innerHTML = minis.map(item => `
    <div class="mini-card">
      <img src="${item.img_name}" alt="${item.title}">
      
      <div class="mini-card__text">
        <h4>${item.title}</h4>

        <p class="workout-meta">
          <span class="legend">${item.icon}</span>
          ${item.level} · ${item.minutes} min
        </p>

        <div class="featured-actions">
          <a class="btn-dark" href="${item.page || '#'}">Begin →</a>
          <a class="btn-light" href="#">Bookmark</a>
        </div>

      </div>
    </div>
  `).join("");

  miniGrid.querySelectorAll(".mini-card").forEach((card, index) => {
    const item = minis[index];

    card.addEventListener("click", () => {
      modalRefs.img.src = item.img_name;
      modalRefs.title.textContent = item.title;
      modalRefs.meta.textContent = `${item.icon} ${item.level} · ${item.minutes} min`;
      modalRefs.desc.textContent = item.desc;
      openModal();
    });

    // Prevent card click when pressing buttons
    card.querySelectorAll(".featured-actions a").forEach(a => {
      a.addEventListener("click", (e) => e.stopPropagation());
    });
  });
}
})})
// nav menu
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  if (!nav) return;
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  loadNutritionItems();
});

async function loadNutritionItems() {
  const menuGrid = document.getElementById("menu-grid");
  if (!menuGrid) return;

  try {
    const response = await fetch("https://sawelch2027.github.io/project/part6/jason/nutrition.json");
    const items = await response.json();

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "menu-card";

      card.innerHTML = `
        <img src="${item.img_name}" alt="${item.title}">
        <div class="menu-text">
          <h3>${item.category}: ${item.title}</h3>
          <p>${item.description}</p>
          <p><strong>Goal:</strong> ${item.goal}</p>
          <p><strong>Calories:</strong> ${item.calories}</p>
          <p><strong>Protein:</strong> ${item.protein}</p>
        </div>
      `;

      menuGrid.appendChild(card);
    });
  } catch (error) {
    menuGrid.innerHTML = "<p>Sorry, nutrition items could not be loaded.</p>";
    console.log(error);
  }
}