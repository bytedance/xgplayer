'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _workerCommands = require('../constants/workerCommands');

exports.default = function (self) {
  var emit = function emit(messageName, data) {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.EMIT,
      messageName: messageName,
      data: data
    });
  };

  var on = function on(messageName) {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.ON,
      messageName: messageName
    });
  };

  var once = function once(messageName) {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.ONCE,
      messageName: messageName
    });
  };

  var off = function off(messageName) {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.OFF,
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
};