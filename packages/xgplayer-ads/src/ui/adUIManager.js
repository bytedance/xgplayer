import { AdPlayIcon } from './plugins/adPlay'
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
    this.fragmentContainer = document.createDocumentFragment()

    this.init()
  }

  init () {
    const { player, adUIPlugins, fragmentContainer } = this
    const decoratedPluginList = [
      [player.getPlugin('play'), AdPlayIcon],
      [player.getPlugin('time'), AdTimeIcon]
    ]

    decoratedPluginList.forEach(([targetPlugin, decoratorClass]) => {
      if (targetPlugin && !player.getPlugin(decoratorClass.pluginName)) {
        player.registerPlugin(decoratorClass)
        const newDecoratorPlugin = player.getPlugin(decoratorClass.pluginName)
        fragmentContainer.appendChild(newDecoratorPlugin.root)
        adUIPlugins.push([
          targetPlugin /* target plugin */,
          newDecoratorPlugin /* override plugin */
        ])
      }
    })
  }

  showAdUI () {
    const { adUIPlugins, fragmentContainer } = this
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
  }

  hideAdUI () {
    const { adUIPlugins, fragmentContainer } = this
    adUIPlugins.forEach(([normalPlugin, overrideAdPlugin]) => {
      if (!overrideAdPlugin) {
        return
      }
      const { root: adRoot } = overrideAdPlugin
      const { root: normalRoot } = normalPlugin
      if (fragmentContainer.contains(normalRoot)) {
        fragmentContainer.removeChild(normalRoot)
      }
      adRoot.parentNode.insertBefore(normalRoot, adRoot)
      fragmentContainer.appendChild(adRoot)
    })
  }
}
