/**
* a plugins manager to register and search
**/
var pluginsManager = {
  init: function init(player) {
    // 标记每一个播放器实例
    var cgid = player._pluginInfoId;
    if (!cgid) {
      cgid = new Date().getTime();
      player._pluginInfoId = cgid;
    }
    if (!this.pluginGroup) {
      this.pluginGroup = {};
    }
    this.pluginGroup[cgid] = {
      '_player': player,
      '_originalOptions': player.config || {}
    };
  },

  /**
   * register a lazy plugin
   * @param { object } player instance
   * @param { object } lazyPlugin config
   *
   */
  lazyRegister: function lazyRegister(player, lazyPlugin) {
    var _this = this;

    var timeout = lazyPlugin.timeout || 1500;
    return Promise.race([lazyPlugin.loader().then(function (plugin) {
      var result = void 0;
      if (plugin && plugin.__esModule) {
        result = plugin.default;
      } else {
        result = plugin;
      }
      _this.register(player, result, plugin.options);
    }), new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('timeout'));
      }, timeout);
    })]);
  },

  /**
  * register a Plugin
  * @param { object } player the plugins install
  * @param { function } plugin the plugin contructor
  * @param { object } options the plugin configuration
  * @return { object } Plugin the plugin instance
  **/
  register: function register(player, plugin) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!player || !plugin || typeof plugin !== 'function' || plugin.prototype === undefined) {
      return;
    }
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup || !this.pluginGroup[cgid]) {
      this.init(player);
      cgid = player._pluginInfoId;
    }
    if (!this.pluginGroup[cgid]._plugins) {
      this.pluginGroup[cgid]._plugins = [];
    }
    var plugins = this.pluginGroup[cgid]._plugins;
    var originalOptions = this.pluginGroup[cgid]._originalOptions;
    options.player = this.pluginGroup[cgid]._player;

    var pluginName = options.pluginName || plugin.pluginName;
    if (!pluginName) {
      throw new Error('The property pluginName is necessary');
    }

    if (plugin.isSupported && !plugin.isSupported()) {
      console.warn('not supported plugin [' + pluginName + ']');
      return;
    }

    if (!options.config) {
      options.config = {};
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(originalOptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (pluginName.toLowerCase() === item.toLowerCase()) {
          options.config = Object.assign({}, options.config, originalOptions[item]);
          break;
        }
      }

      // 复制插件的默认配置项
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (plugin.defaultConfig) {
      Object.keys(plugin.defaultConfig).map(function (key) {
        if (typeof options.config[key] === 'undefined') {
          options.config[key] = plugin.defaultConfig[key];
        }
      });
    }

    // 获取插件添加的父节点
    if (!options.root) {
      options.root = player.root;
    } else if (typeof options.root === 'string') {
      options.root = player[options.root];
    }

    options.index = options.config.index || 0;
    try {
      // eslint-disable-next-line new-cap
      var _instance = new plugin(options);
      plugins[pluginName.toLowerCase()] = _instance;
      plugins[pluginName.toLowerCase()].func = plugin;
      if (_instance && typeof _instance.afterCreate === 'function') {
        _instance.afterCreate();
      }
      return _instance;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  unRegister: function unRegister(cgid, name) {
    try {
      this.pluginGroup[cgid]._plugins[name]._destroy();
      this.pluginGroup[cgid]._plugins[name] = null;
    } catch (e) {
      this.pluginGroup[cgid]._plugins[name] = null;
    }
  },


  /**
   * get all plugin instance of player
   * @param {*} player
   */
  getPlugins: function getPlugins(player) {
    var cgid = player._pluginInfoId;
    return cgid ? this.pluginGroup[cgid]._plugins : {};
  },
  findPlugin: function findPlugin(player, name) {
    if (!this.pluginGroup) {
      return null;
    }
    var cgid = player._pluginInfoId;
    var cName = name.toLowerCase();
    return this.pluginGroup[cgid]._plugins[cName];
  },
  beforeInit: function beforeInit(player) {
    var _this2 = this;

    console.log('beforeInit');
    function retPromise(fun) {
      if (!fun || !fun.then) {
        return new Promise(function (resolve) {
          resolve();
        });
      } else {
        return fun;
      }
    }
    return new Promise(function (resolve) {
      if (!_this2.pluginGroup) {
        return;
      }
      var cgid = player._pluginInfoId;
      var plugins = _this2.pluginGroup[cgid]._plugins;
      var pluginsRet = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(plugins)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          if (plugins[item] && plugins[item].beforePlayerInit) {
            try {
              var ret = plugins[item].beforePlayerInit();
              pluginsRet.push(retPromise(ret));
            } catch (e) {
              pluginsRet.push(retPromise(null));
              throw e;
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      Promise.all(pluginsRet).then(function () {
        resolve();
      }).catch(function (e) {
        console.error(e);
        resolve();
      });
    });
  },
  afterInit: function afterInit(player) {
    var _this3 = this;

    console.log('afterInit');
    var prevTask = void 0;
    if (player._loadingPlugins && player._loadingPlugins.length) {
      prevTask = Promise.all(player._loadingPlugins);
    } else {
      prevTask = Promise.resolve();
    }
    if (!this.pluginGroup) {
      return;
    }
    prevTask.then(function () {
      var cgid = player._pluginInfoId;
      var plugins = _this3.pluginGroup[cgid]._plugins;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.keys(plugins)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          if (plugins[item] && plugins[item].afterPlayerInit) {
            plugins[item].afterPlayerInit();
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    });
  },
  reRender: function reRender(player) {
    var cgid = player._pluginInfoId;
    var pluginsMap = {};
    var plugins = this.pluginGroup[cgid]._plugins;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = Object.keys(plugins)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var item = _step4.value;

        pluginsMap[item] = {
          plugin: plugins[item].func,
          options: plugins[item]._args
        };
        this.unRegister(cgid, item);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = Object.keys(pluginsMap)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _item = _step5.value;

        this.register(cgid, _item, pluginsMap[_item].plugin, pluginsMap[_item].options);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  },
  onPluginsReady: function onPluginsReady(player) {
    var cgid = player._pluginInfoId;
    var plugins = this.pluginGroup[cgid]._plugins;
    if (!cgid || !plugins) {
      return;
    }
    Object.keys(plugins).map(function (key) {
      if (plugins[key].onPluginsReady && typeof plugins[key].onPluginsReady === 'function') {
        plugins[key].onPluginsReady();
      }
    });
  },
  destroy: function destroy(player) {
    var cgid = player._pluginInfoId;
    var plugins = this.pluginGroup[cgid]._plugins;
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = Object.keys(plugins)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var item = _step6.value;

        this.unRegister(cgid, item);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    delete this.pluginGroup[cgid];
  }
};

export default pluginsManager;