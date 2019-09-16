import { CONTEXT_COMOMANDS } from '../constants/workerCommands'

export default (self) => {
  const emit = (messageName, data) => {
    self.postMessage({
      command: CONTEXT_COMOMANDS.EMIT,
      messageName,
      data
    })
  }

  const on = (messageName) => {
    self.postMessage({
      command: CONTEXT_COMOMANDS.ON,
      messageName
    })
  }

  const once = (messageName) => {
    self.postMessage({
      command: CONTEXT_COMOMANDS.ONCE,
      messageName
    })
  }

  const off = (messageName) => {
    self.postMessage({
      command: CONTEXT_COMOMANDS.OFF,
      messageName
    })
  }

  const destroy = () => {
    self.removeAllListeners('message')
  }

  return {
    on,
    once,
    off,
    emit,
    destroy
  }
}
