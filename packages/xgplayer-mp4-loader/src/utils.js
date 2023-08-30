
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
  let lastSampleInChunk = stscEntries[0].samplesPerChunk
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
  if (!l || (stss && !frames[0].keyframe)) return

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

export function moovToMeta (moov) {
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
        videoCodec = (e1.avcC || e1.hvcC || e1.vvcC)?.codec
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
      moov
    }
  }
}

export function isNumber (n) {
  return typeof n === 'number' && !Number.isNaN(n)
}
