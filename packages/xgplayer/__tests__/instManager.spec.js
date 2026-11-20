import { InstManager } from '../src/instManager'

const PLAYER_DT_EVENT = '__player_devtools__'
const PLAYER_DT_SCAN = '__player_devtools_scan__'
const PLAYER_DT_HOOK = '__PLAYER_DEVTOOLS_HOOK__'

describe('InstManager DevTools beacon', () => {
  const manager = new InstManager()

  afterEach(() => {
    delete window[PLAYER_DT_HOOK]
    manager.forEach(player => manager.remove(player))
  })

  test('does not broadcast without a DevTools handshake', () => {
    const listener = jest.fn()
    const player = {
      playerId: 'without-hook',
      isUserActive: false,
      isInstNext: false
    }
    window.addEventListener(PLAYER_DT_EVENT, listener)

    manager.add(player)
    manager.remove(player)

    expect(listener).not.toHaveBeenCalled()
    window.removeEventListener(PLAYER_DT_EVENT, listener)
  })

  test('broadcasts lifecycle changes and replays existing instances', () => {
    const events = []
    const player = {
      playerId: 'with-hook',
      isUserActive: false,
      isInstNext: false
    }
    const listener = event => events.push(event.detail)
    window[PLAYER_DT_HOOK] = true
    window.addEventListener(PLAYER_DT_EVENT, listener)

    manager.add(player)
    window.dispatchEvent(new CustomEvent(PLAYER_DT_SCAN))
    manager.remove(player)

    expect(events).toEqual([
      { action: 'add', playerId: player.playerId, player },
      { action: 'add', playerId: player.playerId, player },
      { action: 'remove', playerId: player.playerId, player }
    ])
    window.removeEventListener(PLAYER_DT_EVENT, listener)
  })
})
