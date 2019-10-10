import { EVENTS, Mse } from 'xgplayer-utils';
import { XgBuffer, PreSource, Tracks } from 'xgplayer-buffer';
import { FetchLoader } from 'xgplayer-loader';
import { Compatibility } from 'xgplayer-codec';
import Mp4Remuxer from 'xgplayer-remux/src/mp4/index';

import {Playlist, M3U8Parser, TsDemuxer} from 'xgplayer-demux';

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;

class HlsLiveController {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retrytimes = this.configs.retrytimes || 3;
    this.preloadTime = this.configs.preloadTime;
    this.container = this.configs.container;
    this._m3u8lasttime = 0;
    this._timmer = setInterval(this._checkStatus.bind(this), 50);
    this._lastCheck = 0;
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._context.registry('TRACKS', Tracks);

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true});
    this._context.registry('PRE_SOURCE_BUFFER', PreSource);

    this._context.registry('COMPATIBILITY', Compatibility);

    // 初始化M3U8Loader;
    this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer);

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)({container: this.container});
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete.bind(this));

    this.on(REMUX_EVENTS.INIT_SEGMENT, this.mse.addSourceBuffers.bind(this.mse));

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this.mse.doAppend.bind(this.mse));

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this));

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this))
  }

  _onDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }
  _onMetadataParsed (type) {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onLoadError (loader, error) {
    if (!this._tsloader.loading && !this._m3u8loader.loading && this.retrytimes > 0) {
      this.retrytimes--;
    } else if (this.retrytimes < 1) {
      this.mse.endOfStream();
    }
  }

  _onLoadComplete (buffer) {
    if (buffer.TAG === 'M3U8_BUFFER') {
      let mdata = M3U8Parser.parse(buffer.shift(), this.baseurl);
      this._playlist.pushM3U8(mdata, true);
      if (!this.preloadTime) {
        this.preloadTime = this._playlist.targetduration ? this._playlist.targetduration : 5;
      }
      if (this._playlist.fragLength > 0 && this._playlist.sequence < mdata.sequence) {
        this.retrytimes = this.configs.retrytimes || 3;
      } else {
        if (this.retrytimes > 0) {
          this.retrytimes--;
          this._preload();
        } else {
          console.log('end');
          this.mse.endOfStream();
        }
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this.retrytimes = this.configs.retrytimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emit(DEMUX_EVENTS.DEMUX_START)
    }
  }
  _checkStatus () {
    if (this.retrytimes < 1 && (new Date().getTime() - this._lastCheck < 10000)) {
      return;
    }
    this._lastCheck = new Date().getTime();
    if (this.container.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      let currentTime = this.container.currentTime;
      let bufferstart = this.container.buffered.start(this.container.buffered.length - 1);
      if (this.container.readyState <= 2) {
        if (currentTime < bufferstart) {
          this.container.currentTime = bufferstart;
          currentTime = bufferstart;
        } else {
          this._preload();
        }
      }
      let bufferend = this.container.buffered.end(this.container.buffered.length - 1);
      if (currentTime < bufferend - (this.preloadTime * 2)) {
        this.container.currentTime = bufferend - (this.preloadTime * 2);
      }
      if (bufferend > this.preloadTime * 2) {
        this.mse.remove(bufferend - (this.preloadTime * 2));
      }
      if (currentTime > bufferend - this.preloadTime) {
        this._preload();
      }
    }
  }

  _preload () {
    if (this._tsloader.loading || this._m3u8loader.loading) {
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

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    this._preload();
  }

  destroy () {
    clearInterval(this._timmer);
    this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete);
    this.off(REMUX_EVENTS.INIT_SEGMENT, this.mse.addSourceBuffers);
    this.off(REMUX_EVENTS.MEDIA_SEGMENT, this.mse.doAppend);
    // this.off(REMUX_EVENTS.REMUX_ERROR);
    this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed);
    this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete);
  }
}
export default HlsLiveController;
