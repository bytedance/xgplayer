import { VVC } from './vvc'
import { VideoCodecType } from '../model'

const videoCodecs = []
const sampleEntryMap = Object.create(null)
const configBoxMap = Object.create(null)
const codecTypeMap = Object.create(null)
const codecStringPrefixMap = []

function normalizeTypes (types) {
  return (types || []).filter(Boolean)
}

function indexCodec (codec) {
  normalizeTypes(codec.sampleEntries).forEach(type => {
    sampleEntryMap[type] = codec
  })
  normalizeTypes(codec.configBoxes).forEach(type => {
    configBoxMap[type] = codec
  })
  normalizeTypes(codec.codecStringPrefixes).forEach(prefix => {
    codecStringPrefixMap.push({ prefix, codec })
  })
  if (codec.codecType && !codecTypeMap[codec.codecType]) {
    codecTypeMap[codec.codecType] = codec
  }
}

function unindexCodec (codec) {
  normalizeTypes(codec.sampleEntries).forEach(type => {
    if (sampleEntryMap[type] === codec) delete sampleEntryMap[type]
  })
  normalizeTypes(codec.configBoxes).forEach(type => {
    if (configBoxMap[type] === codec) delete configBoxMap[type]
  })
  if (codec.codecType && codecTypeMap[codec.codecType] === codec) {
    delete codecTypeMap[codec.codecType]
  }
  for (let i = codecStringPrefixMap.length - 1; i >= 0; i--) {
    if (codecStringPrefixMap[i].codec === codec) codecStringPrefixMap.splice(i, 1)
  }
}

export class VideoCodecRegistry {
  register (codec) {
    if (!codec || !codec.id) {
      throw new Error('video codec id is required')
    }
    const existed = videoCodecs.find(item => item.id === codec.id)
    if (existed) this.unregister(existed.id)
    videoCodecs.push(codec)
    indexCodec(codec)
    return codec
  }

  unregister (id) {
    const index = videoCodecs.findIndex(codec => codec.id === id)
    if (index < 0) return
    const [codec] = videoCodecs.splice(index, 1)
    unindexCodec(codec)
    return codec
  }

  getBySampleEntry (type) {
    return sampleEntryMap[type]
  }

  getByConfigBox (type) {
    return configBoxMap[type]
  }

  getByCodecType (codecType) {
    return codecTypeMap[codecType]
  }

  getByCodecString (codecString) {
    if (!codecString) return
    return codecStringPrefixMap.find(item => codecString.indexOf(item.prefix) === 0)?.codec
  }

  getByTrack (track) {
    if (!track) return
    const sampleEntryType = track.vvccSampleEntryType
    if (sampleEntryType && this.getBySampleEntry(sampleEntryType)) return this.getBySampleEntry(sampleEntryType)
    const codec = this.getByCodecString(track.codec)
    if (codec) return codec
    return this.getByCodecType(track.codecType)
  }

  list () {
    return videoCodecs.slice()
  }
}

export const videoCodecRegistry = new VideoCodecRegistry()

export function registerVideoCodec (codec) {
  return videoCodecRegistry.register(codec)
}

export function unregisterVideoCodec (id) {
  return videoCodecRegistry.unregister(id)
}

export function getVideoCodec (query = {}) {
  if (query.track) return videoCodecRegistry.getByTrack(query.track)
  if (query.sampleEntry) return videoCodecRegistry.getBySampleEntry(query.sampleEntry)
  if (query.configBox) return videoCodecRegistry.getByConfigBox(query.configBox)
  if (query.codecType) return videoCodecRegistry.getByCodecType(query.codecType)
  if (query.codec) return videoCodecRegistry.getByCodecString(query.codec)
}

export function applyVvcTrackConfig ({ track, entry, config, defaultSampleEntryType = 'vvc1' }) {
  track.codecType = VideoCodecType.VVCC
  track.codec = config.codec
  track.sps = config.sps
  track.pps = config.pps
  track.vps = config.vps
  track.vvcC = config.data
  if (config.nalUnitSize) track.nalUnitSize = config.nalUnitSize
  track.vvccSampleEntryType = entry.type === 'encv'
    ? (entry.sinf?.frma?.data_format || config.sampleEntryType || defaultSampleEntryType)
    : entry.type
}

export function buildVvcConfigBox ({ track, MP4, configBoxType = 'vvcC' }) {
  return MP4.box(MP4.type(configBoxType), new Uint8Array(track.vvcC))
}

export function markVvcSample ({ sample }) {
  const vvcNalInfo = VVC.getNalInfo(sample.units)
  if (!vvcNalInfo) return
  sample.sideData = {
    ...(sample.sideData || {}),
    vvcNalInfo
  }
}

export const vvcVideoCodec = {
  id: 'vvc',
  kind: 'video',
  codecType: VideoCodecType.VVCC,
  sampleEntries: ['vvc1', 'vvi1'],
  configBoxes: ['vvcC'],
  codecStringPrefixes: ['vvc1.', 'vvi1.'],
  trackConfigKey: 'vvcC',
  sampleEntryTrackKey: 'vvccSampleEntryType',

  parseConfigBox ({ data, box, sampleEntryType }) {
    return VVC.parseVVCDecoderConfigurationRecord(data, sampleEntryType || 'vvc1')
  },

  applyTrackConfig (ctx) {
    applyVvcTrackConfig(ctx)
  },

  getSampleEntryType ({ track }) {
    return track.vvccSampleEntryType || 'vvc1'
  },

  getConfigBoxType ({ track }) {
    return 'vvcC'
  },

  buildConfigBox ({ track, MP4 }) {
    return buildVvcConfigBox({
      track,
      MP4,
      configBoxType: this.getConfigBoxType({ track })
    })
  },

  buildFtyp ({ track, MP4 }) {
    return MP4.FTYPVVC1
  },

  markSample (ctx) {
    markVvcSample(ctx)
  }
}

registerVideoCodec(vvcVideoCodec)
