import HlsPluginExport, { EVENT, HlsPlugin, parseSwitchUrlArgs } from '../src/index'

describe('Exports', () => {
  test('default exports', () => {
    expect(HlsPluginExport).toBeDefined()
  })

  test('named exports', () => {
    // Existed
    expect(HlsPlugin).toBeDefined()
    expect(EVENT).toBeDefined()
    expect(parseSwitchUrlArgs).toBeDefined()
  })
})
