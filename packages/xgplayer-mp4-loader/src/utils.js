const TFHDFlag = {
  BASE_DATA_OFFSET: 1,
  SAMPLE_DESC: 2,
  SAMPLE_DUR: 8,
  SAMPLE_SIZE: 16,
  SAMPLE_FLAG: 32,
  DUR_EMPTY: 65536,
  DEFAULT_BASE_IS_MOOF: 131072
}
const TRUNFlag = {
  DATA_OFFSET: 1,
  FIRST_FLAG: 4,
  DURATION: 256,
  SIZE: 512,
  FLAG: 1024,
  CTS_OFFSET: 2048
}
const SampleFlag = {
  DEGRADATION_PRIORITY_MASK: 65535,
  IS_NON_SYNC: 65536,
  PADDING_MASK: 917504,
  REDUNDANCY_MASK: 3145728,
  DEPENDED_MASK: 12582912,
  DEPENDS_MASK: 50331648,
  DEPENDS_NO: 33554432,
  DEPENDS_YES: 16777216
}

export function trafToSegments (traf, trex = {}, moofOffset, segDuration, timescale) {
  const { tfhd, trun, tfdt } = traf
  const { samples: trunSamples, flags: trunFlags } = trun
  const { flags: tfhdFlags } = tfhd

  // const defaultSampleDescriptionIndex = tfhdFlags & TFHDFlag.SAMPLE_DESC ? tfhd.sampleDescriptionIndex : (trex.defaultSampleDescriptionIndex || 1)
  const defaultSampleDuration = tfhdFlags & TFHDFlag.SAMPLE_DUR ? tfhd.defaultSampleDuration : (trex.defaultSampleDuration || 0)
  const defaultSampleSize = tfhdFlags & TFHDFlag.SAMPLE_SIZE ? tfhd.defaultSampleSize : (trex.defaultSampleSize || 0)
  const defaultSampleFlags = tfhdFlags & TFHDFlag.SAMPLE_FLAG ? tfhd.defaultSampleFlags : (trex.defaultSampleFlags || 0)
  const startOffset = tfhdFlags & TFHDFlag.BASE_DATA_OFFSET ? tfhd.baseDataOffset : (tfhdFlags & TFHDFlag.DEFAULT_BASE_IS_MOOF ? moofOffset : 0)

  const frames = []
  const gops = []

  for (let lastDts = 0, startTime = 0, gopId = 0, totalOffset = startOffset, i = 0; i < trunSamples.length; i++) {
    const frame = {}
    frame.index = i
    frame.size = trunFlags & TRUNFlag.SIZE ? trunSamples[i].size : defaultSampleSize
    frame.duration = trunFlags & TRUNFlag.DURATION ? trunSamples[i].duration : defaultSampleDuration
    frame.dts = lastDts > 0 ? lastDts : (tfdt ? tfdt.baseMediaDecodeTime : 0)
    frame.startTime = startTime
    if (trunFlags & TRUNFlag.CTS_OFFSET) {
      frame.pts = frame.dts + trunSamples[i].cts
    } else {
      frame.pts = frame.dts
    }
    lastDts = frame.dts + frame.duration
    startTime += frame.duration

    let sampleFlags = defaultSampleFlags
    if (trunFlags & TRUNFlag.FLAG) {
      sampleFlags = trunSamples[i].flags
    } else if (0 === i && trunFlags & TRUNFlag.FIRST_FLAG) {
      sampleFlags = trun.firstSampleFlag
    }
    frame.offset = totalOffset
    frame.keyframe = !(sampleFlags & (SampleFlag.IS_NON_SYNC | SampleFlag.DEPENDS_YES))
    totalOffset += frame.size
    frames.push(frame)
    if (frame.keyframe) {
      gopId++
      gops.push([frame])
    } else if (gops.length) {
      gops[gops.length - 1].push(frame)
    }
    frame.gopId = gopId
  }

  const len = frames.length
  if (!len || (!frames[0].keyframe)) return []

  let time = 0
  let lastFrame
  const segments = []
  const scaledDuration = segDuration * timescale
  let segmentFrames = []

  // 合并gop至segments，以segDuration作为参考
  for (let i = 0, len = gops.length; i < len; i++) {
    time += gops[i].reduce((wret, w) => wret + w.duration, 0)
    segmentFrames = segmentFrames.concat(gops[i])

    if (time >= scaledDuration || i === gops.length - 1) {
      lastFrame = segmentFrames[segmentFrames.length - 1]
      segments.push({
        index: segments.length,
        startTime: (segments[segments.length - 1]?.endTime || segmentFrames[0].startTime / timescale),
        endTime: (lastFrame.startTime + lastFrame.duration) / timescale,
        duration: time / timescale,
        range: [segmentFrames[0].offset, lastFrame.offset + lastFrame.size],
        frames: segmentFrames
      })
      time = 0
      segmentFrames = []
    }
  }

  return segments
}

