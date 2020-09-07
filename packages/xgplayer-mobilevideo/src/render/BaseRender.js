import EventEmitter from 'events';
import Events from '../events';

export default class BaseRender extends EventEmitter {
  constructor (config, parent) {
    super();
    this._config = config;
    this._parent = parent;
    this._ready = false;
    this._meta = null;
    this._noAudio = false;
    this._innerDegrade = false;
  }

  get innerDegrade () {
    return this._innerDegrade;
  }

  _bindEvents () {
    this._parent.on(Events.TIMELINE.SET_METADATA, this._setMetadata.bind(this));

    this._parent.on(Events.TIMELINE.APPEND_CHUNKS, this._appendChunk.bind(this));

    this._parent.on(Events.TIMELINE.START_RENDER, this._startRender.bind(this));

    this._parent.on(Events.TIMELINE.DO_PAUSE, this._doPause.bind(this));

    this._parent.on(Events.TIMELINE.DESTROY, () => {
      this._destroy();
    });

    this._parent.on(Events.TIMELINE.NO_AUDIO, () => {
      this._noAudio = true;
    });

    this._parent.on(Events.TIMELINE.INNER_DEGRADE, () => {
      this._innerDegrade = true;
    })
  }
}
