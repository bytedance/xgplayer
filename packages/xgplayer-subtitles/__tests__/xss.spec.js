import Subtitle from '../src'
import SubTitleParser from '../src/parser'

describe('xgplayer-subtitles XSS handling', () => {
  test('encodes HTML metacharacters when parsing VTT subtitle text', () => {
    const ret = SubTitleParser.parseVttText('<img src=x onerror="alert(1)">Tom & Jerry')

    expect(ret.text).toBe('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;Tom &amp; Jerry')
  })

  test('encodes HTML metacharacters when parsing ASS subtitle text', () => {
    const ret = SubTitleParser.parseASSItem(
      '0,0:00:00.00,0:00:02.00,Default,,0,0,0,,<svg onload="alert(1)">',
      ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text']
    )

    expect(ret.text[0]).toBe('&lt;svg onload=&quot;alert(1)&quot;&gt;')
  })

  test('renders raw JSON subtitle text as inert text', () => {
    const subtitle = new Subtitle({ subTitles: [] })
    subtitle.innerRoot = document.createElement('div')

    subtitle.__render([
      {
        start: 0,
        end: 2,
        index: 0,
        text: ['<img src=x onerror="alert(1)">']
      }
    ])

    expect(subtitle.innerRoot.querySelector('img')).toBe(null)
    expect(subtitle.innerRoot.textContent).toBe('<img src=x onerror="alert(1)">')
  })

  test('renders parser-encoded subtitle text as visible inert text', () => {
    const subtitle = new Subtitle({ subTitles: [] })
    subtitle.innerRoot = document.createElement('div')

    subtitle.__render([
      {
        start: 0,
        end: 2,
        index: 0,
        text: ['&lt;script&gt;alert(1)&lt;/script&gt;']
      }
    ])

    expect(subtitle.innerRoot.querySelector('script')).toBe(null)
    expect(subtitle.innerRoot.textContent).toBe('<script>alert(1)</script>')
  })

  test('renders allowlisted inline markup as safe DOM', () => {
    const subtitle = new Subtitle({ subTitles: [] })
    const richText = [
      '<b onclick="alert(1)">bold</b>',
      '<i>italic</i>',
      '<u>under</u>',
      '<br>',
      '<span class="ok bad-name ../bad" style="color:red">span</span>',
      '<ruby>字<rt>zi</rt></ruby>'
    ].join('')
    subtitle.innerRoot = document.createElement('div')

    subtitle.__render([
      {
        start: 0,
        end: 2,
        index: 0,
        text: [richText]
      }
    ])

    const bold = subtitle.innerRoot.querySelector('b')
    const span = subtitle.innerRoot.querySelector('span')

    expect(bold).not.toBe(null)
    expect(bold.getAttribute('onclick')).toBe(null)
    expect(subtitle.innerRoot.querySelector('i')).not.toBe(null)
    expect(subtitle.innerRoot.querySelector('u')).not.toBe(null)
    expect(subtitle.innerRoot.querySelector('br')).not.toBe(null)
    expect(span.className).toBe('ok bad-name')
    expect(span.getAttribute('style')).toBe(null)
    expect(subtitle.innerRoot.querySelector('ruby rt')).not.toBe(null)
  })

  test('does not create disallowed URI-bearing or scriptable elements', () => {
    const subtitle = new Subtitle({ subTitles: [] })
    const unsafeText = [
      '<a href="javascript:alert(1)">link</a>',
      '<img src=x onerror="alert(1)">',
      '<svg><animate onbegin="alert(1)"></animate></svg>',
      '<math href="javascript:alert(1)">math</math>'
    ].join('')
    subtitle.innerRoot = document.createElement('div')

    subtitle.__render([
      {
        start: 0,
        end: 2,
        index: 0,
        text: [unsafeText]
      }
    ])

    expect(subtitle.innerRoot.querySelector('a')).toBe(null)
    expect(subtitle.innerRoot.querySelector('img')).toBe(null)
    expect(subtitle.innerRoot.querySelector('svg')).toBe(null)
    expect(subtitle.innerRoot.querySelector('animate')).toBe(null)
    expect(subtitle.innerRoot.querySelector('math')).toBe(null)
    expect(subtitle.innerRoot.textContent).toContain('<a href="javascript:alert(1)">link</a>')
  })

  test('only keeps safe language attributes for allowlisted tags', () => {
    const subtitle = new Subtitle({ subTitles: [] })
    subtitle.innerRoot = document.createElement('div')

    subtitle.__render([
      {
        start: 0,
        end: 2,
        index: 0,
        text: ['<lang en-US>hello</lang><span lang="javascript:alert(1)">bad</span>']
      }
    ])

    const validLang = subtitle.innerRoot.querySelector('span[lang="en-US"]')
    const spans = subtitle.innerRoot.querySelectorAll('span')

    expect(validLang).not.toBe(null)
    expect(spans[1].getAttribute('lang')).toBe(null)
  })

  test('renders parser-encoded allowlisted markup as safe DOM', () => {
    const ret = SubTitleParser.parseVttText('<b class="strong">Bold</b>')
    const subtitle = new Subtitle({ subTitles: [] })
    subtitle.innerRoot = document.createElement('div')

    subtitle.__render([
      {
        start: 0,
        end: 2,
        index: 0,
        text: [ret.text]
      }
    ])

    const bold = subtitle.innerRoot.querySelector('b')

    expect(ret.text).toBe('&lt;b class=&quot;strong&quot;&gt;Bold&lt;/b&gt;')
    expect(bold).not.toBe(null)
    expect(bold.className).toBe('strong')
    expect(bold.textContent).toBe('Bold')
  })
})
