import Format from "../../global/scripts/format.js";

(function writeText() {
    const TABLE = localStorage.getItem("INPT_TABLE");
    const TOTAL = localStorage.getItem("RES_TOTAL");
    const RIGHT = localStorage.getItem("RES_RIGHT");
    const WRONG = localStorage.getItem("RES_WRONG");

    const FORMAT_LENGTH = Math.max(TABLE.length, TOTAL.length, RIGHT.length, WRONG.length);
    console.log(FORMAT_LENGTH);

    document.getElementById("result-text-table").innerHTML = `Table - ${Format.wsFormat(TABLE, FORMAT_LENGTH, false)}`;
    document.getElementById("result-text-total").innerHTML = `Total - ${Format.wsFormat(TOTAL, FORMAT_LENGTH, false)}`;
    document.getElementById("result-text-right").innerHTML = `Right - ${Format.wsFormat(RIGHT, FORMAT_LENGTH, false)}`;
    document.getElementById("result-text-wrong").innerHTML = `Wrong - ${Format.wsFormat(WRONG, FORMAT_LENGTH, false)}`;
})();

(function addEvents() {
    document.getElementById("button-return").addEventListener("click", _onClickedReturn);
    document.getElementById("button-play-again").addEventListener("click", _onClickedPlayAgain);
})();

function _onClickedReturn() {
    window.location.href = "/index.html";
}

function _onClickedPlayAgain() {
    window.location.href = "/source/pages/main/index.html";
}