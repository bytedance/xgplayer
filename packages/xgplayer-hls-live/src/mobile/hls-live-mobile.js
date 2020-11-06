import { EVENTS } from 'xgplayer-helper-utils'
// import { hevc, avc } from 'xgplayer-helper-codec'

// const { NalUnitHEVC } = hevc;
// const { NalUnit } = avc;

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const CRYTO_EVENTS = EVENTS.CRYTO_EVENTS;
const HLS_ERROR = 'HLS_ERROR';

const MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g;

class HlsLiveController {
  constructor (configs) {
    this.TAG = 'HlsLiveMobile'
    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retryTimes = this.configs.retryTimes || 3;
    this.preloadTime = this.configs.preloadTime;
    this._m3u8lasttime = 0;
    this._timmer = setInterval(this._checkStatus.bind(this), 50);
    this._lastCheck = 0;
    this._player = this.configs.player;
    this.m3u8Text = null

    this.setDataInterval = null;
  }

  init () {
    const { XgBuffer, Tracks, Playlist, FetchLoader, TsDemuxer } = this.configs
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._context.registry('TRACKS', Tracks);

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true});

    // 初始化M3U8Loader;
    this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1, retryTime: 0 });
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3, retryTime: 1 });

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete.bind(this));

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this));

    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this));
  }

  _onError (type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err ? err.message : ''}`,
      errorFatal: fatal
    }
    this._player.emit(HLS_ERROR, error);
  }

  _onDemuxComplete () {
    if (this._player.video) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS');
      if (!videoTrack) return;
      videoTrack.samples.forEach((sample) => {
        if (sample.analyzed) {
          return;
        }
        sample.analyzed = true;
        let nals = sample.nals;
        const nalsLength = nals.reduce((len, current) => {
          return len + 4 + current.body.byteLength;
        }, 0);
        const newData = new Uint8Array(nalsLength);
        let offset = 0;
        nals.forEach((nal) => {
          newData.set([0, 0, 0, 1], offset)
          offset += 4;
          newData.set(new Uint8Array(nal.body), offset);
          offset += nal.body.byteLength;
        })
        sample.nals = null;
        sample.data = newData;
      })
      this._player.video.onDemuxComplete(videoTrack, audioTrack);
    }
  }
  _onMetadataParsed (type) {
    if (type === 'audio') {
      // 将音频meta信息交给audioContext，不走remux封装
      const { audioTrack } = this._context.getInstance('TRACKS')
      if (audioTrack && audioTrack.meta) {
        this._setMetaToAudio(audioTrack.meta)
      }
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS')
      if (videoTrack && videoTrack.meta) {
        this._setMetaToVideo(videoTrack.meta)
      }
    }
  }

  _setMetaToAudio (audioMeta) {
    if (this._player.video) {
      this._player.video.setAudioMeta(audioMeta);
    }
  }

  _setMetaToVideo (videoMeta) {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta);
    }
  }

  _onLoadError (loader, error) {
    let err;
    if (loader === 'M3U8_LOADER') {
      let player = this._player;
      // 绕过mobileVideo.error为空，xgplayer errorHandler()中不组装Errors
      err = new Player.Errors(
        'other',
        player.currentTime,
        player.duration, player.networkState, player.readyState, player.currentSrc, player.src,
        player.ended, {
          line: 162,
          msg: player.error,
          handle: 'Constructor'
        }, 4, player.video.error)
    } else {
      err = {
        code: error.code,
        errorType: 'network',
        ex: `[${loader}]: ${error.message}`,
        errd: {}
      }
    }
    this._player.emit('error', err)

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
    this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, fatal);
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _onLoadComplete (buffer) {
    const { M3U8Parser, XgBuffer, FetchLoader, Crypto } = this.configs
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
        if (this.retryTimes > 0) {
          this.retryTimes--;
          this._preload();
        } else {
          this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
          if (this._player.video) {
            this._player.video.handleEnded()
          }
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
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LADER_START, this._playlist.encrypt.uri);
      } else {
        this._m3u8Loaded(mdata);
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this.retryTimes = this.configs.retryTimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emit(DEMUX_EVENTS.DEMUX_START);
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retryTimes = this.configs.retryTimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emitTo('CRYPTO', CRYTO_EVENTS.START_DECRYPT);
    } else if (buffer.TAG === 'KEY_BUFFER') {
      this.retryTimes = this.configs.retryTimes || 3;
      this._playlist.encrypt.key = buffer.shift();
      this._crypto = this._context.registry('CRYPTO', Crypto)({
        key: this._playlist.encrypt.key,
        iv: this._playlist.encrypt.ivb,
        method: this._playlist.encrypt.method,
        inputbuffer: 'DECRYPT_BUFFER',
        outputbuffer: 'TS_BUFFER'
      });
      this._crypto.on(CRYTO_EVENTS.DECRYPTED, this._onDcripted.bind(this));
    }
  }

  _onDcripted () {
    this.emit(DEMUX_EVENTS.DEMUX_START);
  }

  _m3u8Loaded (mdata) {
    if (!this.preloadTime) {
      this.preloadTime = this._playlist.targetduration ? this._playlist.targetduration : 5;
    }
    if (this._playlist.fragLength > 0) {
      this.retryTimes = this.configs.retryTimes || 3;
    } else {
      if (this.retryTimes > 0) {
        this.retryTimes--;
        this._preload();
      } else {
        this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
        if (this._player.video) {
          this._player.video.handleEnded()
        }
      }
    }
  }
  _checkStatus () {
    if (this.retryTimes < 1 && (new Date().getTime() - this._lastCheck < 10000)) {
      return;
    }
    this._lastCheck = new Date().getTime();
    if (this._player.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      let currentTime = this._player.currentTime;
      if (this._player.readyState <= 2) {
        this._preload();
      }
      let bufferend = this._player.buffered.end(this._player.buffered.length - 1);
      if (currentTime > bufferend - this.preloadTime) {
        this._preload();
      }
    }
  }

  _preload () {
    if (this.retryTimes < 1 || this._tsloader.loading || this._m3u8loader.loading) {
      return;
    }
    let frag = this._playlist.getTs();
    if (frag && !frag.downloaded && !frag.downloading) {
      this._playlist.downloading(frag.url, true);
      this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
    } else {
      let preloadTime = this.preloadTime ? this.preloadTime : 0;
      let current = new Date().getTime();
      if ((!frag || frag.downloaded) &&
        (current - this._m3u8lasttime) / 1000 > preloadTime) {
        this._m3u8lasttime = current
        this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url);
      }
    }
  }

  _isHEVC (meta) {
    return meta && meta.codec === 'hev1.1.6.L93.B0'
  }

  load (url) {
    this.baseurl = this.configs.M3U8Parser.parseURL(url);
    this.url = url;
    this._preload();
  }

  resetLoaderIdle () {
    this._m3u8loader.loading = false;
    this._tsloader.loading = false;
  }

  resetPlayList () {
    this._playlist.clear();
  }

  destroy () {
    clearInterval(this._timmer);
    this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete);
    // this.off(REMUX_EVENTS.REMUX_ERROR);
    this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed);
    this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete);

    this.m3u8Text = null
  }
}
export default HlsLiveController;
