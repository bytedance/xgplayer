
import '../skin/style/variable.scss'
import Poster from './poster'
import Replay from './replay'
import Miniscreen from './Controls/mini'
import Keyboard from './keyboard';
import Rotate from './Controls/rotate'
import StartPlugin from './start'
/**
 * 根据入参的播放器配置进行默认plugin列表的配置
 * @param {object} playerConfig
 */
export default function getDefaultPlugins (playerConfig) {
  const defaultPlugins = [];
  defaultPlugins.push(Replay);
  defaultPlugins.push(Poster);
  defaultPlugins.push(StartPlugin);
  defaultPlugins.push({
    plugin: Miniscreen,
    options: {
      root: 'controls'
    }
  });
  defaultPlugins.push({
    plugin: Rotate,
    options: {
      root: 'controls'
    }
  })
  defaultPlugins.push(Keyboard)
  const plugins = playerConfig.plugins || [];
  const retPlugins = defaultPlugins.concat(plugins);
  return retPlugins
}
