document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("rangeSlider");
    const valueDisplay = document.getElementById("sliderValue");
    const messageDisplay = document.getElementById("sliderMessage"); // New reference

    function updateSlider() {
        const val = parseInt(slider.value); // Get current value as a number
        const percent = ((val - slider.min) / (slider.max - slider.min)) * 100;

        slider.style.background =
            `linear-gradient(to right, #302207 ${percent}%, #ddd ${percent}%)`;

        valueDisplay.textContent = val + " minutes";

        // Logic for messages based on intervals
        if (val > 45) {
            messageDisplay.textContent = "Let's have bacon and eggs! 🥓🍳";
        } else if (val >= 30) {
            messageDisplay.textContent = "Time for a quick coffee. ☕";
        } else if (val >= 15) {
            messageDisplay.textContent = "Better start packing your bag! 🎒";
        } else {
            messageDisplay.textContent = "Run! You're going to be late! 🏃💨";
        }
    }

    slider.addEventListener("input", updateSlider);
    updateSlider(); // Run once on load
});

const linkEx1 = document.getElementById("link-ex1");
const linkEx2 = document.getElementById("link-ex2");
const ex1Div = document.getElementById("exercise1");
const ex2Div = document.getElementById("exercise2");

linkEx1.onclick = (e) => {
    e.preventDefault(); // Prevents the page from jumping/reloading
    ex1Div.classList.remove("hidden");
    ex2Div.classList.add("hidden");
};

linkEx2.onclick = (e) => {
    e.preventDefault();
    document.getElementById("exercise1").classList.add("hidden");
    document.getElementById("exercise2").classList.remove("hidden");
};

function checkClassStatus() {
    const messageDisplay = document.getElementById("classMessage");
    
    const now = new Date();
    const classTime = new Date();
    
    // Set class time to 8:30:00 AM today
    classTime.setHours(8, 30, 0, 0);

    // Calculate difference in minutes
    // (Result is positive if now < 8:30, negative if now > 8:30)
    const diffMs = classTime - now;
    const diffMins = Math.floor(diffMs / 1000 / 60);

    let message = "";

    if (diffMins > 15) {
        message = `You have ${diffMins} minutes. Plenty of time to grab a snack! 🥐`;
    } else if (diffMins >= 10) {
        message = `Only ${diffMins} minutes left! Start walking. 🚶‍♂️`;
    } else if (diffMins >= 5) {
        message = `Time is ticking! ${diffMins} minutes until she starts attendance! ⏱️`;
    } else if (diffMins >= 0) {
        message = `HURRY! You have ${diffMins} minutes to find a seat! 🏃‍♀️💨`;
    } else if (diffMins >= -5) {
        message = "Class started! Sneak in through the back door. 🤫";
    } else if (diffMins >= -15) {
        message = "You're late! Hope you have a good excuse. 😬";
    } else {
        message = "Class is well underway. Better luck tomorrow! 🛌";
    }

    messageDisplay.textContent = message;
}


linkEx2.onclick = (e) => {
    e.preventDefault();
    ex1Div.classList.add("hidden");
    ex2Div.classList.remove("hidden");
    checkClassStatus(); 
};

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("main-nav");

hamburger.onclick = () => {
    navMenu.classList.toggle("show");
};

// Optional: Close the menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 600) {
            navMenu.classList.remove("show");
        }
    });
});

hamburger.onclick = () => {
    // 1. Toggle the menu visibility
    navMenu.classList.toggle("show");

    // 2. Check if the menu is now shown
    if (navMenu.classList.contains("show")) {
        hamburger.innerHTML = "&#9650;";
    } else {
        hamburger.innerHTML = "&#9660;";
    }
};

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 600) {
            navMenu.classList.remove("show");
            // Reset the icon when a link is selected
            hamburger.innerHTML = "&#9660;";
        }
    });
});