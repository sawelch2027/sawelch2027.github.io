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

