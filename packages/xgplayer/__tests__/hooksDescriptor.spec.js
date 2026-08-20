import hooksDescriptor, {
  hook,
  removeHooks,
  runHooks,
  useHooks,
  usePluginHooks
} from '../src/plugin/hooksDescriptor'

function createHookTarget (hookName, handler, preset) {
  const plugin = {
    pluginName: 'start',
    useHooks (hookName, pluginHook) {
      return useHooks.call(this, hookName, pluginHook)
    }
  }
  hooksDescriptor(plugin)
  const wrappedHandler = hook.call(plugin, hookName, handler, preset)
  const player = {
    plugins: {
      start: plugin
    }
  }

  return { player, plugin, wrappedHandler }
}

function flushPromises () {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('plugin hooks', () => {
  test('runs the wrapped handler once with unchanged arguments when no hook is registered', () => {
    const handler = jest.fn()
    const event = { type: 'click' }
    const data = { paused: true }
    const { wrappedHandler } = createHookTarget('startClick', handler)

    wrappedHandler(event, data)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(event, data)
  })

  test('keeps the plugin argument out of the wrapped handler', () => {
    const handler = jest.fn(event => event.stopPropagation())
    const event = { type: 'click', stopPropagation: jest.fn() }
    const data = { paused: true }
    const { player, plugin, wrappedHandler } = createHookTarget('startClick', handler)
    const pluginHook = jest.fn(() => true)

    usePluginHooks.call(player, 'start', 'startClick', pluginHook)
    wrappedHandler(event, data)

    expect(pluginHook).toHaveBeenCalledTimes(1)
    expect(pluginHook).toHaveBeenCalledWith(plugin, event, data)
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(event, data)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })

  test('runs the wrapped handler once even when it returns false', () => {
    const handler = jest.fn(() => false)
    const event = { type: 'click' }
    const { player, wrappedHandler } = createHookTarget('startClick', handler)

    usePluginHooks.call(player, 'start', 'startClick', () => true)
    wrappedHandler(event)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(event)
  })

  test('does not run the wrapped handler when a plugin hook returns false', () => {
    const handler = jest.fn()
    const { player, wrappedHandler } = createHookTarget('startClick', handler)

    usePluginHooks.call(player, 'start', 'startClick', () => false)
    wrappedHandler({ type: 'click' })

    expect(handler).not.toHaveBeenCalled()
  })

  test('preserves current 3.x continuation when an async plugin hook resolves false', async () => {
    const handler = jest.fn()
    const event = { type: 'click' }
    const { player, wrappedHandler } = createHookTarget('startClick', handler)

    usePluginHooks.call(player, 'start', 'startClick', () => Promise.resolve(false))
    wrappedHandler(event)
    await flushPromises()

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(event)
  })

  test('preserves current 3.x continuation when an async plugin hook rejects', async () => {
    const handler = jest.fn()
    const event = { type: 'click' }
    const { player, wrappedHandler } = createHookTarget('startClick', handler)
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})

    try {
      usePluginHooks.call(player, 'start', 'startClick', () => Promise.reject(new Error('hook error')))
      wrappedHandler(event)
      await flushPromises()

      expect(warn).toHaveBeenCalledWith('[runHooks]startClick reject', 'hook error')
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(event)
    } finally {
      warn.mockRestore()
    }
  })

  test('runs the wrapped handler once when an async plugin hook resolves true', async () => {
    const handler = jest.fn()
    const event = { type: 'click' }
    const { player, wrappedHandler } = createHookTarget('startClick', handler)

    usePluginHooks.call(player, 'start', 'startClick', () => Promise.resolve(true))
    wrappedHandler(event)
    await flushPromises()

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(event)
  })

  test('runs multiple plugin hooks in registration order before the handler', () => {
    const calls = []
    const { player, wrappedHandler } = createHookTarget('startClick', () => {
      calls.push('handler')
    })

    usePluginHooks.call(player, 'start', 'startClick', () => {
      calls.push('first')
    })
    usePluginHooks.call(player, 'start', 'startClick', () => {
      calls.push('second')
    })
    wrappedHandler({ type: 'click' })

    expect(calls).toEqual(['first', 'second', 'handler'])
  })

  test('keeps the preset lifecycle around the hook chain and handler', () => {
    const calls = []
    const event = { type: 'click' }
    const { player, wrappedHandler } = createHookTarget(
      'startClick',
      receivedEvent => {
        calls.push(['handler', receivedEvent])
      },
      {
        pre: receivedEvent => calls.push(['pre', receivedEvent]),
        next: () => calls.push(['next'])
      }
    )

    usePluginHooks.call(player, 'start', 'startClick', (_plugin, receivedEvent) => {
      calls.push(['hook', receivedEvent])
    })
    wrappedHandler(event)

    expect(calls).toEqual([
      ['pre', event],
      ['hook', event],
      ['handler', event],
      ['next']
    ])
  })

  test('runs preset next once after an async wrapped handler settles', async () => {
    const handler = jest.fn(() => Promise.resolve())
    const next = jest.fn()
    const { player, wrappedHandler } = createHookTarget('startClick', handler, { next })

    usePluginHooks.call(player, 'start', 'startClick', () => true)
    wrappedHandler({ type: 'click' })
    await Promise.resolve()

    expect(handler).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledTimes(1)
  })

  test('runs the wrapped handler normally after the last hook is removed', () => {
    const handler = jest.fn()
    const pluginHook = jest.fn()
    const event = { type: 'click' }
    const { player, plugin, wrappedHandler } = createHookTarget('startClick', handler)

    usePluginHooks.call(player, 'start', 'startClick', pluginHook)
    removeHooks.call(plugin, 'startClick', pluginHook)
    wrappedHandler(event)

    expect(pluginHook).not.toHaveBeenCalled()
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(event)
  })

  test('keeps the plugin argument for direct runHooks handlers', () => {
    const plugin = { pluginName: 'mobile' }
    const eventData = { paused: true }
    const result = { handled: true }
    const pluginHook = jest.fn()
    const handler = jest.fn(() => result)
    hooksDescriptor(plugin, ['videoClick'])

    useHooks.call(plugin, 'videoClick', pluginHook)
    const ret = runHooks(plugin, 'videoClick', handler, eventData)

    expect(pluginHook).toHaveBeenCalledWith(plugin, eventData)
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(plugin, eventData)
    expect(ret).toBe(result)
  })

  test('preserves direct runHooks cancellation when a hook returns false', () => {
    const plugin = { pluginName: 'player' }
    const handler = jest.fn()
    hooksDescriptor(plugin, ['retry'])
    useHooks.call(plugin, 'retry', () => false)

    const ret = runHooks(plugin, 'retry', handler)

    expect(ret).toBe(false)
    expect(handler).not.toHaveBeenCalled()
  })

  test('keeps the plugin argument for direct runHooks handlers without registered hooks', () => {
    const plugin = { pluginName: 'mobile' }
    const eventData = { paused: true }
    const result = { handled: true }
    const handler = jest.fn(() => result)
    hooksDescriptor(plugin, ['videoClick'])

    const ret = runHooks(plugin, 'videoClick', handler, eventData)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(plugin, eventData)
    expect(ret).toBe(result)
  })

  test('preserves direct runHooks cancellation when an async hook resolves false', async () => {
    const plugin = { pluginName: 'mobile' }
    const handler = jest.fn()
    hooksDescriptor(plugin, ['videoClick'])
    useHooks.call(plugin, 'videoClick', () => Promise.resolve(false))

    const ret = runHooks(plugin, 'videoClick', handler, { paused: true })

    await expect(ret).resolves.toBeNull()
    expect(handler).not.toHaveBeenCalled()
  })

  test('preserves direct runHooks handler arguments and return value after an async hook', async () => {
    const plugin = { pluginName: 'mobile' }
    const eventData = { paused: true }
    const result = { handled: true }
    const handler = jest.fn(() => result)
    hooksDescriptor(plugin, ['videoClick'])
    useHooks.call(plugin, 'videoClick', () => Promise.resolve(true))

    const ret = runHooks(plugin, 'videoClick', handler, eventData)

    await expect(ret).resolves.toBe(result)
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(plugin, eventData)
  })

  test('preserves direct runHooks terminal handler microtask timing', async () => {
    const plugin = { pluginName: 'mobile' }
    const calls = []
    hooksDescriptor(plugin, ['videoClick'])
    useHooks.call(plugin, 'videoClick', () => Promise.resolve(true))

    const ret = runHooks(plugin, 'videoClick', () => {
      calls.push('handler')
    })
    const observer = Promise.resolve().then(() => {
      calls.push('observer')
    })

    await Promise.all([ret, observer])
    expect(calls).toEqual(['handler', 'observer'])
  })

  test('preserves direct runHooks cancellation when an async hook rejects', async () => {
    const plugin = { pluginName: 'mobile' }
    const handler = jest.fn()
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    hooksDescriptor(plugin, ['videoClick'])
    useHooks.call(plugin, 'videoClick', () => Promise.reject(new Error('hook error')))

    try {
      const ret = runHooks(plugin, 'videoClick', handler, { paused: true })

      await expect(ret).resolves.toBeUndefined()
      expect(warn).toHaveBeenCalledWith('[runHooks]videoClick reject', 'hook error')
      expect(handler).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })
})
