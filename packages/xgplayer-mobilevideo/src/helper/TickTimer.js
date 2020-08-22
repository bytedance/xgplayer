
let shell = `
    let timer;

    function initTimer () {
      destroy()
      clearInterval(timer);
      timer = setInterval(() => {
          self.postMessage({type: 'NEXT_TICK'});
      }, 25)
    }

    function destroy () {
      clearInterval(timer);
    }

    self.onmessage = function (e) {
      const {type} = e.data;
      switch (type) {
          case 'START':
            initTimer();
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

  start () {
    this._worker.postMessage({type: 'START'});
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
