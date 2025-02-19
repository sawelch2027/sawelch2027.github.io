document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("draw-stairs").addEventListener("click", toggleDropdown);
});

function toggleDropdown() {
    console.log("Button Clicked"); // Debugging

    let container = document.getElementById("ladder-container");

    // If ladder already exists, clear and recreate
    container.innerHTML = ""; // Ensures old ladder is removed

    // Create the left rail
    let railLeft = document.createElement("div");
    railLeft.id = "ladder-rail-left";
    container.appendChild(railLeft);

    // Create the right rail
    let railRight = document.createElement("div");
    railRight.id = "ladder-rail-right";
    container.appendChild(railRight);

    // Create 10 steps using a for loop
    for (let i = 0; i < 10; i++) {
        let step = document.createElement("div");
        step.className = "ladder-step";
        container.appendChild(step);
    }

    // Create the stickman placeholder
    let stickman = document.createElement("img");
    stickman.src = "images/left.png"; 
    stickman.id = "stickman";
    stickman.style.position = "absolute";
    stickman.style.bottom = "0px"; // Initially at the bottom
    stickman.style.left = "50%";
    stickman.style.transform = "translateX(-50%)";
    stickman.style.width = "50px";

    container.appendChild(stickman);

    // Create the "Climb Stairs" button
    let climbButton = document.createElement("button");
    climbButton.id = "climb-stairs";
    climbButton.innerText = "Climb Stairs";
    climbButton.style.display = "block";
    climbButton.style.marginTop = "10px";
    climbButton.style.marginBottom = "-20px";
    climbButton.style.position = "absolute";
    climbButton.style.bottom = "-40px";
    climbButton.style.left = "50%";
    climbButton.style.transform = "translateX(-50%)";

    container.appendChild(climbButton);
}
