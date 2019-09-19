export default {
    get(key, defaultValue = null) {
        let value = localStorage.getItem(key);

        if (value === null) {
            return defaultValue;
        }

        try {
            value = JSON.parse(value);
        } catch (e) {
            return value;
        }

        return value;
    },
    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}
