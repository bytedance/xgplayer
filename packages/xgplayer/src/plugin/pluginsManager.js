import { addObserver, unObserver } from './resizeObserver'
import Util from '../utils/util'

/**
* a plugins manager to register and search
**/

const pluginsManager = {
  pluginGroup: {},
  init (player) {
    // mark every player instance by _pluginInfoId
    let cgid = player._pluginInfoId
    if (!cgid) {
      cgid = Util.generateSessionId()
      player._pluginInfoId = cgid
    }

    !player.config.closeResizeObserver && player.root && addObserver(player.root, () => {
      player.resize()
    })

    this.pluginGroup[cgid] = {
      _originalOptions: player.config || {},
      _plugins: {}
    }
  },

  formatPluginInfo (plugin, config) {
    let PLUFGIN = null
    let options = null
    if (plugin.plugin && typeof plugin.plugin === 'function') {
      PLUFGIN = plugin.plugin
      options = plugin.options
    } else {
      PLUFGIN = plugin
      options = {}
    }
    if (config) {
      options.config = config || {}
    }

    return {
      PLUFGIN,
      options
    }
  },

  /**
   * check the plugin if exits in plugins
   * @param {string} pluginName
   * @param { Array <any> } plugins
   * @returns boolean
   */
  checkPluginIfExits (pluginName, plugins) {
    for (let i = 0; i < plugins.length; i++) {
      if (pluginName.toLowerCase() === plugins[i].pluginName.toLowerCase()) {
        return true
      }
    }
    return false
  },

  /**
   * get plugin Config from playerConfig
   * @param { string } pluginName
   * @param { {[propName: string]: any;} } playerConfig
   * @return { {[propName: string]: any;} } pluginConfig
   */
  getRootByConfig (pluginName, playerConfig) {
    const keys = Object.keys(playerConfig)
    let _pConfig = null
    for (let i = 0; i < keys.length; i++) {
      if (pluginName.toLowerCase() === keys[i].toLowerCase()) {
        _pConfig = playerConfig[keys[i]]
        break
      }
    }

    if (Util.typeOf(_pConfig) === 'Object') {
      return {
        root: _pConfig.root,
        position: _pConfig.position
      }
    }
    return {}
  },

  /**
   * register a lazy plugin
   * @param { any } player instance
   * @param { any } lazyPlugin config
   *
   */
  lazyRegister (player, lazyPlugin) {
    const timeout = lazyPlugin.timeout || 1500
    return Promise.race([
      lazyPlugin.loader().then((plugin) => {
        let result
        if (plugin && plugin.__esModule) {
          result = plugin.default
        } else {
          result = plugin
        }
        this.register(player, result, plugin.options)
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('timeout'))
        }, timeout)
      })
    ])
  },
  /**
  * register a Plugin
  * @param { any } player the plugins register
  * @param { any } plugin the plugin contructor
  * @param { any } options the plugin configuration
  * @return { any } Plugin the plugin instance
  **/
  register (player, plugin, options = {}) {
    if (!player || !plugin || typeof plugin !== 'function' || plugin.prototype === undefined) {
      return
    }
    const cgid = player._pluginInfoId
    if (!cgid || !this.pluginGroup[cgid]) {
      return
    }
    if (!this.pluginGroup[cgid]._plugins) {
      this.pluginGroup[cgid]._plugins = {}
    }
    const plugins = this.pluginGroup[cgid]._plugins
    const originalOptions = this.pluginGroup[cgid]._originalOptions
    options.player = player

    const pluginName = options.pluginName || plugin.pluginName
    if (!pluginName) {
      throw new Error('The property pluginName is necessary')
    }

    if (plugin.isSupported && !plugin.isSupported(player.config.mediaType, player.config.codecType)) {
      console.warn(`not supported plugin [${pluginName}]`)
      return
    }

    if (!options.config) {
      options.config = {}
    }

    // get config items from player.config
    const keys = Object.keys(originalOptions)
    for (let i = 0; i < keys.length; i++) {
      if (pluginName.toLowerCase() === keys[i].toLowerCase()) {
        const config = originalOptions[keys[i]]
        if (Util.typeOf(config) === 'Object') {
          options.config = Object.assign({}, options.config, originalOptions[keys[i]])
        } else if (Util.typeOf(config) === 'Boolean') {
          options.config.disable = !config
        }
        break
      }
    }

    // copy the default configuration items of the plugin
    if (plugin.defaultConfig) {
      Object.keys(plugin.defaultConfig).forEach(key => {
        if (typeof options.config[key] === 'undefined') {
          options.config[key] = plugin.defaultConfig[key]
        }
      })
    }

    // get the parent dom which added the plugin will be mounted
    if (!options.root) {
      options.root = player.root
    } else if (typeof options.root === 'string') {
      options.root = player[options.root]
    }

    options.index = options.config.index || 0
    try {
      // if there is already a plugin instance with the same pluginName, destroy it
      if (plugins[pluginName.toLowerCase()]) {
        this.unRegister(cgid, pluginName.toLowerCase())
        console.warn(`the is one plugin with same pluginName [${pluginName}] exist, destroy the old instance`)
      }
      // eslint-disable-next-line new-cap
      const _instance = new plugin(options)
      plugins[pluginName.toLowerCase()] = _instance
      plugins[pluginName.toLowerCase()].func = plugin
      if (_instance && typeof _instance.afterCreate === 'function') {
        _instance.afterCreate()
      }
      return _instance
    } catch (err) {
      console.error(err)
      throw (err)
    }
  },

  /**
   * Unregister a plugin from player instance
   * @param { string } cgid
   * @param { string } name
   */
  unRegister (cgid, name) {
    if (cgid._pluginInfoId) {
      cgid = cgid._pluginInfoId
    }
    name = name.toLowerCase()
    try {
      const plugin = this.pluginGroup[cgid]._plugins[name]
      if (plugin) {
        plugin.pluginName && plugin.__destroy()
        delete this.pluginGroup[cgid]._plugins[name]
      }
    } catch (e) {
      console.error(`[unRegister:${name}] cgid:[${cgid}] error`, e)
    }
  },

  /**
   * remove a plugin instance from the player plugin list
   * @param { any } player
   * @param { string } name
   */
  deletePlugin (player, name) {
    const cgid = player._pluginInfoId
    if (cgid && this.pluginGroup[cgid] && this.pluginGroup[cgid]._plugins) {
      delete this.pluginGroup[cgid]._plugins[name]
    }
  },

  /**
   * get all plugin instance of player
   * @param { any } player
   */
  getPlugins (player) {
    const cgid = player._pluginInfoId
    return cgid && this.pluginGroup[cgid] ? this.pluginGroup[cgid]._plugins : {}
  },

  findPlugin (player, name) {
    const cgid = player._pluginInfoId
    if (!cgid || !this.pluginGroup[cgid]) {
      return null
    }
    const cName = name.toLowerCase()
    return this.pluginGroup[cgid]._plugins[cName]
  },

  beforeInit (player) {
    function retPromise (fun) {
      if (!fun || !fun.then) {
        return new Promise((resolve) => {
          resolve()
        })
      } else {
        return fun
      }
    }
    return new Promise((resolve) => {
      if (!this.pluginGroup) {
        return
      }

      let prevTask
      if (player._loadingPlugins && player._loadingPlugins.length) {
        prevTask = Promise.all(player._loadingPlugins)
      } else {
        prevTask = Promise.resolve()
      }

      return prevTask.then(() => {
        const cgid = player._pluginInfoId
        if (!this.pluginGroup[cgid]) {
          resolve()
          return
        }
        const plugins = this.pluginGroup[cgid]._plugins
        const pluginsRet = []
        Object.keys(plugins).forEach(pName => {
          if (plugins[pName] && plugins[pName].beforePlayerInit) {
            try {
              const ret = plugins[pName].beforePlayerInit()
              pluginsRet.push(retPromise(ret))
            } catch (e) {
              pluginsRet.push(retPromise(null))
              throw e
            }
          }
        })

        Promise.all([...pluginsRet]).then(() => {
          resolve()
        }).catch((e) => {
          console.error(e)
          resolve()
        })
      })
    })
  },

  afterInit (player) {
    const cgid = player._pluginInfoId
    if (!cgid || !this.pluginGroup[cgid]) {
      return
    }
    const plugins = this.pluginGroup[cgid]._plugins
    Object.keys(plugins).forEach(pName => {
      if (plugins[pName] && plugins[pName].afterPlayerInit) {
        plugins[pName].afterPlayerInit()
      }
    })
  },

  setLang (lang, player) {
    const cgid = player._pluginInfoId
    if (!cgid || !this.pluginGroup[cgid]) {
      return
    }
    const plugins = this.pluginGroup[cgid]._plugins
    Object.keys(plugins).forEach(item => {
      if (plugins[item].updateLang) {
        plugins[item].updateLang(lang)
      } else {
        // 兼容旧版本通过set lang更新语言的问题
        try {
          plugins[item].lang = lang
        } catch (error) {
          console.warn(`${item} setLang`)
        }
      }
    })
  },

  reRender (player) {
    const cgid = player._pluginInfoId

    if (!cgid || !this.pluginGroup[cgid]) {
      return
    }
    const _pList = []
    const plugins = this.pluginGroup[cgid]._plugins
    Object.keys(plugins).forEach(pName => {
      if (pName !== 'controls' && plugins[pName]) {
        _pList.push({
          plugin: plugins[pName].func,
          options: plugins[pName].__args
        })
        this.unRegister(cgid, pName)
      }
    })
    _pList.forEach(item => {
      this.register(player, item.plugin, item.options)
    })
  },

  onPluginsReady (player) {
    const cgid = player._pluginInfoId
    if (!cgid || !this.pluginGroup[cgid]) {
      return
    }
    const plugins = this.pluginGroup[cgid]._plugins || {}
    Object.keys(plugins).forEach(key => {
      if (plugins[key].onPluginsReady && typeof plugins[key].onPluginsReady === 'function') {
        plugins[key].onPluginsReady()
      }
    })
  },

  destroy (player) {
    const cgid = player._pluginInfoId
    if (!this.pluginGroup[cgid]) {
      return
    }
    unObserver(player.root)
    const plugins = this.pluginGroup[cgid]._plugins
    for (const item of Object.keys(plugins)) {
      this.unRegister(cgid, item)
    }
    delete this.pluginGroup[cgid]
    delete player._pluginInfoId
  }
}

export default pluginsManager
