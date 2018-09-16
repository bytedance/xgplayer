import { compile } from 'yuefu-template-compiler'
import MVVM from './mvvm'
import { insertCss } from './utils'

class Template {
  constructor (element, template, player, model, options) {
    this.player = player
    this.template = template
    this.options = options
    this.model = model
    this.element = element
  }
  render () {
    if (!this.template) {
      throw new Error('未设置template')
    }
    const compiled = compile(this.template.template, this.options)
    /* eslint-disable */
    debugger
    const mvvm = new MVVM({
      el: this.element,
      data: this.model.data,
      mounted: this.model.mounted,
      methods: this.model.methods,
      templateDescriptor: compiled
    })

    // 插入template的css
    const style = insertCss(this.template.style)
  }
}
Template.DEFAULTS = {}
// Module.name = 'undefinedModule'

export default Template