export function sidxToSegments (moov, sidx) {
  const tracks = moov.trak
  if (!tracks || !tracks.length) return
  const videoTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'vide')
  const audioTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'soun')
  if (!videoTrack && !audioTrack) return

  let audioSegments = []
  let videoSegments = []
  if (sidx) {
    const segments = []
    let prevTime = 0
    let prevOffset = sidx.start + sidx.size
    sidx.references.forEach((ref, i) => {
      segments.push({
        index: i,
        startTime: prevTime,
        endTime: prevTime + (ref.subsegment_duration / sidx.timescale),
        duration: ref.subsegment_duration / sidx.timescale,
        range: [prevOffset, prevOffset + ref.referenced_size],
        frames: []
      })
      prevTime += ref.subsegment_duration / sidx.timescale
      prevOffset += ref.referenced_size
    })
    audioSegments = segments
    videoSegments = segments
  } else {
    // 如果sidx不存在，则代表后续的segments无法通过seek读取
    // 把整段fmp4当作一个segment，使用开区间range即可
    const getTrakSegments = (box) => {
      if (!box) return []
      return [{
        index: 0,
        startTime: 0,
        endTime: box.duration / box.timescale,
        duration: box.duration / box.timescale,
        range: [moov.start + moov.size, ''],
        frames: []
      }]
    }
    videoSegments = getTrakSegments(moov.mvhd.duration ? moov.mvhd : videoTrack.mdia?.mdhd)
    audioSegments = getTrakSegments(moov.mvhd.duration ? moov.mvhd : audioTrack.mdia?.mdhd)
  }

  return {
    videoSegments,
    audioSegments
  }
}

export function moovToSegments (moov, duration) {
  const tracks = moov.trak
  if (!tracks || !tracks.length) return
  const videoTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'vide')
  const audioTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'soun')
  if (!videoTrack && !audioTrack) return

  let videoSegments = []
  let audioSegments = []

  let segmentDurations
  if (videoTrack) {
    const videoStbl = videoTrack.mdia?.minf?.stbl
    if (!videoStbl) return
    const timescale = videoTrack.mdia.mdhd?.timescale
    const { stts, stsc, stsz, stco, stss, ctts } = videoStbl
    if (!timescale || !stts || !stsc || !stsz || !stco || !stss) return
    videoSegments = getSegments(duration, timescale, stts, stsc, stsz, stco, stss, ctts)
    segmentDurations = videoSegments.map(x => x.duration)
  }
  if (audioTrack) {
    const audioStbl = audioTrack.mdia?.minf?.stbl
    if (!audioStbl) return
    const timescale = audioTrack.mdia.mdhd?.timescale
    const { stts, stsc, stsz, stco } = audioStbl
    if (!timescale || !stts || !stsc || !stsz || !stco) return
    audioSegments = getSegments(duration, timescale, stts, stsc, stsz, stco, null, null, segmentDurations)
  }

  return {
    videoSegments,
    audioSegments
  }
}

