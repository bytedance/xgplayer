import Player from './player'
import * as Controls from './controls/*.js'
import './skin/index.js';

Player.installAll(Controls.controls)

export default Player
