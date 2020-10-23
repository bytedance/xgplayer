/**
* a plugins manager to register and search
**/
const pluginsManager = {
  init (player) {
    // 标记每一个播放器实例
    let cgid = player._pluginInfoId
    if (!cgid) {
      cgid = new Date().getTime()
      player._pluginInfoId = cgid
    }
    if (!this.pluginGroup) {
      this.pluginGroup = {}
    }
    this.pluginGroup[cgid] = {
      '_player': player,
      '_originalOptions': player.config || {}
    }
  },
  /**
   * register a lazy plugin
   * @param { object } player instance
   * @param { object } lazyPlugin config
   *
   */
  lazyRegister (player, lazyPlugin) {
    const timeout = lazyPlugin.timeout || 1500
    return Promise.race([
      lazyPlugin.loader().then((plugin) => {
        let result;
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
  * @param { object } player the plugins install
  * @param { function } plugin the plugin contructor
  * @param { object } options the plugin configuration
  * @return { object } Plugin the plugin instance
  **/
  register (player, plugin, options = {}) {
    if (!player || !plugin || typeof plugin !== 'function' || plugin.prototype === undefined) {
      return
    }
    let cgid = player._pluginInfoId
    if (!cgid || !this.pluginGroup || !this.pluginGroup[cgid]) {
      this.init(player)
      cgid = player._pluginInfoId
    }
    if (!this.pluginGroup[cgid]._plugins) {
      this.pluginGroup[cgid]._plugins = []
    }
    const plugins = this.pluginGroup[cgid]._plugins
    const originalOptions = this.pluginGroup[cgid]._originalOptions
    options.player = this.pluginGroup[cgid]._player

    const pluginName = options.pluginName || plugin.pluginName
    if (!pluginName) {
      throw new Error('The property pluginName is necessary')
    }

    if (plugin.isSupported && !plugin.isSupported()) {
      console.warn(`not supported plugin [${pluginName}]`)
      return;
    }

    if (!options.config) {
      options.config = {}
    }

    // 复制插件的默认配置项
    if (plugin.defaultConfig) {
      Object.keys(plugin.defaultConfig).map(key => {
        if (typeof options.config[key] === 'undefined') {
          options.config[key] = plugin.defaultConfig[key]
        }
      })
    }

    for (const item of Object.keys(originalOptions)) {
      if (pluginName.toLowerCase() === item.toLowerCase()) {
        options.config = Object.assign({}, options.config, originalOptions[item])
        break;
      }
    }

    // 获取插件添加的父节点
    if (!options.root) {
      options.root = player.root
    } else if (typeof options.root === 'string') {
      options.root = player[options.root]
    }

    options.index = options.config.index || 0
    try {
      // 如果已经存在 则将其销毁
      if (plugins[pluginName.toLowerCase()]) {
        plugins[pluginName.toLowerCase()].__destroy && plugins[pluginName.toLowerCase()].__destroy()
        plugins[pluginName.toLowerCase()] = null
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
   * @param {String} cgid
   * @param {String} name
   */
  unRegister (cgid, name) {
    try {
      this.pluginGroup[cgid]._plugins[name].__destroy()
      this.pluginGroup[cgid]._plugins[name] = null
    } catch (e) {
      this.pluginGroup[cgid]._plugins[name] = null
    }
  },

  /**
   * remove a plugin instance from the player plugin list
   * @param {Object} player
   * @param {String} name
   */
  deletePlugin (player, name) {
    const cgid = player._pluginInfoId
    cgid && this.pluginGroup[cgid] && (this.pluginGroup[cgid]._plugins[name] = null)
  },

  /**
   * get all plugin instance of player
   * @param {*} player
   */
  getPlugins (player) {
    const cgid = player._pluginInfoId
    return cgid ? this.pluginGroup[cgid]._plugins : {}
  },

  findPlugin (player, name) {
    if (!this.pluginGroup) {
      return null;
    }
    const cgid = player._pluginInfoId
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
        return;
      }

      let prevTask;
      if (player._loadingPlugins && player._loadingPlugins.length) {
        prevTask = Promise.all(player._loadingPlugins)
      } else {
        prevTask = Promise.resolve()
      }

      return prevTask.then(() => {
        const cgid = player._pluginInfoId
        const plugins = this.pluginGroup[cgid]._plugins
        const pluginsRet = []
        for (const item of Object.keys(plugins)) {
          if (plugins[item] && plugins[item].beforePlayerInit) {
            try {
              let ret = plugins[item].beforePlayerInit()
              pluginsRet.push(retPromise(ret))
            } catch (e) {
              pluginsRet.push(retPromise(null))
              throw e
            }
          }
        }

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
    if (!this.pluginGroup) {
      return;
    }
    const cgid = player._pluginInfoId
    const plugins = this.pluginGroup[cgid]._plugins
    for (const item of Object.keys(plugins)) {
      if (plugins[item] && plugins[item].afterPlayerInit) {
        plugins[item].afterPlayerInit()
      }
    }
  },

  setLang (lang, player) {
    if (!this.pluginGroup) {
      return;
    }
    const cgid = player._pluginInfoId
    const plugins = this.pluginGroup[cgid]._plugins
    for (const item of Object.keys(plugins)) {
      plugins[item].updateLang && plugins[item].updateLang(lang)
    }
  },

  reRender (player) {
    const cgid = player._pluginInfoId
    const pluginsMap = {}
    const plugins = this.pluginGroup[cgid]._plugins
    for (const item of Object.keys(plugins)) {
      pluginsMap[item] = {
        plugin: plugins[item].func,
        options: plugins[item]._args
      }
      this.unRegister(cgid, item)
    }
    for (const item of Object.keys(pluginsMap)) {
      this.register(cgid, item, pluginsMap[item].plugin, pluginsMap[item].options)
    }
  },

  onPluginsReady (player) {
    const cgid = player._pluginInfoId
    const plugins = this.pluginGroup[cgid]._plugins
    if (!cgid || !plugins) {
      return;
    }
    Object.keys(plugins).map(key => {
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
    const plugins = this.pluginGroup[cgid]._plugins
    for (const item of Object.keys(plugins)) {
      this.unRegister(cgid, item)
    }
    delete this.pluginGroup[cgid]
  }
}

export default pluginsManager
