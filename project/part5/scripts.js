function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("active");
}

/* =========================
   IMPERIAL / METRIC TOGGLE
========================= */

document.addEventListener("DOMContentLoaded", function(){

  const imperialBtn = document.getElementById("btn-imperial");
  const metricBtn = document.getElementById("btn-metric");

  const labelHeight = document.getElementById("label-height");
  const labelWeight = document.getElementById("label-weight");

  if(!imperialBtn || !metricBtn) return; // only runs on assessment page

  imperialBtn.addEventListener("click", function(){
    imperialBtn.classList.add("active");
    metricBtn.classList.remove("active");

    labelHeight.childNodes[0].nodeValue = "Height (inches): ";
    labelWeight.childNodes[0].nodeValue = "Weight (lbs): ";
  });

  metricBtn.addEventListener("click", function(){
    metricBtn.classList.add("active");
    imperialBtn.classList.remove("active");

    labelHeight.childNodes[0].nodeValue = "Height (cm): ";
    labelWeight.childNodes[0].nodeValue = "Weight (kg): ";
  });

});