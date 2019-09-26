import { EVENTS, Mse } from 'xgplayer-utils';
import { XgBuffer, PreSource, Tracks } from 'xgplayer-buffer';
import { FetchLoader } from 'xgplayer-loader';
import { Compatibility } from 'xgplayer-codec';
import Mp4Remuxer from 'xgplayer-remux/src/mp4/index';

import {Playlist, M3U8Parser, TsDemuxer} from 'xgplayer-demux';

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;

class HlsVodController {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retrytimes = this.configs.retrytimes || 3;
    this.container = this.configs.container;
    this.preloadTime = this.configs.preloadTime || 1;
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._tracks = this._context.registry('TRACKS', Tracks)();

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true});
    this._context.registry('PRE_SOURCE_BUFFER', PreSource);

    this._context.registry('COMPATIBILITY', Compatibility);

    // 初始化M3U8Loader;
    this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 0 });

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer);

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)({container: this.container, preloadTime: this.preloadTime});
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, (buffer) => {
      if (buffer.TAG === 'M3U8_BUFFER') {
        let mdata = M3U8Parser.parse(buffer.shift(), this.baseurl);
        this._playlist.pushM3U8(mdata);
        let frag = this._playlist.getTs();
        if (frag) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--;
            this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url)
          }
        }
      } else if (buffer.TAG === 'TS_BUFFER') {
        this._playlist.downloaded(this._tsloader.url, true);
        this.emit(DEMUX_EVENTS.DEMUX_START)
      }
    })

    this.on(REMUX_EVENTS.INIT_SEGMENT, (type) => {
      this.mse.addSourceBuffers();
    });

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, (type) => {
      let enough = false;
      let sources = this._context.getInstance('PRE_SOURCE_BUFFER');
      sources = sources.sources;
      let track;
      if (Object.keys(this.mse.sourceBuffers).length < 1) {
        for (let i = 0, k = Object.keys(sources).length; i < k; i++) {
          let type = Object.keys(sources)[i];
          if (type === 'audio') {
            track = this._tracks.audioTrack;
          } else if (type === 'audio') {
            track = this._tracks.audioTrack;
          }
          if (track) {
            let dur = type === 'audio' ? 21 : 40;
            if (track.meta && track.meta.refSampleDuration) dur = track.meta.refSampleDuration;
            if (sources[type].data.length > (this.preloadTime / dur)) {
              enough = true;
            }
          }
        }
      
        if (!enough) {
          let frag = this._playlist.getTs();
          console.log(frag);
          if (frag && !this._tsloader.loading && !frag.downloading) {
            this._playlist.downloading(frag.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
          }
        }
        this.mse.addSourceBuffers();
      }
      this.mse.doAppend();
    })
    this.on(REMUX_EVENTS.REMUX_ERROR, (err) => {
      console.log(err)
    })

    this.on(DEMUX_EVENTS.METADATA_PARSED, (type) => {
      
      let duration = this._playlist.duration;
      if (type === 'video') {
        this._tracks.videoTrack.meta.duration = duration;
      } else if (type === 'audio') {
        this._tracks.audioTrack.meta.duration = duration;
      }
      this.emit(REMUX_EVENTS.REMUX_METADATA, type)
    })

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, () => {
      this.emit(REMUX_EVENTS.REMUX_MEDIA)
    })

    this.on('TIME_UPDATE', (container) => {
      let buffered = container.buffered;
      let currentTime = container.currentTime;
      let currentbuffer = -1;
      let time = currentTime;
      for (let i = 0; i < buffered.length; i++) {
        if (currentTime < buffered.end(i) && currentTime > buffered.start(i)) {
          currentbuffer = i;
        }
      }
      if (currentbuffer >= 0) {
        time = buffered.end(currentbuffer);
      }
      let frag = this._playlist.getTs((time + 1) * 1000);
      if (frag && !this._tsloader.loading && !frag.downloading && frag && currentTime > time - 5) {
        this._playlist.downloading(frag.url, true);
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url);
      }
    });
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, url)
  }
}
export default HlsVodController;
