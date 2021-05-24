import { EVENTS, logger } from 'xgplayer-helper-utils'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const CRYPTO_EVENTS = EVENTS.CRYPTO_EVENTS;
const MSE_EVENTS = EVENTS.MSE_EVENTS;
const HLS_ERROR = 'HLS_ERROR';

const MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g;
class HlsLiveController {
  constructor () {
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.m3u8FlushDuration = 4;
    this._m3u8lasttime = 0;
    this._timmer = setInterval(this._checkStatus.bind(this), 300);
    this.m3u8Text = null;
    this._downloadedFragmentQueue = [];
    this._onWaiting = this._onWaiting.bind(this);
    this._onEnded = this._onEnded.bind(this);
  }

  init () {
<<<<<<< packages/xgplayer-hls-live/src/mse/hls-live.js
    const { XgBuffer, Tracks, Playlist, ProcessedBufferManager, Compatibility, FetchLoader, TsDemuxer, Mp4Remuxer, Mse } = this._pluginConfig
=======
    const { XgBuffer, Tracks, Playlist, PreSource, Compatibility, FetchLoader, TsDemuxer, Mp4Remuxer, Mse } = this._pluginConfig

>>>>>>> packages/xgplayer-hls-live/src/mse/hls-live.js
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._track = this._context.registry('TRACKS', Tracks)();

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true, logger});
    this._context.registry('PRE_SOURCE_BUFFER', ProcessedBufferManager);

    this._compat = this._context.registry('COMPATIBILITY', Compatibility)();

    // 初始化M3U8Loader;
    this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

    // 初始化TS Demuxer
    this._tsDemuxer = this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer);

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)({container: this._player.video, format: 'hls'});

    this.preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime;
    this.retrytimes = this._pluginConfig.retrytimes;
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete.bind(this));
    this.on(LOADER_EVENTS.LOADER_RETRY, this._handleFetchRetry.bind(this))

    this._addSourceBuffers = this.mse.addSourceBuffers.bind(this.mse);

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._addSourceBuffers);

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment.bind(this));

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this))

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this));

    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this));

    this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError.bind(this));

    this._player.on('waiting', this._onWaiting);
    this._player.on('ended', this._onEnded);
  }

  _onError (type, mod, err, fatal) {
    let error = {
      code: err.code,
      errorType: type,
      errorDetails: `[${mod}]: ${err ? err.message : ''}`,
      errorFatal: fatal
    }
    this._player.emit(HLS_ERROR, error);
  }

  _onDemuxComplete (track1, track2) {
    logger.log(this.TAG, 'track:', track1, track2);
    let sourceBufferLen = 0;
    try {
      sourceBufferLen = this.mse.mediaSource.activeSourceBuffers.length;
    } catch (e) {}

    if (!this._needRecreateMs && sourceBufferLen && sourceBufferLen !== (track1 + track2)) {
      logger.warn(this.TAG, 'track 数量发生变化，需要新建 ms');
      this._needRecreateMs = true;
    } else {
      // 正常消费
      this.emit(REMUX_EVENTS.REMUX_MEDIA, 'ts');
      this._downloadedFragmentQueue.shift();
      let next = this._downloadedFragmentQueue[0];
      if (next) {
        this.emit(DEMUX_EVENTS.DEMUX_START, next, this._playlist.end);
      }
    }
  }

  _onWaiting () {
    this._throwTrackChangeError();
  }

  _onEnded () {
    this._throwTrackChangeError();
  }

  _throwTrackChangeError () {
    if (!this._needRecreateMs) return;

    this._needRecreateMs = false;
    this._player.emit('error', {
      code: 3,
      errorType: 'parse',
      ex: `decode error`,
      errd: {}
    })
    this.destroy();
  }

  _onMetadataParsed (type) {
    logger.warn(this.TAG, 'meta detect or changed , ', type);
    if (type === 'video') {
      this._context.mediaInfo.hasVideo = true;
    } else if (type === 'audio') {
      this._context.mediaInfo.hasAudio = true;
    }
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onMediaSegment () {
    this.mse.addSourceBuffers()
    this.mse.doAppend();
  }

  _onLoadError (loader, error) {
    this._player.pause();
    this._player.emit('error', {
      code: error.code,
      errorType: 'network',
      ex: `[${loader}]: ${error.message}`,
      errd: {}
    })
    this._onError(LOADER_EVENTS.LOADER_ERROR, loader, error, true);
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
    this.destroy();
  }

  _onDemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true;
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${mod}]: ${error ? error.message : ''}`,
      errd: {}
    });
    this._onError(DEMUX_EVENTS.DEMUX_ERROR, mod, error, fatal);
  }

  _onRemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true;
    }
    this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal);
  }

  _handleMseError (tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false;
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${tag}]: ${err ? err.message : ''}`,
      errd: {}
    });
    this._onError(MSE_EVENTS.MSE_ERROR, tag, err, fatal)
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _onLoadComplete (buffer) {
    const { M3U8Parser, XgBuffer, FetchLoader, Crypto } = this._pluginConfig
    if (buffer.TAG === 'M3U8_BUFFER') {
      let mdata;
      try {
        this.m3u8Text = buffer.shift();
        let result = MASTER_PLAYLIST_REGEX.exec(this.m3u8Text)
        if (result && result[2]) {
          // redirect
          this.load(result[2])
        } else {
          mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl);
        }
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'M3U8_PARSER', error, false);
      }

      if (!mdata) {
        if (this.retrytimes > 0) {
          this.retrytimes--;
          this._preload();
        } else {
          this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
          this.mse.endOfStream();
        }
        return;
      }

      try {
        this._playlist.pushM3U8(mdata, true);
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, false);
      }

      if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
        this._context.registry('DECRYPT_BUFFER', XgBuffer)();
        this._context.registry('KEY_BUFFER', XgBuffer)();
        this._tsloader.buffer = 'DECRYPT_BUFFER';
        this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({buffer: 'KEY_BUFFER', readtype: 3});
        const { count: times, delay: delayTime } = this._player.config.retry || {};
        // 兼容player.config上传入retry参数的逻辑
        const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times;
        const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime;
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LADER_START, this._playlist.encrypt.uri, {}, retryCount, retryDelay);
      } else {
        this._m3u8Loaded(mdata);
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      let seg = Object.assign({url: this._tsloader.url}, this._playlist._ts[this._tsloader.url]);
      this._downloadedFragmentQueue.push(seg)
      if (this._player.buffered.length === 0 || this._downloadedFragmentQueue.length === 1) {
        this.emit(DEMUX_EVENTS.DEMUX_START, seg, this._playlist.end);
      }
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emitTo('CRYPTO', CRYPTO_EVENTS.START_DECRYPTO);
    } else if (buffer.TAG === 'KEY_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3;
      this._playlist.encrypt.key = buffer.shift();
      this._crypto = this._context.registry('CRYPTO', Crypto)({
        key: this._playlist.encrypt.key,
        iv: this._playlist.encrypt.ivb,
        method: this._playlist.encrypt.method,
        inputbuffer: 'DECRYPT_BUFFER',
        outputbuffer: 'TS_BUFFER'
      });
      this._crypto.on(CRYPTO_EVENTS.DECRYPTED, this._onDcripted.bind(this));
    }
  }

  _handleFetchRetry (tag, info) {
    this._player.emit('retry', Object.assign({
      tag
    }, info))
  }

  _onDcripted () {
    this.emit(DEMUX_EVENTS.DEMUX_START);
  }

  _m3u8Loaded () {
    this.m3u8FlushDuration = this._playlist.targetduration || this.m3u8FlushDuration;
    if (!this.preloadTime) {
      this.preloadTime = this._playlist.targetduration ? this._playlist.targetduration : 5;
    }
  }

  _checkStatus () {
    const container = this._player.video
    if (!container) {
      clearInterval(this._timmer)
      return
    }
    if (container.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      let currentTime = container.currentTime;
      let bufferstart = container.buffered.start(container.buffered.length - 1);
      if (container.readyState <= 2) {
        if (currentTime < bufferstart) {
          container.currentTime = bufferstart;
          currentTime = bufferstart;
        } else {
          this._preload();
        }
      }
      let bufferend = container.buffered.end(container.buffered.length - 1);
      if (currentTime < bufferend - (this.preloadTime * 2)) {
        container.currentTime = bufferend - this.preloadTime;
      }
      if (currentTime > bufferend - this.preloadTime) {
        this._preload();
      }
    }
  }

  _preload () {
    if (this._tsloader.loading || this._m3u8loader.loading || this._needRecreateMs) {
      return;
    }
    let frag = this._playlist.getTs();
    const { count: times, delay: delayTime } = this._player.config.retry || {};
    // 兼容player.config上传入retry参数的逻辑
    const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times;
    const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime;
    const {fetchOptions = {}} = this._pluginConfig;
    if (frag && !frag.downloaded && !frag.downloading) {
      this._logDownSegment(frag);
      this._playlist.downloading(frag.url, true);
      this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url, fetchOptions, retryCount, retryDelay)
    } else {
      let current = new Date().getTime();
      if ((!frag || frag.downloaded) &&
        (current - this._m3u8lasttime) / 1000 > this.m3u8FlushDuration) {
        this._m3u8lasttime = current
        this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url, fetchOptions, retryCount, retryDelay);
      }
    }
  }

  _handleSourceUpdateEnd () {
    // 判断最后一个分片下载完了
    if (this._playlist.end) {
      let list = this._playlist.list;
      let keys = Object.keys(list).map(x => Number(x)).sort((a, b) => a > b ? 1 : -1);
      let lastKey = keys.pop();
      let url = list[lastKey];
      let lastSeg = this._playlist._ts[url]
      if (lastSeg && lastSeg.downloaded) {
        logger.warn(this.TAG, '直播结束,断流');
        this.mse.endOfStream();
      }
    }
  }

  _logDownSegment (frag) {
    if (!frag) return;
    logger.groupEnd();
    logger.group(this.TAG, `load ${frag.id}: [${frag.time / 1000} , ${(frag.time + frag.duration) / 1000}], downloading: ${frag.downloading} , donwloaded: ${frag.downloaded}`);
  }

  load (url) {
    this.baseurl = this._pluginConfig.M3U8Parser.parseURL(url);
    this.url = url;
    this._playlist.resetSequence();
    this._preload();
  }

  destroy () {
    if (this._timmer) {
      clearInterval(this._timmer);
    }
    if (this._player) {
      this._player.off('waiting', this._onWaiting);
      this._player.off('ended', this._onEnded);
    }
    this.mse = null
    this.m3u8Text = null
  }
}
export default HlsLiveController;
