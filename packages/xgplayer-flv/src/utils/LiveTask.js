class LiveTask {
    constructor(url, config) {
        const _headers = new window.Headers();
        const _config = {
            headers: Object.assign({}, _headers),
            method: 'GET',
            cache: 'default',
            mode: 'cors',
        };
        this.request = new Request(url, Object.assign({}, _config, config));
    }

    run (callback) {

        function resolve (reader) {
            reader.read().then(result => {
                callback(result.done ? undefined : result.value);
                resolve(reader);
            });
        }
        fetch(this.request).then(res => {
            const reader = res.body.getReader();
            resolve(reader);
        });

    }
}

export default LiveTask;