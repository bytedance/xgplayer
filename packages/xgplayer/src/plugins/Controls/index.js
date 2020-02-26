import Plugin from '../../plugin'
// import Progress from '../icons/progress'
// import PlayIcon from '../icons/playIcon'
// import FullScreen from '../icons/fullscreen'
// import TimeIcon from '../icons/timeIcon'
// import VolumeIcon from '../icons/volumeIcon'
// import RotateIcon from '../icons/rotate'
// // import MiniScreen from '../icons/miniScreen'
// import PIPIcon from '../icons/pipIcon'
// import PlayNextIcon from '../icons/playNextIcon'
// // import DownLoadIcon from '../icons/downloadIcon'
// // import ScreenShotIcon from '../icons/screenShotIcon'
// import DefinitionIcon from '../icons/definitionIcon'
// import PlaybackRateIcon from '../icons/playbackRateIcon'
// import CssFullScreen from '../icons/cssFullScreen'

const {Events, Util} = Plugin
class Controls extends Plugin {
  static get pluginName () {
    return 'Controls'
  }

  afterCreate () {
    this.on(Events.MINI_STATE_CHANGE, (isMini) => {
      isMini ? Util.addClass(this.el, 'mini') : Util.removeClass(this.el, 'mini')
    })
  }

  children () {
    this.left = this.find('left-grid')
    this.center = this.find('center')
    this.right = this.find('right-grid')
    return {
    //   TimeIcon: {
    //     plugin: TimeIcon,
    //     options: {
    //       index: 3,
    //       root: this.left
    //     }
    //   },
    //   PlayIcon: {
    //     plugin: PlayIcon,
    //     options: {
    //       index: 0,
    //       root: this.left
    //     }
    //   },
    //   playNextIcon: {
    //     plugin: PlayNextIcon,
    //     options: {
    //       index: 1,
    //       root: this.left
    //     }
    //   },
    //   // DownLoadIcon: {
    //   //   plugin: DownLoadIcon,
    //   //   options: {
    //   //     index: 3,
    //   //     root: this.right
    //   //   }
    //   // },
    //   // ScreenShotIcon: {
    //   //   plugin: ScreenShotIcon,
    //   //   options: {
    //   //     index: 4,
    //   //     root: this.right
    //   //   }
    //   // },
    //   FullScreen: {
    //     plugin: FullScreen,
    //     options: {
    //       index: 0,
    //       root: this.right
    //     }
    //   },
    //   VolumeIcon: {
    //     plugin: VolumeIcon,
    //     options: {
    //       index: 1,
    //       root: this.right
    //     }
    //   },
    //   RotateIcon: {
    //     plugin: DefinitionIcon,
    //     options: {
    //       index: 2,
    //       root: this.right
    //     }
    //   },
    //   DefinitionIcon: {
    //     plugin: RotateIcon,
    //     options: {
    //       index: 3,
    //       root: this.right
    //     }
    //   },
    //   PlaybackRateIcon: {
    //     plugin: PlaybackRateIcon,
    //     options: {
    //       index: 4,
    //       root: this.right
    //     }
    //   },
    //   // MiniScreen: {
    //   //   plugin: MiniScreen,
    //   //   options: {
    //   //     index: 1,
    //   //     root: this.right
    //   //   }
    //   // },
    //   PIPIcon: {
    //     plugin: PIPIcon,
    //     options: {
    //       index: 1,
    //       root: this.right
    //     }
    //   },
    //   CssFullScreen: {
    //     plugin: CssFullScreen,
    //     options: {
    //       index: 1,
    //       root: this.right
    //     }
    //   },
    //   Progress: {
    //     plugin: Progress,
    //     options: {
    //       root: this.center
    //     }
    //   }
    }
  }

  registerPlugin (name, plugin, options = {}) {
    if (!options.root) {
      const position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position
      const root = this[position] || this.left
      options.root = root
    }
    return super.registerPlugin(name, plugin, options)
  }

  render () {
    return `<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">
    <left-grid class="left-grid">
    </Left-grid>
    <center class="center"></center>
    <right-grid class="right-grid">
    </right-grid>
    </xg-controls>`
  }
}

export default Controls
