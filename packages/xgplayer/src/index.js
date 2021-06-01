import Player from './player'

import Airplay from './controls/airplay.js'
import CssFullscreen from './controls/cssFullscreen.js'
import Danmu from './controls/danmu.js'
import Definition from './controls/definition.js'
import Download from './controls/download.js'
import ErrorRetryControl from './controls/errorRetry.js'
import Fullscreen from './controls/fullscreen.js'
import Keyboard from './controls/keyboard.js'
import LocalPreview from './controls/localPreview.js'
import MemoryPlay from './controls/memoryPlay.js'
import Miniplayer from './controls/miniplayer.js'
import Mobile from './controls/mobile.js'
import Pc from './controls/pc.js'
import Pip from './controls/pip.js'
import Play from './controls/play.js'
import PlayNext from './controls/playNext.js'
import Reload from './controls/reload.js'
import Replay from './controls/replay.js'
import Rotate from './controls/rotate.js'
import ScreenShot from './controls/screenShot.js'
import Start from './controls/start.js'
import Volume from './controls/volume.js'

Player.installAll([
    Airplay,
    CssFullscreen,
    Danmu,
    Definition,
    Download,
    ErrorRetryControl,
    Fullscreen,
    Keyboard,
    LocalPreview,
    MemoryPlay,
    Miniplayer,
    Mobile,
    Pc,
    Pip,
    Play,
    PlayNext,
    Reload,
    Replay,
    Rotate,
    ScreenShot,
    Start,
    Volume,    
])

import './skin/index.js';

export default Player
