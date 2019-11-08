
import '../skin/style/variable.scss'
import Poster from './poster'
// import Replay from './replay'
/**
 * 根据入参的播放器配置进行默认plugin列表的配置
 * @param {object} playerConfig
 */
export default function getDefaultPlugins (playerConfig) {
  const ignores = playerConfig.ignores || []
  const defaultPlugins = []
  // if (ignores.join('||').indexOf('replay') < 0) {
  //   defaultPlugins.push(Replay)
  // }
  if (ignores.join('||').indexOf('poster') < 0) {
    defaultPlugins.push(Poster)
  }
  const plugins = playerConfig.plugins || []
  const retPlugins = defaultPlugins.concat(plugins)
  console.log('retPlugins', retPlugins)
  return retPlugins
}
