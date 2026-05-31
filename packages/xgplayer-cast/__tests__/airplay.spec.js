import { Airplay } from '../src/platform/airplay'

function createAirplay() {
  const root = document.createElement('div')
  const player = {
    root,
    media: document.createElement('video'),
    video: null,
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    i18n: { CAST_UNMUTE_TIP: 'Please unmute before casting' }
  }
  return {
    airplay: new Airplay({ player }),
    player
  }
}

describe('Airplay muted tip cleanup', () => {
  test('does not throw if tip DOM was removed by external cleanup', () => {
    const { airplay, player } = createAirplay()
    const tip = document.createElement('div')
    player.root.appendChild(tip)
    airplay._tipDom = tip

    tip.remove()

    expect(() => airplay._gcTip()).not.toThrow()
    expect(airplay._tipDom).toBe(null)
  })
})
