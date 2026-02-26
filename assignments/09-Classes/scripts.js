class Song {
  constructor(title, artist, album, year, genre, coverArt, youtubeCode) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.genre = genre;
    this.coverArt = coverArt;
    this.youtubeCode = youtubeCode;
  }

  // Helper method: create a gallery card element
  createCard(onClick) {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;

    const bar = document.createElement("div");
    bar.className = "card__bar";

    const t = document.createElement("p");
    t.className = "card__title";
    t.textContent = this.title;

    const a = document.createElement("p");
    a.className = "card__artist";
    a.textContent = `by ${this.artist}`;

    bar.appendChild(t);
    bar.appendChild(a);

    const img = document.createElement("img");
    img.className = "card__img";
    img.src = this.coverArt;
    img.alt = `${this.title} cover art`;

    card.appendChild(bar);
    card.appendChild(img);

    card.addEventListener("click", () => onClick(this));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") onClick(this);
    });

    return card;
  }

  //fill modal with this song's data
  fillModal(modalEls) {
    modalEls.title.textContent = this.title;
    modalEls.artist.textContent = `by ${this.artist}`;
    modalEls.album.textContent = this.album;
    modalEls.year.textContent = this.year;
    modalEls.genre.textContent = this.genre;

    // embed
    modalEls.iframe.src = `https://www.youtube.com/embed/${this.youtubeCode}?autoplay=1`;
  }
}


const songs = [
  new Song(
    "Mudshovel",
    "Stained",
    "Tormented",
    "1999",
    "Nu Metal",
    "images/mudshovel.jpg",
    "FuAC9YIC2Bs"
  ),
  new Song(
    "Stateside",
    "Pinkpantheress, Zara Larsson",
    "Stateside",
    "2025",
    "UK R&B",
    "images/stateside.jpg",
    "lIxQe1R5hs0"
  ),
  new Song(
    "Somethin' Stupid",
    "Frank Sinatra, Nancy Sinatra",
    "Nothing But The Best",
    "1967",
    "Adult Contemporary",
    "images/frank.jpg",
    "fwEN2gOJdbw"
  ),
  new Song(
    "I'm the Worst",
    "Treaty Oak Revival",
    "Have A Nice Day",
    "2023",
    "South West Emo",
    "images/worst.jpg",
    "udm6nD3t2f4"
  )
];


const gallery = document.getElementById("gallery");

const modal = document.getElementById("songModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const modalEls = {
  iframe: document.getElementById("modalIframe"),
  title: document.getElementById("modalTitle"),
  artist: document.getElementById("modalArtist"),
  album: document.getElementById("modalAlbum"),
  year: document.getElementById("modalYear"),
  genre: document.getElementById("modalGenre")
};

function renderGallery() {
  gallery.innerHTML = "";
  for (let i = 0; i < songs.length; i++) {
    const card = songs[i].createCard(openModal);
    gallery.appendChild(card);
  }
}

function openModal(song) {
  song.fillModal(modalEls);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  // stop the video
  modalEls.iframe.src = "";
}

closeModalBtn.addEventListener("click", closeModal);

// click outside dialog closes
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

renderGallery();