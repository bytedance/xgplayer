export const SAFE_INLINE_TAGS = ['b', 'i', 'u', 'span', 'c', 'ruby', 'rt', 'v', 'lang']
export const SAFE_VOID_TAGS = ['br']

export function isSafeInlineTagName (tagName) {
  return SAFE_INLINE_TAGS.includes(tagName) || SAFE_VOID_TAGS.includes(tagName)
}

export function normalizeSafeInlineTagName (tag) {
  return String(tag || '').trim().split(/[\s.]/)[0].toLowerCase()
}
