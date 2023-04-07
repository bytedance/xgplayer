import fs from 'fs'
import path from 'path'

export function readFile(name) {
  return new Uint8Array(fs.readFileSync(path.resolve(__dirname, '../movies', name)))
}

export function readMovie(name) {
  const [folderName, ext] = name.split('.')

  const folder = path.resolve(__dirname, '../movies', folderName)
  const file = fs.readFileSync(path.resolve(folder, `index.${ext}`))
  const snap = require(`../movies/${folderName}/snapshot.js`) 

  return [new Uint8Array(file), snap]
}

export function trackSnapshotTest(snap, videoTrack, audioTrack) {
  if (snap.videoCodec) {
    const fistVideoSample = videoTrack.samples[0]
    const lastVideoSample = videoTrack.samples[videoTrack.samples.length - 1]
    expect(videoTrack.codec).toBe(snap.videoCodec)
    expect(videoTrack.fpsNum).toBe(snap.fpsNum)
    expect(videoTrack.fpsDen).toBe(snap.fpsDen)
    expect(videoTrack.width).toBe(snap.width)
    expect(videoTrack.height).toBe(snap.height)
    expect(videoTrack.sarRatio).toEqual(snap.sarRatio)
    expect(videoTrack.pps).toEqual(snap.pps)
    expect(videoTrack.sps).toEqual(snap.sps)
    if (snap.vps) expect(videoTrack.vps).toEqual(snap.vps)
    expect(videoTrack.samples.length).toBe(snap.videoFrameCount)
    expect(fistVideoSample.originDts).toBe(snap.firstVideoFrameDts)
    expect(fistVideoSample.originPts).toBe(snap.firstVideoFramePts)
    expect(lastVideoSample.originDts).toBe(snap.lastVideoFrameDts)
    expect(lastVideoSample.originPts).toBe(snap.lastVideoFramePts)
  }

  if (snap.audioCodec) {
    const firstAudioSample = audioTrack.samples[0]
    const lastAudioSample = audioTrack.samples[audioTrack.samples.length - 1]
    expect(audioTrack.codec).toBe(snap.audioCodec)
    expect(audioTrack.sampleRate).toBe(snap.sampleRate)
    expect(audioTrack.channelCount).toBe(snap.channelCount)
    expect(audioTrack.config).toEqual(snap.audioConfig)
    expect(audioTrack.samples.length).toBe(snap.audioFrameCount)
    expect(firstAudioSample.originPts).toBe(snap.fistAudioFramePts)
    expect(lastAudioSample.originPts).toBe(snap.lastAudioFramePts)
    expect(firstAudioSample.data.length).toBe(snap.fistAudioFrameByteLength)
    expect(lastAudioSample.data.length).toBe(snap.lastAudioFrameByteLength)
  }
}
