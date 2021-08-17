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
 * @param { string } hookName
 * @param { Function } handler
 * @param { { pre?: any, next?:any } } preset
 * {
 *   pre: () => { // run beafore hook},
 *   next: () => { // run after hook return}
 * }
 */
function hook (hookName, handler, preset = { pre: null, next: null }) {
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
        const preRet = this.__hooks[hookName].call(this, this, ...arguments)
        if (preRet) {
          if (preRet.then) {
            preRet.then((isContinue) => {
              if (isContinue !== false) {
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
        } else if (preRet === undefined) {
          callHandler(this, handler, preset.next, ...arguments)
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
 * @param { string } 支持的hook名称
 * @param { Function } 具体的处理函数
 */
function useHooks (hookName, handler) {
  const { __hooks } = this
  if (!__hooks) {
    return
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!__hooks.hasOwnProperty(hookName)) {
    console.warn(`has no supported hook which name [${hookName}]`)
    return false
  }
  __hooks && (__hooks[hookName] = handler)
  return true
}

/**
 * 移除hook
 * @param { string } hookName
 * @param { (plugin: any, ..args) => {} } handler
 * @returns void
 */
function removeHooks (hookName, handler) {
  const { __hooks } = this
  if (!__hooks) {
    return
  }
  __hooks[hookName] = null
}

/**
 * 给某个插件添加hooks
 * @param { string } pluginName
 * @param  {...any} args
 */
function usePluginHooks (pluginName, ...args) {
  if (!this.plugins || !this.plugins[pluginName.toLowerCase()]) {
    return
  }
  const plugin = this.plugins[pluginName.toLowerCase()]
  return plugin.useHooks && plugin.useHooks(...args)
}

/**
 * hook装饰器，为某个实例添加usePluginHooks/hook/useHooks的能力
 * @param { any } instance
 * @param { Array<string> } [hookNames]
 */
function hooksDescriptor (instance, presetHooks = []) {
  instance.__hooks = {}
  presetHooks && presetHooks.map(item => {
    instance.__hooks[item] = null
  })
  Object.defineProperty(instance, 'hooks', {
    get: () => {
      return instance.__hooks && Object.keys(instance.__hooks).map(key => {
        if (instance.__hooks[key]) {
          return key
        }
      })
    }
  })
}

function delHooksDescriptor (instance) {
  instance.__hooks = null
}

function runHooks (obj, hookName, handler, ...args) {
  if (obj.__hooks && obj.__hooks[hookName]) {
    const ret = obj.__hooks[hookName].call(obj, obj, ...args)
    if (ret && ret.then) {
      ret.then((data) => {
        return data === false ? null : handler.call(obj, obj, ...args)
      }).catch(e => {
        console.warn(`[runHooks]${hookName} reject`, e.message)
      })
    } else if (ret !== false) {
      return handler.call(obj, obj, ...args)
    }
  } else {
    return handler.call(obj, obj, ...args)
  }
}

export {
  hooksDescriptor as default,
  hook,
  useHooks,
  usePluginHooks,
  removeHooks,
  delHooksDescriptor,
  runHooks
}
