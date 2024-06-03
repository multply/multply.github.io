let tableIndex = 0;
let timeIndex = 0;

const tableList = [
    2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12,
    13, 14
];

const timeList = [
    -1, 30, 45, 60, 
    90, 120, 150, 
    180, 240, 300
];

const tableDisplay = document.getElementById("table-input-display");
const timeDisplay = document.getElementById("time-input-display");

document.getElementById("table-input-dec").addEventListener("click", () => onChangeTable(-1));
document.getElementById("table-input-inc").addEventListener("click", () => onChangeTable(1));

document.getElementById("time-input-dec").addEventListener("click", () => onChangeTime(-1));
document.getElementById("time-input-inc").addEventListener("click", () => onChangeTime(1));

document.getElementById("start-button").addEventListener("click", onClickStart);

const PREV_TABLE = localStorage.getItem("table");
const PREV_TIME = localStorage.getItem("time");

if (PREV_TABLE != null) {
    tableIndex = tableList.indexOf(Number(PREV_TABLE));
}
if (PREV_TIME != null) {
    timeIndex = timeList.indexOf(Number(PREV_TIME));
}

displayText(tableDisplay, tableList[tableIndex]);
displayText(timeDisplay, timeList[timeIndex], parseTimeValue);

function wrapValue(val, max) {
    if (val < 0) {
        return max - 1;
    }

    if (val >= max) {
        return 0;
    }

    return val;
}

function onChangeTable(inc) {
    tableIndex = wrapValue(tableIndex + inc, tableList.length);
    displayText(tableDisplay, tableList[tableIndex]);
}

function onChangeTime(inc) {
    timeIndex = wrapValue(timeIndex + inc, timeList.length);
    displayText(timeDisplay, timeList[timeIndex], parseTimeValue);
}

function parseTimeValue(val) {
    if(val == -1) {
        return "∞";
    }

    minutes = Math.floor(val / 60);
    seconds = val % 60;

    secondsText = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${secondsText}`;
}

function displayText(element, value, parse = (val) => val) {
    element.innerHTML = parse(value);
}

function onClickStart() {
    localStorage.setItem("table", tableList[tableIndex]);
    localStorage.setItem("time", timeList[timeIndex]);

    window.location.href = "/docs/pages/main/index.html";
}