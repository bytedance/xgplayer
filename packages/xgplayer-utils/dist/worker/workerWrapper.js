'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

<<<<<<< HEAD
var _webworkify = require("webworkify");

var _webworkify2 = _interopRequireDefault(_webworkify);

var _workerCommands = require("../constants/worker-commands");
=======
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webworkify = require('webworkify');

var _webworkify2 = _interopRequireDefault(_webworkify);

var _workerCommands = require('../constants/worker-commands');
>>>>>>> 6568d0dd7c2d795ab5b1bd65773d4c1f5f98fc06

var _workerCommands2 = _interopRequireDefault(_workerCommands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let WorkerWrapper = function () {
  function WorkerWrapper(Wrapped) {
    _classCallCheck(this, WorkerWrapper);

    if (!Wrapped) {
      throw new Error('No Worker Provided');
    }
<<<<<<< HEAD

    this._worker = (0, _webworkify2.default)(Wrapped);

=======
    this._worker = (0, _webworkify2.default)(Wrapped);
>>>>>>> 6568d0dd7c2d795ab5b1bd65773d4c1f5f98fc06
    this._worker.addEventListener('message', this.handleWorkerMessage);
    this.commandMap = {
      [_workerCommands2.default.EMIT]: this.handleCommandEmit.bind(this),
      [_workerCommands2.default.ON]: this.handleCommandOn.bind(this),
      [_workerCommands2.default.ONCE]: this.handleCommandOnce.bind(this),
      [_workerCommands2.default.OFF]: this.handleCommandOff.bind(this)
    };

    this.bindedListeners = {};
  }

  _createClass(WorkerWrapper, [{
    key: 'handleWorkerMessage',
    value: function handleWorkerMessage(e) {
      const command = e.data.command;
      const messageName = e.data.messageName;
      const data = e.data.data;

      const commandHandler = this.commandMap[command];

      if (commandHandler) {
        commandHandler(messageName, data);
      }
    }
  }, {
    key: '_sendToWorker',
    value: function _sendToWorker(messageName, data) {
      this._worker.postMessage({
        messageName,
        data
      });
    }
  }, {
    key: 'handleCommandEmit',
    value: function handleCommandEmit(messageName, data) {
      this.emit(messageName, data);
    }
  }, {
    key: 'handleCommandOn',
    value: function handleCommandOn(messageName) {
      this.bindedListeners[`_on_${messageName}`] = this._sendToWorker.bind(messageName);
      this.on(messageName, this.bindedListeners[`_on_${messageName}`]);
    }
  }, {
    key: 'handleCommandOnce',
    value: function handleCommandOnce(messageName) {
      this.bindedListeners[`_once_${messageName}`] = this._sendToWorker.bind(messageName);
      this.once(messageName, this.bindedListeners[`_once_${messageName}`]);
    }
  }, {
    key: 'handleCommandOff',
    value: function handleCommandOff(messageName) {
      const listener = this.bindedListeners[`_on_${messageName}`];

      if (listener) {
        this.off(messageName, listener);
        delete this.bindedListeners[`_on_${messageName}`];
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._sendToWorker(_workerCommands2.default.DESTROY);
      this._worker = null;
      this.commandMap = null;
      this.bindedListeners = null;
    }
  }]);

  return WorkerWrapper;
}();

exports.default = WorkerWrapper;