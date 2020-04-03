import { NalUnit, SpsParser, SEIParser } from 'xgplayer-transmuxer-codec-avc'
import XgStream from 'xgplayer-transmuxer-buffer-stream'
import { VideoTrackMeta } from 'xgplayer-transmuxer-model-trackmeta';
import Events from 'xgplayer-transmuxer-constant-events'

class H264Demuxer {
  constructor (options = {}) {
    this._player = options.player;

    this.videoMeta = new VideoTrackMeta()
    this.videoTrack = {
      samples: []
    }
    this.fps = options.fps || 30
    this.currentSampleIdx = 0;
    this.duration = 0;
  }

  init () {
    this.initEvents()
  }

  initEvents () {
    this.on(Events.LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this))
    // this.on(Events.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this))
  }

  load (url) {
    this.emit(Events.LOADER_EVENTS.LADER_START, url);
  }

  handleDataLoaded () {
    const buffer = this.buffer;
    const data = buffer.shift(buffer.length);
    buffer.clear();
    const stream = new XgStream(data.buffer)
    const units = NalUnit.getNalunits(stream)

    const lastUnit = units.pop();
    const lastUnitData = new Uint8Array(lastUnit.body.byteLength + 4);
    lastUnitData.set(new Uint8Array(lastUnit.header), 0)
    lastUnitData.set(new Uint8Array(lastUnit.body), 4)
    buffer.push(lastUnitData);

    let sps;
    let pps;
    units.forEach((unit) => {
      const ts = Math.floor(1000 * this.currentSampleIdx++ / this.fps)
      const currentSample = {
        dts: ts,
        pts: ts,
        data: null,
        isKeyframe: false
      }
      if (unit.sps) {
        sps = true;
        this.videoMeta.sps = unit.body
        this.videoMeta.presentHeight = unit.sps.present_size.height;
        this.videoMeta.presentWidth = unit.sps.present_size.width;
      } else if (unit.pps) {
        pps = true;
        this.videoMeta.pps = unit.body
      }

      const data = new Uint8Array(unit.body.byteLength + 4);
      data.set([0, 0, 0, 1], 0);
      data.set(unit.body, 4);
      currentSample.data = data;
      currentSample.isKeyframe = unit.idr;

      this.videoTrack.samples.push(currentSample);
    })

    if (sps && pps && !this.videoMetaInited) {
      this._player.video.setVideoMeta(this.videoMeta);
      this.videoMetaInited = true
    }
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        if (this.videoTrack.samples.length) {
          this._player.video.onDemuxComplete(this.videoTrack);
        } else {
          clearInterval(this.intervalId)
        }
      }, 500)
    }
    this.duration = Math.round(Math.floor(this.currentSampleIdx / this.fps))
    this._player.emit('durationchange')
  }

  destroy () {
    this._player = null;
    this.videoMeta = null
    this.videoTrack = {
      samples: []
    }
    this.fps = null
    this.currentSampleIdx = null;
  }

  get buffer () {
    return this._context.getInstance('LOADER_BUFFER')
  }
}

export default H264Demuxer;
