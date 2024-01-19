import { EventEmitter } from 'eventemitter3'

/**
 * @typedef { (Player) => ?boolean } IterateFunction
 */
/**
 * @typedef {  import('./player').default } Player
 */

/**
 * global player instance memory
 * @type {{
 *  [key:string]:
 * }}
 */
const store = {}

let instance = null
/**
 * Design as a class so that can be inherited to enhance functionality
 */
export class InstManager extends EventEmitter {
  static getInstance () {
    instance ||= new InstManager()
    return instance
  }

  add (player) {
    if (!player) {
      return
    }
    store[player.playerId] = player

    // By default, the first one is active
    if (Object.keys(store).length === 1) {
      this.setActive(player.playerId, true)
    }
  }

  remove (player) {
    if (!player) {
      return
    }
    const isUserActive = player.isUserActive

    delete store[player.playerId]

    if (isUserActive) {
      // 暂时注释，有需求再打开
    //   const keys = Object.keys(this.store)
    //   if (keys.length > 0) {
    //     this.setActive(keys[keys.length - 1], true)
    //   }
    }
  }

  /**
   * @private
   * @param {IterateFunction} fn
   * @param {?boolean} endEarly
   */
  _iterate (fn, endEarly = false) {
    for (const key in store) {
      if (Object.prototype.hasOwnProperty.call(store, key)) {
        const player = store[key]

        if (endEarly) {
          if (fn(player)) {
            break
          }
        } else {
          fn(player)
        }
      }
    }
  }

  /**
   * @param {IterateFunction} fn
   */
  forEach (fn) {
    this._iterate(fn)
  }

  /**
   * Iterates over items of store, returning the first one
   * @param {IterateFunction} fn
   * @returns {Player}
   */
  find (fn) {
    let result = null

    this._iterate((player) => {
      const flag = fn(player)
      if (flag) {
        result = player
      }
      return flag
    }, true)

    return result
  }

  /**
   * @param {IterateFunction} fn
   * @returns {Player[]}
   */
  findAll (fn) {
    const results = []

    this._iterate((player) => {
      if (fn(player)) {
        results.push(player)
      }
    })

    return results
  }

  /**
   * 设置实例的用户行为激活状态
   * @param { number | string } playerId
   * @param { boolean } isActive
   * @returns { number | null }
   */
  setActive (playerId, isActive = true) {
    if (!store[playerId]) {
      return
    }
    if (isActive) {
      this.forEach(inst => {
        if (playerId === inst.playerId) {
          inst.isUserActive = true
          inst.isInstNext = false
        } else {
          inst.isUserActive = false
        }
      })
    } else {
      store[playerId].isUserActive = isActive
    }
    return playerId
  }

  /**
   * 获取当前处理激活态的实例id
   * @returns { number | null }
   */
  getActiveId () {
    const keys = Object.keys(store)
    for (let i = 0; i < keys.length; i++) {
      const c = store[keys[i]]
      if (c && c.isUserActive) {
        return keys[i]
      }
    }
    return null
  }

  /**
   * 标记下一个实例
   * @param { number | string } playerId
   * @param { boolean } isNext
   * @returns { number | null }
   */
  setNext (playerId, isNext = true) {
    if (!store[playerId]) {
      return
    }
    if (isNext) {
      this.forEach(inst => {
        if (playerId === inst.playerId) {
          inst.isUserActive = false
          inst.isInstNext = true
        } else {
          inst.isInstNext = false
        }
      })
    } else {
      store[playerId].isInstNext = isNext
    }

    return playerId
  }
}

/**
* Check whether there is a player instance in the current dom
* @param {Element} root
*/
export function checkPlayerRoot (root) {
  const keys = Object.keys(store)
  for (let i = 0; i < keys.length; i++) {
    const p = store[keys[i]]
    if (p.root === root) {
      return p
    }
  }
  return null
}
