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
  plugin.show = jest.fn()
  plugin.hide = jest.fn()
  plugin.emit = jest.fn()
  // Bind the actual methods from the prototype
  plugin._playForCastHandshake = CastPlugin.prototype._playForCastHandshake.bind(plugin)
  plugin._handleCastActivated = CastPlugin.prototype._handleCastActivated.bind(plugin)
  plugin._onCastAvailabilityChange = CastPlugin.prototype._onCastAvailabilityChange.bind(plugin)
  plugin.requestCast = CastPlugin.prototype.requestCast.bind(plugin)
  plugin._getPreferredCastProtocol = CastPlugin.prototype._getPreferredCastProtocol.bind(plugin)
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

describe('CastPlugin availability aggregation', () => {
  test('shows button when airplay available even if chromecast not-available', () => {
    const plugin = createPluginStub()

    plugin._onCastAvailabilityChange({ protocol: 'airplay', availability: 'available' })
    plugin._onCastAvailabilityChange({ protocol: 'chromecast', availability: 'not-available' })

    expect(plugin.show).toHaveBeenCalled()
    expect(plugin.hide).not.toHaveBeenCalled()
  })

  test('hides button when both protocols not-available', () => {
    const plugin = createPluginStub()

    plugin._onCastAvailabilityChange({ protocol: 'airplay', availability: 'not-available' })
    plugin._onCastAvailabilityChange({ protocol: 'chromecast', availability: 'not-available' })

    expect(plugin.hide).toHaveBeenCalled()
  })
})

describe('CastPlugin requestCast', () => {
  test('emits cast_request with airplay protocol when only airplay available', () => {
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'available', chromecast: 'not-available' }
    })

    plugin.requestCast()

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'airplay' })
  })

  test('emits cast_request with chromecast protocol when only chromecast available', () => {
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'not-available', chromecast: 'available' }
    })

    plugin.requestCast()

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'chromecast' })
  })

  test('emits cast_request with explicit protocol override', () => {
    const plugin = createPluginStub({
      _castAvailability: { airplay: 'available', chromecast: 'available' }
    })

    plugin.requestCast('airplay')

    expect(plugin.emit).toHaveBeenCalledWith('cast_request', { protocol: 'airplay' })
  })

  test('does not emit when no protocol available', () => {
    const plugin = createPluginStub()

    plugin.requestCast()

    expect(plugin.emit).not.toHaveBeenCalled()
  })
})
