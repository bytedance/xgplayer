jest.mock('../src/index', () => ({}))
jest.mock('../src/index.umd', () => class PresetPlayer {})

import Player from '../src/player'

describe('player state', () => {
  test('resetState clears cached playback position and duration before RESET', () => {
    let stateAtReset
    const player = {
      hasStart: true,
      isError: true,
      _useAutoplay: true,
      _currentTime: 12,
      _duration: 90,
      _accPlayed: {
        acc: 12,
        t: 12,
        loopAcc: 12
      },
      mediaPause: jest.fn(),
      removeClass: jest.fn(),
      addClass: jest.fn(),
      emit: jest.fn(() => {
        stateAtReset = {
          currentTime: player._currentTime,
          duration: player._duration
        }
      })
    }

    Player.prototype.resetState.call(player)

    expect(player._currentTime).toBe(0)
    expect(player._duration).toBe(0)
    expect(stateAtReset).toEqual({
      currentTime: 0,
      duration: 0
    })
  })
})
