import Errors from '../error'
import * as Events from '../events'
import { STATES } from '../state'
import STATE_CLASS from '../stateClassMap'
import Sniffer from '../utils/sniffer'
import Util from '../utils/util'
import BasePlugin from './basePlugin'
import hooksDescriptor from './hooksDescriptor'
import Plugin, { POSITIONS, ROOT_TYPES } from './plugin'
import pluginsManager from './pluginsManager'

export {
  pluginsManager,
  BasePlugin,
  hooksDescriptor,
  STATE_CLASS,
  POSITIONS,
  ROOT_TYPES,
  Sniffer,
  Errors,
  Util,
  Events,
  STATES,
  Plugin as default
}
