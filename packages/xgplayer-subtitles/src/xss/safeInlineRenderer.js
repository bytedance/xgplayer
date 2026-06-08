import { SAFE_INLINE_TAGS, SAFE_VOID_TAGS } from './safeInlineTags'

const SAFE_CLASS_NAME = /^[A-Za-z0-9_-]+$/
const SAFE_LANG = /^[A-Za-z]{1,8}(?:-[A-Za-z0-9]{1,8})*$/

function decodeSubtitleText (text) {
  if (text === null || text === undefined) {
    return ''
  }
  return String(text)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, '\'')
    .replace(/&amp;/g, '&')
}

function appendSubtitleTextPart (dom, text) {
  if (!text) {
    return
  }

  const parts = String(text).split(/(?:\\[nN]|\r\n|\r|\n)+/)
  parts.forEach((part, index) => {
    if (index > 0) {
      dom.appendChild(document.createElement('br'))
    }
    if (part) {
      dom.appendChild(document.createTextNode(part))
    }
  })
}

function sanitizeClassName (className) {
  return String(className || '')
    .split(/\s+/)
    .filter(name => SAFE_CLASS_NAME.test(name))
    .join(' ')
}

function sanitizeLang (lang) {
  const text = String(lang || '').trim()
  return SAFE_LANG.test(text) ? text : ''
}

function parseTagAttributes (content) {
  const text = content.trim()
  const attrs = {}

  if (!text || !/(?:^|\s)[^\s=]+\s*=/.test(text)) {
    return {
      attrs,
      annotation: text
    }
  }

  const attrReg = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
  let match = attrReg.exec(text)
  while (match) {
    attrs[match[1].toLowerCase()] = match[2] || match[3] || match[4] || ''
    match = attrReg.exec(text)
  }
  return {
    attrs,
    annotation: ''
  }
}

function parseSafeTagToken (token) {
  const content = token.slice(1, -1).trim()
  if (!content || content[0] === '!' || content[0] === '?') {
    return null
  }

  if (content[0] === '/') {
    const endMatch = /^\/\s*([A-Za-z][\w:-]*)/.exec(content)
    const tagName = endMatch && endMatch[1].toLowerCase()
    if (!tagName || !SAFE_INLINE_TAGS.includes(tagName)) {
      return null
    }
    return {
      closing: true,
      tagName
    }
  }

  const selfClosing = /\/\s*$/.test(content)
  const openContent = content.replace(/\/\s*$/, '')
  const openMatch = /^([A-Za-z][\w:-]*(?:\.[^\s/>.]+)*)([\s\S]*)$/.exec(openContent)
  if (!openMatch) {
    return null
  }

  const tagParts = openMatch[1].split('.')
  const tagName = tagParts.shift().toLowerCase()
  if (!SAFE_INLINE_TAGS.includes(tagName) && !SAFE_VOID_TAGS.includes(tagName)) {
    return null
  }

  const { attrs, annotation } = parseTagAttributes(openMatch[2])
  return {
    attrs,
    annotation,
    closing: false,
    className: sanitizeClassName(`${tagParts.join(' ')} ${attrs.class || ''}`),
    selfClosing,
    tagName
  }
}

function createSafeInlineElement (tag) {
  const elementName = tag.tagName === 'c' || tag.tagName === 'v' || tag.tagName === 'lang'
    ? 'span'
    : tag.tagName
  const dom = document.createElement(elementName)

  if (tag.className) {
    dom.className = tag.className
  }

  const lang = sanitizeLang(tag.attrs.lang || (tag.tagName === 'lang' ? tag.annotation : ''))
  if (lang) {
    dom.setAttribute('lang', lang)
  }

  if (tag.tagName === 'v' && tag.annotation) {
    dom.setAttribute('data-voice', tag.annotation)
  }

  return dom
}

export function appendSubtitleText (dom, text) {
  const content = decodeSubtitleText(text)
  const stack = [{ dom, tagName: '' }]
  const tagReg = /<[^>]*>/g
  let lastIndex = 0
  let match = tagReg.exec(content)

  while (match) {
    appendSubtitleTextPart(stack[stack.length - 1].dom, content.slice(lastIndex, match.index))

    const token = match[0]
    const tag = parseSafeTagToken(token)
    if (!tag) {
      appendSubtitleTextPart(stack[stack.length - 1].dom, token)
    } else if (tag.closing) {
      const closeIndex = stack.map(item => item.tagName).lastIndexOf(tag.tagName)
      if (closeIndex > 0) {
        stack.length = closeIndex
      } else {
        appendSubtitleTextPart(stack[stack.length - 1].dom, token)
      }
    } else if (tag.tagName === 'br') {
      stack[stack.length - 1].dom.appendChild(document.createElement('br'))
    } else {
      const child = createSafeInlineElement(tag)
      stack[stack.length - 1].dom.appendChild(child)
      if (!tag.selfClosing) {
        stack.push({
          dom: child,
          tagName: tag.tagName
        })
      }
    }
    lastIndex = tagReg.lastIndex
    match = tagReg.exec(content)
  }

  appendSubtitleTextPart(stack[stack.length - 1].dom, content.slice(lastIndex))
}

export function getSubtitleTextContent (text) {
  const dom = document.createElement('span')
  appendSubtitleText(dom, text)
  return dom.textContent || ''
}
