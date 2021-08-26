import Util from '../utils/util'
import EN from './en'
/**
 * @typedef { {
 *   LANG: string,
 *   TEXT: {
 *    [propName: string]: string
 *   }
 * } } IXGI18nText
 */

const XGI18nLang = {}
const XGI18nTextKeys = {}
const XGI18nLangKeys = []
const XGI18nLangPreExtends = {}

function updateKeys () {
  Object.keys(XGI18nLang.en).map(key => {
    XGI18nTextKeys[key] = key.toLowerCase()
  })
}

/**
 * @param { Array<IXGI18nText> } XGI18nTexts
 */
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
      Util.deepMerge(XGI18nLang[item.LANG] || {}, item.TEXT || {})
    }
  })
  updateKeys()
}

/**
 * @param { IXGI18nText } langData
 */
function use (langData) {
  const lang = langData.LANG
  const texts = langData.TEXT || {}
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

const I18N = {
  get textKeys () {
    return XGI18nTextKeys
  },
  /**
   * @description List of languages currently supported
   * @type { Array<string> }
   */
  get langKeys () {
    return XGI18nLangKeys
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
    XGI18nLangKeys.map(key => {
      ret[key] = XGI18nLang[key]
    })
    ret.zh = XGI18nLang['zh-cn']
    return ret
  },
  /**
   * @type {(I18nText: IXGI18nText) => {}}
   */
  extend: extend,

  /**
   * @type {(lang: IXGI18nText) => {}}
   */
  use: use
}

export default I18N
