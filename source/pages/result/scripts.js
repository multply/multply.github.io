const resultTextTable = document.getElementById("result-text-table");
const resultTextTotal = document.getElementById("result-text-total");
const resultTextRight = document.getElementById("result-text-right");
const resultTextWrong = document.getElementById("result-text-wrong");

resultTextTable.innerHTML = `Table - ${getFormattedText(localStorage.getItem("table"))}`;
resultTextTotal.innerHTML = `Total - ${getFormattedText(localStorage.getItem("resultTotal"))}`;
resultTextRight.innerHTML = `Right - ${getFormattedText(localStorage.getItem("resultRight"))}`;
resultTextWrong.innerHTML = `Wrong - ${getFormattedText(localStorage.getItem("resultWrong"))}`;

const buttonReturn = document.getElementById("button-return");
const buttonPlayAgain = document.getElementById("button-play-again");

buttonReturn.onclick = onClickedReturn;
buttonPlayAgain.onclick = onClickedPlayAgain;

function getFormattedText(value) {
    let result = "";

    if (value < 9) {
        result = result + " ";
    }

    if (value < 99) {
        result = result + " ";
    }

    result = result + value;
    return result;
}

function onClickedReturn() {
    window.location.href = "/index.html";
}

function onClickedPlayAgain() {
    window.location.href = "/source/pages/main/index.html";
}