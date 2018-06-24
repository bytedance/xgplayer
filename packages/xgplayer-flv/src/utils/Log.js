export default class Logger {
    static log (...args) {
        window.console.log.apply(window, args);
    }

    static info (...args) {
        window.console.info.apply(window, args);
    }

    static error (...args) {
        window.console.error.apply(window, args);
    }

    static warn (...args) {
        window.console.warn.apply(window, args);
    }
}
