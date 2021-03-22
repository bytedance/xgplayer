
let shell = `
    var timer;

    function initTimer (interval) {
      destroy()
      clearInterval(timer);
      timer = setInterval(() => {
          self.postMessage({type: 'NEXT_TICK'});
      }, interval)
    }

    function destroy () {
      clearInterval(timer);
    }

    self.onmessage = function (e) {
      var {type,interval} = e.data;
      switch (type) {
          case 'START':
            initTimer(interval);
            break;
          case 'DESTROY':
            destroy();
            break;
      }
    }
`

export default class TickTimer {
  constructor (task) {
    this._task = task;
    let blob = new Blob([shell], {type: 'application/javascript'});
    this._worker = new Worker(URL.createObjectURL(blob));
    this._bindEvent();
  }

  _bindEvent () {
    this._worker.addEventListener('message', () => {
      this._task();
    })
  }

  start (interval) {
    interval = parseInt(interval);
    if (interval < 10) {
      interval = 10;
    }
    if (interval > 25) {
      interval = 25;
    }
    this._worker.postMessage({type: 'START', interval});
  }

  stop () {
    this._worker.postMessage({type: 'DESTROY'});
  }

  destroy () {
    if (this._worker) {
      this._worker.postMessage({ type: 'DESTROY' });
      this._worker.terminate();
      this._worker = null;
    }
  }
}
