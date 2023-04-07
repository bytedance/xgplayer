class ResizeObserver {
  constructor () {
    this.__handlers = []
    if (!window.ResizeObserver) {
      return
    }
    this.observer = new window.ResizeObserver((entries) => {
      // const t = new Date().getTime()
      this.__trigger(entries)
    })
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
      this.__handlers[index].handler.push(handler)
    } else {
      this.__handlers.push({
        target,
        handler: [handler]
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
    this.observer && this.observer.unobserve(target)
    i > -1 && this.__handlers.splice(i, 1)
  }

  destroyObserver () {
    this.observer && this.observer.disconnect()
    this.observer = null
    this.__handlers = null
  }

  __runHandler (target, cr) {
    const { __handlers } = this
    for (let i = 0; i < __handlers.length; i++) {
      if (__handlers[i] && target === __handlers[i].target) {
        __handlers[i].handler && __handlers[i].handler.forEach(handler => {
          try {
            handler(target, cr)
          } catch (error) {
            console.error(error)
          }
        })
        break
      }
    }
  }

  __trigger (entries) {
    entries.map(item => {
      const cr = item.contentRect
      this.__runHandler(item.target, cr)
    })
  }
}

let resizeObserver = null

function addObserver (target, handler) {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver()
  }
  resizeObserver.addObserver(target, handler)
}

function unObserver (target, handler) {
  if (!resizeObserver) {
    return
  }
  resizeObserver.unObserver(target, handler)
}

function destroyObserver (target, handler) {
  if (!resizeObserver) {
    return
  }
  resizeObserver.destroyObserver(target, handler)
  resizeObserver = null
}

export {
  addObserver,
  unObserver,
  destroyObserver
}
