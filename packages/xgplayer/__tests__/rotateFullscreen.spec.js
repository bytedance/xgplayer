import { isLandscapeScreen } from '../src/utils/screen'

describe('rotate fullscreen', () => {
  test('falls back to the viewport height when screen orientation is unavailable', () => {
    expect(
      isLandscapeScreen({
        orientation: undefined,
        screen: {}
      })
    ).toBe(false)
  })

  test('recognizes legacy and Screen Orientation API landscape values', () => {
    expect(isLandscapeScreen({ orientation: -90, screen: {} })).toBe(true)
    expect(
      isLandscapeScreen({
        orientation: undefined,
        screen: { orientation: { angle: 90 } }
      })
    ).toBe(true)
  })
})
