// Song Arrays 
const happySongs = [
  { title: "Whistle for the Choir - The Fratilles", url:"https://www.youtube.com/embed/o1oKBbReaOs"},
  { title: "Happy - Pharrell", url: "https://www.youtube.com/embed/ZbZSe6N_BXs" },
  { title: "Good as Hell - Lizzo", url: "https://www.youtube.com/embed/SmbmeOgWsqE" }
];

const sadSongs = [
  { title: "Someone Like You - Adele", url: "https://www.youtube.com/embed/hLQl3WQQoQ0" },
  { title: "Fix You - Coldplay", url: "https://www.youtube.com/embed/k4V3Mo61fJM" },
  { title: "Movement - Hozier", url: "https://www.youtube.com/embed/OSye8OO5TkM"}
];

// Toggle dropdown
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Select Happy or Sad
function selectOption(option) {

  const button = document.getElementById("dropButton");
  const songListDiv = document.getElementById("songList");
  const videoContainer = document.getElementById("videoContainer");

  button.innerHTML = option + " &#8964;";
  document.getElementById("myDropdown").classList.remove("show");

  songListDiv.innerHTML = "";
  videoContainer.innerHTML = ""; // clear

  let songs;

  if (option === "Happy") {
    songs = happySongs;
  } else {
    songs = sadSongs;
  }

  const ul = document.createElement("ul");

  for (let i = 0; i < songs.length; i++) {

    const li = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = songs[i].title;
    link.href = "#";

    
    link.onclick = function() {
      showVideo(songs[i].url);
      return false;
    };

    li.appendChild(link);
    ul.appendChild(li);
  }

  songListDiv.appendChild(ul);
}

function showVideo(url) {
  const videoContainer = document.getElementById("videoContainer");

  videoContainer.innerHTML = `
    <iframe width="560" height="315"
      src="${url}"
      frameborder="0"
      allowfullscreen>
    </iframe>
  `;
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    document.getElementById("myDropdown").classList.remove("show");
  }
}
