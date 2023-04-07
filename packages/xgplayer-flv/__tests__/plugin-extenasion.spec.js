jest.mock('../src/plugin')

import { FlvPlugin } from '../src/plugin'
import PluginExtension from '../src/plugin-extension'

describe('FlvPluginExtension', () => {

  const media = document.createElement('video')

  test('init', () => {
    const addEvent = jest.spyOn(media, 'addEventListener')

    new PluginExtension({
      media,
      innerDegrade: 1,
      preloadTime: 2
    }, new FlvPlugin())

    expect(media.getAttribute('innerdegrade')).toBe('1')
    expect(media.getAttribute('preloadtime')).toBe('2')
    expect(addEvent.mock.calls[0][0]).toBe('lowdecode')
  })

  test('forceDegradeToVideo', () => {
    const plugin = new FlvPlugin()
    const video = {
      TAG: 'MVideo',
      degradeVideo: {},
      degrade: jest.fn()
    }
    plugin.player = { video, config: {}, root: { replaceChild: jest.fn(), firstChild: {} }, unRegisterPlugin: jest.fn(), once: jest.fn() }
    FlvPlugin.pluginName = 'name'
    const opts = { media, innerDegrade: 2 }
    const ext = new PluginExtension(opts, plugin)

    ext.forceDegradeToVideo('url')
    expect(video.degrade).not.toHaveBeenCalled()
    opts.innerDegrade = 1
    ext.forceDegradeToVideo('url')
    expect(video.degrade).toHaveBeenCalled()
    expect(plugin.player.config.url).toBe('url')
  })

  test('destroy', () => {
    const removeEvent = jest.spyOn(media, 'addEventListener')

    const ext = new PluginExtension({ media }, new FlvPlugin())
    ext.destroy()

    expect(removeEvent.mock.calls[0][0]).toBe('lowdecode')
  })

})
