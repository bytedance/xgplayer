export function xgIconTips (plugin, textKey, isShow) {
  try {
    return ` <div class="xg-tips ${isShow ? 'hide' : ' '}" lang-key="${plugin.i18nKeys[textKey]}">
    ${plugin.i18n[textKey]}
    </div>`
  } catch (e) {
    return '<div class="xg-tips hide"></div>'
  }
}