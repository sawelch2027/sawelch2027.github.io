//start and stop ball bouncing
document.getElementById("btn-bounce").onclick = (e) => {
    const ball = document.getElementById("ball");

    if(e.currentTarget.innerHTML.toLowerCase() == "start"){
        e.currentTarget.innerHTML = "stop";
        ball.classList.add("bounce");
    }else{
        e.currentTarget.innerHTML = "start";
        ball.classList.remove("bounce");
    }
}

/*plant health */
const inputField = document.getElementById('txt-num-days');
const displayArea = document.getElementById('p-plant-message');

inputField.addEventListener('input', function(){
    displayArea.textContent = inputField.value;

        if(inputField <=0) {
            p.innerHTML = "Yay we were fed today";
        } else if (inputField <=2){
            this.parentElement.innerHTML = "I'm getting a little thirsty";
        } else if (inputFIeld <=5){
            this.parentElement.innerHTML = "I'm starting to wilt";
        } else { 
            this.parentElement.innerHTML = "you killed me";
        }
})

const p=document.getElementById("p-box");
let count=0;
let countInterval;
const startButton = document.getElementById("btn-start-count");

document.getElementById("btn-start-count").onclick = () => {
    startButton.disabled = true;
    countInterval = setInterval(()=>{
        p.innerHTML = count ++;
    },500); 
};

document.getElementById("btn-pause-count").onclick = () => {
    startButton.disabled = false;
    clearInterval(countInterval)
};

document.getElementById("btn-stop-count").onclick = () => {
    startButton.disabled = false;
    count = 0;
    clearInterval(countInterval)
};

document.getElementById("btn-first-loop").onclick = () => {
    const ul = document.getElementById("ul-first-loop");

    for(let i = 0; i < 10; i++){
        const li = document.createElement("li");
        li.innerHTML = `I'm the ${i+1} element`;
        ul.append(li);
    }
};

document.getElementById("btn-count-range").onclick = () => {
    const startNumber = parseInt(document.getElementById("txt-start").value);
    const endNumber = parseInt(document.getElementById("txt-end").value);
    const errorP = document.getElementById("error-range");
    errorP.innerHTML = "";
    const divNumRange = document.getElementById("number-range");

    if(startNumber > endNumber) {
        errorP.innerHTML = "not a valid range";
        return;
    }

    for(let i = startNumber; i < endNumber + 1; i++){
        const p = document.createElement("p");
        p.innerHTML = i;
        divNumRange.append(p);
        p.onclick = () => {
            console.log("clicked");
        };
    }

    

};
