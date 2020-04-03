
var interval;
self.addEventListener('message', function (e) {
    var msg = e.data.msg;
    switch (msg) {
        case 'start':
            clearInterval(interval);
            interval = setInterval(function () {
                self.postMessage('tick');
            }, e.data.interval);
            break;
        case 'stop':
            clearInterval(interval);
            break;
    };
}, false);