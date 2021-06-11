import Player, { Util, Sniffer, Errors, Events, Plugin, BasePlugin, I18N } from './player'

import defaultPreset from './presets/default'

Player.defaultPreset = defaultPreset
Player.Util = Util
Player.Sniffer = Sniffer
Player.Errors = Errors
Player.Events = Events
Player.Plugin = Plugin
Player.BasePlugin = BasePlugin
Player.I18N = I18N

export default Player
