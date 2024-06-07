class Navigation {
    static getCurrentURL = () => window.location.href;

    static pathToURL = (path) => window.location.origin + path;

    static packet(identifier, value) {
        return {
            identifier: identifier,
            value: value
        };
    }

    static getPacket(id, def) {
        return {
            id: id,
            def: def
        };
    }

    static encodeURL(base, ...packets) {
        const url = new URL(base);

        Array.from(packets).forEach(packet => {
            const ENCODED_VAL = encodeURIComponent(packet.value);
            const IDENTIFIER = packet.identifier;
            
            url.searchParams.set(IDENTIFIER, ENCODED_VAL);
        });
        
        return url.toString();
    }

    static decodeURL(urlString, dataParsing = (val) => { }, ...gets) {
        const url = new URL(urlString);
        const PARAMS = new URLSearchParams(url.search);

        const data = [];
        
        Array.from(gets).forEach(getPacket => {
            const ENCODED = PARAMS.get(getPacket.id);
            if(!ENCODED) {
                data.push(getPacket.def)
                return;
            }

            const DECODED = decodeURIComponent(ENCODED);
            const PARSED = dataParsing(DECODED);

            data.push(PARSED);
        });

        return data;
    }

    static navigateTo = (url) => window.location.href = url;
    static navigateToSilent = (url) => history.pushState(null, "", url);
}

export default Navigation;