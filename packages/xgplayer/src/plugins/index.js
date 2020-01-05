
import '../skin/style/variable.scss'
import Poster from './poster'
import Replay from './replay'
/**
 * 根据入参的播放器配置进行默认plugin列表的配置
 * @param {object} playerConfig
 */
export default function getDefaultPlugins (playerConfig) {
  const defaultPlugins = []
  defaultPlugins.push(Poster)
  defaultPlugins.push(Replay)
  const plugins = playerConfig.plugins || []
  const retPlugins = defaultPlugins.concat(plugins)
  return retPlugins
}
