// 替代setInterval
class IntervalTimer {
    constructor() {
        this.timeID = null;
        this.func = null;
    }

    repeat(func, ms) {
        this.timeID = 1;
        this.repeatInterval(func, ms);
    }

    repeatInterval(func, ms) {
        if (!this.timeID) return;
        if (this.func === null) {
            this.func = func;
        }

        if (this.func !== func) {
            return;
        }
        if (this.timeID) clearTimeout(this.timeID);
        this.timeID = null;
        this.timeID = setTimeout(() => {
            func();
            this.repeatInterval(func, ms);
        }, ms);
    }

    clear() {
        clearTimeout(this.timeID);
        this.timeID = null;
    }
}

export default IntervalTimer;
