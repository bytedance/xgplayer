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
    audioSegments = getSegments(
      duration,
      timescale,
      stts,
      stsc,
      stsz,
      stco,
      null,
      null,
      segmentDurations
    )
  }

  return {
    videoSegments,
    audioSegments
  }
}

function getSegments (
  segDuration,
  timescale,
  stts,
  stsc,
  stsz,
  stco,
  stss,
  ctts,
  segmentDurations
) {
  const frames = []
  const gop = []
  const gopDuration = []
  let gopMinPtsArr = [] // 记录每个gop中最小的pts，用于计算每个gop的startTime
  let gopMaxPtsFrameIdxArr = [] // 记录每个gop中最大的pts，用于计算每个gop的endTime
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
    stssEntries.forEach(x => {
      keyframeMap[x - 1] = true
    })
  }

  let frame
  let duration
  // let startTime = 0
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
        // startTime,
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
      // 补足音频的pts
      if (frame.pts === undefined) {
        frame.pts = frame.dts
      }
      // 更新当前gop中最小的pts
      if (frame.keyframe) {
        gopMinPtsArr.push(frame.pts)
      } else {
        if (frame.pts < gopMinPtsArr[gop.length - 1]) {
          gopMinPtsArr[gop.length - 1] = frame.pts
        }
      }
      // 更新当前gop中最大的pts
      if (frame.keyframe) {
        gopMaxPtsFrameIdxArr.push(frame.index)
      } else if (gop.length > 0 && gopMaxPtsFrameIdxArr[gop.length - 1] !== undefined) {
        const curMaxPts = frames[gopMaxPtsFrameIdxArr[gop.length - 1]]?.pts
        if (curMaxPts !== undefined && frame.pts > curMaxPts) {
          gopMaxPtsFrameIdxArr[gop.length - 1] = frame.index
        }
      }
      frames.push(frame)
      // startTime = frame.pts // duration
      dts += delta
      pos++

      if (pos < lastSampleInChunk) {
        offsetInChunk += frame.size
      } else {
        chunkIndex++
        offsetInChunk = 0
        if (chunkIndex >= lastChunkInRun) {
          chunkRunIndex++
          lastChunkInRun = stscEntries[chunkRunIndex + 1]
            ? stscEntries[chunkRunIndex + 1].firstChunk - 1
            : Infinity
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
  let segMinPts = 0
  let segMaxPtsFrame = 0
  const pushSegment = (duration, startGopIdx, endGopIdx) => {
    lastFrame = segFrames[segFrames.length - 1]
    segMinPts = gopMinPtsArr[startGopIdx]
    segMaxPtsFrame = frames[gopMaxPtsFrameIdxArr[endGopIdx]]
    // 因为强制把视频第一帧的pts改为0 ，所以第一个gop的时长可能和endTime - startTime对应不上
    // 需要修正下,不然音频根据视频gop时长截取的第一个关键帧起始的误差较大
    if (segments.length === 0) {
      const diff = segMaxPtsFrame.pts + segMaxPtsFrame.duration - segMinPts
      duration = diff / timescale
    }
    segments.push({
      index: segments.length,
      startTime: segMinPts / timescale, // (segments[segments.length - 1]?.endTime || segFrames[0].startTime / timescale),
      endTime: (segMaxPtsFrame.pts + segMaxPtsFrame.duration) / timescale,
      duration: duration,
      range: [segFrames[0].offset, lastFrame.offset + lastFrame.size - 1],
      frames: segFrames
    })
    time = 0
    segFrames = []
  }

  let segGopStartIdx = 0
  if (stss) {
    const duration = segDuration * timescale
    for (let i = 0, l = gop.length; i < l; i++) {
      time += gopDuration[i]
      segFrames.push(...gop[i])
      if (i + 1 < l) {
        if (i === 0 || time > duration) {
          pushSegment(time / timescale, segGopStartIdx, i)
          segGopStartIdx = i + 1
        }
      } else {
        pushSegment(time / timescale, segGopStartIdx, i)
        segGopStartIdx = i + 1
      }
    }
  } else {
    gopMinPtsArr = []
    gopMaxPtsFrameIdxArr = []
    segmentDurations = segmentDurations || []
    let duration = segmentDurations[0] || segDuration
    for (let i = 0, nextEndTime; i < l; i++) {
      const curFrame = frames[i]
      const nextFrame = frames[i + 1]
      const isFinalFrame = i === l - 1
      segFrames.push(curFrame)
      time += curFrame.duration
      const curEndTime = nextEndTime || time / timescale
      nextEndTime = (nextFrame ? time + nextFrame.duration : 0) / timescale
      if (isFinalFrame ||
        // 这里使用下一帧的目的是将每个分组的起始音频帧应该覆盖或包含GOP的开始时间，
        // MSE在remove buffer时会将gop结束时间点的那个音频帧删掉，这个策略就是为了
        // 防止之后再添加新的Coded Frame Group时由于缺少了一帧音频容易产生Buffer gap
        nextEndTime + adjust >= duration) {
        adjust += nextEndTime - duration
        gopMinPtsArr.push(segFrames[0].pts)
        gopMaxPtsFrameIdxArr.push(segFrames[segFrames.length - 1].index)
        pushSegment(curEndTime, segments.length, segments.length)
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
