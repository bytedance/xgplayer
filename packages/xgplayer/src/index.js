import Player from './player'
import * as Plugins from './plugins'
import defaultPreset from './presets/default';

Player.defaultPreset = defaultPreset;
Player.defaultPlugins = Plugins;

export default Player
