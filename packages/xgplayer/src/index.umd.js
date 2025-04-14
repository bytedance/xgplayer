import Errors from './error'
import * as Events from './events'
import './index.scss'
import { InstManager } from './instManager'
import I18N from './lang/i18n'
import Player from './player'
import BasePlugin from './plugin/basePlugin'
import Plugin from './plugin/plugin'
import { default as CssFullscreenIcon } from './plugins/cssFullScreen'
import { default as FullscreenIcon } from './plugins/fullscreen'
import { default as PlayIcon } from './plugins/play'
import { default as Progress } from './plugins/progress'
import { default as TimeIcon } from './plugins/time'
import { default as VolumeIcon } from './plugins/volume'
import defaultPreset from './presets/default'
import STATE_CLASS from './stateClassMap'
import Sniffer from './utils/sniffer'
import Util from './utils/util'

class PresetPlayer extends Player {
  static defaultPreset = defaultPreset;
  static Util = Util;
  static Sniffer = Sniffer
  static Errors = Errors
  static Events = Events
  static Plugin = Plugin
  static BasePlugin = BasePlugin
  static I18N = I18N
  static STATE_CLASS = STATE_CLASS
  static InstManager = InstManager

  // UI Exports
  static PlayIcon = PlayIcon // For Ads Plugin
  static TimeIcon = TimeIcon // For Ads Plugin
  static Progress = Progress // For Ads Plugin
  static FullscreenIcon = FullscreenIcon // For Ads Plugin
  static CssFullscreenIcon = CssFullscreenIcon // For Ads Plugin
  static VolumeIcon = VolumeIcon // For Ads Plugin
}

export default PresetPlayer
