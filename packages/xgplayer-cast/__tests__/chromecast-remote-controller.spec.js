import { ChromecastRemoteController } from '../src/platform/chromecast-remote-controller'

function installRemoteController(remoteOverrides = {}) {
  const handlers = {}
  const controllers = []
  const player = { emit: jest.fn() }
  const remoteDefaults = {
    isConnected: true,
    isMediaLoaded: true,
    playerState: 'PLAYING',
    isPaused: false,
    currentTime: 12,
    duration: 120,
    volumeLevel: 0.8,
    isMuted: false,
    mediaInfo: {
      contentId: 'https://cdn.example.com/video.mp4',
      metadata: { title: 'Remote title' }
    }
  }

  window.cast = {
    framework: {
      RemotePlayerEventType: { ANY_CHANGE: 'ANY_CHANGE' },
      RemotePlayer: function RemotePlayer() {
        Object.assign(this, remoteDefaults, remoteOverrides)
      },
      RemotePlayerController: function RemotePlayerController(remotePlayer) {
        this.remotePlayer = remotePlayer
        this.addEventListener = jest.fn((type, handler) => {
          handlers[type] = handler
        })
        this.removeEventListener = jest.fn((type, handler) => {
          if (handlers[type] === handler) {
            delete handlers[type]
          }
        })
        this.playOrPause = jest.fn(() => {
          remotePlayer.isPaused = !remotePlayer.isPaused
        })
        this.seek = jest.fn()
        this.stop = jest.fn()
        this.setVolumeLevel = jest.fn()
        this.muteOrUnmute = jest.fn(() => {
          remotePlayer.isMuted = !remotePlayer.isMuted
        })
        controllers.push(this)
      }
    }
  }

  const controller = new ChromecastRemoteController(player)
  controller.install()
  return {
    controller,
    player,
    handlers,
    remotePlayer: controller.remotePlayer,
    remoteController: controllers[0]
  }
}

describe('ChromecastRemoteController', () => {
  beforeEach(() => {
    delete window.cast
  })

  test('does not install when CAF remote player APIs are unavailable', () => {
    const player = { emit: jest.fn() }
    window.cast = { framework: {} }

    const controller = new ChromecastRemoteController(player)

    expect(controller.install()).toBe(false)
    expect(controller.isAvailable()).toBe(false)
    expect(controller.getState()).toEqual({
      protocol: 'chromecast',
      available: false,
      connected: false,
      mediaLoaded: false
    })
  })

  test('emits normalized remote state on install and remote changes', () => {
    const { controller, player, handlers, remotePlayer } = installRemoteController()

    expect(controller.isAvailable()).toBe(true)
    expect(player.emit).toHaveBeenCalledWith(
      'cast_remote_state_change',
      expect.objectContaining({
        protocol: 'chromecast',
        available: true,
        connected: true,
        mediaLoaded: true,
        playerState: 'PLAYING',
        paused: false,
        currentTime: 12,
        duration: 120,
        volume: 0.8,
        muted: false,
        title: 'Remote title',
        contentId: 'https://cdn.example.com/video.mp4'
      })
    )

    player.emit.mockClear()
    remotePlayer.currentTime = 18
    handlers.ANY_CHANGE()

    expect(player.emit).toHaveBeenCalledWith(
      'cast_remote_state_change',
      expect.objectContaining({ currentTime: 18 })
    )
  })

  test('controls play pause seek stop volume and mute through RemotePlayerController', () => {
    const { controller, remotePlayer, remoteController } = installRemoteController({
      isPaused: true
    })

    expect(controller.play()).toBe(true)
    expect(remoteController.playOrPause).toHaveBeenCalledTimes(1)

    expect(controller.pause()).toBe(true)
    expect(remoteController.playOrPause).toHaveBeenCalledTimes(2)

    expect(controller.seek(30)).toBe(true)
    expect(remotePlayer.currentTime).toBe(30)
    expect(remoteController.seek).toHaveBeenCalled()

    expect(controller.setVolume(2)).toBe(true)
    expect(remotePlayer.volumeLevel).toBe(1)
    expect(remoteController.setVolumeLevel).toHaveBeenCalled()

    expect(controller.mute(true)).toBe(true)
    expect(remoteController.muteOrUnmute).toHaveBeenCalled()

    expect(controller.stop()).toBe(true)
    expect(remoteController.stop).toHaveBeenCalled()
  })

  test('supports action-based remote control dispatch', () => {
    const { controller, remotePlayer, remoteController } = installRemoteController({
      isPaused: true
    })

    expect(controller.control('toggle')).toBe(true)
    expect(remoteController.playOrPause).toHaveBeenCalled()

    expect(controller.control('seek', { time: 9 })).toBe(true)
    expect(remotePlayer.currentTime).toBe(9)

    expect(controller.control('unknown')).toBe(false)
  })

  test('reset emits idle remote state', () => {
    const { controller, player } = installRemoteController()
    player.emit.mockClear()

    controller.reset()

    expect(player.emit).toHaveBeenCalledWith(
      'cast_remote_state_change',
      expect.objectContaining({
        connected: false,
        mediaLoaded: false,
        paused: true
      })
    )
  })

  test('removes remote player listener on destroy', () => {
    const { controller, handlers, remoteController } = installRemoteController()

    controller.destroy()

    expect(remoteController.removeEventListener).toHaveBeenCalledWith(
      'ANY_CHANGE',
      expect.any(Function)
    )
    expect(handlers.ANY_CHANGE).toBeUndefined()
  })
})
