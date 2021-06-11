import Util from '../utils/util'
import EN from './en'
import ZH from './zh-cn'

const XGI18nLang = {}
const XGI18nTextKeys = {}
const XGI18nLangKeys = []

function updateKeys () {
  Object.keys(XGI18nLang.en).map(key => {
    XGI18nTextKeys[key] = key.toLowerCase()
  })
}

function extend (XGI18nText) {
  Object.keys(XGI18nText).map(lang => {
    if (!XGI18nLang[lang]) {
      XGI18nLang[lang] = {}
    }
    if (lang === 'zh') {
      Util.deepMerge(XGI18nLang['zh-cn'], XGI18nText[lang])
    } else {
      Util.deepMerge(XGI18nLang[lang], XGI18nText[lang])
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
    Util.deepMerge(XGI18nLang[lang], texts)
  } else {
    XGI18nLang[lang] = texts
  }
  if (lang === 'zh-cn') {
    XGI18nLang.zh = XGI18nLang['zh-cn']
  }
  updateKeys()
}

use(EN)
use(ZH)

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
