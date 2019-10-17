import workerify from 'webworkify'
import commands from '../constants/worker-commands'

class WorkerWrapper {
  constructor (Wrapped) {
    if (!Wrapped) {
      throw new Error('No Worker Provided')
    }
    this._worker = workerify(Wrapped)
    this._worker.addEventListener('message', this.handleWorkerMessage)
    this.commandMap = {
      [commands.EMIT]: this.handleCommandEmit.bind(this),
      [commands.ON]: this.handleCommandOn.bind(this),
      [commands.ONCE]: this.handleCommandOnce.bind(this),
      [commands.OFF]: this.handleCommandOff.bind(this)
    }

    this.bindedListeners = {}
  }

  handleWorkerMessage (e) {
    const command = e.data.command
    const messageName = e.data.messageName
    const data = e.data.data

    const commandHandler = this.commandMap[command]

    if (commandHandler) {
      commandHandler(messageName, data)
    }
  }

  _sendToWorker (messageName, data) {
    this._worker.postMessage({
      messageName,
      data
    })
  }

  handleCommandEmit (messageName, data) {
    this.emit(messageName, data)
  }

  handleCommandOn (messageName) {
    this.bindedListeners[`_on_${messageName}`] = this._sendToWorker.bind(messageName)
    this.on(messageName, this.bindedListeners[`_on_${messageName}`])
  }

  handleCommandOnce (messageName) {
    this.bindedListeners[`_once_${messageName}`] = this._sendToWorker.bind(messageName)
    this.once(messageName, this.bindedListeners[`_once_${messageName}`])
  }

  handleCommandOff (messageName) {
    const listener = this.bindedListeners[`_on_${messageName}`]

    if (listener) {
      this.off(messageName, listener)
      delete this.bindedListeners[`_on_${messageName}`]
    }
  }

  destroy () {
    this._sendToWorker(commands.DESTROY)
    this._worker = null
    this.commandMap = null
    this.bindedListeners = null
  }
}

export default WorkerWrapper
