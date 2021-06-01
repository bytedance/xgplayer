import Errors from '../error'
/**
 * Error retry plugin
 * get config from player.config.errorConfig
 * The Plugin is just deal with the situation that play with video.src,
 * and get the http status of current video.src
 */

const defaultConfig = {
  maxCount: 3, // max number of retries
  backupUrl: '', // the backup url for retry
  isFetch: true, //  is need to check the cdn url statud
  fetchTimeout: 100 // timeout time for get cdn status
}

function errorRetry () {
  const player = this
  // 无设置参数或者是通过扩展播放的不做处理
  if (!player.config.errorConfig || player.src.indexOf('blob:') > -1) {
    return
  }
  const errorConfig = {}
  const _inConfig = player.config.errorConfig
  for (const key in defaultConfig) {
    if (_inConfig[key] === undefined) {
      errorConfig[key] = defaultConfig[key]
    } else {
      errorConfig[key] = _inConfig[key]
    }
  }
  player.retryData = {
    count: 0, // 重试次数
    errfTimer: null, // 超时设置定时器
    isFetchReturn: false, // fetch请求是否已经返回
    currentTime: 0 // 出错的时候时间
  }

  function errorfetch (player, url, timeout) {
    const resolveFun = (resolve, data) => {
      if (!player.retryData.isFetchReturn) {
        player.retryData.isFetchReturn = true
        resolve(data)
      }
    }
    return new Promise((resolve, reject) => {
      try {
        let xhr = new window.XMLHttpRequest()
        xhr.open('get', url)
        xhr.onload = function () {
          resolveFun(resolve, {status: xhr.status, statusText: xhr.statusText, xhr})
        }
        xhr.onerror = function () {
          resolveFun(resolve, {status: xhr.status, statusText: xhr.statusText || 'The network environment is disconnected or the address is invalid', xhr})
        }
        xhr.onabort = function () {
          // console.log('task onerror', xhr)
        }
        player.retryData.errfTimer = window.setTimeout(() => {
          let errfTimer = player.retryData.errfTimer
          window.clearTimeout(errfTimer)
          player.retryData.errfTimer = null
          resolveFun(resolve, {status: -1, statusText: 'request timeout'})
        }, timeout)
        xhr.send()
      } catch (err) {
        player.retryData.isFetchReturn = true
        resolveFun(resolve, {status: -2, statusText: 'request error'})
      }
    })
  }

  function retryCanPlay () {
    // console.log(`retryCanPlay this.retryData.currentTime:${this.retryData.currentTime}`)
    this.currentTime = this.retryData.currentTime
    this.play()
    this.retryData.retryCode = 0
    this.retryData.isFetchReturn = false
    this.retryData.currentTime = 0
  }

  const _originErrorEmit = player._onError
  player._onError = (data) => {
    const errorCount = this.retryData.count
    // console.log(`originErrorEmit:errorCount:${errorCount}`, data)
    if (errorCount > errorConfig.maxCount) {
      if (errorConfig.isFetch) {
        errorfetch(this, this.currentSrc, errorConfig.fetchTimeout).then((data) => {
          this.emit('error', new Errors({
            type: 'network',
            currentTime: this.currentTime,
            duration: this.duration || 0,
            networkState: this.networkState,
            readyState: this.readyState,
            currentSrc: this.currentSrc,
            src: this.src,
            ended: this.ended,
            httpCode: data.status,
            httpMsg: data.statusText,
            errd: {
              line: 101,
              msg: this.error,
              handle: 'plugin errorRetry'
            },
            errorCode: this.video && this.video.error.code,
            mediaError: this.video && this.video.error
          }));
          _originErrorEmit.call(this, data)
        })
      } else {
        _originErrorEmit.call(this, data)
      }
      return;
    }
    if (errorCount === 0) {
      this.retryData.currentTime = this.currentTime
      this.once('canplay', retryCanPlay.bind(this))
    }
    let src = ''
    if (errorConfig.count < 2) {
      src = errorConfig.backupUrl ? errorConfig.backupUrl : player.currentSrc
    } else {
      src = errorConfig.backupUrl && errorCount > 1 ? errorConfig.backupUrl : player.currentSrc
    }
    this.retryData.count++
    this.src = src
  }
}

export default {
  name: 'errorretry',
  method: errorRetry
}