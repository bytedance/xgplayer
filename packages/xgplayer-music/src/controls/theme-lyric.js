import Player from '../music'
import './theme-lyric.scss'

const defualtTheme = function (player) {
  if (player.config.theme === 'lyric') {

  }
}

Player.install('theme-lyric', defualtTheme)
