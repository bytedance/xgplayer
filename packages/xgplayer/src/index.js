import Errors from './error'
import * as Events from './events'
import PresetPlayer from './index.umd'
import { InstManager } from './instManager'
import I18N from './lang/i18n'
import Player from './player'
import BasePlugin from './plugin/basePlugin'
import Plugin from './plugin/plugin'
import { STATES } from './state'
import STATE_CLASS from './stateClassMap'
import Sniffer from './utils/sniffer'
import Util from './utils/util'

export { default as langBr } from './lang/br'
export { default as langDe } from './lang/de'
export { default as langEn } from './lang/en'
export { default as langEs } from './lang/es'
export { default as langFr } from './lang/fr'
export { default as langId } from './lang/id'
export { default as langIt } from './lang/it'
export { default as langJp } from './lang/jp'
export { default as langKr } from './lang/kr'
export { default as langMsMy } from './lang/ms-my'
export { default as langRu } from './lang/ru'
export { default as langTh } from './lang/th'
export { default as langVn } from './lang/vn'
export { default as langZhCn } from './lang/zh-cn'
/**
 * Languages Exports
 */
export { default as langZhHk } from './lang/zh-hk'
export { default as CssFullscreenIcon } from './plugins/cssFullScreen'
export { DanmuIcon, DanmuPanel, default as Danmu } from './plugins/danmu'
export { default as FullscreenIcon } from './plugins/fullscreen'
export { default as HeatMap } from './plugins/heatmap'
export { default as Loading } from './plugins/loading'
/**
 * Plugins Exports
 */
export { default as PlayIcon } from './plugins/play'
export { default as Progress } from './plugins/progress'
export { default as Start } from './plugins/start'
export { default as TimeIcon } from './plugins/time'
export { default as TextTrack } from './plugins/track'
export { default as VolumeIcon } from './plugins/volume'
export * from './presets'

/**
 * @typedef { import ('./player').SwitchUrlOptions } SwitchUrlOptions
 */

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
