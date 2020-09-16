
function callHandler (obj, handler, next, ...args) {
  const ret = handler.call(obj, ...args)
  if (!next || typeof next !== 'function') {
    return
  }
  if (ret && ret.then) {
    ret.then((...args) => {
      next.call(obj, ...args)
    })
  } else {
    next.call(obj, ...args)
  }
}

/**
 * 给某个处理函数添加hook能力
 * @param {String} hookName
 * @param {Function} handler
 * @param {Object} preset
 * {
 *   pre: () => { // run beafore hook},
 *   next: () => { // run after hook return}
 * }
 */
function hook (hookName, handler, preset = {pre: null, next: null}) {
  if (!this.__hooks) {
    this.__hooks = {}
  }
  !this.__hooks[hookName] && (this.__hooks[hookName] = null)
  return function () {
    if (preset.pre) {
      try {
        preset.pre.call(this, ...arguments)
      } catch (e) {
        e.message = `[pluginName: ${this.pluginName}:${hookName}:pre error] >> ${e.message}`
        throw e
      }
    }
    if (this.__hooks && this.__hooks[hookName]) {
      try {
        const preRet = this.__hooks[hookName].call(this, ...arguments)
        if (preRet) {
          if (preRet.then) {
            preRet.then((isContinue) => {
              if (isContinue) {
                callHandler(this, handler, preset.next, ...arguments)
                // handler.call(this, ...arguments)
              }
            }).catch(e => {
              throw e
            })
          } else {
            callHandler(this, handler, preset.next, ...arguments)
            // handler.call(this, ...arguments)
          }
        }
      } catch (e) {
        e.message = `[pluginName: ${this.pluginName}:${hookName}] >> ${e.message}`
        throw e
      }
    } else {
      callHandler(this, handler, preset.next, ...arguments)
    }
  }.bind(this)
}

/**
 * 添加hooks
 * @param {String} 支持的hook名称
 * @param {Function} 具体的处理函数
 */
function useHooks (hookName, handler) {
  const {__hooks} = this
  if (!__hooks.hasOwnProperty(hookName)) {
    console.warn(`plugin:${this.pluginName} has no supported hook which name [${hookName}]`)
    return
  }
  __hooks[hookName] = handler
}

/**
 * 给某个插件添加hooks
 * @param {String} pluginName
 * @param  {...any} args
 */
function usePluginHooks (pluginName, ...args) {
  if (!this.plugins || !this.plugins[pluginName.toLowerCase()]) {
    return
  }
  const plugin = this.plugins[pluginName.toLowerCase()]
  plugin.useHooks && plugin.useHooks(...args)
}

/**
 * hook装饰器，为某个实例添加usePluginHooks/hook/useHooks的能力
 * @param {*} instance
 */
function hooksDescriptor (instance) {
  instance.__hooks = {}
  Object.defineProperty(instance, 'hooks', {
    get: () => {
      return Object.keys(instance.__hooks).map(key => {
        if (instance.__hooks[key]) {
          return key
        }
      })
    }
  })
  instance.hook = hook.bind(instance)
  instance.useHooks = useHooks.bind(instance)
  if (instance.plugins) {
    instance.usePluginHooks = usePluginHooks.bind(instance)
  }
}

export {
  hooksDescriptor as default
}
