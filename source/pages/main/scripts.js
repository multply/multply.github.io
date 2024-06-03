const requestField = document.getElementById("request-field");
const responseField = document.getElementById("response-field");

responseField.oninput = onResponseInput;

const resultTotalText = document.getElementById("result-text-total");
const resultRightText = document.getElementById("result-text-right");
const resultWrongText = document.getElementById("result-text-wrong");

let resultTotal = 0;
let resultRight = 0;
let resultWrong = 0;

const timerElement = document.getElementById("header-timer");
const progressBar = document.getElementById("timer-progress-bar");

const returnButton = document.getElementById("header-return-button");

returnButton.onclick = onReturnClicked;

const TABLE = localStorage.getItem("table");
const TIME = localStorage.getItem("time");

let requestAnswer;

generateRequest();

if (TIME != "-1"){
    tickTimer(parseInt(TIME));
}

else {
    timerElement.innerHTML = "00:00";
    progressBar.style.background = "fixed";
    progressBar.style.backgroundColor = "black";
}

function onResponseInput() {
    const input = responseField.value;

    if (input === requestAnswer) {
        onResponseSent(true);
        return;
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i] !== requestAnswer[i]) {
            onResponseSent(false);
        }
    }
}

function onResponseSent(correct) {
    requestAnswer = "-";

    previousValue = "";
    responseField.value = "";

    resultTotal += 1;
    resultTotalText.innerHTML = `Total - ${resultTotal}`;

    if (correct) {
        resultRight += 1;
        resultRightText.innerHTML = `Right - ${resultRight}`;
    }

    else {
        resultWrong += 1;
        resultWrongText.innerHTML = `Wrong - ${resultWrong}`;
    }

    generateRequest();
}

function generateRequest() {
    num1 = TABLE;
    num2 = Math.floor((Math.random() * Math.max(10, TABLE)) + 1);

    requestAnswer = String(num1 * num2);

    requestField.innerHTML = `${num1}×${num2}`;
}

function tickTimer(time) {
    minutes = Math.floor(time / 60);

    seconds = time % 60;
    secondsPadded = seconds < 10 ? `0${seconds}` : seconds;

    timerElement.innerHTML = `${minutes}:${secondsPadded}`;

    progress = 100 * TIME / time;

    progressBar.style.background = 
    `linear-gradient(
        to right,
        black ${progress}%, 
        black ${progress}%, 
        grey ${progress}%, 
        grey 100%)`;

    if (time <= 0){
        onFinished();
        return;
    }

    setTimeout(() => tickTimer(time - 1), 1000);
}

function onFinished() {
    localStorage.setItem("table", TABLE);
    localStorage.setItem("time", TIME);

    localStorage.setItem("resultTotal", resultTotal);
    localStorage.setItem("resultRight", resultRight);
    localStorage.setItem("resultWrong", resultWrong);

    window.location.href = "/docs/pages/result/index.html";
}

function onReturnClicked() {
    localStorage.setItem("table", TABLE);
    localStorage.setItem("time", TIME);

    window.location.href = "/index.html";
}