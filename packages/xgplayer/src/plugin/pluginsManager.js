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
    // console.log('plugin.pluginName', plugin.pluginName)
    const pluginName = options.pluginName || plugin.pluginName
    if (!pluginName) {
      throw new Error('The property pluginName is necessary')
    }

    if (!options.config) {
      options.config = {}
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

    // 复制插件的默认配置项
    if (plugin.defaultConfig) {
      Object.keys(plugin.defaultConfig).map(key => {
        if (typeof options.config[key] === 'undefined') {
          options.config[key] = plugin.defaultConfig[key]
        }
      })
    }
    try {
      // eslint-disable-next-line new-cap
      const _instance = new plugin(options)
      plugins[pluginName.toLowerCase()] = _instance
      plugins[pluginName.toLowerCase()].func = plugin
      return _instance
    } catch (err) {
      console.error(err)
      throw (err)
    }
  },

  unRegister (cgid, name) {
    try {
      this.pluginGroup[cgid]._plugins[name]._destroy()
      this.pluginGroup[cgid]._plugins[name] = null
    } catch (e) {
      this.pluginGroup[cgid]._plugins[name] = null
    }
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
      Promise.all(pluginsRet).then(() => {
        resolve()
      }).catch((e) => {
        console.error(e)
        resolve()
      })
    })
  },

  afterInit (player) {
    let prevTask;
    if (player._loadingPlugins && player._loadingPlugins.length) {
      prevTask = Promise.all(player._loadingPlugins)
    } else {
      prevTask = Promise.resolve()
    }
    if (!this.pluginGroup) {
      return;
    }
    prevTask.then(() => {
      const cgid = player._pluginInfoId
      const plugins = this.pluginGroup[cgid]._plugins
      for (const item of Object.keys(plugins)) {
        if (plugins[item] && plugins[item].afterPlayerInit) {
          plugins[item].afterPlayerInit()
        }
      }
    })
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

  destroy (player) {
    const cgid = player._pluginInfoId
    const plugins = this.pluginGroup[cgid]._plugins
    for (const item of Object.keys(plugins)) {
      this.unRegister(cgid, item)
    }
    delete this.pluginGroup[cgid]
  }
}

export default pluginsManager
