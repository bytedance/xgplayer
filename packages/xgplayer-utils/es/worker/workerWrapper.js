var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import workerify from 'webworkerify';
import commands from 'xgplayer-utils/constants/workerCommands';

var WorkerWrapper = function () {
  function WorkerWrapper(Wrapped) {
    var _commandMap;

    _classCallCheck(this, WorkerWrapper);

    if (!Wrapped) {
      throw new Error('No Worker Provided');
    }
    this._worker = workerify(Wrapped);
    this._worker.addEventListener('message', this.handleWorkerMessage);
    this.commandMap = (_commandMap = {}, _defineProperty(_commandMap, commands.EMIT, this.handleCommandEmit.bind(this)), _defineProperty(_commandMap, commands.ON, this.handleCommandOn.bind(this)), _defineProperty(_commandMap, commands.ONCE, this.handleCommandOnce.bind(this)), _defineProperty(_commandMap, commands.OFF, this.handleCommandOff.bind(this)), _commandMap);

    this.bindedListeners = {};
  }

  _createClass(WorkerWrapper, [{
    key: 'handleWorkerMessage',
    value: function handleWorkerMessage(e) {
      var command = e.data.command;
      var messageName = e.data.messageName;
      var data = e.data.data;

      var commandHandler = this.commandMap[command];

      if (commandHandler) {
        commandHandler(messageName, data);
      }
    }
  }, {
    key: '_sendToWorker',
    value: function _sendToWorker(messageName, data) {
      this._worker.postMessage({
        messageName: messageName,
        data: data
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
      this.bindedListeners['_on_' + messageName] = this._sendToWorker.bind(messageName);
      this.on(messageName, this.bindedListeners['_on_' + messageName]);
    }
  }, {
    key: 'handleCommandOnce',
    value: function handleCommandOnce(messageName) {
      this.bindedListeners['_once_' + messageName] = this._sendToWorker.bind(messageName);
      this.once(messageName, this.bindedListeners['_once_' + messageName]);
    }
  }, {
    key: 'handleCommandOff',
    value: function handleCommandOff(messageName) {
      var listener = this.bindedListeners['_on_' + messageName];

      if (listener) {
        this.off(messageName, listener);
        delete this.bindedListeners['_on_' + messageName];
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._sendToWorker(commands.DESTROY);
      this._worker = null;
      this.commandMap = null;
      this.bindedListeners = null;
    }
  }]);

  return WorkerWrapper;
}();

export default WorkerWrapper;