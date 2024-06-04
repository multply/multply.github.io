import Format from "../../global/scripts/format.js";

class InputSeries {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addElement(element) {
        if (!this.head) {
            this.head = element;
            this.tail = element;
            return;
        }

        element.prev = this.tail;
        element.next = this.head;

        this.tail.next = element;
        this.head.prev = element;

        this.tail = element;
    }

    advance = () => this.head = this.head.next;
    retreat = () => this.head = this.head.prev;
    travel = (advance) => advance ? this.advance() : this.retreat();
}

class InputElement {
    constructor(val, rep) {
        this.val = val;
        this.rep = rep;

        this.next = null;
        this.prev = null;
    }
}

const tablesList = (function createInputTable() {
    const nTable = new InputSeries();

    nTable.addElement(new InputElement(2,  "2"));
    nTable.addElement(new InputElement(3,  "3"));
    nTable.addElement(new InputElement(4,  "4"));
    nTable.addElement(new InputElement(5,  "5"));
    nTable.addElement(new InputElement(6,  "6"));
    nTable.addElement(new InputElement(7,  "7"));
    nTable.addElement(new InputElement(8,  "8"));
    nTable.addElement(new InputElement(9,  "9"));
    nTable.addElement(new InputElement(10, "10"));
    nTable.addElement(new InputElement(11, "11"));
    nTable.addElement(new InputElement(12, "12"));
    nTable.addElement(new InputElement(13, "13"));
    nTable.addElement(new InputElement(14, "14"));

    return nTable;
})();

const timesList = (function createTimeTable() {
    const nTable = new InputSeries();

    nTable.addElement(new InputElement(-1,  "∞"));
    nTable.addElement(new InputElement(15,  Format.timeFormat(15)));
    nTable.addElement(new InputElement(30,  Format.timeFormat(30)));
    nTable.addElement(new InputElement(45,  Format.timeFormat(45)));
    nTable.addElement(new InputElement(60,  Format.timeFormat(60)));
    nTable.addElement(new InputElement(90,  Format.timeFormat(90)));
    nTable.addElement(new InputElement(120, Format.timeFormat(120)));
    nTable.addElement(new InputElement(180, Format.timeFormat(180)));
    nTable.addElement(new InputElement(240, Format.timeFormat(240)));
    nTable.addElement(new InputElement(300, Format.timeFormat(300)));

    return nTable;
})();

(function addEvents() {
    document.getElementById("table-incdec-dec").addEventListener("click", () => _onChangeTable(false));
    document.getElementById("table-incdec-inc").addEventListener("click", () => _onChangeTable(true));

    document.getElementById("time-incdec-dec").addEventListener("click", () => _onChangeTime(false));
    document.getElementById("time-incdec-inc").addEventListener("click", () => _onChangeTime(true));

    document.getElementById("start-button").addEventListener("click", _onClickStart);
})();

const elements = {
    tableText: document.getElementById("table-incdec-value-text"),
    timeText: document.getElementById("time-incdec-value-text")
};

(function inputFieldsSetup() {
    elements.tableText.innerHTML = tablesList.head.rep;
    elements.timeText.innerHTML = timesList.head.rep;
})();

function _onChangeTable(advance) {
    tablesList.travel(advance);
    elements.tableText.innerHTML = tablesList.head.rep;
}

function _onChangeTime(advance) {
    timesList.travel(advance);
    elements.timeText.innerHTML = timesList.head.rep;
}

function _onClickStart() {
    localStorage.setItem("INPT_TABLE", String(tablesList.head.val));
    localStorage.setItem("INPT_TIME", String(timesList.head.val));

    window.location.href = "/source/pages/main/index.html";
}