import Player from './player'
import Plugin from './plugin/plugin'
import BasePlugin from './plugin/basePlugin'
import * as Events from './events'
import STATE_CLASS from './stateClassMap'
import I18N from './lang/i18n'
import Errors from './error'
import Sniffer from './utils/sniffer'
import Util from './utils/util'
import './index.scss'

import defaultPreset from './presets/default'

class PresetPlayer extends Player {
  static defaultPreset = defaultPreset;
  static Util = Util;
  static Sniffer = Sniffer
  static Errors = Errors
  static Events = Events
  static Plugin = Plugin
  static BasePlugin = BasePlugin
  static I18N = I18N
  static STATE_CLASS = STATE_CLASS
}

export default PresetPlayer
