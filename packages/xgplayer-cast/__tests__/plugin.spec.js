import { CastPlugin } from '../src/plugin'

// Minimal plugin stub for unit testing activation logic
function createPluginStub(overrides = {}) {
  const plugin = Object.create(CastPlugin.prototype)
  plugin.player = {
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn()
  }
  plugin.config = { autoplayOnCast: true }
  plugin._castHandshakeInProgress = false
  plugin._castAvailability = { airplay: 'not-available', chromecast: 'not-available' }
  plugin._castAdapters = {}
  plugin.show = jest.fn()
  plugin.hide = jest.fn()
  plugin.emit = jest.fn()
  plugin.find = jest.fn(() => null)
  plugin.icons = {}
  // Bind the actual methods from the prototype
  plugin._playForCastHandshake = CastPlugin.prototype._playForCastHandshake.bind(plugin)
  plugin._handleCastActivated = CastPlugin.prototype._handleCastActivated.bind(plugin)
  plugin._onCastAvailabilityChange = CastPlugin.prototype._onCastAvailabilityChange.bind(plugin)
  plugin._onLoadStart = CastPlugin.prototype._onLoadStart.bind(plugin)
  plugin._updateCastIconVisibility = CastPlugin.prototype._updateCastIconVisibility.bind(plugin)
  plugin._updateCastIcon = CastPlugin.prototype._updateCastIcon.bind(plugin)
  plugin.requestCast = CastPlugin.prototype.requestCast.bind(plugin)
  plugin._getPreferredCastProtocol = CastPlugin.prototype._getPreferredCastProtocol.bind(plugin)
  plugin._getProtocolOrder = CastPlugin.prototype._getProtocolOrder.bind(plugin)
  Object.assign(plugin, overrides)
  return plugin
}

describe('CastPlugin protocol-aware activation', () => {
  test('airplay: suspends MSE plugin and runs local handshake', async () => {
    const plugin = createPluginStub()
    plugin._suspendMSEPlugin = jest.fn()
    plugin._resumeMSEPlugin = jest.fn()
    plugin._onCastTargetChange = CastPlugin.prototype._onCastTargetChange.bind(plugin)

    await plugin._onCastTargetChange({ isCasting: true, protocol: 'airplay' })

    expect(plugin._suspendMSEPlugin).toHaveBeenCalled()
    expect(plugin.player.play).toHaveBeenCalled()
  })

  test('chromecast: does NOT suspend MSE plugin and does NOT call local play()', async () => {
    const plugin = createPluginStub()
    plugin._suspendMSEPlugin = jest.fn()
    plugin._resumeMSEPlugin = jest.fn()
    plugin._onCastTargetChange = CastPlugin.prototype._onCastTargetChange.bind(plugin)

    await plugin._onCastTargetChange({ isCasting: true, protocol: 'chromecast' })

    expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
    expect(plugin.player.play).not.toHaveBeenCalled()
  })

  test('airplay disconnect: resumes MSE plugin', async () => {
    const plugin = createPluginStub()
    plugin._suspendMSEPlugin = jest.fn()
    plugin._resumeMSEPlugin = jest.fn()
    plugin._onCastTargetChange = CastPlugin.prototype._onCastTargetChange.bind(plugin)

    await plugin._onCastTargetChange({ isCasting: false, protocol: 'airplay' })

    expect(plugin._resumeMSEPlugin).toHaveBeenCalled()
  })

  test('chromecast disconnect: does NOT call resumeMSEPlugin', async () => {
    const plugin = createPluginStub()
    plugin._suspendMSEPlugin = jest.fn()
    plugin._resumeMSEPlugin = jest.fn()
    plugin._onCastTargetChange = CastPlugin.prototype._onCastTargetChange.bind(plugin)

    await plugin._onCastTargetChange({ isCasting: false, protocol: 'chromecast' })

    expect(plugin._resumeMSEPlugin).not.toHaveBeenCalled()
  })
})

