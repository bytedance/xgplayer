function callHandler(obj, handler, next, ...args) {
  const ret = handler.call(obj, ...args)
  if (!next || typeof next !== 'function') {
    return
  }
  if (ret?.then) {
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
 * @param { Function } handler 被包装的原始处理函数，参数中不包含 plugin
 * @param { { pre?: any, next?:any } } preset
 * {
 *   pre: () => { // run beafore hook},
 *   next: () => { // run after hook return}
 * }
 */
function hook(hookName, handler, preset = { pre: null, next: null }) {
  if (!this.__hooks) {
    this.__hooks = {}
  }
  if (!this.__hooks[hookName]) {
    this.__hooks[hookName] = null
  }
  return function () {
    if (preset.pre) {
      try {
        preset.pre.call(this, ...arguments)
      } catch (e) {
        e.message = `[pluginName: ${this.pluginName}:${hookName}:pre error] >> ${e.message}`
        throw e
      }
    }
    if (!this.__hooks?.[hookName]) {
      callHandler(this, handler, preset.next, ...arguments)
      return
    }

    try {
      const hookResult = runHookChain(this, hookName, arguments)
      if (hookResult?.then) {
        hookResult
          .then((isContinue) => {
            if (isContinue !== false) {
              callHandler(this, handler, preset.next, ...arguments)
            }
          })
          .catch((e) => {
            throw e
          })
        return
      }

      // hooks 只有显式返回 false 时才阻止原始处理函数
      if (hookResult !== false) {
        callHandler(this, handler, preset.next, ...arguments)
      }
    } catch (e) {
      e.message = `[pluginName: ${this.pluginName}:${hookName}] >> ${e.message}`
      throw e
    }
  }.bind(this)
}

function findHookIndex(hookName, handler) {
  const { __hooks } = this
  if (!__hooks || !Array.isArray(__hooks[hookName])) {
    return -1
  }
  const hookHandlers = __hooks[hookName]
  for (let i = 0; i < hookHandlers.length; i++) {
    if (hookHandlers[i] === handler) {
      return i
    }
  }
  return -1
}

/**
 * add hooks
 * @param { string } hookName
 * @param { Function } handler
 */
function useHooks(hookName, handler) {
  const { __hooks } = this
  if (!__hooks) {
    return
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!__hooks.hasOwnProperty(hookName)) {
    console.warn(`has no supported hook which name [${hookName}]`)
    return false
  }
  if (!Array.isArray(__hooks[hookName])) {
    __hooks[hookName] = []
  }

  if (findHookIndex.call(this, hookName, handler) === -1) {
    __hooks[hookName].push(handler)
  }
  return true
}

/**
 * remove hook
 * @param { string } hookName
 * @param { (plugin: any, ..args) => {} } handler
 * @returns void
 */
function removeHooks(hookName, handler) {
  const { __hooks } = this
  if (!__hooks) {
    return
  }

  if (Array.isArray(__hooks[hookName])) {
    const hooks = __hooks[hookName]
    const index = findHookIndex.call(this, hookName, handler)

    if (index !== -1) {
      hooks.splice(index, 1)
    }
  } else if (__hooks[hookName]) {
    __hooks[hookName] = null
    // delete __hooks[hookName]
  }
}

/**
 * Add hooks to a plugin
 * @param { string } pluginName
 * @param  {...any} args
 */
function usePluginHooks(pluginName, ...args) {
  const plugin = this.plugins?.[pluginName.toLowerCase()]
  if (!plugin) {
    return
  }
  if (typeof plugin.useHooks !== 'function') {
    return
  }
  return plugin.useHooks(...args)
}

function removePluginHooks(pluginName, ...args) {
  const plugin = this.plugins?.[pluginName.toLowerCase()]
  if (!plugin || !plugin.removeHooks) {
    return
  }
  return plugin.removeHooks(...args)
}

/**
 * hook decorator, add hooks props for for an instance
 * @param { any } instance
 * @param { Array<string> } [hookNames]
 */
function hooksDescriptor(instance, presetHooks = []) {
  instance.__hooks = {}
  if (presetHooks) {
    presetHooks.forEach((item) => {
      instance.__hooks[item] = null
    })
  }
  Object.defineProperty(instance, 'hooks', {
    get: () => {
      return (
        instance.__hooks &&
        Object.keys(instance.__hooks).map((key) => {
          if (instance.__hooks[key]) {
            return key
          }
        })
      )
    }
  })
}

function delHooksDescriptor(instance) {
  instance.__hooks = null
}

/**
 * 依次执行已注册的 hooks。
 *
 * `hook()` 不传 finalHandler，只根据返回值决定是否执行原始处理函数；
 * `runHooks()` 传入 finalHandler，保持其最后以 (plugin, ...args) 调用 handler 的行为。
 * finalHandler 需要在链内执行，以保持异步 runHooks 原有的 Promise 时序。
 */
function runHookChain(obj, hookName, args, finalHandler) {
  const hasFinalHandler = arguments.length > 3
  const hooks = obj.__hooks?.[hookName]
  if (!Array.isArray(hooks)) {
    if (hasFinalHandler) {
      return finalHandler.call(obj, obj, ...args)
    }
    return true
  }

  let index = 0
  const runNextHook = () => {
    if (index === hooks.length) {
      if (hasFinalHandler) {
        return finalHandler.call(obj, obj, ...args)
      }
      return true
    }

    const currentHook = hooks[index]
    index++
    const hookResult = currentHook.call(obj, obj, ...args)
    if (hookResult?.then) {
      return hookResult
        .then((isContinue) => {
          return isContinue === false ? null : runNextHook()
        })
        .catch((e) => {
          console.warn(`[runHooks]${hookName} reject`, e.message)
        })
    }
    if (hookResult === false) {
      return false
    }
    return runNextHook()
  }

  return runNextHook()
}

function runHooks(obj, hookName, handler, ...args) {
  return runHookChain(obj, hookName, args, handler)
}

export {
  hooksDescriptor as default,
  hook,
  useHooks,
  usePluginHooks,
  removePluginHooks,
  removeHooks,
  delHooksDescriptor,
  runHooks
}
