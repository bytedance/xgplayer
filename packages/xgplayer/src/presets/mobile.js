import ZH from '../lang/zh-cn'
import Thumbnail from '../plugins/common/thumbnail'
import DefinitionIcon from '../plugins/definition'
import DownLoadIcon from '../plugins/download'
import Enter from '../plugins/enter'
import Error from '../plugins/error'
import FullScreen from '../plugins/fullscreen'
import Loading from '../plugins/loading'
import Xglogger from '../plugins/logger'
import Mobile from '../plugins/mobile'
import PIPIcon from '../plugins/pip'
import PlayIcon from '../plugins/play'
import PlaybackRateIcon from '../plugins/playbackRate'
import PlayNextIcon from '../plugins/playNext'
import Poster from '../plugins/poster'
import Progress from '../plugins/progress'
import MiniProgress from '../plugins/progress/miniProgress'
import Prompt from '../plugins/prompt'
import Replay from '../plugins/replay'
import RotateIcon from '../plugins/rotate'
import ScreenShotIcon from '../plugins/screenShot'
import Start from '../plugins/start'
import TimeIcon from '../plugins/time'
import Volume from '../plugins/volume'

export default class DefaultPreset {
  constructor() {
    const contolsIcons = [
      Mobile,
      Progress,
      PlayIcon,
      FullScreen,
      TimeIcon,
      RotateIcon,
      PlayNextIcon,
      DefinitionIcon,
      PlaybackRateIcon,
      DownLoadIcon,
      ScreenShotIcon,
      Volume,
      PIPIcon
    ]
    const layers = [
      Replay,
      Poster,
      Start,
      Loading,
      Enter,
      Error,
      Prompt,
      Thumbnail,
      MiniProgress
    ]

    this.plugins = [Xglogger, ...contolsIcons, ...layers]
    this.ignores = []
    this.i18n = [ZH]
    // this.icons = {
    //   play: Play,
    //   pause: Pause
    // }
  }
}
