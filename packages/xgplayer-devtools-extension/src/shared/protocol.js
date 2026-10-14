/**
 * Shared message protocol between the injected probe (MAIN world),
 * the content script, the background service worker and the panel.
 *
 * These constants are plain strings so the file can be loaded both as an ES
 * module (background/panel) and inlined into the MAIN-world inject script.
 */

export const PROTOCOL_VERSION = 1

export const SOURCE_INJECT = 'player-devtools-inject'
export const SOURCE_PANEL = 'player-devtools-panel'

/** page -> extension */
export const OUT = {
  INSTANCES: 'instances',
  EVENT: 'event',
  REPLAY: 'replay',
  METRICS: 'metrics',
  LOGS: 'logs',
  SNAPSHOT: 'snapshot',
  ERROR: 'error'
}

/** extension -> page */
export const IN = {
  SELECT_INSTANCE: 'select-instance',
  SET_DEBUG: 'set-debug',
  ENABLE_LOGGER: 'enable-logger',
  START_RECORD: 'start-record',
  STOP_RECORD: 'stop-record',
  REQUEST_SNAPSHOT: 'request-snapshot',
  REQUEST_REPLAY: 'request-replay',
  INVOKE: 'invoke',
  PING: 'ping'
}

/** Whitelisted player methods the panel is allowed to invoke remotely. */
export const INVOKE_WHITELIST = [
  'play',
  'pause',
  'seek',
  'switchURL',
  'reload',
  'destroy'
]

/** High-frequency events that must be throttled in the inject layer. */
export const HIGH_FREQ_EVENTS = [
  'timeupdate',
  'progress',
  'core.speed',
  'real_time_speed'
]

export function now() {
  return (performance.timeOrigin || 0) + performance.now()
}
