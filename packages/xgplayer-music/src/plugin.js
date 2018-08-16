export default class Plugin {
  constructor (player) {
    this.player = player
    this.config = player.config
    this.util = player.constructor.util

    const self = this
    player.on('complete', () => {
      self.afterPlayerInit()
    })
  }
  /**
   * 钩子函数：当player初始化完后
   *
   * @memberof Plugin
   */
  afterPlayerInit () {

  }
}
