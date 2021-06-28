import Player, { Util, Sniffer, Errors, Events, Plugin, BasePlugin, I18N } from './player'
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
}

export default PresetPlayer
