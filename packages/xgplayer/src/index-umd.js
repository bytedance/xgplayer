import Player, { Util, Sniffer, Errors, Events, Plugin, BasePlugin, I18N } from './player'
import defaultPreset from './presets/default'

class PresetPlayer extends Player {
  // static get defaultPreset () {
  //   return PresetPlayer.__defaultPreset
  // }

  // static set defaultPreset (defaultPreset) {
  //   PresetPlayer.__defaultPreset = defaultPreset
  // }

  static defaultPreset = defaultPreset;
  static Util = Util;
  static Sniffer = Sniffer
  static Errors = Errors
  static Events = Events
  static Plugin = Plugin
  static BasePlugin = BasePlugin
  static I18N = I18N
}

// PresetPlayer.defaultPreset = defaultPreset
// PresetPlayer.Util = Util
// PresetPlayer.Sniffer = Sniffer
// PresetPlayer.Errors = Errors
// PresetPlayer.Events = Events
// PresetPlayer.Plugin = Plugin
// PresetPlayer.BasePlugin = BasePlugin
// PresetPlayer.I18N = I18N

export default PresetPlayer
