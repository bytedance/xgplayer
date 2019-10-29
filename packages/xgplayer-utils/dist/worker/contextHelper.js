"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _workerCommands = require("../constants/workerCommands");

exports.default = self => {
  const emit = (messageName, data) => {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.EMIT,
      messageName,
      data
    });
  };

  const on = messageName => {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.ON,
      messageName
    });
  };

  const once = messageName => {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.ONCE,
      messageName
    });
  };

  const off = messageName => {
    self.postMessage({
      command: _workerCommands.CONTEXT_COMOMANDS.OFF,
      messageName
    });
  };

  const destroy = () => {
    self.removeAllListeners('message');
  };

  return {
    on,
    once,
    off,
    emit,
    destroy
  };
};