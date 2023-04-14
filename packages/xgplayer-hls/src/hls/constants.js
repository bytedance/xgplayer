import { EVENT } from 'xgplayer-streaming-shared'

export const Event = {
  ...EVENT,
  STREAM_PARSED: 'core.streamparsed',
  NO_AUDIO_TRACK: 'core.noaudiotrack',
  SUBTITLE_SEGMENTS: 'core.subtitlesegments',
  SUBTITLE_PLAYLIST: 'core.subtitleplaylist',
  SEI_PAYLOAD_TIME: 'core.seipayloadtime'
}
