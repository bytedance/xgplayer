import Player from './player'

import Flex from './skin/controls/flex'
import Fullscreen from './controls/fullscreen'
import S_fullscreen from './skin/controls/fullscreen'
import S_loading from './skin/controls/loading'
import Mobile from './controls/mobile'
import Pc from './controls/pc'
import Play from './controls/play'
import S_play from './skin/controls/play'
import S_progress from './skin/controls/progress'
import S_poster from './skin/controls/poster'
import S_time from './skin/controls/time'
import Start from './controls/start'
import S_start from './skin/controls/start'
import Replay from './controls/replay'
import S_replay from './skin/controls/replay'
// import Volume from './controls/volume'
// import S_volume from './skin/controls/volume'

let controlLst = [
    Flex,
    Fullscreen,
    S_fullscreen,
    S_loading,
    Mobile,
    Pc,
    Play,
    S_play,
    S_progress,
    S_poster,
    S_time,
    Start,
    S_start,
    Replay,
    S_replay
]
controlLst.forEach(function(control) {
    Player.install(control.name, control.method)
})

export default Player
