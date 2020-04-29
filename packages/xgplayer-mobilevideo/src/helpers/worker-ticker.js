import Ticker from './ticker'
import Worker from 'worker!./tickworker.js';

export default class WorkerTicker extends Ticker{
    constructor (config) {
        super(config)
        this.timeoutId = null
        this.worker = new Worker();
        this.handleMessage = this.handleMessage.bind(this);
        this.worker.addEventListener('message', this.handleMessage);
      }
    
      handleMessage(){
        this.onTick()
      }

      start (...callbacks) {
        super.start(...callbacks)
        this.onTick()
        this.worker.postMessage({
            msg: 'start',
            interval: this.options.interval,
        })
      }
    
      stop () {
        this.worker.postMessage({
            msg: 'stop'
        })
        this.worker = null
      }

      setInterval (interval) {
        super.setInterval(interval)
        this.onTick()
        this.worker.postMessage({
            msg: 'start',
            interval: this.config.interval,
        })
      }
}