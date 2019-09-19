// TODO: Fix引用
import Context from '../../xgplayer-utils/src/Context';
import { XgBuffer } from '../../xgplayer-buffer/src/index';
import FetchLoader from '../../xgplayer-loader-fetch/src';

import M3U8Parser from './demuxer/m3u8parser';
import TsDemuxer from './demuxer/ts';

class HLSLiveController {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;

    this._playlist = null;
  }

  init () {
    // 初始化两个Buffer （M3U8/TS)
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._context.initInstance('M3U8_BUFFER');
    this._context.initInstance('TS_BUFFER');

    // 初始化M3U8Loader;
    this._context.registry('M3U8_LOADER', FetchLoader);
    this._context.registry('TS_LOADER', FetchLoader);
    this._context.initInstance('M3U8_LOADER', { buffer: 'M3U8_BUFFER', readtype: 1 });
    this._context.initInstance('TS_LOADER', { buffer: 'TS_BUFFER', readtype: 0 });

    // 初始化TS demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer);
    this._context.initInstance('TS_DEMUXER', { inputbuffer: 'TS_BUFFER' });

    this.initEvents();
  }

  initEvents () {
    console.log(this);
    this.on('LOADER_COMPLETE', (buffer) => {
      let tsloader = this._context.getInstance('TS_LOADER')
      if (buffer.TAG === 'M3U8_BUFFER') {
        let mdata = M3U8Parser.parse(buffer.shift(), this.baseurl);

        if (!this._playlist) {
          this._playlist = mdata;
        } else {
          this._playlist = mdata;
        }
        if (this._playlist.frags && this._playlist.frags.length > 0) {
          let frag = this._playlist.frags.shift();
          tsloader.load(frag.url);
        }
      } else if (buffer.TAG === 'TS_BUFFER') {
        let td = this._context.getInstance('TS_DEMUXER');
        td.demux();
        if (this._playlist.frags && this._playlist.frags.length > 0) {
          // let frag = this._playlist.frags.shift();
          // tsloader.load(frag.url);
        }
      }
    })
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    let m3u8loader = this._context.getInstance('M3U8_LOADER');
    m3u8loader.load(url);
  }
}
window.Context = Context;
export default HLSLiveController;
