export const isBrowser = typeof window !== 'undefined'

const ua = isBrowser && navigator.userAgent.toLocaleLowerCase()

// eslint-disable-next-line no-lookahead-lookbehind-regexp/no-lookahead-lookbehind-regexp
export const isSafari = isBrowser && /^((?!chrome|android).)*safari/.test(ua)
export const isFirefox = isBrowser && ua.includes('firefox')
export const isAndroid = isBrowser && ua.includes('android')
