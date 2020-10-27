import Player, {
  BasePlugin,
  Plugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N } from './player'
import defaultPreset from './presets/default'

Player.defaultPreset = defaultPreset

export {
  Player as default,
  BasePlugin,
  Plugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N
}
