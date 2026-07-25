const cookie = {
    get(name) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`))
            ?.split('=')[1] || null;
    },
    set(name, value, options) {
        let cookieString = `${name}=${encodeURIComponent(value)}`;

        if (options) {
            for (const optionsKey in options) {
                cookieString += `; ${optionsKey}=${options[optionsKey]}`;
            }
        }

        document.cookie = cookieString;
    },
    delete(name, options) {
        const deleteOptions = Object.assign({}, options, { 'max-age': -1 });
        this.set(name, '', deleteOptions);
    }
};

export default cookie;
