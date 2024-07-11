import { STATE_CLASS } from 'xgplayer'
import * as AdEvents from '../events'
import { AdPlayIcon } from './plugins/adPlay'
import { AdProgress } from './plugins/adProgress'
import { AdStub } from './plugins/adStub'
import { AdTimeIcon } from './plugins/adTime'

export class AdUIManager {
  constructor (config, { player, plugin }) {
    this.player = player
    this.config = config
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

    this.init()
    this.initEvents()
  }

  init () {
    const { player, adUIPlugins, fragment } = this
    const decoratedPluginList = [
      // [player.getPlugin('start'), AdStart],
      [player.getPlugin('play'), AdPlayIcon],
      [player.getPlugin('time'), AdTimeIcon],
      [player.getPlugin('playbackRate'), AdStub],
      [player.getPlugin('progress'), AdProgress]
    ]

    decoratedPluginList.forEach(([targetPlugin, decoratorClass]) => {
      if (targetPlugin && !player.getPlugin(decoratorClass.pluginName)) {
        player.registerPlugin(decoratorClass)
        const newDecoratorPlugin = player.getPlugin(decoratorClass.pluginName)
        fragment.appendChild(newDecoratorPlugin.root)
        adUIPlugins.push([
          targetPlugin /* target plugin */,
          newDecoratorPlugin /* override plugin */
        ])
      }
    })
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
  }

  showAdUI () {
    const { player, config, adUIPlugins, fragment: fragmentContainer } = this
    adUIPlugins.forEach(([normalPlugin, overrideAdPlugin]) => {
      if (!overrideAdPlugin) {
        return
      }
      const { root: adRoot } = overrideAdPlugin
      const { root: normalRoot } = normalPlugin
      if (fragmentContainer.contains(adRoot)) {
        fragmentContainer.removeChild(adRoot)
      }
      normalRoot.parentNode.insertBefore(adRoot, normalRoot)
      fragmentContainer.appendChild(normalRoot)
    })

    if (config.controls === false && player.controls) {
      this.hideControls()
    }

    // start插件比较特殊需要单独处理
    const startPlugin = player.getPlugin('start')
    if (startPlugin) {
      startPlugin.hide()
    }
  }

  hideAdUI () {
    const { player, config, adUIPlugins, fragment } = this
    adUIPlugins.forEach(([normalPlugin, overrideAdPlugin]) => {
      if (!overrideAdPlugin) {
        return
      }
      const { root: adRoot } = overrideAdPlugin
      const { root: normalRoot } = normalPlugin
      if (fragment.contains(normalRoot)) {
        fragment.removeChild(normalRoot)
      }
      adRoot.parentNode.insertBefore(normalRoot, adRoot)
      fragment.appendChild(adRoot)
    })

    if (config.controls === false && fragment.contains(player.controls?.root)) {
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
}
