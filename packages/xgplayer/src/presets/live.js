// import DownLoadIcon from '../plugins/download'
// import ScreenShotIcon from '../plugins/screenShot'
import ZH from '../lang/zh-cn'
import CssFullScreen from '../plugins/cssFullScreen'
import DefinitionIcon from '../plugins/definition'
import Enter from '../plugins/enter'
import Error from '../plugins/error'
import FullScreen from '../plugins/fullscreen'
import Keyboard from '../plugins/keyboard'
import Loading from '../plugins/loading'
import Mobile from '../plugins/mobile'
import PC from '../plugins/pc'
import PIPIcon from '../plugins/pip'
import PlayIcon from '../plugins/play'
import PlaybackRateIcon from '../plugins/playbackRate'
import Poster from '../plugins/poster'
import RotateIcon from '../plugins/rotate'
import Start from '../plugins/start'
import TimeIcon from '../plugins/time'
import Volume from '../plugins/volume'
import sniffer from '../utils/sniffer'

export default class DefaultPreset {
  constructor() {
    const contolsIcons = [
      PlayIcon,
      FullScreen,
      TimeIcon,
      Volume,
      RotateIcon,
      DefinitionIcon,
      PlaybackRateIcon,
      CssFullScreen,
      PIPIcon
    ]
    this.plugins = [Poster, Start, Loading, Enter, Error, ...contolsIcons]

    switch (sniffer.device) {
      case 'pc':
        this.plugins.push(...[Keyboard, PC])
        break
      case 'mobile':
        this.plugins.push(Mobile)
        break
      default:
        this.plugins.push(...[Keyboard, PC])
    }
    this.ignores = []
    this.i18n = [ZH]
  }
}
