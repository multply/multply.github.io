class Format {
    static timeFormatModes = {
        SS:   Symbol("TIME_FORMAT_0"),
        MSS:  Symbol("TIME_FORMAT_1"),
        MMSS: Symbol("TIME_FORMAT_2")
    };

    static timeFormat(seconds, formatMode = Format.timeFormatModes.MSS) {
        const MINUTES = Math.floor(seconds / 60);
        const SECONDS = seconds % 60;

        const formatSection = (value) => Format.zeroFormat(String(value), 2);

        switch(formatMode) {
            case this.timeFormatModes.SS:
                return formatSection(SECONDS);

            case this.timeFormatModes.MSS:
                return `${String(MINUTES)[0]}:${formatSection(SECONDS)}`;

            case this.timeFormatModes.MMSS:
                return `${formatSection(MINUTES)}:${formatSection(SECONDS)}`;

            default:
                return `${formatSection(MINUTES)}:${formatSection(SECONDS)}`;
        }
    }

    static padFormat(string, nLength, padding, padStart) {
        const PADDING_COUNT = nLength - string.length;

        if(PADDING_COUNT < 1) {
            return string;
        }

        let pad = "";
        for(let i = 0; i < PADDING_COUNT; i++){
            pad += padding;
        }

        return padStart ? pad + string : string + pad;
    }

    static zeroFormat = (string, nLength, padStart = true) => Format.padFormat(string, nLength, "0", padStart);

    static wsFormat = (string, nLength, padStart = true) => Format.padFormat(string, nLength, " ", padStart);
}

export default Format;