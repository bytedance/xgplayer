export function debounce (func, wait, immediate) {
    var timeout, result;


    var debounced = function (args) {
        if (timeout) { clearTimeout(timeout); }
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(func, wait);
            if (callNow) { result = func(); }
        } else {
            timeout = setTimeout(func, wait);
        }

        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;

}

export const cacheWrapper = (fn) => {

    const cache = {};
    return (...args) => {
        const key = args.reduce((pre, cur) => {
            return `${pre}_${cur}`;
        }, '');
        const result = fn(...args);
        if (cache[key] !== undefined) {
            return cache[key];
        } else {
            cache[key] = result;
            return result;
        }
    };
};