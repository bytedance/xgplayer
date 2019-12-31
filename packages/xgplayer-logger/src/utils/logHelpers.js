/**
 * @author fuyuhao
 */

/**
 * 获取当前时间作为默认的value
 * @returns {number}
 */
export const currentTime = (player) => player.currentTime

/**
 * 获取默认的logger配置
 * @param player
 * @returns loggerOption
 */
export const getDefaultOpts = (player) => ({
  category: 'video',
  actions: {
    error: 'error',
    complete: 'complete',
    play: 'play',
    pause: 'pause',
    end: 'end',
    ready: 'ready',
    seek: 'seek',
    unload: 'unload'
  },
  label: player.config.url,
  value: {
    error: currentTime,
    complete: currentTime,
    play: currentTime,
    pause: currentTime,
    end: currentTime,
    unload: currentTime,
    seek: currentTime,
    ready: currentTime
  }
})

/**
 * 合并默认配置与传入的配置
 * @param target
 * @param src
 * @returns {*}
 */
export const mergeOptions = (target, src = {}) => {
  target.category = src.category || target.category
  target.actions = src.actions
    ? {
      ...target.actions,
      ...src.actions
    }
    : target.actions
  target.label = src.label || target.label
  target.value = src.value
    ? {
      ...target.value,
      ...src.value
    }
    : target.value
  return target
}
