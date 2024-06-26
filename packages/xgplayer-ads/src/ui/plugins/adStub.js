import { Plugin, Util } from 'xgplayer'

/**
 * @description 这个插件的作用只是做为一个占位符，用来替换那些没有被装饰的插件
 * @extends {Plugin}
 */
export class AdStub extends Plugin {
  static get pluginName () {
    return 'adStub'
  }

  render () {
    return Util.createDom('xg-ad-stub', '', {})
  }
}
