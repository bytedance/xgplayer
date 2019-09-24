// TODO: Fix引用
import { EVENTS, Mse } from 'xgplayer-utils';
import { XgBuffer, Track, PreSource } from 'xgplayer-buffer';
import { FetchLoader } from 'xgplayer-loader';
import Mp4Remuxer from 'xgplayer-remux/src/mp4/index';

import Playlist from './playlist';
import M3U8Parser from './demuxer/m3u8parser';
import TsDemuxer from './demuxer/ts';

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;

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
    this._context.registry('PLAYLIST', Playlist);
    this._context.registry('TRACKS', Track);
    this._context.registry('PRE_SOURCE_BUFFER', PreSource);

    this._context.initInstance('M3U8_BUFFER');
    this._context.initInstance('TS_BUFFER');
    this._playlist = this._context.initInstance('PLAYLIST', {autoclear: true});
    this._tracks = this._context.initInstance('TRACKS');
    this._context.initInstance('PRE_SOURCE_BUFFER');

    // 初始化M3U8Loader;
    this._context.registry('M3U8_LOADER', FetchLoader);
    this._context.registry('TS_LOADER', FetchLoader);
    this._context.initInstance('M3U8_LOADER', { buffer: 'M3U8_BUFFER', readtype: 1 });
    this._context.initInstance('TS_LOADER', { buffer: 'TS_BUFFER', readtype: 0 });

    // 初始化TS demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer);
    this._context.initInstance('TS_DEMUXER', { inputbuffer: 'TS_BUFFER' });

    this._context.registry('MP4_REMUXER', Mp4Remuxer);
    this._context.initInstance('MP4_REMUXER');

    this._context.registry('MSE', Mse);
    this.mse = this._context.initInstance('MSE', {container: this.container});
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, (buffer) => {
      let tsloader = this._context.getInstance('TS_LOADER')
      let m3u8loader = this._context.getInstance('M3U8_LOADER');
      if (buffer.TAG === 'M3U8_BUFFER') {
        let mdata = M3U8Parser.parse(buffer.shift(), this.baseurl);
        this._playlist.pushM3U8(mdata);
        let frag = this._playlist.getTs();
        if (frag) {
          tsloader.load(frag.url);
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--;
            m3u8loader.load(this.url);
          }
        }
      } else if (buffer.TAG === 'TS_BUFFER') {
        let td = this._context.getInstance('TS_DEMUXER');
        td.demux();
        let frag = this._playlist.getTs();
        if (frag) {
          tsloader.load(frag.url);
        } else {
          m3u8loader.load(this.url);
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
    this.on('TIME_UPDATE', (container) => {
      console.log((this._playlist.duration / 1000), container.currentTime)
      if (container.currentTime > (this._playlist.duration / 1000) - 5) {
        this.load(this.url);
      }
    })
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    console.log(this._playlist);
    this.url = url;
    let m3u8loader = this._context.getInstance('M3U8_LOADER');
    m3u8loader.load(url);
  }
}
export default HlsLiveController;
