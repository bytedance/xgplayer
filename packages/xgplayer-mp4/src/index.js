import Player from 'xgplayer'
import MP4 from './mp4'
import MSE from './media/mse'
import Task from './media/task'
import { isSupported, isSupportedWithXgmse, isMediaSourceSupported } from './util/isSupport';
import ProxyPromise from './util/proxyPromise'
import Timer from './util/timer'
import { CUSTOM_EVENTS } from './constants'
import GapJump from './gap_jump';

const DESTROYED = 'DESTROYED';

const sniffer = Player.sniffer;

let isEnded = (player, mp4) => {
  if (player.mse && mp4.meta.endTime - player.currentTime < 0.5) {
    // let range = player.getBufferedRange(player.buffered2)
    let offsetTime = player.duration - player.currentTime
    if (offsetTime < 0.5) {
      player.mse.endOfStream()
      player._stopProgress()
    }
  }
}

class Mp4Player extends Player {
  constructor (options) {
    let hasStartProgress = true;
    if(options.onlyInit || options.videoInit){
      options.onlyInit = true;
      options.autoplay = false;
      options.videoInit = false;
      hasStartProgress = false;
    }
    super(options);

    this._pendingPromises = [];
    this._allInitPromise = new ProxyPromise();
    this._maxBufferLength = options.maxBufferLength || 5
    this._playerId = Mp4Player.uniqueId ++;
    this._onBufferedResetFunc = this._onBufferedReset.bind(this);
    this._onSeekingFunc = this._onSeeking.bind(this);
    this._onMp4InitFunc = this._onMp4Init.bind(this);
    this._onWaitingFunc = this._onWaiting.bind(this);
    this._onEndedFunc = this._onEnded.bind(this);
    this._onDestroyFunc = this._onDestroy.bind(this);
    this._replay = this._onReplay.bind(this);
    this._onOnlineHandlerFunc = this._onOnlineHandler.bind(this);
    this._onOfflineHandlerFunc = this._onOfflineHandler.bind(this);
    this._tickInSeconds = options.tickInSeconds || 0.2;
    this._hasStartProgress = hasStartProgress;
    this._hasStartProgressBack = hasStartProgress;
    this.video.addEventListener(CUSTOM_EVENTS.BUFFERED_RESET, this._onBufferedResetFunc);
    this._bindNetworkStateChange();
    this._initMp4Kernal();

    this.once('ready', () => {
      this.gapJumpInst = new GapJump(this, this.config);
      Player.util.on(this, 'addVideoBufferEnd', () => {
        this.gapJumpInst.onSegmentAppend();
      });
    })
  }

  _initMp4Kernal (){
    let player = this;
    let rule = player.config.pluginRule || function () { return true }
    if (MSE.isSupported('video/mp4; codecs="avc1.64001E, mp4a.40.5"')) {
      if (!rule.call(player)) {
        return false
      }
      Object.defineProperty(player, 'src', {
        get () {
          return player.currentSrc
        },
        set (url) {
          if (player.mse) {
            player.mse.endOfStream()
          }
          player._onDestroy();
          player.config.autoplay = player.autoplay = true
          player.config.url = url

          player._init(url).then((result) => {
            let mp4 = result[0]; 
            let mse = result[1]
            player.proxyOnce('canplay', () => {
              player.play()
              player.proxyOn('waiting', player._onWaitingFunc)
            })
            player._startProgress();
            player._onSuperStart(mse.url)
            player.mp4 = mp4
            player.mse = mse
            // player.currentTime = 0
          }, err => {
            player._errorHandle(err)
          })
        },
        configurable: true
      })
  
      player.proxyOn('ended', player._onEndedFunc)
  
      player.proxyOnce('destroy', player._onDestroyFunc)
  
      if (player.config.videoInit || player.config.onlyInit){
        player.start(player.config.url)
      }
    }
  }

