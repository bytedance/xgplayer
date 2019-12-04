import workerify from 'webworkerify';
import commands from 'xgplayer-utils/constants/workerCommands';

var WorkerWrapper = function () {
  function WorkerWrapper(Wrapped) {
    var _commandMap;

    babelHelpers.classCallCheck(this, WorkerWrapper);

    if (!Wrapped) {
      throw new Error('No Worker Provided');
    }
    this._worker = workerify(Wrapped);
    this._worker.addEventListener('message', this.handleWorkerMessage);
    this.commandMap = (_commandMap = {}, babelHelpers.defineProperty(_commandMap, commands.EMIT, this.handleCommandEmit.bind(this)), babelHelpers.defineProperty(_commandMap, commands.ON, this.handleCommandOn.bind(this)), babelHelpers.defineProperty(_commandMap, commands.ONCE, this.handleCommandOnce.bind(this)), babelHelpers.defineProperty(_commandMap, commands.OFF, this.handleCommandOff.bind(this)), _commandMap);

    this.bindedListeners = {};
  }

  babelHelpers.createClass(WorkerWrapper, [{
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