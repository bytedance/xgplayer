import Player from 'xgplayer'
import Template from './Template'
import learningTemplate from '../templateExamples/learning'

const templatePlugin = function (player) {
  // TODO: 模版可配置化
  // TODO: 异步加载模版
  // TODO: 组件化机制
  const template = new Template('#wrapper', learningTemplate, this)
  template.render()
}

Player.install('template', templatePlugin)
