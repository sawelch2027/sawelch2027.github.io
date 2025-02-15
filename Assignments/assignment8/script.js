document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("transportInput");
    const image = document.getElementById("transportImage");

    input.addEventListener("input", function () {
        const userInput = input.value.trim().toLowerCase(); 

        if (userInput === "bike") {
            image.src = "images/bike.jpg";
            image.alt = "Bike";
            image.style.display = "block";
        } else if (userInput === "scooter") {
            image.src = "images/scooter.jpg";
            image.alt = "Scooter";
            image.style.display = "block";
        } else if (userInput === "car") {
            image.src = "images/car.jpg";
            image.alt = "Car";
            image.style.display = "block";
        } else if (userInput === "skateboard") {
            image.src = "images/skateboard.jpg";
            image.alt = "Skateboard";
            image.style.display = "block";
        } else {
            image.src = "";
            image.alt = "";
            image.style.display = "none";
        }
    });
});

/**
 * Change the heart color based on the selected button
 */
function changeHeartColor(color) {
    const heart = document.getElementById('heart');
    
    
    if (color === 'red') {
        heart.style.color = 'red';
    } else if (color === 'green') {
        heart.style.color = 'green';
    } else if (color === 'blue') {
        heart.style.color = 'blue';
    }
}

/**
 * Show the selected exercise by toggling visibility
 */
function showExercise(exerciseNumber) {
    // Hide all exercises
    document.getElementById('exercise1').style.display = 'none';
    document.getElementById('exercise2').style.display = 'none';
    
    // Show the chosen exercise
    if (exerciseNumber === 1) {
        document.getElementById('exercise1').style.display = 'block';
    } else if (exerciseNumber === 2) {
        document.getElementById('exercise2').style.display = 'block';
    }
}

/**
 * Dropdown toggle logic
 */
function toggleDropdown() {
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("show"); // Toggle visibility of dropdown content
}

/**
 * Close the dropdown menu if the user clicks outside of it
 */
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content a')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}