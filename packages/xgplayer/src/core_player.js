import Player from './player'

import Mobile from './controls/mobile'
import Pc from './controls/pc'
import Start from './controls/start'
import S_start from './skin/controls/start'

let controlLst = [Mobile, Pc, Start, S_start]
controlLst.forEach(function(control) {
    Player.install(control.name, control.method)
})

export default Player