function getSegments (segDuration, timescale, stts, stsc, stsz, stco, stss, ctts, segmentDurations) {
  const frames = []
  const gop = []
  const gopDuration = []
  const stscEntries = stsc.entries
  const stcoEntries = stco.entries
  const stszEntrySizes = stsz.entrySizes
  const stssEntries = stss?.entries
  const cttsEntries = ctts?.entries
  let cttsArr
  if (cttsEntries) {
    cttsArr = []
    cttsEntries.forEach(({ count, offset }) => {
      for (let i = 0; i < count; i++) {
        cttsArr.push(offset)
      }
    })
  }
  let keyframeMap
  if (stssEntries) {
    keyframeMap = {}
    stssEntries.forEach(x => { keyframeMap[x - 1] = true })
  }

  let frame
  let duration
  let startTime = 0
  let pos = 0
  let chunkIndex = 0
  let chunkRunIndex = 0
  let offsetInChunk = 0
  let lastSampleInChunk = stscEntries[0]?.samplesPerChunk
  let lastChunkInRun = stscEntries[1] ? stscEntries[1].firstChunk - 1 : Infinity
  let dts = 0
  let gopId = -1
  stts.entries.forEach(({ count, delta }) => {
    duration = delta //   / timescale
    for (let i = 0; i < count; i++) {
      frame = {
        dts,
        startTime,
        duration,
        size: stszEntrySizes[pos] || stsz.sampleSize,
        offset: stcoEntries[chunkIndex] + offsetInChunk,
        index: pos
      }
      if (stssEntries) {
        frame.keyframe = keyframeMap[pos]
        if (frame.keyframe) {
          gopId++
          gop.push([frame])
          gopDuration.push(frame.duration)
        } else {
          gop[gop.length - 1].push(frame)
          gopDuration[gop.length - 1] += frame.duration
        }
        frame.gopId = gopId
      }
      if (cttsArr && pos < cttsArr.length) {
        frame.pts = dts + cttsArr[pos]
      }
      if (pos === 0) {
        frame.pts = 0
      }
      frames.push(frame)
      startTime += duration
      dts += delta
      pos++

      if (pos < lastSampleInChunk) {
        offsetInChunk += frame.size
      } else {
        chunkIndex++
        offsetInChunk = 0
        if (chunkIndex >= lastChunkInRun) {
          chunkRunIndex++
          lastChunkInRun = stscEntries[chunkRunIndex + 1] ? stscEntries[chunkRunIndex + 1].firstChunk - 1 : Infinity
        }
        lastSampleInChunk += stscEntries[chunkRunIndex].samplesPerChunk
      }
    }
  })

  const l = frames.length
  if (!l || (stss && !frames[0].keyframe)) return []

  const segments = []
  let segFrames = []
  let time = 0
  let lastFrame
  let adjust = 0
  const pushSegment = (duration) => {
    lastFrame = segFrames[segFrames.length - 1]
    segments.push({
      index: segments.length,
      startTime: (segments[segments.length - 1]?.endTime || segFrames[0].startTime / timescale),
      endTime: (lastFrame.startTime + lastFrame.duration) / timescale,
      duration: duration,
      range: [segFrames[0].offset, lastFrame.offset + lastFrame.size],
      frames: segFrames
    })
    time = 0
    segFrames = []
  }

  if (stss) {
    const duration = segDuration * timescale
    for (let i = 0, l = gop.length; i < l; i++) {
      time += gopDuration[i]
      segFrames.push(...gop[i])
      if (i + 1 < l) {
        if (i === 0 || time > duration) {
          pushSegment(time / timescale)
        }
      } else {
        pushSegment(time / timescale)
      }
    }
  } else {
    segmentDurations = segmentDurations || []
    let duration = segmentDurations[0] || segDuration
    for (let i = 0; i < l; i++) {
      segFrames.push(frames[i])
      time += frames[i].duration
      const curTime = time / timescale
      if (i + 1 >= l || curTime + adjust >= duration) {
        adjust += curTime - duration
        pushSegment(curTime)
        duration = segmentDurations[segments.length] || segDuration
      }
    }
  }
  return segments
}

export function moovToMeta (moov, isFragmentMP4) {
  let videoCodec = ''
  let audioCodec = ''
  let width = 0
  let height = 0
  let audioChannelCount = 0
  let audioSampleRate = 0
  let duration = 0
  let videoTimescale = 0
  let audioTimescale = 0
  if (moov.mvhd) {
    duration = moov.mvhd.duration / moov.mvhd.timescale
  }

  const tracks = moov.trak

  if (tracks) {
    const videoTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'vide')
    const audioTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'soun')
    let e1 = null
    let defaultKID
    if (videoTrack) {
      e1 = videoTrack.mdia?.minf?.stbl?.stsd.entries[0]
      if (e1) {
        width = e1.width
        height = e1.height
        videoTimescale = videoTrack.mdia?.mdhd?.timescale
        videoCodec = (e1.avcC || e1.hvcC || e1.av1C)?.codec
        if (e1.type === 'encv') {
          defaultKID = e1.sinf?.schi?.tenc.default_KID
        }
      }
    }
    if (audioTrack) {
      e1 = audioTrack.mdia?.minf?.stbl?.stsd.entries[0]
      if (e1) {
        audioChannelCount = e1.channelCount
        audioSampleRate = e1.sampleRate
        audioCodec = e1.esds?.codec
        audioTimescale = audioTrack.mdia?.mdhd?.timescale
        if (e1.type === 'enca') {
          defaultKID = defaultKID || e1.sinf?.schi?.tenc.default_KID
        }
      }
    }
    return {
      kid: defaultKID ? defaultKID.join('') : null,
      videoCodec,
      audioCodec,
      width,
      height,
      videoTimescale,
      audioChannelCount,
      audioSampleRate,
      duration,
      audioTimescale,
      moov,
      isFragmentMP4
    }
  }
}

export function isNumber (n) {
  return typeof n === 'number' && !Number.isNaN(n)
}
