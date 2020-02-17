import Player from './player'
// import * as Controls from './controls/*.js'
// import pc from './plugins/pc';
import Plugin, { BasePlugin, pluginsManager } from './plugin';

Player.BasePlugin = BasePlugin;
Player.Plugin = Plugin;
Player.pluginsManager = pluginsManager;
export default Player
