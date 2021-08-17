import Player from './player'
import Plugin from './plugin/plugin'
import BasePlugin from './plugin/basePlugin'
import * as Events from './events'
import STATE_CLASS from './stateClassMap'
import I18N from './lang/i18n'
import Errors from './error'
import Sniffer from './utils/sniffer'
import Util from './utils/util'
import PresetPlayer from './index-umd'

export {
  PresetPlayer as default,
  Player as SimplePlayer,
  BasePlugin,
  Plugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N
}
