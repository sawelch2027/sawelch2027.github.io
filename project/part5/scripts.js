// =========================
// NAV MENU TOGGLE
// =========================
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  if (!nav) return;
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // IMPERIAL / METRIC TOGGLE (Assessment page only)
  // =========================
  const imperialBtn = document.getElementById("btn-imperial");
  const metricBtn   = document.getElementById("btn-metric");
  const labelHeight = document.getElementById("label-height");
  const labelWeight = document.getElementById("label-weight");

  if (imperialBtn && metricBtn && labelHeight && labelWeight) {
    imperialBtn.addEventListener("click", () => {
      imperialBtn.classList.add("active");
      metricBtn.classList.remove("active");
      if (labelHeight.firstChild) labelHeight.firstChild.nodeValue = "Height (inches): ";
      if (labelWeight.firstChild) labelWeight.firstChild.nodeValue = "Weight (lbs): ";
    });

    metricBtn.addEventListener("click", () => {
      metricBtn.classList.add("active");
      imperialBtn.classList.remove("active");
      if (labelHeight.firstChild) labelHeight.firstChild.nodeValue = "Height (cm): ";
      if (labelWeight.firstChild) labelWeight.firstChild.nodeValue = "Weight (kg): ";
    });
  }

  // =========================
  // BOOKMARK STORAGE
  // =========================
  function slugify(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getBookmarks() {
    try {
      const raw = localStorage.getItem("df_bookmarks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function setBookmarks(list) {
    localStorage.setItem("df_bookmarks", JSON.stringify(list));
  }

  function isBookmarked(id) {
    return getBookmarks().includes(id);
  }

  function toggleBookmark(id) {
    const list = getBookmarks();
    const i = list.indexOf(id);
    if (i === -1) list.push(id);
    else list.splice(i, 1);
    setBookmarks(list);
  }

  // =========================
  // CREATE MODAL (JS ONLY)
  // =========================
  function createModal() {
    const modal = document.createElement("div");
    modal.id = "dfModal";
    modal.className = "modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="modal__backdrop" data-close="true"></div>

      <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Details">
        <button class="modal__close" data-close="true" aria-label="Close">×</button>

        <img class="modal__img" id="dfModalImg" alt="Card image">

        <div class="modal__content">
          <h3 id="dfModalTitle"></h3>
          <p class="modal__meta" id="dfModalMeta"></p>
          <p class="modal__desc" id="dfModalDesc"></p>

          <div class="modal__actions">
            <a href="#" class="btn-dark" id="dfModalBegin">Begin →</a>
            <button class="btn-light" id="dfModalBookmark" aria-pressed="false">Bookmark</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    return {
      modal,
      img: modal.querySelector("#dfModalImg"),
      title: modal.querySelector("#dfModalTitle"),
      meta: modal.querySelector("#dfModalMeta"),
      desc: modal.querySelector("#dfModalDesc"),
      begin: modal.querySelector("#dfModalBegin"),
      bookmark: modal.querySelector("#dfModalBookmark")
    };
  }

  const modalRefs = createModal();
  const modal = modalRefs.modal;

  let activeId = null;

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeId = null;
  }

  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  function updateBookmarkUI() {
    if (!activeId) return;
    const saved = isBookmarked(activeId);
    modalRefs.bookmark.classList.toggle("is-bookmarked", saved);
    modalRefs.bookmark.textContent = saved ? "Bookmarked ✓" : "Bookmark";
    modalRefs.bookmark.setAttribute("aria-pressed", saved ? "true" : "false");
  }

  modalRefs.bookmark.addEventListener("click", () => {
    if (!activeId) return;
    toggleBookmark(activeId);
    updateBookmarkUI();
  });

  // =========================
  // HELPERS: pull info from existing card HTML
  // =========================
  function getTitleFromCard(card) {
    const t = card.querySelector(".workout-title-text, h3, h4");
    return t ? t.textContent.trim() : "Card";
  }

  function getImageFromCard(card) {
    const img = card.querySelector("img");
    return img ? img.getAttribute("src") : "";
  }

  // Workouts meta: emoji comes from <span class="legend"> (reliable)
  function parseWorkoutMeta(card) {
    const legendEl = card.querySelector(".legend");
    const icon = legendEl ? legendEl.textContent.trim() : "💪";

    const metaEl = card.querySelector(".workout-meta");
    if (!metaEl) {
      return { icon, level: "Beginner", mins: "10 min" };
    }

    const full = metaEl.textContent.replace(/\s+/g, " ").trim();
    const cleaned = full.startsWith(icon) ? full.slice(icon.length).trim() : full;
    const parts = cleaned.split("·").map(s => s.trim());

    return {
      icon,
      level: parts[0] || "Beginner",
      mins: parts[1] || "10 min"
    };
  }

  // Nutrition meta for recipes
  const nutritionMetaMap = {
    "breakfast": { icon: "🍳", label: "Recipe", extra: "5–10 min" },
    "lunch":     { icon: "🥗", label: "Recipe", extra: "10–15 min" },
    "dinner":    { icon: "🍲", label: "Recipe", extra: "15–25 min" },
    "snack":     { icon: "🍌", label: "Recipe", extra: "2–5 min" }
  };

  // Descriptions (JS-only)
  const descriptions = {
    // Workouts
    "morning-jump-start": "A quick full-body wake-up routine to raise your heart rate and loosen joints for the day.",
    "leg-liquifier": "Lower-body focused mobility + burn. Great after leg day or before a tough session.",
    "bed-time-yoga": "A calming flow to release tension and improve sleep quality.",
    "beginner-yoga": "Foundational poses to build flexibility and reduce soreness.",
    "hip-opener-flow": "Targets tight hips and glutes to improve range of motion and reduce back strain.",
    "recovery-reset": "Reset your body with light movement to boost circulation and speed recovery.",
    "strength-mastery": "Build real muscle with progressive strength training using free weights.",
    "hiit-cardio-blast": "High intensity intervals designed to burn fat and improve conditioning fast.",
    "yoga": "Stretch and strengthen with guided yoga sessions to improve flexibility and reduce injury risk.",
    "upper-body": "Train chest, shoulders, back, and arms with structured routines and progressive overload.",
    "lower-body": "Build glutes and legs with workouts focused on stability, power, and endurance.",
    "full-body": "Full-body sessions that hit major muscle groups for maximum efficiency.",

    // Nutrition recipes
    "breakfast": "Fast, high-protein breakfast ideas to start your day energized.",
    "lunch": "Balanced meals with protein + carbs + fiber to keep energy steady.",
    "dinner": "Easy dinners that scale for weight loss, maintain, or gain goals.",
    "snack": "Quick snack ideas that support your macros without feeling heavy."
  };

  function makeIdFromTitle(title) {
    return slugify(title);
  }

  // =========================
  // WORKOUTS: clickable cards → modal
  // =========================
  const workoutCards = [
    ...document.querySelectorAll(".focus-card"),
    ...document.querySelectorAll(".mini-card"),
    ...document.querySelectorAll(".featured-card--text"),
    ...document.querySelectorAll(".target-item")
  ];

  workoutCards.forEach(card => {
    card.classList.add("is-clickable");

    const title = getTitleFromCard(card);
    const id = makeIdFromTitle(title);

    card.addEventListener("click", (e) => {
      // don't hijack actual links inside the card
      if (e.target.closest("a")) return;

      activeId = id;

      const imgSrc = getImageFromCard(card);
      if (imgSrc) {
        modalRefs.img.src = imgSrc;
        modalRefs.img.style.display = "block";
      } else {
        modalRefs.img.style.display = "none";
      }

      modalRefs.title.textContent = title;

      const meta = parseWorkoutMeta(card);
      modalRefs.meta.textContent = `${meta.icon} ${meta.level} · ${meta.mins}`;

      modalRefs.desc.textContent = descriptions[id] || "A guided session designed to support your goals with efficient training and recovery.";

      // Begin can later link to a real workout detail page
      modalRefs.begin.setAttribute("href", "#");

      updateBookmarkUI();
      openModal();
    });
  });

  // =========================
  // NUTRITION: recipe cards → modal
  // =========================
  const recipeCards = [...document.querySelectorAll(".menu-card")];

  recipeCards.forEach(card => {
    card.classList.add("is-clickable");

    const title = getTitleFromCard(card);
    const id = makeIdFromTitle(title);

    card.addEventListener("click", (e) => {
      // allow the existing "Quick Breakfast →" link to work normally
      if (e.target.closest("a")) return;

      activeId = id;

      const imgSrc = getImageFromCard(card);
      if (imgSrc) {
        modalRefs.img.src = imgSrc;
        modalRefs.img.style.display = "block";
      } else {
        modalRefs.img.style.display = "none";
      }

      modalRefs.title.textContent = title;

      const meta = nutritionMetaMap[id] || { icon: "🍽️", label: "Recipe", extra: "" };
      modalRefs.meta.textContent = `${meta.icon} ${meta.label}${meta.extra ? " · " + meta.extra : ""}`;

      modalRefs.desc.textContent = descriptions[id] || "More details coming soon.";

      // Recipes: you can point to a future recipes page; for now assessments works
      modalRefs.begin.setAttribute("href", "assessments.html");

      updateBookmarkUI();
      openModal();
    });
  });

  // =========================
  // NUTRITION: goal cards → assessments (NO MODAL)
  // =========================
  document.querySelectorAll(".goal-card").forEach(card => {
    card.classList.add("is-clickable");
    card.addEventListener("click", () => {
      window.location.href = "assessments.html";
    });
  });

});