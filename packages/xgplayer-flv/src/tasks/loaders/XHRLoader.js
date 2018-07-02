import VodTask from '../VodTask';
export default class XHRLoader {
    constructor (url, range) {
        this.url = url;
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Range', `bytes=${range[0]}-${range[1]}`);
        xhr.onabort = () => {
            VodTask.remove(this);
        };
        this._promise = new Promise((resolve, reject) => {
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 206) {
                    resolve(xhr.response);
                }
                VodTask.remove(this);
            };
            xhr.onerror = (e) => {
                reject(e);
                VodTask.remove(this);
            };
        });

        this._xhr = xhr;
    }

    get promise () {
        return this._promise;
    }

    get readyState () {
        return this._xhr.readyState;
    }

    run () {
        this._xhr.send();
    }

    cancel () {
        this._xhr.abort();
    }

}