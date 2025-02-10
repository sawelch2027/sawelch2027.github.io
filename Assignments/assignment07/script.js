function update() {
    var star = document.getElementById("star");
    var colorPicker = document.getElementById("colorPicker");
    star.style.backgroundColor = colorPicker.value;
}

document.addEventListener("input", function (e) {
    if (e.target.id == "colorPicker") {
        update();
    }
});

document.addEventListener("DOMContentLoaded", update); // Set initial color

document.addEventListener('click', function() { 
    const message = document.getElementById('message');

    if (message.classList.contains('hidden')) {
        message.classList.remove('hidden'); // Show the first "Hello!" if it's hidden
    } else {
        const newMessage = document.createElement('p'); // Create a new <p> element
        newMessage.textContent = 'Hello!'; // Set its text
        message.appendChild(newMessage); // Append inside #message div
    }
});

 function changeImage()
        {
        var img = document.getElementById("image");
        img.src="image2.png";
        return false;
        }