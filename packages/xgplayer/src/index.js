import Player from './player'
import Plugin from './plugin/plugin'
import BasePlugin from './plugin/basePlugin'
import * as Events from './events'
import STATE_CLASS from './stateClassMap'
import I18N from './lang/i18n'
import Errors from './error'
import Sniffer from './utils/sniffer'
import Util from './utils/util'
import { InstManager } from './instManager'
import PresetPlayer from './index.umd'
import { STATES } from './state'

export * from './presets'

export { default as langZhHk } from './lang/zh-hk'
export { default as langJp } from './lang/jp'
export { default as langZhCn } from './lang/zh-cn'

export { default as Danmu } from './plugins/danmu'
export { DanmuIcon, DanmuPanel } from './plugins/danmu'
export { default as TextTrack } from './plugins/track'
export { default as Magnifier } from './plugins/magnifier'
export { default as HeatMap } from './plugins/heatmap'

/**
 * @typedef { import ('./defaultConfig').IPlayerOptions } IPlayerOptions
 */

/**
 * @typedef { import ('./defaultConfig').IDefinition } IDefinition
 */

/**
 * @typedef { import ('./proxy').IVideoProxy } IVideoProxy
 */

/**
 * @typedef { import ('./plugin/basePlugin').IBasePluginOptions } IBasePluginOptions
 */

/**
 * @typedef { import ('./plugin/plugin').IPluginOptions } IPluginOptions
 */

/**
 * @typedef { import ('./error').IError } IError
 */

/**
 * @typedef { import ('./lang/i18n').IXGI18nText } IXGI18nText
 */

/**
 * @typedef { import ('./defaultConfig').IPlayerOptions } IPlayerOptions
 */

/**
 * @typedef { import ('./proxy').IVideoProxy } IVideoProxy
 */

/**
 * @typedef { import ('./plugin/basePlugin').IBasePluginOptions } IBasePluginOptions
 */

/**
 * @typedef { import ('./plugin/plugin').IPluginOptions } IPluginOptions
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
  BasePlugin,
  Plugin,
  Events,
  Errors,
  Sniffer,
  Util,
  STATE_CLASS,
  I18N,
  STATES,
  InstManager
}
