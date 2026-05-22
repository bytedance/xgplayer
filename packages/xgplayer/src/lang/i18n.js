import Util from '../utils/util'
import EN from './en'
/**
 * @typedef { {
 *   LANG: string,
 *   TEXT: {
 *    [propName: string]: any
 *   }
 * } } IXGI18nText
 */

/**
 * @typedef { {
 *  lang: { [propName: string]: IXGI18nText },
 *  langKeys: Array<string>, // list of all currently supported languages
 *  textKeys: { [propName: string]: string } // list of all currently supported texts
 * } } IXGI18n
 */

const XGI18nLang = {
  lang: {},
  langKeys: [],
  textKeys: []
}

function deepMerge (dst, src) {
  Object.keys(src).forEach(key => {
    const _s = Util.typeOf(src[key])
    const _t = Util.typeOf(dst[key])
    if (_s === 'Array') {
      if (_t !== 'Array') {
        dst[key] = []
      }
      dst[key].push(...src[key])
    } else if (_s === 'Object') {
      if (_t !== 'Object') {
        dst[key] = {}
      }
      deepMerge(dst[key], src[key])
    } else {
      dst[key] = src[key]
    }
  })
  return dst
}

function updateKeys () {
  Object.keys(XGI18nLang.lang.en).map(key => {
    XGI18nLang.textKeys[key] = key // key.toLowerCase()
  })
}

/**
 * @param { Array<IXGI18nText> } i18nTextList
 * @param { IXGI18n } [i18nLangs]
 */
function extend (i18nTextList, i18nLangs) {
  let ext = []
  if (!i18nLangs) {
    i18nLangs = XGI18nLang
  }
  if (!i18nLangs.lang) {
    return
  }
  if (Util.typeOf(i18nTextList) !== 'Array') {
    ext = Object.keys(i18nTextList).map(lang => {
      const keyLang = lang === 'zh' ? 'zh-cn' : lang
      return {
        LANG: keyLang,
        TEXT: i18nTextList[lang]
      }
    })
  } else {
    ext = i18nTextList
  }
  const { lang } = i18nLangs
  ext.map(item => {
    if (item.LANG === 'zh') {
      item.LANG = 'zh-cn'
    }
    if (!lang[item.LANG]) {
      use(item, i18nLangs)
    } else {
      deepMerge(lang[item.LANG] || {}, item.TEXT || {})
    }
  })
  updateKeys()
}

/**
 * @param { IXGI18nText } langData
 * @param { IXGI18n } [i18nLangs]
 */
function use (langData, i18nLangs) {
  let _clang = langData.LANG
  if (!i18nLangs) {
    i18nLangs = XGI18nLang
  }
  if (!i18nLangs.lang) {
    return
  }
  const texts = langData.TEXT || {}
  if (_clang === 'zh') {
    _clang = 'zh-cn'
  }
  if (!i18nLangs.lang[_clang]) {
    i18nLangs.langKeys.push(_clang)
    i18nLangs.lang[_clang] = texts
  } else {
    deepMerge(i18nLangs.lang[_clang], texts)
  }
  updateKeys()
}

/**
 *
 * @returns { IXGI18n }
 */
function init (id) {
  const ret = {
    lang: {},
    langKeys: [],
    textKeys: {},
    pId: id
  }
  deepMerge(ret.lang, XGI18nLang.lang)
  ret.langKeys.push(...XGI18nLang.langKeys)
  deepMerge(ret.textKeys, XGI18nLang.textKeys)
  return ret
}

use(EN)

const I18N = {
  get textKeys () {
    return XGI18nLang.textKeys
  },
  /**
   * @description List of languages currently supported
   * @type { Array<string> }
   */
  get langKeys () {
    return XGI18nLang.langKeys
  },
  /**
   * @type {{
   *   [propName: string]: {
   *     [propName: string]: string
   *   }
   * }}
   */
  get lang () {
    const ret = {}
    XGI18nLang.langKeys.map(key => {
      ret[key] = XGI18nLang.lang[key]
    })
    if (XGI18nLang.lang['zh-cn']) {
      ret.zh = XGI18nLang.lang['zh-cn'] || {}
    }
    return ret
  },

  /**
   * @desc Extend existing languages text
   * @type {(I18nText: IXGI18nText) => {}}
   */
  extend: extend,

  /**
   * Add new language text
   * @type {(lang: IXGI18nText) => {}}
   */
  use: use,

  /**
   * Initialize a language text
   * @return { IXGI18n }
   */
  init: init
}

export default I18N
