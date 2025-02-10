//do stuff when button clicked
document.getElementById("btn-click-me").onclick = () => {
    console.log("WOW!");
    document.getElementById("result").innerHTML="Hi Portia";
};

//change color
document.getElementById("btn-color").onclick = () => {
    const messageP = document.getElementById("message");
    messageP.innerHTML = "Good bye";
    messageP.classList.toggle("sad");

}

//happy script
document.getElementById("btn-happy").onclick = () => {
    const happyP = document.getElementById("display");
    displayP.classList.remove("hidden");
    displayP.classList.add("happy");
    displayP.innerHTML = "Good Times";

};

//sad
document.getElementById("btn-sad").onclick = () => {
    const displayP = document.getElementById("display");
    displayP.classList.remove("hidden");
    displayP.classList.add("sad");
    displayP.innerHTML = "Sad Times";

};

document.getElementById("btn-clear").onclick = () => {
    document.getElementById("display").classList.add("hidden");
};
