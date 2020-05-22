import { NalUnit, SpsParser, SEIParser, Golomb } from 'xgplayer-transmuxer-codec-avc'
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
    this.unusedUnits = [];
    this.fps = options.fps || 30
    this.currentSampleIdx = 0;
    this.duration = 0;
    this.sps = null;
    this.pps = null;

    this.dataLoadedTimer = null;
  }

  init () {
    this.initEvents()
  }

  initEvents () {
    this.on(Events.LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this))
    this.on(Events.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this))
  }

  load (url) {
    this.emit(Events.LOADER_EVENTS.LADER_START, url);
  }

  handleDataLoaded () {
    const buffer = this.buffer;

    if (!buffer) {
      return;
    }
    if (this.dataLoadedTimer) {
      clearTimeout(this.dataLoadedTimer);
      this.dataLoadedTimer = null;
    }

    const data = buffer.shift(buffer.length);
    buffer.clear();
    const stream = new XgStream(data.buffer);

    const units = this.unusedUnits.concat(NalUnit.getNalunits(stream))

    if (!this._player.config.isLive) {
      if (units.length > 1) {
        const lastUnit = units.pop();
        const pushBackData = new Uint8Array(lastUnit.body.byteLength + 4)
        pushBackData.set(new Uint8Array(lastUnit.header), 0);
        pushBackData.set(lastUnit.body, 4);
        buffer.push(pushBackData)

        this.pushToMobileVideo(units);
        if (this.buffer.length) {
          this.dataLoadedTimer = setTimeout(() => {
            this.handleDataLoaded();
          }, 500)
        }
      } else if (units.length === 1){
        buffer.push(new Uint8Array(data))
        this.dataLoadedTimer = setTimeout(() => {
          this.handleDataLoaded();
        }, 500)
      }
    } else {
      this.pushToMobileVideo(units);
    }
  }

  pushToMobileVideo (units) {

    const { samples, unused } = H264Demuxer.unitsToSamples(units);

    this.unusedUnits = unused;

    samples.forEach((sample) => {
      const ts = Math.floor(1000 * this.currentSampleIdx++ / this.fps)
      sample.dts = sample.pts = ts;
      if (sample.sps) {
        this.sps = true;
        this.videoMeta.sps = sample.data.slice(4)
        this.videoMeta.presentHeight = sample.sps.present_size.height;
        this.videoMeta.presentWidth = sample.sps.present_size.width;
      } else if (sample.pps) {
        this.pps = true;
        this.videoMeta.pps = sample.data.slice(4)
      } else {
        this.videoTrack.samples.push(sample);
      }

    })

    if (this.sps && this.pps) {
      this._player.video.setVideoMeta(this.videoMeta);
      this.sps = null;
      this.pps = null;
    }
    if (!this.intervalId && !this._player.config.isLive) {
      this.intervalId = setInterval(() => {
        this.handleDataLoaded()
      }, 500)
    } else {
      this._player.video.onDemuxComplete(this.videoTrack);
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
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  static unitsToSamples (units) {
    let temp = [];
    const samples = []
    units.forEach((unit) => {
      const golomb = new Golomb(new Uint8Array(unit.body));
      golomb.readByte();
      if (!golomb.readUEG() || unit.sps || unit.pps) { // first_mb_slice
        if (temp.length) {
          samples.push(H264Demuxer.combineUnits(temp))
        }
        temp = [unit];
      } else {
        temp.push(unit)
      }
    })

    return {
      samples,
      unused: temp
    }
  }

  static combineUnits (units) {
    let sps, pps;
    const dataSize = units.reduce((result, unit) => {
      if (unit.sps) {
        sps = unit.sps;
      } else if (unit.pps) {
        pps = unit.pps;
      }
      return result + unit.header.byteLength + unit.body.byteLength;
    }, 0)

    const data = new Uint8Array(dataSize);
    let offset = 0;
    let isKeyframe;
    units.forEach((unit) => {
      data.set(new Uint8Array(unit.header), offset);
      offset += unit.header.byteLength;
      data.set(unit.body, offset);
      offset += unit.body.byteLength;
      if (unit.idr) {
        isKeyframe = true
      }
    })

    return {
      data,
      sps,
      pps,
      isKeyframe
    }
  }

  get buffer () {
    return this._context.getInstance('LOADER_BUFFER')
  }
}

export default H264Demuxer;
