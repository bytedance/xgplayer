import Player from '../player'
// import requestFrame from 'request-frame'
import merge from 'deepmerge'

/**
 * [Channel 弹幕轨道控制]
 * @type {Class}
 */
class Channel {
  constructor (player) {
    this.player = player
    this.reset()
    let self = this
    this.player.on('bullet_remove', function (r) {
      self.removeBullet(r.bullet)
    })
    this.playerPos = this.player.root.getBoundingClientRect()
    this.playerWidth = this.playerPos.width
    this.playerHeight = this.playerPos.height
    this.player.on('timeupdate', function () {
      self.playerPos = self.player.root.getBoundingClientRect()
      if (self.playerPos.width !== self.playerWidth || self.playerPos.height !== self.playerHeight) {
        self.playerWidth = self.playerPos.width
        self.playerHeight = self.playerPos.height
        self.resize()
      }
    });
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.addEventListener(item, self.resize())
    })
  }
  resize () {
    let root = this.player.root
    let self = this
    setTimeout(function () {
      let container = root.querySelector('.xgplayer-bullet')
      let size = container.getBoundingClientRect()
      self.width = size.width
      self.height = size.height
      if (self.player.config.bullet.heightRatio) {
        self.height = size.height * self.player.config.bullet.heightRatio
      }
      self.container = container
      let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 12
      let channelSize = Math.floor(self.height / fontSize)
      let channels = []
      for (let i = 0; i < channelSize; i++) {
        channels[i] = {
          id: i,
          queue: [],
          operating: false
        }
      }
      if (self.channels && self.channels.length <= channels.length) {
        for (let i = 0; i < self.channels.length; i++) {
          channels[i] = {
            id: i,
            queue: []
          }
          self.channels[i].queue.forEach(item => {
            channels[i].queue.push(item)
            // item.pauseMove(self.playerPos)
            item.startMove(self.playerPos)
          })
        }
      } else if (self.channels && self.channels.length > channels.length) {
        for (let i = 0; i < channels.length; i++) {
          channels[i] = {
            id: i,
            queue: []
          }
          self.channels[i].queue.forEach(item => {
            channels[i].queue.push(item)
            // item.pauseMove(self.playerPos)
            item.startMove(self.playerPos)
          })
        }
        for (let i = channels.length; i < self.channels.length; i++) {
          self.channels[i].queue.forEach(item => {
            // item.pauseMove()
            // item.remove()
          })
        }
      }
      self.channels = channels
      self.channelHeight = fontSize
    }, 10)
  }
  addBullet (bullet) {
    let player = this.player
    let channels = this.channels
    let channelHeight = this.channelHeight
    let occupy = Math.ceil(bullet.height / channelHeight)
    if (occupy > channels.length) {
      return {
        result: false,
        message: `exceed channels.length, occupy=${occupy},channelsSize=${channels.length}`
      }
    } else {
      let flag = true, channel, pos = -1
      for (let i = 0, max = channels.length; i < max; i++) {
        if (channels[i].queue.some(item => item.id === bullet.id)) {
          return {
            result: false,
            message: `exsited, channelOrder=${i},danmaku_id=${bullet.id}`
          }
        }
      }
      for (let i = 0, max = channels.length - occupy; i <= max; i++) {
        flag = true
        for (let j = i; j < i + occupy; j++) {
          channel = channels[j]
          if (channel.operating) {
            flag = false
            break
          }
          channel.operating = true
          let curBullet = channel.queue[0]
          if (curBullet) {
            let playerPos = player.root.getBoundingClientRect()
            let curBulletPos = curBullet.el.getBoundingClientRect()
            if (curBulletPos.right > playerPos.right) {
              flag = false
              channel.operating = false
              break
            }

            // Vcur * t + Scur已走 - Widthcur = Vnew * t
            // t = (Scur已走 - Widthcur) / (Vnew - Vcur)
            // Vnew * t < Widthplayer
            let curS = curBulletPos.left - playerPos.left + curBulletPos.width
            let curV = (playerPos.width + curBulletPos.width) / curBullet.duration
            let curT = curS / curV

            let newS = playerPos.width
            let newV = (playerPos.width + bullet.width) / bullet.duration
            let newT = newS / newV

            if (!player.config.bOffset) {
              player.config.bOffset = 0
            }
            if (curV < newV && curT + player.config.bOffset > newT) {
              flag = false
              channel.operating = false
              break
            }
          }
          channel.operating = false
        }
        if (flag) {
          pos = i
          break
        }
      }
      if (pos !== -1) {
        for (let i = pos, max = pos + occupy; i < max; i++) {
          channel = channels[i]
          channel.operating = true
          channel.queue.unshift(bullet)
          channel.operating = false
        }
        bullet.channel_id = [pos, occupy]
        bullet.top = pos * channelHeight
        return {
          result: bullet,
          message: 'success'
        }
      } else {
        return {
          result: false,
          message: 'no surplus will right'
        }
      }
    }
  }
  removeBullet (bullet) {
    let channels = this.channels
    let channelId = bullet.channel_id
    let channel
    for (let i = channelId[0], max = channelId[0] + channelId[1]; i < max; i++) {
      channel = channels[i]
      if (channel) {
        channel.operating = true
        let i = -1
        channel.queue.some((item, index) => {
          if (item.id === bullet.id) {
            i = index
            return true
          }
        })
        if (i > -1) {
          channel.queue.splice(i, 1)
        }
        channel.operating = false
      }
    }
  }
  reset () {
    let root = this.player.root
    let self = this
    if (self.channels && self.channels.length > 0) {
      for (let i = 0; i < self.channels.length; i++) {
        self.channels[i].queue.forEach(item => {
          // item.pauseMove(self.playerPos)
          item.remove()
        })
      }
    }
    setTimeout(function () {
      let container = root.querySelector('.xgplayer-bullet')
      let size = container.getBoundingClientRect()
      self.width = size.width
      self.height = size.height
      if (self.player.config.bullet.heightRatio) {
        self.height = size.height * self.player.config.bullet.heightRatio
      }
      self.container = container
      let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 12
      let channelSize = Math.floor(self.height / fontSize)
      let channels = []
      for (let i = 0; i < channelSize; i++) {
        channels[i] = {
          id: i,
          queue: [],
          operating: false
        }
      }
      self.channels = channels
      self.channelHeight = fontSize
    }, 200)
  }
  resetWithCb (cb, main) {
    let root = this.player.root
    let self = this
    if (self.channels && self.channels.length > 0) {
      for (let i = 0; i < self.channels.length; i++) {
        self.channels[i].queue.forEach(item => {
          // item.pauseMove(self.playerPos)
          item.remove()
        })
      }
    }
    let container = root.querySelector('.xgplayer-bullet')
    let size = container.getBoundingClientRect()
    self.width = size.width
    self.height = size.height
    if (self.player.config.bullet.heightRatio) {
      self.height = size.height * self.player.config.bullet.heightRatio
    }
    self.container = container
    let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 12
    let channelSize = Math.floor(self.height / fontSize)
    let channels = []
    for (let i = 0; i < channelSize; i++) {
      channels[i] = {
        id: i,
        queue: [],
        operating: false
      }
    }
    self.channels = channels
    self.channelHeight = fontSize
    if (cb) {
      cb(true, main)
    }
  }
}

