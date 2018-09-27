import { compile } from 'yuefu-template-compiler'
import ASTCompiler from './ASTCompiler'
import Player from 'xgplayer'

import { insertCss } from './utils'

class Template {
  constructor (element, component, player, model, options) {
    this.player = player
    this.options = options
    this.template = component.template
    this.model = component.model
    this.style = component.style
    this.element = element
  }
  render () {
    console.log('[template]render:')
    if (!this.template) {
      throw new Error('未设置template')
    }
    const compiled = compile(this.template, this.options)

    console.log('[template]compiled:', compiled)

    const astCompiler = new ASTCompiler(this.element, compiled, this.model, {
      inject: {
        $player: this.player, // 注入$player对象
        $util: Player.util // 注入$util对象
      }
    })
    // const mvvm = new MVVM({
    //   el: this.element,
    //   data: this.model.data,
    //   mounted: this.model.mounted,
    //   methods: this.model.methods,
    //   templateDescriptor: compiled
    // })

    // 插入template的css
    // TODO: 考虑会影响其他样式，考虑加入scoped
    const style = insertCss(this.style)
    console.log('[template]css injected:', compiled)
  }
}
Template.DEFAULTS = {}
// Module.name = 'undefinedModule'

export default Template
