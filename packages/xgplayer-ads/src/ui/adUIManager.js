import { CssFullscreenIcon, FullscreenIcon, PlayIcon, Progress, STATE_CLASS, TimeIcon, Util, VolumeIcon } from 'xgplayer'
import * as AdEvents from '../events'
import { AD_STATE_CLASS } from './adStateClass'
import { AdPlayIcon } from './plugins/adPlay'
import { AdProgress } from './plugins/adProgress'
import { AdTimeIcon } from './plugins/adTime'

export class AdUIManager {
  /**
   * @param {Object} options
   * @param {import('xgplayer').default} options.player
   * @param {import('../plugin').AdsPlugin} options.plugin
   */
  constructor (config, options) {
    const { player, plugin } = options
    this.player = player
    this.config = config

    /**
     * @type {import('../plugin').AdsPlugin}
     */
    this.adPlugin = plugin
    this.adUIPlugins = []

    // 使用一个fragment容器去来回替换装饰的广告UI插件和普通的插件，
    // 如果只是简单的css隐藏，会导致播放器的插件顺序发生变化，
    // 样式会有问题，比如容器中的第一个子节点样式无法同时应用于装饰插件和普通插件
    this.fragment = document.createDocumentFragment()

    /**
     * @description 存储 controls 位置信息
     * @type {{
     *  parentNode: HTMLElement,
    *   previousSibling: HTMLElement,
    *   nextSibling: HTMLElement,
    *   } | null}
     */
    this.controlsPos = null

    /**
     * @description 装饰的广告UI插件列表, 如果没有被装饰的对象也依然允许展示
     */
    this.decoratedAdPluginList = [
      [PlayIcon, AdPlayIcon],
      [TimeIcon, AdTimeIcon],
      [Progress, AdProgress],
      [VolumeIcon, null],
      [CssFullscreenIcon, null],
      [FullscreenIcon, null]
    ]

    this.init()
    this.initEvents()
  }

  init () {
    const { player, adUIPlugins, fragment, decoratedAdPluginList } = this

    decoratedAdPluginList.forEach(([targetClass, decoratorClass]) => {
      const targetPlugin = player.getPlugin(targetClass.pluginName)
      if (targetPlugin) {
        let newDecoratorPlugin = null
        if (decoratorClass && !player.getPlugin(decoratorClass.pluginName)) {
          player.registerPlugin(decoratorClass)
          newDecoratorPlugin = player.getPlugin(decoratorClass.pluginName)
          fragment.appendChild(newDecoratorPlugin.root)
        }

        adUIPlugins.push([
          targetPlugin /* target plugin */,
          newDecoratorPlugin /* override plugin, maybe null */
        ])
      }
    })
  }

  destroy () {
    this.fragment = null
    this.adUIPlugins = []
    this.decoratedAdPluginList = []
    this.adPlugin = null
    this.player = null
  }

  initEvents () {
    const { adPlugin, player } = this

    adPlugin.on(AdEvents.AD_PLAY, () => {
      const { NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING } = STATE_CLASS
      const clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING]
      clsList.forEach((cls) => {
        player.removeClass(cls)
      })
    })