  start(url) {
    let player = this;
    url = url ? url : player.config.url;
    if (player.config.autoplay && Player.sniffer.browser == 'chrome' && !Player.util.hasClass(player.root, 'xgplayer-is-enter')) {
      Player.util.addClass(player.root, 'xgplayer-is-enter')
    }
    player.proxyOnce('error', () => {
      if (Player.util.hasClass(player.root, 'xgplayer-is-enter')) {
        Player.util.removeClass(player.root, 'xgplayer-is-enter')
      }
    })
    player.proxyOn('timeupdate', function () {
      if (Player.util.hasClass(player.root, 'xgplayer-isloading')) {
        Player.util.removeClass(player.root, 'xgplayer-isloading')
      }
    })
    player.proxyOnce('canplay', () => {
      if (Player.util.hasClass(player.root, 'xgplayer-is-enter')) {
        Player.util.removeClass(player.root, 'xgplayer-is-enter')
      }
      // safari decoder time offset
      if (sniffer.browser === 'safari' && player.buffered && player.config.autoplay) {
        let start = player.buffered.start(0)
        player.currentTime = start + 0.1
      }
    })

    let initPromise = player._init(url)
    initPromise.id = 'init'
    player._addPendingPromise(initPromise)
    initPromise.then(result => {
    
      player._allInitPromise.resolve();
      player._hasInited = true;
      player._removePendingPromise(initPromise);
      let mp4 = result[0]; let mse = result[1]
      if(player.config.autoplay) {
        player.proxyOnce('canplay', () => {
          player.play()
        })
      }
      player._onSuperStart(mse.url)
      player.mp4 = mp4
      player.mse = mse
      Player.util.on(mp4, 'error', err => {
        player._errorHandle(err)
      })
      player.proxyOn('seeking', player._onSeekingFunc)
      player.proxyOnce('playing', player._onMp4InitFunc)
      player.proxyOn('waiting', player._onWaitingFunc)
      // if(!player.config.onlyInit || player._hasStartProgressBack){
      player._startProgress();
      // }
    }, err => {
      if(err !== DESTROYED){
        player._onSuperStart(url)
        player._errorHandle(err)
      }
    })
  }

  switchURL(url){
    let player = this;
    let mp5 = new MP4(url, player.config.xhrSetup, player, player.config.preloadSize, {
      playerId: player._playerId
    })
    let mp4 = player.mp4
    Player.util.on(mp5, 'moovReady', () => {
      let timeRange = mp4.timeRage; 
      let curTime = player.currentTime
      timeRange = mp4.timeRage
      let start = timeRange.find(item => item[0] - curTime > 2)[0]
      let end = player.getBufferedRange(player.buffered2)[1]
      if (end - start > 0 && sniffer.browser !== 'safari') {
        player.mse.removeBuffer(start, end)
      }
      if (!Player.util.hasClass(player.root, 'xgplayer-ended')) {
        player.emit('urlchange')
      }
      player.mp4 = mp5
      player.mse.appendBuffer(mp5.packMeta(mp4.meta))
    })
    Player.util.on(mp5, 'error', err => {
      player._errorHandle(err)
    })
  }

  _onBufferedReset(){
    if(this.mp4 && this.mp4.timeRage) {
      this.mp4.timeRage.forEach(item => {
        // if(item[0] <= time) item.downloaded = false;
        item.downloaded = false;
      });
    }
  };

  _onOnlineHandler(){
    if(!this._hasInited){
      this.src = this.config.url;
    }else{
      if(this._hasStartProgressBack){
        this._startProgress();
      }
      this._hasStartProgressBack = false;
    }
  }

  _onOfflineHandler(){
    if(this._hasStartProgress){
      this._stopProgress();
      this._hasStartProgressBack = true;
    }
  }

  _bindNetworkStateChange(){
    window.addEventListener('online', this._onOnlineHandlerFunc)
    window.addEventListener('offline', this._onOfflineHandlerFunc)
  }

  _unbindNetworkStateChange(){
    window.removeEventListener('online', this._onOnlineHandlerFunc)
    window.removeEventListener('offline', this._onOfflineHandlerFunc)
  }

  _onSuperStart(url){
    super.start(url)
  }

  _init(url){
    let player = this;
    let promise = new ProxyPromise();

    player._initMp4(url, promise);
    return promise;
  }

  _initMse(mp4, meta, promise){
    let player = this;
    const isHvc = meta.videoCodec.indexOf('hvc1') > -1 || (meta.encv && meta.encv.data_format.indexOf('hvc1') > -1)

    let hasVideo = !!meta.videoCodec
    let hasAudio = !!meta.audioCodec
    let codec
    if(hasVideo && hasAudio){
      codec = isHvc ? 'video/mp4; codecs="hev1.1.6.L93.B0, mp4a.40.5"':'video/mp4; codecs="avc1.64001E, mp4a.40.5"'
    }else if(hasVideo){
      codec = isHvc ? 'video/mp4; codecs="hev1.1.6.L93.B0"':'video/mp4; codecs="avc1.64001E"'
    }else{
      codec = 'video/mp4; codecs="mp4a.40.5"'
    }
    
    let mse = new MSE(codec, player.config.mediaType)
    Player.util.on(mse, 'sourceopen', function () {
      const initSeg = mp4.packMeta(mp4.meta);
      mse.appendBuffer(initSeg)
      Player.util.once(mse, 'updateend', function () {
        player._loadData();
      })
    })
    Player.util.on(mse, 'error', function (e) {
      promise.reject(e)
    })
    promise.resolve([mp4, mse])
  }

