/* eslint-disable standard/no-callback-literal */
import Player from '../player'
import requestFrame from 'request-frame'
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
    });

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.addEventListener(item, self.resize.bind(self))
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
      self.container = container
      let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 12
      let channelSize = Math.floor(self.height / fontSize)
      let channels = []
      for (let i = 0; i < channelSize; i++) {
        channels[i] = {
          id: i,
          queue: [],
          step: 99999,
          surplus: 0
        }
      }
      if (self.channels && self.channels.length <= channels.length) {
        for (let i = 0; i < self.channels.length; i++) {
          channels[i] = {
            id: i,
            queue: [],
            step: self.channels[i].step,
            surplus: self.channels[i].surplus
          }
          self.channels[i].queue.forEach(item => channels[i].queue.push(item))
        }
      } else if (self.channels && self.channels.length > channels.length) {
        for (let i = 0; i < channels.length; i++) {
          channels[i] = {
            id: i,
            queue: [],
            step: self.channels[i].step,
            surplus: self.channels[i].surplus
          }
          self.channels[i].queue.forEach(item => channels[i].queue.push(item))
        }
        for (let i = channels.length; i < self.channels.length; i++) {
          self.channels[i].queue.forEach(item => item.remove())
        }
      }
      self.channels = channels
      self.channelHeight = fontSize
    }, 10)
  }
  addBullet (bullet) {
    let left = this.width
    let channels = this.channels
    let channelHeight = this.channelHeight
    let occupy = Math.ceil(bullet.height / channelHeight)
    if (occupy > channels.length) {
      return {
        result: false,
        message: `exceed channels.length, occupy=${occupy},channelsSize=${channels.length}`
      }
    } else {
      let flag = true
      let channel
      let pos = -1
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
          if (channel.step < bullet.step || channel.surplus < 0) {
            flag = false
            break
          }
        }
        if (flag) {
          pos = i
          break
        }
      }
      if (pos !== -1) {
        for (let i = pos, max = pos + occupy; i < max; i++) {
          channel = channels[i]
          channel.queue.unshift(bullet)
          channel.step = bullet.step
          channel.surplus -= bullet.width
        }
        bullet.channel_id = [pos, occupy]
        bullet.top = pos * channelHeight
        bullet.left = left
        return {
          result: bullet,
          message: 'success'
        }
      } else {
        return {
          result: false,
          message: 'no step or surplus will right'
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
        let i = -1
        channel.queue.some((item, index) => {
          if (item.id === bullet.id) {
            i = index
            return true
          }
        })
        if (i > -1) {
          channel.queue.splice(i, 1)
          if (i === 0) {
            channel.step = 9999
            channel.surplus = 0
          }
        }
      }
    }
  }
  update () {
    let channels = this.channels
    let width = this.width
    channels.forEach(item => {
      let head = item.queue[0]
      if (head) {
        item.surplus = (width - head.left) - head.width
      } else {
        item.step = 9999
        item.surplus = 0
      }
    })
  }
  reset () {
    let root = this.player.root
    let self = this
    setTimeout(function () {
      let container = root.querySelector('.xgplayer-bullet')
      let size = container.getBoundingClientRect()
      self.width = size.width
      self.height = size.height
      self.container = container
      let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 12
      let channelSize = Math.floor(self.height / fontSize)
      let channels = []
      for (let i = 0; i < channelSize; i++) {
        channels[i] = {
          id: i,
          queue: [],
          step: 99999,
          surplus: 0
        }
      }
      self.channels = channels
      self.channelHeight = fontSize
    }, 200)
  }
  resetWithCb (cb) {
    let root = this.player.root
    let self = this
    let container = root.querySelector('.xgplayer-bullet')
    let size = container.getBoundingClientRect()
    self.width = size.width
    self.height = size.height
    self.container = container
    let fontSize = /mobile/ig.test(navigator.userAgent) ? 10 : 12
    let channelSize = Math.floor(self.height / fontSize)
    let channels = []
    for (let i = 0; i < channelSize; i++) {
      channels[i] = {
        id: i,
        queue: [],
        step: 99999,
        surplus: 0
      }
    }
    self.channels = channels
    self.channelHeight = fontSize
    if (cb) {
      cb(true)
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
    let el = document.createElement('span')
    el.textContent = options.txt
    el.style.color = options.color
    el.style.fontSize = `${options.scale}em`
    this.el = el
    this.width = options.width
    this.height = options.height
    this.status = 'waiting'// waiting,start,end
    let playerPos = this.player.root.getBoundingClientRect()
    this.left = playerPos.width
    this.step = (playerPos.width + this.width) / this.duration / 60
    this.end = -this.width
  }
  attach () {
    this.container.appendChild(this.el)
  }
  reset () {
    let el = this.el
    el.style.left = `${this.left}px`
    el.style.top = `${this.top}px`
  }
  move () {
    this.left -= this.step
    this.el.style.left = `${this.left}px`
    if (this.left <= this.end) {
      this.status = 'end'
      this.remove()
    }
  }
  remove () {
    let self = this
    if (self.el) {
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
  init () {
    let self = this
    if (self.data) {
      if (self.player.paused) {
        self.status = 'paused'
        return
      } else if (self.player.ended) {
        self.status = 'ended'
        return
      }
      self.readData()
      self.retryTimer = setInterval(function () {
        self.readData()
        self.dataHandle()
      }, self.interval - 1000)
      self.player.emit('dataIncoming')
      return
    }

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
            let el = document.createElement('span')
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
            self.retryTimer = setInterval(function () {
              self.readData()
              self.dataHandle()
            }, self.interval - 1000)
            self.player.emit('dataIncoming')
          }
        })
      }
    }).catch(function (err) {
      console.log('Fetch错误:' + err)
    })
  }
  // 启动弹幕渲染主进程
  start () {
    let self = this
    self.status = 'playing'
    self.channel.reset()
    self.init()
  }
  stop () {
    let self = this
    self.status = 'closed'
    clearTimeout(self.retryTimer)
    let cancel = requestFrame('cancel')
    cancel(self.timer)
    self.queue.length = 0
    self.container.innerHTML = ''
  }
  play () {
    let self = this
    let util = Player.util
    if (self.status === 'idle' || self.status === 'ended') {
      if (util.hasClass(self.container, 'xgplayer-has-bullet')) {
        self.start()
      }
    } else if (self.status === 'paused' && util.hasClass(self.container, 'xgplayer-has-bullet')) {
      self.status = 'playing'
      self.dataHandle()
      self.retryTimer = setInterval(function () {
        self.readData()
        self.dataHandle()
      }, self.interval - 1000)
    }
  }
  pause () {
    let self = this
    if (self.status === 'playing') {
      self.status = 'paused'
      clearTimeout(self.retryTimer)
      let cancel = requestFrame('cancel')
      cancel(self.timer)
    } else if (self.status === 'ended') {
      self.stop()
    }
  }
  dataHandle () {
    let self = this
    let cancel = requestFrame('cancel')
    cancel(self.timer)
    if (self.queue.length) {
      self.queue.forEach(item => {
        if (item.status === 'waiting' || item.status === 'start') {
          item.status = 'start'
          item.move()
        }
      })
      let request = requestFrame('request')
      self.timer = request(self.dataHandle.bind(self))
    } else {
      cancel(self.timer)
    }
  }
  readData () {
    let self = this
    let player = this.player
    let currentTime = this.formatTime(player.currentTime)
    let bullet
    let interval = self.interval
    let channel = self.channel
    let container = self.container
    let result
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
          bullet.attach()
        }
      })
    }
  }
  seekHandle () {
    let self = this
    // util = Player.util

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

    let ev = ['click', 'touchstart']
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
    let self = this
    let util = Player.util
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
    let self = this
    let util = Player.util
    let root = this.player.root
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
  let player = this
  let util = Player.util
  if (!player.config.bullet) {
    return
  }
  let bullet = util.createDom('xg-bullet', '', {}, 'xgplayer-bullet')
  let root = player.root
  root.appendChild(bullet)
  let bulletBtn = new BulletBtn(player, player.config.bullet);

  ['touchstart', 'click'].forEach(item => {
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

  player.controls.appendChild(bulletBtn.el_)
}

Player.install('makeBullet', makeBullet)
