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
    this.preloadTime = this.configs.preloadTime || 5;
    this._lastSeekTime = 0;
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._tracks = this._context.registry('TRACKS', Tracks)();

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true});
    this._presource = this._context.registry('PRE_SOURCE_BUFFER', PreSource)();

    this._compat = this._context.registry('COMPATIBILITY', Compatibility)();

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
        if (!this.preloadTime) {
          if (this._playlist.targetduration) {
            this.preloadTime = this._playlist.targetduration;
            this.mse.preloadTime = this._playlist.targetduration;
          } else {
            this.preloadTime = 5;
            this.mse.preloadTime = 5;
          }
        }

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
        let frag = this._playlist._ts[this._tsloader.url];
        console.log(frag);
        this._preload(this.mse.container.currentTime);
        this._playlist.downloaded(this._tsloader.url, true);
        this.emit(DEMUX_EVENTS.DEMUX_START)
      }
    })

    this.on(REMUX_EVENTS.INIT_SEGMENT, (type) => {
      this.mse.addSourceBuffers();
    });

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, (type) => {
      if (Object.keys(this.mse.sourceBuffers).length < 1) {
        this.mse.addSourceBuffers();
      }

      this.mse.doAppend();
    })
    this.on(REMUX_EVENTS.REMUX_ERROR, (err) => {
      console.log(err)
    })

    this.on(DEMUX_EVENTS.METADATA_PARSED, (type) => {
      let duration = parseInt(this._playlist.duration);
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
      this._preload(container.currentTime);
    });
  }

  seek (time) {
    this._lastSeekTime = time;
    this._tsloader.cancel();
    if (this._presource.sources.video) {
      this._presource.sources.video.data = [];
    }
    if (this._presource.sources.audio) {
      this._presource.sources.audio.data = []
    }
    if (this._tracks.audioTrack) {
      this._tracks.audioTrack.samples = [];
    }
    if (this._tracks.audioTrack) {
      this._tracks.videoTrack.samples = [];
    }

    if (this._compat) {
      this._compat.reset();
    }
    this._preload(time);
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, url)
  }

  _preload (time) {
    console.log(time);
    if (this._tsloader.loading) {
      return;
    }

    let video = this.mse.container;
    if (video.buffered.length < 1) {
      let frag = this._playlist.getTs(0);
      if (frag && !frag.downloading && !frag.downloaded) {
        this._playlist.downloading(frag.url, true);
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        this._preload(this.mse.container.currentTime);
      }
    } else {
      // Get current time range
      let currentbufferend = -1;
      if (!time) {
        time = video.buffered.end(0);
      }

      for (let i = 0; i < video.buffered.length; i++) {
        if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
          currentbufferend = video.buffered.end(i)
        }
      }

      if (currentbufferend < 0) {
        let frag = this._playlist.getTs(time * 1000 + 1);
        if (frag && !frag.downloading && !frag.downloaded) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        }
      } else if (currentbufferend < time + this.preloadTime) {
        let frag = this._playlist.getTs(currentbufferend * 1000 + 1); // FIXME: 这里用 + 1太严格了，在compat内一经偏移修正，就无法正确获取到下一个ts的地址
        let fragend = frag ? (frag.time + frag.duration) / 1000 : 0;
        while (frag && frag.downloaded && fragend < (time + this.preloadTime)) {
          frag = this._playlist.getTs(fragend * 1000 + 1);
          fragend = frag ? (frag.time + frag.duration) / 1000 : 0;
        }
        if (frag && !frag.downloading && !frag.downloaded) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        }
      }
    }
  }
}
export default HlsVodController;
