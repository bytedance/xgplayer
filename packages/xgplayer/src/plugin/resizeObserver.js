/**
 * 添加
 */
class ResizeObserver {
  constructor () {
    this.__handlers = []
    this.timeStamp = 0
    this.observer = null
    if (!window.ResizeObserver) {
      return
    }
    try {
      this.observer = new window.ResizeObserver((entries) => {
        const t = new Date().getTime()
        if (t - this.timeStamp < 100) {
          return
        }
        this.timeStamp = t
        this.__trigger(entries)
      })
      this.timeStamp = new Date().getTime()
    } catch (e) {
      console.error(e)
    }
  }

  addObserver (target, handler) {
    if (!this.observer) {
      return
    }
    this.observer && this.observer.observe(target)
    const { __handlers } = this
    let index = -1
    for (let i = 0; i < __handlers.length; i++) {
      if (__handlers[i] && target === __handlers[i].target) {
        index = i
      }
    }
    if (index > -1) {
      this.__handlers[index].handler = handler
    } else {
      this.__handlers.push({
        target,
        handler: handler
      })
    }
  }

  unObserver (target) {
    let i = -1
    this.__handlers.map((item, index) => {
      if (target === item.target) {
        i = index
      }
    })
    try {
      this.observer && this.observer.unobserve(target)
    } catch (e) {}
    this.observer && this.observer.unobserve(target)
    i > -1 && this.__handlers.splice(i, 1)
  }

  destroyObserver () {
    this.observer && this.observer.disconnect()
    this.observer = null
    this.__handlers = null
  }

  __runHandler (target) {
    const { __handlers } = this
    for (let i = 0; i < __handlers.length; i++) {
      if (__handlers[i] && target === __handlers[i].target) {
        try {
          __handlers[i].handler(target)
        } catch (error) {
          console.error(error)
        }
        return true
      }
    }
    return false
  }

  __trigger (entries) {
    for (let i = 0; i < entries.length; i++) {
      const ret = this.__runHandler(entries[i].target)
      if (ret) {
        break
      }
    }
  }
}

let resizeObserver = null

function addObserver (target, handler) {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver()
  }
  resizeObserver.addObserver(target, handler)
  return resizeObserver
}

function unObserver (target, handler) {
  resizeObserver.unObserver(target, handler)
}

function destroyObserver (target, handler) {
  resizeObserver.destroyObserver(target, handler)
}

export {
  addObserver,
  unObserver,
  destroyObserver
}
