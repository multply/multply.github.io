import Format from "../../global/scripts/format.js";

const resultData = {
    total: 0,
    wrong: 0,
    right: 0
};

const activeData = {
    table: Number(localStorage.getItem("INPT_TABLE")) ?? 10,
    answer: ""
};

const elements = {
    resultTotalText: document.getElementById("result-text-total"),
    resultRightText: document.getElementById("result-text-right"),
    resultWrongText: document.getElementById("result-text-wrong"),
    responseInput: document.getElementById("response-input"),
    requestText: document.getElementById("request-text")
};

(function addEvents() {
    document.getElementById("header-return-button").addEventListener("click", _onReturnClicked);
    elements.responseInput.addEventListener("input", _onResponseInput);
})();

(function timerStart() {
    const timerText = document.getElementById("header-timer");
    const progressBar = document.getElementById("timer-progress-bar");

    function timerTick(time) {
        if(time < 1){
            onFinished();
            return;
        }

        timerText.innerHTML = Format.timeFormat(time);

        const PROGRESS = (time / TIME) * 100;
        progressBar.style.background = 
            `linear-gradient(to right,
            var(--color-detail) ${PROGRESS}%, 
            var(--color-detail) ${PROGRESS}%, 
            var(--color-base-1) ${PROGRESS}%, 
            var(--color-base-1) 100%)`;

        setTimeout(() => timerTick(time - 1), 1000);
    }

    const TIME = localStorage.getItem("INPT_TIME");
    if (TIME == "-1"){
        timerText.innerHTML = "00:00";
        progressBar.style.background = "fixed";
        progressBar.style.backgroundColor = "var(--color-detail)";

        return;
    }

    timerTick(Number(TIME));
})();

function onFinished() {
    localStorage.setItem("RES_TOTAL", resultData.total);
    localStorage.setItem("RES_RIGHT", resultData.right);
    localStorage.setItem("RES_WRONG", resultData.wrong);

    window.location.href = "/source/pages/result/index.html";
}

generateRequest();

function generateRequest() {
    const NUM_0 = activeData.table;
    const NUM_1 = Math.floor((Math.random() * Math.max(10, NUM_0)) + 1);

    elements.requestText.innerHTML = `${NUM_0}×${NUM_1}`;

    activeData.answer = String(NUM_0 * NUM_1);
}

function _onResponseInput() {
    const INPUT = elements.responseInput.value;
    const ANSWER = activeData.answer;

    if (INPUT === ANSWER) {
        onAnswered(true);
        return;
    }

    for (let i = 0; i < INPUT.length; i++) {
        if (INPUT[i] !== ANSWER[i]) {
            onAnswered(false);
            return;
        }
    }
}

function onAnswered(correct) {
    elements.responseInput.value = "";

    resultData.total += 1;
    resultData.right += correct ? 1 : 0;
    resultData.wrong += correct ? 0 : 1;

    elements.resultTotalText.innerHTML = `Total - ${resultData.total}`;
    elements.resultRightText.innerHTML = `Right - ${resultData.right}`;
    elements.resultWrongText.innerHTML = `Wrong - ${resultData.wrong}`;

    generateRequest();
}

function _onReturnClicked() {
    window.location.href = "/index.html";
}