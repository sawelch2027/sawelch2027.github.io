document.addEventListener("DOMContentLoaded", function () {

    const water = document.querySelector(".water");

    // LOOP TO CREATE BUBBLES
    for (let i = 0; i < 30; i++) {

        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Random horizontal position inside bowl
        bubble.style.left = Math.random() * 230 + "px";

        // Random size
        let size = 5 + Math.random() * 20;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        // Random speed
        bubble.style.animationDuration = (3 + Math.random() * 5) + "s";

        // Random delay so they don't all start together
        bubble.style.animationDelay = Math.random() * 5 + "s";

        water.appendChild(bubble);
    }

});
