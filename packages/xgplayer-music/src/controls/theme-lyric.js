import Player from '../music'
import LyricPlugin from './lyricPlugin'
import './theme-lyric.scss'

// theme写成类是不是好点
// 兼容一波
Player.install('theme-lyric', (player) => {
  return new LyricPlugin(player)
})