/**
 * [Buulet 弹幕构造类]
 * @type {Class}
 */
class Bullet {
  constructor (player, container, options) {
    this.player = player
    this.duration = options.duration
    this.id = options.id
    this.container = container
    this.start = options.start
    let el = document.createElement('div')
    el.textContent = options.txt
    el.style.color = options.color
    el.style.fontSize = `${20 * options.scale}px`
    this.el = el
    this.width = options.width
    this.height = options.height
    this.status = 'waiting'// waiting,start,end
    this.end = -this.width
  }
  attach (playerPos) {
    // let self = this
    this.container.appendChild(this.el)
  }
  reset () {
    let el = this.el
    let playerPos = this.player.root.getBoundingClientRect()
    el.style.left = `${playerPos.width}px`
    el.style.top = `${this.top}px`
  }
  pauseMove (playerPos) {
    let self = this
    // let playerPos = this.player.root.getBoundingClientRect()
    clearTimeout(self.removeTimer)
    this.el.style.left = `${this.el.getBoundingClientRect().left - playerPos.left}px`
    this.el.style.transform = 'translateX(0px) translateY(0px) translateZ(0px)'
    this.el.style.transition = 'transform 0s linear 0s'
  }
  startMove (playerPos) {
    let self = this
    // let playerPos = this.player.root.getBoundingClientRect()
    let leftDuration = (self.el.getBoundingClientRect().right - playerPos.left) / ((playerPos.width + this.width) / this.duration)
    this.el.style.transition = `transform ${leftDuration}s linear 0s`
    function func () {
      if (self.el) {
        let bulletPos = self.el.getBoundingClientRect()
        if (bulletPos && bulletPos.right <= playerPos.left) {
          self.status = 'end'
          self.remove()
        }
      }
    }
    setTimeout(function () {
      if (self.el) {
        self.el.style.transform = `translateX(-${self.el.getBoundingClientRect().right - playerPos.left}px) translateY(0px) translateZ(0px)`
        self.removeTimer = setTimeout(func, leftDuration + 1000)
      }
    }, 20)
  }
  remove () {
    let self = this
    if (this.removeTimer) {
      clearTimeout(this.removeTimer)
    }
    if (self.el && self.el.parentNode) {
      let parent = self.el.parentNode
      parent.removeChild(self.el)
      self.el = null
      self.player.emit('bullet_remove', {
        bullet: self
      })
    }
  }
}

