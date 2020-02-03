import { BasePlugin } from 'xgplayer';
import levels from './constants/levels'

const getDefaultConfigs = () => ({
  level: 'debug',
  historyMax: 100
})

export default class Logger extends BasePlugin {
  constructor (configs) {
    super();
    this._configs = Object.assign({}, getDefaultConfigs(), configs);
    this._history = [];
  }

  beforeCreate () {
    Object.keys(levels).forEach((k) => {
      const levelVal = levels[k];
      this[k] = this._log.bind(this, levels[levelVal], k)
    });
  }

  setLevel (level) {
    if (Logger.isLevelInvalid(level)) {
      this._level = level;
    }
  }

  static isLevelInvalid (level) {
    const levelType = typeof level
    const keys = Object.keys(levels)
    const cond0 = levelType === 'string' && keys.indexOf(level) >= 0;
    const cond1 = levelType === 'number' && level >= 0 && level <= 4;

    return cond0 && cond1
  }

  _log (level, levelKey, ...args) {
    if (level < this.level) {
      console.log(`[${levelKey}] `, ...args)
    }
    if (this._history.length < this._configs.historyMax) {
      this._history.push([levelKey, ...args])
      if (this.emit) {
        this.emit('log', levelKey, ...args)
      }
    }
  }

  destroy () {
    this._history = []
  }

  get level () {
    if (!Logger.isLevelInvalid(this._configs.level)) {
      return levels.debug;
    }
    const levelType = this._configs.level;
    return levelType === 'string' ? levels[levelType] : this._configs.level
  }

}
