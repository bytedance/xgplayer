import { Util } from 'xgplayer'
import Music from './music'
import { MusicCover } from './plugins/musicCover'
import { MusicBackward } from './plugins/musicBackward'
import { MusicPrev } from './plugins/musicPrev'
import { MusicForward } from './plugins/musicForward'
import { MusicNext } from './plugins/musicNext'
import { MusicMeta } from './plugins/musicMeta'
import './plugins/index.scss'

function initMusicConfig (playerConfig) {
  if (Util.typeOf(playerConfig.controls) !== 'Object') {
    playerConfig.controls = {
      mode: 'flex',
      initShow: true
    }
  } else {
    const _c = playerConfig.controls
    playerConfig.controls = {
      mode: 'flex',
      initShow: true,
      ..._c
    }
  }
  const _p = playerConfig.play || {}
  playerConfig.play = {
    index: 3,
    ..._p
  }
  playerConfig.marginControls = true
  playerConfig.mediaType = 'audio'
}
export default class MusicPreset {
  constructor (options, playerConfig) {
    console.log('config', options, playerConfig)
    console.log('playerConfig', Util.typeOf(playerConfig.controls) !== 'Object')
    initMusicConfig(playerConfig)
    this.plugins = [
      Music,
      // Progress,
      // {
      //   plugin: PlayIcon,
      //   options: {
      //     config: {
      //       index: 3
      //     }
      //   }
      // },
      MusicBackward,
      MusicPrev,
      MusicForward,
      MusicNext,
      // {
      //   plugin: TimeIcon,
      //   options: {
      //     index: 0,
      //     config: {
      //       position: TimeIcon.POSITIONS.CONTROLS_RIGTH
      //     }
      //   }
      // },
      // Volume,
      MusicCover,
      MusicMeta]
    this.ignores = ['start', 'cssFullScreen', 'fullscreen', 'pip', 'enter', 'replay', 'pc', 'loading', 'poster']
  }
}
