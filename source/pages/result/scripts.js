import Format from "../../global/scripts/text-format.js";
import Navigation from "../../global/scripts/page-navigation.js";

const outData = {
    table: 0,
    time: 0
};

(function writeText() {
    const [TABLE, TIME, [TOTAL, RIGHT, WRONG]] = Navigation.decodeURL(
        Navigation.getCurrentURL(),
        (val) => {
            if(val[0] != "-") {
                return val;
            }
            return val.substring(1).split("-") || [0, 0, 0];
        },
        Navigation.getPacket("table", "10"),
        Navigation.getPacket("time", "120"),
        Navigation.getPacket("result", ["0", "0", "0"])
    );

    outData.table = TABLE;
    outData.time = TIME;

    const FORMAT_LENGTH = Math.max(TABLE.length, TOTAL.length, RIGHT.length, WRONG.length);

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
    const URL_ = Navigation.encodeURL(
        Navigation.pathToURL("/index.html"),
        Navigation.packet("table", outData.table),
        Navigation.packet("time", outData.time)
    );

    Navigation.navigateTo(URL_);
}

function _onClickedPlayAgain() {
    const URL_ = Navigation.encodeURL(
        Navigation.pathToURL("/source/pages/main/index.html"),
        Navigation.packet("table", outData.table),
        Navigation.packet("time", outData.time)
    );

    Navigation.navigateTo(URL_);
}