/**
 * [Main 弹幕主进程]
 * @type {Class}
 */
class Main {
  constructor (player, options) {
    this.player = player
    let root = this.player.root
    this.container = root.querySelector('.xgplayer-bullet')
    this.channel = new Channel(player)// 弹幕轨道实例
    this.queue = []// 等待播放的弹幕队列
    this.timer = null// 弹幕动画定时器句柄
    this.retryTimer = null// 弹幕更新重试定时器句柄
    this.interval = 2000// 弹幕队列缓存间隔
    this.status = 'idle'// 当前弹幕正在闲置
    this.options = merge({type: 'json',
      dataMap: function (res) {
        if (res.length > 0) {
          return res.map(item => {
            return {
              id: item.danmaku_id,
              txt: item.text.slice(0, 40),
              duration: item.duration * 1,
              color: item.text_color.replace('0x', '#'),
              scale: item.text_scale * 1,
              start: item.offset_time * 1
            }
          })
        } else {
          return []
        }
      }}, options)
    player.on('dataIncoming', this.dataHandle.bind(this))
    player.on('seeked', this.seekHandle.bind(this))
    player.on('bullet_remove', this.updateQueue.bind(this))
    player.on('ended', this.stop.bind(this))
    player.on('pause', this.pause.bind(this))
    player.on('play', this.play.bind(this))
  }
  // 在渲染队列中移除已经展示完的弹幕对象
  updateQueue (rdata) {
    let self = this
    self.queue.some((item, index) => {
      if (item.id === rdata.bullet.id) {
        self.queue.splice(index, 1)
        return true
      }
    })
  }
  init (bol, self) {
    if (!self) {
      self = this
    }
    self.data = []
    if (self.data) {
      if (self.player.paused) {
        self.status = 'paused'
        return
      } else if (self.player.ended) {
        self.status = 'ended'
        return
      }
      self.readData()
      if (!self.retryTimer) {
        self.retryTimer = setInterval(function () {
          if (self.status === 'closed') {
            clearInterval(self.retryTimer)
          } else {
            self.readData()
            self.dataHandle()
          }
        }, self.interval - 1000)
      }
      self.player.emit('dataIncoming')
      return
    }
    if (self.options.url) {
      fetch(self.options.url, {
        method: self.options.method,
        headers: {
          Accept: 'application/json'
        }
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (obj) {
            let data = self.options.dataMap.call(null, obj.data)
            if (data.length) {
              self.data = data
              let el = document.createElement('div')
              el.style.padding = `${self.options.padding}||'0px'`
              el.style.position = 'absolute'
              el.style.left = '-99999px'
              document.body.appendChild(el)
              let size
              self.data.forEach(item => {
                el.textContent = item.txt
                el.style.fontSize = `${20 * item.scale}px`
                size = el.getBoundingClientRect()
                item.width = size.width
                item.height = size.height
              })
              self.data.sort((a, b) => a.start - b.start)
              document.body.removeChild(el)
              if (self.player.paused) {
                self.status = 'paused'
                return
              } else if (self.player.ended) {
                self.status = 'ended'
                return
              }
              // self.status = 'playing';
              self.readData()
              if (!self.retryTimer) {
                self.retryTimer = setInterval(function () {
                  self.readData()
                  self.dataHandle()
                }, self.interval - 1000)
              }
              self.player.emit('dataIncoming')
            }
          })
        }
      }).catch(function (err) {
        console.log('Fetch错误:' + err)
      })
    } else {
      self.data = []
      if (!self.retryTimer) {
        self.retryTimer = setInterval(function () {
          self.readData()
          self.dataHandle()
        }, self.interval - 1000)
      }
    }
  }
  // 启动弹幕渲染主进程
  start () {
    let self = this
    self.status = 'playing'
    self.queue.length = 0
    self.container.innerHTML = ''
    self.channel.resetWithCb(self.init, self)
    // self.init()
  }
  stop () {
    let self = this
    self.status = 'closed'
    clearInterval(self.retryTimer)
    self.retryTimer = null
    self.channel.reset()
    // let cancel = requestFrame('cancel')
    // cancel(self.timer)
    // self.queue.forEach(item => {
    //   item.remove
    // })
    self.queue.length = 0
    self.container.innerHTML = ''
  }
  play () {
    let self = this, util = Player.util
    if (self.status === 'idle' || self.status === 'ended') {
      if (util.hasClass(self.container, 'xgplayer-has-bullet')) {
        self.start()
      }
    } else if (self.status === 'paused' && util.hasClass(self.container, 'xgplayer-has-bullet')) {
      self.status = 'playing'
      self.dataHandle()
      if (!self.retryTimer) {
        self.retryTimer = setInterval(function () {
          self.readData()
          self.dataHandle()
        }, self.interval - 1000)
      }
    }
  }
  pause () {
    this.stop()
  }
  dataHandle () {
    let self = this
    // let cancel = requestFrame('cancel')
    // cancel(self.timer)
    if (self.queue.length) {
      self.queue.forEach(item => {
        // if (item.status === 'waiting' || item.status === 'start') {
        if (item.status === 'waiting' || item.status === 'paused') {
          item.status = 'start'
          item.startMove(self.channel.playerPos)
        }
      })
      // let request = requestFrame('request')
      // self.timer = request(self.dataHandle.bind(self))
    } else {
      // cancel(self.timer)
    }
  }
  readData () {
    let self = this, player = this.player, currentTime = this.formatTime(player.currentTime)
    let bullet, interval = self.interval, channel = self.channel, container = self.container, result
    let list = self.data.filter(item => {
      return item.start <= currentTime && currentTime <= item.start + interval
    })
    if (list.length > 0) {
      list.forEach(item => {
        bullet = new Bullet(player, container, item)
        result = channel.addBullet(bullet)
        if (result.result) {
          self.queue.push(bullet)
          bullet.reset()
          bullet.attach(self.channel.playerPos)
        }
      })
    }
  }
  seekHandle () {
    let self = this, util = Player.util

    self.stop()
    if (!self.player.paused) {
      // self.start();
      self.status = 'playing'
      self.channel.resetWithCb()
      self.init()
      // if (util.hasClass(self.container, 'xgplayer-has-bullet')) {
      //     self.readData();
      //     self.dataHandle();
      // }
    } else {
      self.status = 'idle'
    }
  }
  formatTime (time) {
    let s = Math.floor(time)
    let ms = time - s
    return s * 1000 + ms
  }
}

