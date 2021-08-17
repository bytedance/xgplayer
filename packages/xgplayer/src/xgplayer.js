/**
 * 该文件用于umd模式下d.ts文件的生成
 */
import Player, {} from './player'
import Plugin from './plugin/plugin'
import BasePlugin from './plugin/basePlugin'
import * as Events from './events'
import STATE_CLASS from './stateClassMap'
import I18N from './lang/i18n'
import Errors from './error'
import Sniffer from './utils/sniffer'
import Util from './utils/util'

import PresetPlayer from './index-umd'
/**
 * @typedef { import ('./plugin/basePlugin').IBasePluginOptions } IBasePluginOptions
 */

/**
 * @typedef { import ('./plugin/plugin').IPluginOptions } IPluginOptions
 */

/**
 * @typedef { import ('./defaultConfig').IPlayerOptions } IPlayerOptions
 */

/**
 * @typedef { import ('./error').IError } IError
 */

/**
 * @typedef { import ('./lang/i18n').IXGI18nText } IXGI18nText
 */

export {
  PresetPlayer as default,
  Player as SimplePlayer,
  Plugin,
  BasePlugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N
}
