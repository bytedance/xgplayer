export const getDefaultAudioTrackMeta = () => (
  {
    audioSampleRate: 48000,
    channelCount: 2,
    codec: 'mp4a.40.2',
    config: [41, 401, 136, 0],
    duration: 0,
    id: 2,
    refSampleDuration: 21,
    sampleRateIndex: 3,
    timescale: 1000,
    type: 'audio'
  }
)

export const getDefaultVideoTrackMeta = () => (
  {
    avcc: null,
    chromaFormat: 420,
    codec: 'avc1.640020',
    codecHeight: 720,
    codecWidth: 1280,
    duration: 0,
    frameRate: {
      fixed: true,
      fps: 25,
      fps_num: 25000,
      fps_den: 1000
    },
    id: 1,
    level: '3.2',
    presentHeight: 720,
    presentWidth: 1280,
    profile: 'High',
    refSampleDuration: 40,
    sarRatio: {
      height: 1,
      width: 1
    },
    timescale: 1000,
    type: 'video'
  }
)
