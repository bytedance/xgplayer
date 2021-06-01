import Player from '../player'

import I18n from './controls/i18n.js'
import Enter from './controls/enter.js'
import Play from './controls/play.js'
import Start from './controls/start.js'
import Poster from './controls/poster.js'
import Flex from './controls/flex.js'
import Fullscreen from './controls/fullscreen.js'
import CssFullscreen from './controls/cssFullscreen.js'
import Volume from './controls/volume.js'
import Definition from './controls/definition.js'
import Loading from './controls/loading.js'
import Progress from './controls/progress.js'
import Time from './controls/time.js'
import Replay from './controls/replay.js'
import PlaybackRate from './controls/playbackRate.js'
import LocalPreview from './controls/localPreview.js'
import Download from './controls/download.js'
import Danmu from './controls/danmu.js'
import Pip from './controls/pip.js'
import Miniplayer from './controls/miniplayer.js'
import PlayNext from './controls/playNext.js'
import Rotate from './controls/rotate.js'
import Reload from './controls/reload.js'
import ScreenShot from './controls/screenShot.js'
import NativeTextTrack from './controls/nativeTextTrack.js'
import TextTrack from './controls/textTrack.js'
import ErrorControl from './controls/error.js'
import MemoryPlay from './controls/memoryPlay.js'
import Airplay from './controls/airplay.js'

Player.installAll([
    I18n,
    Enter,
    Play,
    Start,
    Poster,
    Flex,
    Fullscreen,
    CssFullscreen,
    Volume,
    Definition,
    Loading,
    Progress,
    Time,
    Replay,
    PlaybackRate,
    LocalPreview,
    Download,
    Danmu,
    Pip,
    Miniplayer,
    PlayNext,
    Rotate,
    Reload,
    ScreenShot,
    NativeTextTrack,
    TextTrack,
    ErrorControl,
    MemoryPlay,
    Airplay
])