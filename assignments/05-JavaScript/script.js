
const dateInput = document.getElementById('date-select');
const actionBtn = document.querySelector('.action-btn');


dateInput.addEventListener('change', (e) => {
    console.log("Selected Date:", e.target.value);
});


function toggleVisibility() {
    const triangle = document.getElementById('myTriangle');
    if (triangle.style.display === 'none' || triangle.style.display === '') {
        triangle.style.display = 'block';
    } else {
        triangle.style.display = 'none';
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const sunWrapper = document.getElementById('sunWrapper');

    sunWrapper.addEventListener('click', function(e) {
        this.classList.toggle('active');
    });
});

