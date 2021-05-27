import { hevc } from 'xgplayer-helper-codec';
import { XGDataView as XgStream, VideoTrackMeta } from 'xgplayer-helper-models'
import { EVENTS as Events } from 'xgplayer-helper-utils'

const { NalUnitHEVC } = hevc;
class H265Demuxer {
  constructor (options = {}) {
    this._player = options.player;
    this.meta = null;
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

    const units = this.unusedUnits.concat(NalUnitHEVC.getNalunits(stream))
    const { metaNals, frameNals } = H265Demuxer.nalSplits(units)

    if (metaNals) {
      let meta = H265Demuxer.extractMeta(metaNals)
      if (meta.vps && meta.sps && meta.pps) {
        this.meta = meta;
      } else {
        console.warn(`meta不全, vps:${meta.vps}, sps:${meta.sps}, pps:${meta.pps}`);
      }
    }

    if (frameNals.length) {
      if (this.meta) {
        if (frameNals.length > 1) {
          this.meta.multiSlice = true;
        }
        this._player.video.setVideoMeta(this.meta)
        this.meta = null;
      }
      const sample = H265Demuxer.hevcUnitsToSamples(frameNals);
      const ts = Math.floor(1000 * this.currentSampleIdx++ / this.fps)
      sample.dts = sample.pts = ts;
      this.videoTrack.samples.push(sample);
      this._player.video.onDemuxComplete(this.videoTrack)
    }
  }

  static nalSplits (nals) {
    if (nals.filter(x => (x.vps || x.sps || x.pps)).length === 0) {
      return {
        frameNals: nals
      }
    }

    let metaNals = [];
    let frameNals = [];

    nals.forEach(nal => {
      if (nal.vps || nal.sps || nal.pps) {
        metaNals.push(nal)
        return;
      }
      frameNals.push(nal)
    });
    return {
      metaNals,
      frameNals
    }
  }

  static extractMeta (nals) {
    let meta = new VideoTrackMeta()
    nals.forEach(nal => {
      if (nal.sps) {
        meta.sps = nal.body;
        meta.presentWidth = nal.sps.width;
        meta.presentHeight = nal.sps.height;
        meta.general_profile_space = nal.sps.general_profile_space;
        meta.general_tier_flag = nal.sps.general_tier_flag;
        meta.general_profile_idc = nal.sps.general_profile_idc;
        meta.general_level_idc = nal.sps.general_level_idc;
        meta.codec = 'hev1.1.6.L93.B0';
        meta.chromaFormatIdc = nal.sps.chromaFormatIdc;
        meta.bitDepthLumaMinus8 = nal.sps.bitDepthLumaMinus8;
        meta.bitDepthChromaMinus8 = nal.sps.bitDepthChromaMinus8;
      } else if (nal.pps) {
        meta.pps = nal.body;
      } else if (nal.vps) {
        meta.vps = nal.body;
      }
    })
    return meta;
  }

  static hevcUnitsToSamples (nals) {
    let isGop = false;

    let frameLength = nals.reduce((all, c) => {
      all += 4 + c.body.byteLength;
      return all;
    }, 0)
    let offset = 0;
    let data = new Uint8Array(frameLength);

    nals.forEach(nal => {
      data.set(new Uint8Array([0, 0, 0, 1]), offset);
      offset += 4;
      data.set(nal.body, offset);
      offset += nal.body.length;
      if (nal.type === 19 || nal.type === 20 || nal.type === 21) {
        isGop = true;
      }
    })

    return {data, isGop}
  }

  get buffer () {
    return this._context.getInstance('LOADER_BUFFER')
  }

  destroy () {
    this._player = null;
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
}

export default H265Demuxer;
