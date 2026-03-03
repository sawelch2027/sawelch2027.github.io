// -----------------------
// SLUGIFY (GLOBAL)
// -----------------------
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  if (!nav) return;
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // BOOKMARKS
  // =========================
  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem("df_bookmarks")) || [];
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
  // MODAL (JS ONLY)
  // =========================
  function createModal() {
    const existing = document.getElementById("dfModal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "dfModal";
    modal.className = "modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="modal__backdrop" data-close="true"></div>
      <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Workout details">
        <button class="modal__close" data-close="true" aria-label="Close">×</button>

        <img class="modal__img" id="dfModalImg" alt="Workout image">

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
  let activeId = null;

  function openModal() {
    modalRefs.modal.classList.add("is-open");
    modalRefs.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modalRefs.modal.classList.remove("is-open");
    modalRefs.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeId = null;
  }

  modalRefs.modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalRefs.modal.classList.contains("is-open")) closeModal();
  });

  function syncModalBookmark() {
    if (!activeId) return;
    const saved = isBookmarked(activeId);
    modalRefs.bookmark.textContent = saved ? "Bookmarked ✓" : "Bookmark";
    modalRefs.bookmark.classList.toggle("is-bookmarked", saved);
    modalRefs.bookmark.setAttribute("aria-pressed", saved ? "true" : "false");
  }

  modalRefs.bookmark.addEventListener("click", () => {
    if (!activeId) return;
    toggleBookmark(activeId);
    syncModalBookmark();
  });

  // =========================
  // WORKOUTS JSON → RENDER
  // =========================
  const featuredGrid = document.getElementById("featuredGrid");
  const focusGrid = document.getElementById("focusGrid");
  const targetGrid = document.getElementById("targetGrid");

  // Only run this on workouts page
  if (!featuredGrid && !focusGrid && !targetGrid) return;

  const JSON_URL = "https://sawelch2027.github.io/project/part6/json/workouts.json";

  function renderFeatured(items) {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = items.map(item => `
      <div class="featured-card featured-card--text workout-card"
           data-id="wk_${item._id}"
           data-title="${item.title}"
           data-icon="${item.icon}"
           data-level="${item.level}"
           data-minutes="${item.minutes}"
           data-desc="${item.desc || ""}"
           data-img="${item.img_name}"
           data-page="${item.page || "#"}">
        <h3 class="workout-title-text">${item.title}</h3>
        <p>${item.desc || ""}</p>
        <div class="featured-actions">
          <a class="btn-dark" href="${item.page && item.page !== "#" ? item.page : "assessments.html"}">Begin →</a>
          <button class="btn-light js-bookmark" type="button">Bookmark</button>
        </div>
      </div>

      <div class="featured-card featured-card--image">
        <img src="${item.img_name}" alt="${item.title}">
      </div>
    `).join("");
  }

  function renderFocus(items) {
    if (!focusGrid) return;

    // Simple clean grid (you can make “big + right column” after it works)
    focusGrid.innerHTML = items.map(item => {
      const href = item.page && item.page !== "#" ? item.page : "#";
      return `
        <a class="card-link" href="${href}">
          <div class="focus-card workout-card"
               data-id="wk_${item._id}"
               data-title="${item.title}"
               data-icon="${item.icon}"
               data-level="${item.level}"
               data-minutes="${item.minutes}"
               data-desc="${item.desc || ""}"
               data-img="${item.img_name}"
               data-page="${item.page || "#"}">
            <img src="${item.img_name}" alt="${item.title}">
            <div class="focus-card__bar">
              <div>
                <h3 class="workout-title-text">${item.title}</h3>
                <p class="workout-meta"><span class="legend">${item.icon}</span> ${item.level} · ${item.minutes} min</p>
              </div>
              <div class="focus-actions">
                <span class="btn-dark">View →</span>
                <span class="btn-light">Details</span>
              </div>
            </div>
          </div>
        </a>
      `;
    }).join("");
  }

  function renderTarget(items) {
    if (!targetGrid) return;
    targetGrid.innerHTML = items.map(item => `
      <div class="target-item workout-card"
           data-id="wk_${item._id}"
           data-title="${item.title}"
           data-icon="${item.icon}"
           data-level="${item.level}"
           data-minutes="${item.minutes}"
           data-desc="${item.desc || ""}"
           data-img="${item.img_name}"
           data-page="${item.page || "#"}">
        <div class="target-icon">${item.icon}</div>
        <div>
          <h3 class="workout-title-text">${item.title}</h3>
          <p>${item.desc || ""}</p>
        </div>
      </div>
    `).join("");
  }

  function wireWorkoutCardClicks() {
    document.querySelectorAll(".workout-card").forEach(card => {

      // Bookmark button inside cards (if present)
      const bm = card.querySelector(".js-bookmark");
      if (bm) {
        const id = card.dataset.id;
        bm.textContent = isBookmarked(id) ? "Bookmarked ✓" : "Bookmark";

        bm.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBookmark(id);
          bm.textContent = isBookmarked(id) ? "Bookmarked ✓" : "Bookmark";
        });
      }

      // Clicking card -> modal unless it has a real page
      card.addEventListener("click", (e) => {
        const page = card.dataset.page || "#";

        // If inside an <a> with a real href, let it navigate
        const link = card.closest("a");
        if (link && link.getAttribute("href") && link.getAttribute("href") !== "#") return;

        // If this card has a real page path, navigate
        if (page && page !== "#") {
          window.location.href = page;
          return;
        }

        e.preventDefault();

        activeId = card.dataset.id;
        modalRefs.title.textContent = card.dataset.title || "Workout";
        modalRefs.meta.textContent = `${card.dataset.icon || "💪"} ${card.dataset.level || "Beginner"} · ${card.dataset.minutes || "10"} min`;
        modalRefs.desc.textContent = card.dataset.desc || "More details coming soon.";

        const img = card.dataset.img || "";
        if (img) {
          modalRefs.img.src = img;
          modalRefs.img.style.display = "block";
        } else {
          modalRefs.img.style.display = "none";
        }

        modalRefs.begin.setAttribute("href", "assessments.html");
        syncModalBookmark();
        openModal();
      });
    });
  }

  async function loadWorkoutsFromJson() {
    try {
      const res = await fetch(JSON_URL);
      if (!res.ok) throw new Error("Fetch failed: " + res.status);
      const all = await res.json();
      console.log("Workouts JSON loaded:", all);

      const featured = all.filter(x => x.section === "featured");
      const focus = all.filter(x => x.section === "focus");
      const target = all.filter(x => x.section === "target");

      renderFeatured(featured);
      renderFocus(focus);
      renderTarget(target);

      wireWorkoutCardClicks();

    } catch (err) {
      console.error("JSON error:", err);
      if (focusGrid) focusGrid.innerHTML = "<p style='color:white;'>Could not load workouts.</p>";
    }
  }

  loadWorkoutsFromJson();
});