/**
 * [className 字幕开关控件]
 * @type {Class}
 */
class BulletBtn {
  constructor (player, option) {
    let self = this
    this.player = player
    this.el_ = this.createEl()
    this.onceFlag = false

    let ev = ['click', 'touchend']
    ev.forEach(item => {
      self.el_.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        self.onClick()
      }, false)
    })

    this.main = new Main(player, option)
    if (option.switch === 'on') {
      this.player.once('play', function () {
        self.onChange(true)
      })
    }
  }
  createEl () {
    let util = Player.util
    let self = this
    return util.createDom('xg-bullet-btn', '<span class="txt">弹</span>', {}, `xgplayer-bullet-btn ${self.player.config.bullet.switch === 'on' ? 'xgplayer-bullet-btn-active' : ''}`)
  }
  onClick () {
    let self = this, util = Player.util
    util.toggleClass(self.el_, 'xgplayer-bullet-btn-active')
    let isActive = !!util.hasClass(self.el_, 'xgplayer-bullet-btn-active')
    function resetCb () {
      self.onceFlag = false
      self.main.channel.resetWithCb(self.onChange.bind(self))
    }
    if (isActive) {
      if (self.player.paused || self.player.ended) {
        if (!this.onceFlag) {
          this.onceFlag = true
          this.player.once('play', resetCb)
        }
      } else {
        resetCb()
      }
    } else {
      this.player.off('play', resetCb)
      this.onChange(isActive)
    }
  }
  onChange (isActive) {
    let self = this, util = Player.util, root = this.player.root
    let container = root.querySelector('.xgplayer-bullet')
    if (isActive) {
      util.addClass(container, 'xgplayer-has-bullet')
      self.main.start()
    } else {
      util.removeClass(container, 'xgplayer-has-bullet')
      self.main.stop()
    }
  }
}

let makeBullet = function () {
  let player = this, util = Player.util
  if (!player.config.bullet) {
    return
  }
  let bullet = util.createDom('xg-bullet', '', {}, 'xgplayer-bullet'), root = player.root
  root.appendChild(bullet)
  let playerHeight = player.root.getBoundingClientRect().height
  bullet.style.height = '100%'
  let bulletBtn = new BulletBtn(player, player.config.bullet)
  if (!player.config.closeBulletClick) {
    ['touchend', 'click'].forEach(item => {
      bullet.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (player.paused) {
          player.play()
        } else {
          player.pause()
        }
      }, false)
    })
  }

  player.bulletBtn = bulletBtn

  player.controls.appendChild(bulletBtn.el_)
}

Player.install('makeBullet', makeBullet)
