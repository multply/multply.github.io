import Format from "../../global/scripts/text-format.js";
import Navigation from "../../global/scripts/page-navigation.js";

const resultData = {
    total: 0,
    wrong: 0,
    right: 0
};

const activeData = {
    answer: "",
    table: 0,
    time: 0
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
    elements.responseInput.addEventListener("keyup", (event) => _onResponseInput(event));
})();

(function fetchStoredData() {
    const [TABLE, TIME] = Navigation.decodeURL(
        Navigation.getCurrentURL(),
        (val) => Number(val),
        "table",
        "time"
    );

    activeData.time = TIME;
    activeData.table = TABLE;
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

        const PROGRESS = (time / activeData.time) * 100;
        progressBar.style.background = 
            `linear-gradient(to right,
            var(--color-detail) ${PROGRESS}%, 
            var(--color-detail) ${PROGRESS}%, 
            var(--color-base-1) ${PROGRESS}%, 
            var(--color-base-1) 100%)`;

        setTimeout(() => timerTick(time - 1), 1000);
    }

    if (activeData.time == -1){
        timerText.innerHTML = "00:00";
        progressBar.style.background = "fixed";
        progressBar.style.backgroundColor = "var(--color-detail)";

        return;
    }

    timerTick(activeData.time);
})();

function onFinished() {
    const RESULT_PACKET = `-${resultData.total}-${resultData.right}-${resultData.wrong}`;
    
    const URL_ = Navigation.encodeURL(
        Navigation.pathToURL("/source/pages/result/index.html"),
        Navigation.packet("table", activeData.table),
        Navigation.packet("time", activeData.time),
        Navigation.packet("result", RESULT_PACKET)
    );

    Navigation.navigateTo(URL_);
}

generateRequest();

function generateRequest() {
    function generate(iteration, prev) {
        if(iteration > 100) {
            return prev;
        }

        const NUM_0 = activeData.table;
        const NUM_1 = Math.floor((Math.random() * Math.max(10, NUM_0)) + 1);

        const ANS = String(NUM_0 * NUM_1)

        if(ANS === activeData.answer){
            return generate(iteration + 1, ANS);
        }

        return [
            NUM_0,
            NUM_1,
            ANS
        ];
    }

    const [NUM_0_, NUM_1_, ANS_] = generate(0);

    elements.requestText.innerHTML = `${NUM_0_}×${NUM_1_}`;
    
    activeData.answer = ANS_;
}

function _onResponseInput(event) {
    const INPUT = elements.responseInput.value;
    const ANSWER = activeData.answer;

    const KEY = event.key;

    if(KEY === "Backspace"){
        return;
    }
    
    if (KEY === "Enter" && INPUT) {
        onAnswered(INPUT === ANSWER);
        return;
    }

    if(!/\d/.test(KEY)) {
        elements.responseInput.value = INPUT.substring(0, INPUT.length - 1);
        return;
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
    const URL_ = Navigation.encodeURL(
        Navigation.pathToURL("/index.html"),
        Navigation.packet("table", activeData.table),
        Navigation.packet("time", activeData.time)
    );

    Navigation.navigateTo(URL_);
}