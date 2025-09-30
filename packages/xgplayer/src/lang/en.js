export default {
  LANG: 'en',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'video download error'
      },
      mse: {
        code: 2,
        msg: 'stream append error'
      },
      parse: {
        code: 3,
        msg: 'parsing error'
      },
      format: {
        code: 4,
        msg: 'wrong format'
      },
      decoder: {
        code: 5,
        msg: 'decoding error'
      },
      runtime: {
        code: 6,
        msg: 'grammatical errors'
      },
      timeout: {
        code: 7,
        msg: 'play timeout'
      },
      other: {
        code: 8,
        msg: 'other errors'
      }
    },
    HAVE_NOTHING: 'There is no information on whether audio/video is ready',
    HAVE_METADATA: 'Audio/video metadata is ready ',
    HAVE_CURRENT_DATA: 'Data about the current play location is available, but there is not enough data to play the next frame/millisecond',
    HAVE_FUTURE_DATA: 'Current and at least one frame of data is available',
    HAVE_ENOUGH_DATA: 'The available data is sufficient to start playing',
    NETWORK_EMPTY: 'Audio/video has not been initialized',
    NETWORK_IDLE: 'Audio/video is active and has been selected for resources, but no network is used',
    NETWORK_LOADING: 'The browser is downloading the data',
    NETWORK_NO_SOURCE: 'No audio/video source was found',
    MEDIA_ERR_ABORTED: 'The fetch process is aborted by the user',
    MEDIA_ERR_NETWORK: 'An error occurred while downloading',
    MEDIA_ERR_DECODE: 'An error occurred while decoding',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Audio/video is not supported',
    REPLAY: 'Replay',
    ERROR: 'Network is offline',
    PLAY_TIPS: 'Play',
    PAUSE_TIPS: 'Pause',
    PLAYNEXT_TIPS: 'Play next',
    DOWNLOAD_TIPS: 'Download',
    ROTATE_TIPS: 'Rotate',
    RELOAD_TIPS: 'Reload',
    FULLSCREEN_TIPS: 'Fullscreen',
    EXITFULLSCREEN_TIPS: 'Exit fullscreen',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'Exit cssfullscreen',
    TEXTTRACK: 'Caption',
    TEXTTRACK_OFF: 'Off',
    PIP: 'PIP',
    SCREENSHOT: 'Screenshot',
    LIVE: 'LIVE',
    OFF: 'Off',
    OPEN: 'Open',
    MINI_DRAG: 'Click and hold to drag',
    MINISCREEN: 'Miniscreen',
    REFRESH_TIPS: 'Please Try',
    REFRESH: 'Refresh',
    FORWARD: 'forward',
    LIVE_TIP: 'Live'
  }
}
