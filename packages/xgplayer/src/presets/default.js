import I18N from '../lang/i18n'
import ZH from '../lang/zh-cn'
import Thumbnail from '../plugins/common/thumbnail'
import CssFullScreen from '../plugins/cssFullScreen'
import DefinitionIcon from '../plugins/definition'
import DownLoadIcon from '../plugins/download'
import DynamicBg from '../plugins/dynamicBg'
import Enter from '../plugins/enter'
import Error from '../plugins/error'
import FpsDetect from '../plugins/fpsDetect'
import FullScreen from '../plugins/fullscreen'
import GapJump from '../plugins/gapJump'
import Keyboard from '../plugins/keyboard'
import Loading from '../plugins/loading'
// import Danmu from '../plugins/danmu'
import Xglogger from '../plugins/logger'
import Miniscreen from '../plugins/miniScreen'
import Mobile from '../plugins/mobile'
import PC from '../plugins/pc'
import PIPIcon from '../plugins/pip'
import PlayIcon from '../plugins/play'
import PlaybackRateIcon from '../plugins/playbackRate'
import PlayNextIcon from '../plugins/playNext'
import Poster from '../plugins/poster'
import Progress from '../plugins/progress'
import MiniProgress from '../plugins/progress/miniProgress'
import ProgressPreview from '../plugins/progressPreview'
import Prompt from '../plugins/prompt'
import Replay from '../plugins/replay'
import RotateIcon from '../plugins/rotate'
import ScreenShotIcon from '../plugins/screenShot'
import Start from '../plugins/start'
import Stats from '../plugins/stats'
import TestSpeed from '../plugins/testspeed'
import TimeIcon from '../plugins/time'
import TimeSegments from '../plugins/time/timesegments'
import Volume from '../plugins/volume'
import WaitingTimeoutJump from '../plugins/waitingTimeoutJump'
import sniffer from '../utils/sniffer'

// import Heatmap from '../plugins/heatmap'

I18N.use(ZH)

export default class DefaultPreset {
  constructor(_options, playerConfig) {
    const simulateMode = playerConfig && playerConfig.isMobileSimulateMode === 'mobile'
    const { isLive } = playerConfig
    const vodPlugins = isLive
      ? []
      : [TimeSegments, Progress, MiniProgress, ProgressPreview, TimeIcon]

    const contolsIcons = [
      ...vodPlugins,
      PlayIcon,
      FullScreen,
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
      Miniscreen
    ]

    this.plugins = [
      Stats,
      Xglogger,
      ...contolsIcons,
      ...layers,
      GapJump,
      WaitingTimeoutJump
    ]
    const mode = simulateMode ? 'mobile' : sniffer.device
    switch (mode) {
      case 'pc':
        this.plugins.push(...[Keyboard, PC, CssFullScreen, TestSpeed, FpsDetect])
        break
      case 'mobile':
        this.plugins.push(...[Mobile])
        break
      default:
        this.plugins.push(...[Keyboard, PC, CssFullScreen])
    }
    if (sniffer.os.isIpad || mode === 'pc') {
      this.plugins.push(DynamicBg)
    }
    if (sniffer.os.isIpad) {
      this.plugins.push(PC)
    }
    this.ignores = []
    this.i18n = []
  }
}
