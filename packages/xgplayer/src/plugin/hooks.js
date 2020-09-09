function hook(hookName, handler, before) {
  if (!this.__hooks) {
    this.__hooks = {}
  }
  !this.__hooks[hookName] && (this.__hooks[hookName] = null)
  return function () {
    if (before) {
      try {
        before.call(this, ...arguments)
      } catch (e) {
        e.message = `[pluginName: ${this.pluginName}:${hookName}:before error] >> ${e.message}`
        throw e
      }
    }
    if (this.__hooks && this.__hooks[hookName]) {
      try {
        const beforeRet = this.__hooks[hookName].call(this, ...arguments)
        if (beforeRet) {
          if (beforeRet.then) {
            beforeRet.then((isContinue) => {
              if (isContinue) {
                handler.call(this, ...arguments)
              }
            }).catch(e => {
              throw e
            })
          } else {
            handler.call(this, ...arguments)
          }
        }
      } catch (e) {
        e.message = `[pluginName: ${this.pluginName}:${hookName}] >> ${e.message}`
        throw e
      }
    } else {
      handler.call(this, ...arguments)
    }
  }.bind(this)
}

function useHooks (hookName, handler) {
  const {__hooks} = this
  if (!__hooks.hasOwnProperty(hookName)) {
    console.warn(`plugin:${this.pluginName} has no hook which name [${hookName}]`)
    return
  }
  __hooks[hookName] = handler
}

function usePluginHooks (pluginName, ...args) {
  if (!this.plugins || !this.plugins[pluginName.toLowerCase()]) {
    return
  }
  const plugin = this.plugins[pluginName.toLowerCase()]
  plugin.useHooks && plugin.useHooks(...args)
}

function HOOK (instance) {
  instance.__hooks = {}
  Object.defineProperty(instance, 'hooks', {
    get: () => {
      const keys = Object.keys(instance.__hooks).map(key => {
        if(instance.__hooks[key]) {
          return key
        }
      })
      return keys
    }
  })
  instance.hook = hook.bind(instance)
  instance.useHooks = useHooks.bind(instance)
  if (instance.plugins) {
    instance.usePluginHooks = usePluginHooks.bind (instance)
  }
}

export {
  HOOK as default
}