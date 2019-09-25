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
    this.container = this.configs.container;
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
    this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
    this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 0 });

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer);

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)({container: this.container});
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, (buffer) => {
      if (buffer.TAG === 'M3U8_BUFFER') {
        let mdata = M3U8Parser.parse(buffer.shift(), this.baseurl);
        this._playlist.pushM3U8(mdata);
        let frag = this._playlist.getTs();
        if (frag) {
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--;
            this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url)
          }
        }
      } else if (buffer.TAG === 'TS_BUFFER') {
        this.emit(DEMUX_EVENTS.DEMUX_START)
        let frag = this._playlist.getTs();
        if (frag) {
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        } else {
          this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url)
        }
      }
    })

    this.on(REMUX_EVENTS.INIT_SEGMENT, (type) => {
      this.mse.addSourceBuffers();
    });

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, (type) => {
      this.mse.doAppend();
    })
    this.on(REMUX_EVENTS.REMUX_ERROR, (err) => {
      console.log(err)
    })

    this.on(DEMUX_EVENTS.METADATA_PARSED, (type) => {
      this.emit(REMUX_EVENTS.REMUX_METADATA, type)
    })

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, () => {
      this.emit(REMUX_EVENTS.REMUX_MEDIA)
    })

    this.on('TIME_UPDATE', (container) => {
      // console.log((this._playlist.duration / 1000), container.currentTime)
      if (container.currentTime > (this._playlist.duration / 1000) - 5) {
        this.load(this.url);
      }
    })
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, url)
  }
}
export default HlsLiveController;