  _initMp4(url, promise){
    let player = this;
    let mp4 = new MP4(url, player.config.xhrSetup, player, player.config.preloadSize, {
      playerId: player._playerId
    })

    Player.util.once(mp4, 'metaReady', meta => {
      this._initMse(mp4, meta, promise)
    })
    
    Player.util.on(mp4, 'error', (e) => {
      promise.reject(e)
    })
  }

  _loadData(i = 0, time = null){
    if(!navigator.onLine){
      return;
    }
    let player = this;
    if(!player.mp4){
      return;
    }
    time = time ? time : player.currentTime;
    player.mp4.seek(time + i * 0.1).then(buffer => {
      if (buffer && player.mse) {
        let mse = player.mse
        mse.updating = true
        Player.util.once(mse, 'updateend', () => {
          // if (player.currentTime === 0 && player.video.buffered.length && player.video.buffered.end(player.video.buffered.length - 1) > 0) {
          //   player.emit('canplay')
          // }
          mse.updating = false
          player.emit('addVideoBufferEnd');
        })
        mse.appendBuffer(buffer)
      }
    }, () => {
      if (i < 10) {
        setTimeout(function () {
          player._loadData(i + 1)
        }, 2000)
      }
    })
  }

  _onTimeUpdate(){
    let player = this;
    let mse = player.mse;
    let mp4 = player.mp4
    if (mse && !mse.updating && mp4 && mp4.canDownload) {
      let timeRage = mp4.timeRage
      let range = player.getBufferedRange(player.buffered2); 
      let cacheMaxTime = player.currentTime + player._maxBufferLength
      if (range[1] - cacheMaxTime > 0) {
        return
      }
      timeRage.every((item, idx) => {
        if(item.downloaded) {
          return true;
        } else if (range[1] === 0) { //当前播放时刻无缓存
          if(item[0] <= player.currentTime && (player.currentTime < item[1] || player.duration - item[1] < 0.5)) {
            player._loadData(0, item[0])
            return false
          } else {
            return true
          }
        } else { //当前播放时刻有缓存
          if (item[0] >= range[1] || item[1] - 1 >= range[1] || (range[1] >= item[0] && range[1] <= item[0] + 1)) {
            player._loadData(0, item[0])
            return false
          } else {
            return true
          }
        }
      })
      isEnded(player, mp4)// hack for older webkit
    }
  }


  _onWaiting(){
    let player = this;
    let curTime = player.currentTime
    player._onInnerWait(curTime)
    if(curTime + 2 < player.duration) player._onInnerWait(curTime + 2)
    if(curTime - 2 > 0) player._onInnerWait(curTime - 2)
  }

  _onEnded(){
    this.off('waiting', this._onWaitingFunc)
    this._stopProgress();
  }

  _onReplay() {
    let player = this;
    player._onDestroy();
    player._init(player.config.url).then((result) => {
      let mp4 = result[0]; 
      let mse = result[1]
      player._startProgress();
      player._onSuperStart(mse.url)
      player.mp4 = mp4
      player.mse = mse
      // player.currentTime = 0
      player.proxyOnce('canplay', () => {
        player.play()
        player.proxyOn('waiting', player._onWaitingFunc)
      })
    }, err => {
      player._errorHandle(err)
    })
  }

  _onDestroy(){
    let player = this;
    player._hasInited = false;
    player._unbindNetworkStateChange();
    Task.clear(player._playerId)
    if (player.mp4) {
      player.mp4.destroy();
      player.mp4 = null;
    }
    if(player.mse){
      player.mse.destroy();
    }
    player.unloadVideo();
    player._stopProgress();
    player.cancelPendingPromises();
  }

