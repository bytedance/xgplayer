import { CONTEXT_COMOMANDS } from '../constants/workerCommands';

export default (function (self) {
  var emit = function emit(messageName, data) {
    self.postMessage({
      command: CONTEXT_COMOMANDS.EMIT,
      messageName: messageName,
      data: data
    });
  };

  var on = function on(messageName) {
    self.postMessage({
      command: CONTEXT_COMOMANDS.ON,
      messageName: messageName
    });
  };

  var once = function once(messageName) {
    self.postMessage({
      command: CONTEXT_COMOMANDS.ONCE,
      messageName: messageName
    });
  };

  var off = function off(messageName) {
    self.postMessage({
      command: CONTEXT_COMOMANDS.OFF,
      messageName: messageName
    });
  };

  var destroy = function destroy() {
    self.removeAllListeners('message');
  };

  return {
    on: on,
    once: once,
    off: off,
    emit: emit,
    destroy: destroy
  };
});