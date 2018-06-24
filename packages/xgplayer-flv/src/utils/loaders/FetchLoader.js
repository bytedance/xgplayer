import VodTask from '../VodTask';
export default class FetchLoader {
    constructor(url, range, config = {}) {
        this.url = url;
        this.on = false;
        const _config = {
            headers: {
                Range: `bytes=${range[0]}-${range[1]}`,
            },
            method: 'GET',
            cache: 'default',
            mode: 'cors',
        };
        this.request = () => {
            this.on = true;
            return fetch(url, Object.assign({}, _config, config)).then(res => {
                VodTask.remove(this);
                return res.arrayBuffer();
            }).catch(e => {
                VodTask.remove(this);
                return e;
            });
        };
    }

    run () {
        this._promise = this.request();
    }

    get readyState () {
        return 1;
    }

    cancel () {
        // TODO
    }

    get promise () {
        return this.on ? this._promise : this.request();
    }
}