describe('CastPlugin source changes', () => {
  test('asks Chromecast adapter to reload media on loadstart', () => {
    const reloadMedia = jest.fn()
    const plugin = createPluginStub({
      _chromecast: { reloadMedia }
    })

    plugin._onLoadStart()

    expect(reloadMedia).toHaveBeenCalled()
  })

  test('does not crash on loadstart without Chromecast adapter', () => {
    const plugin = createPluginStub()

    expect(() => plugin._onLoadStart()).not.toThrow()
  })
})

describe('CastPlugin availability aggregation', () => {
  test('shows button when airplay available even if chromecast not-available', () => {
    const plugin = createPluginStub({
      _castAdapters: {
        airplay: {},
        chromecast: {}
      }
    })

    plugin._onCastAvailabilityChange({ protocol: 'airplay', availability: 'available' })
    plugin._onCastAvailabilityChange({ protocol: 'chromecast', availability: 'not-available' })

    expect(plugin.show).toHaveBeenCalled()
    expect(plugin.hide).not.toHaveBeenCalled()
  })

  test('shows button when installed airplay can be requested before availability event arrives', () => {
    const plugin = createPluginStub({
      _castAdapters: {
        airplay: { canRequest: jest.fn(() => true) }
      }
    })

    plugin._onCastAvailabilityChange({ protocol: 'chromecast', availability: 'not-available' })

    expect(plugin.show).toHaveBeenCalled()
    expect(plugin.hide).not.toHaveBeenCalled()
  })

  test('switches icon to preferred protocol when visibility updates', () => {
    const iconRoot = document.createElement('div')
    const chromecastIcon = document.createElement('svg')
    const airplayIcon = document.createElement('svg')
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'not-available', chromecast: 'available' },
      _castAdapters: {
        airplay: {},
        chromecast: {}
      },
      find: jest.fn(() => iconRoot),
      icons: {
        airplay: airplayIcon,
        chromecast: chromecastIcon
      }
    })

    plugin._updateCastIconVisibility()

    expect(iconRoot.firstChild).toBe(chromecastIcon)
    expect(plugin.show).toHaveBeenCalled()
  })

  test('hides button when no protocol available or requestable', () => {
    const plugin = createPluginStub()

    plugin._onCastAvailabilityChange({ protocol: 'airplay', availability: 'not-available' })
    plugin._onCastAvailabilityChange({ protocol: 'chromecast', availability: 'not-available' })

    expect(plugin.hide).toHaveBeenCalled()
  })
})

describe('CastPlugin requestCast', () => {
  const originalUserAgent = navigator.userAgent

  function setUserAgent(userAgent) {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: userAgent
    })
  }

  afterEach(() => {
    setUserAgent(originalUserAgent)
  })

  test('emits cast_request with airplay protocol when only airplay available', () => {
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'available', chromecast: 'not-available' },
      _castAdapters: {
        airplay: {},
        chromecast: {}
      }
    })

    plugin.requestCast()

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'airplay' })
  })

  test('emits cast_request with chromecast protocol when only chromecast available', () => {
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'not-available', chromecast: 'available' },
      _castAdapters: {
        airplay: {},
        chromecast: {}
      }
    })

    plugin.requestCast()

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'chromecast' })
  })

  test('uses adapter protocol order instead of browser userAgent when multiple protocols are available', () => {
    setUserAgent('Mozilla/5.0 Version/17.0 Safari/605.1.15')
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'available', chromecast: 'available' },
      _castAdapters: {
        chromecast: {},
        airplay: {}
      }
    })

    plugin.requestCast()

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'chromecast' })
  })

  test('falls back to requestable airplay adapter before availability event arrives', () => {
    const plugin = createPluginStub({
      _castAdapters: {
        airplay: { canRequest: jest.fn(() => true) }
      }
    })

    plugin.requestCast()

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'airplay' })
  })

  test('emits cast_request with explicit protocol override', () => {
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'available', chromecast: 'available' }
    })

    plugin.requestCast('airplay')

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'airplay' })
  })

  test('does not emit when no protocol available or requestable', () => {
    const plugin = createPluginStub()

    plugin.requestCast()

    expect(plugin.emit).not.toHaveBeenCalled()
  })
})