  _errorHandle(err){
    if(err.errt === 'network' || err.errorType === 'network'){
      return;
    }
    if(err.errt === 'parse' ||  err.errorType === 'parse'){

      return;
    }
    let player = this;
    err.url = player.src
    if (err.errd && typeof err.errd === 'object') {
      if (player.mp4) {
        err.errd.url = player.mp4.url
        err.url = player.mp4.url
        player.mp4.canDownload = false
      }
    }
    player.emit('DATA_REPORT', err)
    Task.clear(player._playerId)
    if (player.mp4 && player.mp4.bufferCache) {
      player.mp4.bufferCache.clear()
    }
    if (player.currentTime) {
      player._currentTime = player.currentTime
    }
    if (player._start) {
      player.start = player._start
      player._start = null
    }
    player.switchURL = null
    player._replay = null

    player.off('seeking', player._onSeekingFunc)
    player.off('playing', player._onMp4InitFunc)
    player.off('waiting', player._onWaitingFunc)
    player.off('ended', player._onEndedFunc)
    player.off('destroy', player._onDestroyFunc)

    iplayer.emit('error', err)
    player.src = player.config.url
    player.proxyOnce('canplay', () => {
      if (player._currentTime) {
        player.currentTime = player._currentTime
      }
      player.play()
    })
    
  }

  _onSeeking() {
    let curTime = this.currentTime
    this._onCheckLoad(curTime);
    isEnded(this, this.mp4)
  }

  _onInnerWait(curTime) {
   this._onCheckLoad(curTime);
  }

  _onCheckLoad(curTime){
    let player = this;
    let buffered = player.buffered2 || player.buffered; 
    let hasBuffered = false; 
    let timeRage = player.mp4.timeRage
    if (buffered.length) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
          hasBuffered = true
          break
        }
      }
      if (!hasBuffered) {
        timeRage.every((item, idx) => {
          if (item[0] <= curTime && (item[1] > curTime || player.duration - item[1] < 0.5)) {
            player._loadData(0, item[0])
            return false
          } else {
            return true
          }
        })
      }
    } else {
      timeRage.every((item, idx) => {
        if (item[0] <= curTime && item[1] > curTime) {
          player._loadData(0, item[0])
          return false
        } else {
          return true
        }
      })
    }
  }

  _onMp4Init(){
    let player = this;
    if(player.config.mp4Init) {
      player.pause()
    }
    // if(player.config.onlyInit){
    //   player._startProgress();
    // }
  }

  _stopProgress(){
    let player = this;
    this._hasStartProgress = false;
    if(player._requestTimer){
      player._requestTimer.stop();
      player._requestTimer = null;
    }
  }

  _startProgress(){
    let player = this;
    player._stopProgress();
    player._requestTimer = new Timer(()=>{
      if(player._requestTimer) {
        player._onTimeUpdate()
      }
    });
    player._requestTimer.tickEvery(player._tickInSeconds);//200ms
    this._hasStartProgress = true;
  }

  unloadVideo() {
    let player = this;
    try {
      if (player.video && player.video.src) {
          player.video.removeAttribute('src'); // empty source
          player.video.load();
      }
    } catch (error) {
      //  console.log('unloadVideo error', error)
    }
  }

  _addPendingPromise(p){
    this._pendingPromises.push(p);
  }

  _removePendingPromise(p){
    let idx =  this._pendingPromises.indexOf(p);
    if(idx > -1){
      this._pendingPromises.splice(idx, 1);
    }
  }

  onMediaExpired(){
    this._stopProgress();
    this.emit(CUSTOM_EVENTS.MEDIA_EXPIRED);
  }

  cancelPendingPromises(){
    if(this._pendingPromises.length > 0){
      this._pendingPromises.forEach(promise => {
        promise.reject(DESTROYED)
      })
    }
    this._pendingPromises = [];
  }

  enableAutoBuffer(start){
    if(start){
      if(!this._allInitPromise){
        return;
      }
      this._allInitPromise.then(()=>{
        this._startProgress();
      })
    }else{
      this._stopProgress();
    }
  }

  destroy(){
    if(this.mp4){
      this.mp4.destroy();
    }
    if(this.mse){
      this.mse.destroy();
    }
    if(this.video) {
      this.video.removeEventListener(CUSTOM_EVENTS.BUFFERED_RESET, this._onBufferedResetFunc);
    }
    super.destroy();
  }

  emitInitFail(reason){
    this.emit(CUSTOM_EVENTS.INIT_FAIL, reason);
  }

  emitParseError(){
    this.emit(CUSTOM_EVENTS.PARSE_ERROR);
  }

  /***
   * @return Promise
   */
  get ready(){
    return this._allInitPromise;
  }
}
Mp4Player.uniqueId = 1;
Mp4Player.isSupported = isSupported;
Mp4Player.isSupportedWithXgmse = isSupportedWithXgmse;
Mp4Player.isMediaSourceSupported = isMediaSourceSupported;
Mp4Player.CUSTOM_EVENTS = CUSTOM_EVENTS;

export default Mp4Player;
