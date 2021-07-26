import Util from '../utils/util'
import EN from './en'

function deepMerge (dst, src) {
  Object.keys(src).map(key => {
    if (Util.typeOf(src[key]) === 'Array' && Util.typeOf(dst[key]) === 'Array') {
      if (Util.typeOf(dst[key]) === 'Array') {
        dst[key].push(...src[key])
      }
    } else if (Util.typeOf(dst[key]) === Util.typeOf(src[key]) && dst[key] !== null && Util.typeOf(dst[key]) === 'Object' && !(src[key] instanceof window.Node)) {
      deepMerge(dst[key], src[key])
    } else {
      src[key] !== null && (dst[key] = src[key])
    }
  })
  return dst
}

const XGI18nLang = {}
const XGI18nTextKeys = {}
const XGI18nLangKeys = []
const XGI18nLangPreExtends = {}

function updateKeys () {
  Object.keys(XGI18nLang.en).map(key => {
    XGI18nTextKeys[key] = key.toLowerCase()
  })
}

function extend (XGI18nText) {
  let ext = []
  if (Util.typeOf(XGI18nText) !== 'Array') {
    ext = Object.keys(XGI18nText).map(lang => {
      const keyLang = lang === 'zh' ? 'zh-cn' : lang
      return {
        LANG: keyLang,
        TEXT: XGI18nText[lang]
      }
    })
  } else {
    ext = XGI18nText
  }
  ext.map(item => {
    if (!XGI18nLang[item.LANG]) {
      XGI18nLangPreExtends[item.LANG] = item.TEXT
    } else {
      deepMerge(XGI18nLang[item.LANG] || {}, item.TEXT || {})
    }
  })
  updateKeys()
}

function use (data) {
  const lang = data.LANG
  const texts = data.TEXT || {}
  if (!XGI18nLang[lang]) {
    XGI18nLangKeys.push(lang)
  }
  if (XGI18nLang[lang]) {
    Util.deepMerge(texts, XGI18nLang[lang])
  } else {
    XGI18nLang[lang] = texts
  }
  if (XGI18nLangPreExtends[lang]) {
    extend([{ LANG: lang, TEXT: XGI18nLangPreExtends[lang] }])
    delete XGI18nLangPreExtends[lang]
  }
  if (lang === 'zh-cn') {
    XGI18nLang.zh = XGI18nLang['zh-cn']
  }
  updateKeys()
}

use(EN)

export default {
  get textKeys () {
    return XGI18nTextKeys
  },
  get langKeys () {
    return XGI18nLangKeys
  },
  get lang () {
    const ret = {}
    XGI18nLangKeys.map(key => {
      ret[key] = XGI18nLang[key]
    })
    ret.zh = XGI18nLang['zh-cn']
    return ret
  },
  extend: extend,
  use: use
}
