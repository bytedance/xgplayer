import { AudioTrack, VideoTrack } from 'xgplayer-transmuxer'
import { MP4 } from 'xgplayer-transmuxer/src/mp4/mp4'

export function joinBytes (...parts) {
  const result = new Uint8Array(parts.reduce((length, part) => length + part.length, 0))
  let offset = 0
  for (const part of parts) {
    result.set(part, offset)
    offset += part.length
  }
  return result
}

function createTracks () {
  const video = new VideoTrack()
  Object.assign(video, {
    timescale: 1000,
    duration: 2000,
    width: 16,
    height: 16,
    sps: [new Uint8Array([0x67, 0x42, 0, 0x1e])],
    pps: [new Uint8Array([0x68, 0xce, 0x06, 0xe2])]
  })
  const audio = new AudioTrack()
  Object.assign(audio, {
    timescale: 1000,
    duration: 3000,
    sampleRate: 48000,
    channelCount: 2,
    config: [0x11, 0x90]
  })
  return { video, audio }
}

function sampleTable (sizes, offsets, syncSamples = []) {
  return {
    stts: [{ value: 1000, count: sizes.length }],
    stsc: [{ firstChunk: 1, samplesPerChunk: 1, sampleDescIndex: 1 }],
    stsz: sizes,
    stco: offsets,
    stss: syncSamples,
    ctts: []
  }
}

export function createRangeMedia () {
  const { video, audio } = createTracks()
  // These NAL/AAC payloads are sample-boundary sentinels, not a decoding fixture.
  const videoSamples = [
    new Uint8Array([0, 0, 0, 2, 0x65, 0x81]),
    new Uint8Array([0, 0, 0, 2, 0x65, 0x82])
  ]
  const audioSamples = [
    new Uint8Array([0x11, 0x12, 0x13]),
    new Uint8Array([0x21, 0x22, 0x23]),
    new Uint8Array([0x31, 0x32, 0x33])
  ]
  // Put the longer track first so mvhd covers the audio-only final segment.
  const tracks = [audio, video]
  const ftyp = MP4.ftyp(tracks)
  const start = ftyp.length + 8
  video.ext = sampleTable([6, 6], [start, start + 12], [1, 2])
  audio.ext = sampleTable([3, 3, 3], [start + 6, start + 9, start + 18])
  const payload = joinBytes(videoSamples[0], audioSamples[0], audioSamples[1], videoSamples[1], audioSamples[2])
  const bytes = joinBytes(ftyp, MP4.mdat(payload), MP4.moovMP4(tracks))
  // Keep moov after mdat: required sample ends must not be inferred from file size.
  return {
    bytes,
    fragments: [
      { start, end: start + 9, video: [{ index: 0, data: videoSamples[0] }], audio: [{ index: 0, data: audioSamples[0] }] },
      { start: start + 9, end: start + 18, video: [{ index: 1, data: videoSamples[1] }], audio: [{ index: 1, data: audioSamples[1] }] },
      { start: start + 12, end: start + 21, video: [], audio: [{ index: 2, data: audioSamples[2] }] }
    ]
  }
}

export function createSidxMedia () {
  const { video, audio } = createTracks()
  const init = MP4.initSegment([audio, video])
  const sidx = new Uint8Array(44)
  const view = new DataView(sidx.buffer)
  view.setUint32(0, sidx.length)
  sidx.set([0x73, 0x69, 0x64, 0x78], 4)
  view.setUint32(12, 1)
  view.setUint32(16, 1000)
  view.setUint16(30, 1)
  view.setUint32(32, 16)
  view.setUint32(36, 1000)
  view.setUint32(40, 0x90000000)
  // This reference tests finite sidx byte ranges, not moof decoding or playback.
  const payload = Uint8Array.from({ length: 16 }, (_, index) => index + 1)
  return { bytes: joinBytes(init, sidx, payload), start: init.length + sidx.length, payload }
}