    adPlugin.on(AdEvents.AD_START, () => {
      this.showAdContainer()
    })
    adPlugin.on(AdEvents.AD_COMPLETE, () => {
      this.hideAdContainer()
    })
    adPlugin.on(AdEvents.AD_SKIPPED, () => {
      this.hideAdContainer()
    })
    adPlugin.on(AdEvents.AD_ERROR, () => {
      this.hideAdContainer()
    })
  }

  showAdContainer () {
    const { player } = this

    if (!Util.hasClass(player.root, AD_STATE_CLASS.START)) {
      Util.addClass(player.root, AD_STATE_CLASS.START)
    }
  }

  hideAdContainer () {
    const { player } = this

    if (Util.hasClass(player.root, AD_STATE_CLASS.START)) {
      Util.removeClass(player.root, AD_STATE_CLASS.START)
    }
  }

  showAdUI () {
    const { player, config, adUIPlugins, fragment: fragmentContainer } = this

    // Allowed Ad UI Plugins
    adUIPlugins.forEach(([normalPlugin, overrideAdPlugin]) => {
      if (!overrideAdPlugin) {
        return
      }
      const { root: adRoot } = overrideAdPlugin
      const { root: normalRoot } = normalPlugin
      if (fragmentContainer.contains(adRoot)) {
        fragmentContainer.removeChild(adRoot)
      }
      // The ad plugin and the target plugin swap positions
      normalRoot.parentNode.insertBefore(adRoot, normalRoot)
      fragmentContainer.appendChild(normalRoot)
    })

    // Non-Ad UI Plugins
    const otherPlugins = this._getNonAdPlugin()
    otherPlugins.filter((plugin) => !!plugin.root).forEach((plugin) => {
      const { root } = plugin

      if (!plugin.__adStub__) {
        plugin.__adStub__ = Util.createDom('xg-ad-stub', '', {})
      }

      root.parentNode.insertBefore(plugin.__adStub__, root)
      fragmentContainer.appendChild(root)
    })

    // start插件比较特殊需要单独处理
    const startPlugin = player.getPlugin('start')
    if (startPlugin) {
      startPlugin.hide()
    }

    if (config.controls === false && player.controls) {
      this.hideControls()
    }

    // 广告播控UI展示的时候，一定需要展示容器。反之是不一定的，比如非线形广告，也是需要展示广告容器的
    this.showAdContainer()
  }

  hideAdUI () {
    const { player, config, adUIPlugins, fragment: fragmentContainer } = this

    // Allowed Ad UI Plugins
    adUIPlugins.forEach(([normalPlugin, overrideAdPlugin]) => {
      if (!overrideAdPlugin) {
        return
      }
      const { root: adRoot } = overrideAdPlugin
      const { root: normalRoot } = normalPlugin
      if (fragmentContainer.contains(normalRoot)) {
        fragmentContainer.removeChild(normalRoot)
      }
      if (!fragmentContainer.contains(adRoot)) {
        adRoot.parentNode.insertBefore(normalRoot, adRoot)
        fragmentContainer.appendChild(adRoot)
      }
    })

    // Non-Ad UI Plugins
    const otherPlugins = this._getNonAdPlugin()
    otherPlugins.filter((plugin) => !!plugin.root).forEach((plugin) => {
      const { root } = plugin

      if (fragmentContainer.contains(root)) {
        fragmentContainer.removeChild(root)
      }

      plugin.__adStub__?.parentNode?.insertBefore(root, plugin.__adStub__)
    })

    if (config.controls === false && fragmentContainer.contains(player.controls?.root)) {
      this.showControls()
    }

    // start插件比较特殊需要单独处理
    const startPlugin = player.getPlugin('start')
    if (startPlugin) {
      const disableAnimate = startPlugin.config.disableAnimate
      const isShowPause = startPlugin.config.isShowPause
      if (!disableAnimate) {
        startPlugin.config.disableAnimate = true
        startPlugin.config.isShowPause = false
      }
      player.once('play', () => {
        setTimeout(() => {
          startPlugin.config.disableAnimate = disableAnimate
          startPlugin.config.disableAnimate = isShowPause
        }, 10)
      })
    }
  }

  hideControls () {
    const { player, config, fragment } = this
    if (config.controls === false && player.controls) {
      const controlRoot = player.controls.root
      const parentNode = controlRoot.parentElement
      const previousSibling = controlRoot.previousSibling
      const nextSibling = controlRoot.nextSibling

      this.controlsPos = {
        parentNode,
        previousSibling,
        nextSibling
      }
      fragment.appendChild(player.controls.root)
    }
  }

  showControls () {
    const { player, config, fragment } = this
    if (config.controls === false && player.controls) {
      if (!this.controlsPos) {
        return
      }
      const controlRoot = player.controls.root
      if (fragment.contains(controlRoot)) {
        fragment.removeChild(controlRoot)
      }

      // Restore nodes to their original location
      const { parentNode, previousSibling, nextSibling } = this.controlsPos
      if (parentNode) {
        if (nextSibling) {
          parentNode.insertBefore(controlRoot, nextSibling)
        } else if (previousSibling) {
          parentNode.insertBefore(controlRoot, previousSibling.nextSibling)
        } else {
          parentNode.appendChild(controlRoot)
        }
      }

      this.controlsPos = null
    }
  }

  /**
   * 获取非广告UI插件（目前只处理controls内的插件）
   * @private
   */
  _getNonAdPlugin () {
    const { player, decoratedAdPluginList } = this
    const allowedNames = []
    decoratedAdPluginList.forEach(([targetClass, decoratorClass]) => {
      allowedNames.push(targetClass.pluginName.toLowerCase())
      if (decoratorClass) {
        allowedNames.push(decoratorClass.pluginName.toLowerCase())
      }
    })
    const controlPlugins = player.controls?.plugins() || []
    const otherPlugins = controlPlugins.filter((plugin) => allowedNames.indexOf(plugin.pluginName.toLowerCase()) === -1)

    return otherPlugins
  }
}
