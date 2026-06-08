export const PLAYER_ID = 'video0'
export const DEFAULT_TRACK_ID = 'vtt-html'
export const XSS_TRACK_ID = 'xss-vtt'
export const DEMO_VIDEO_URL = 'https://cesium.com/public/SandcastleSampleData/big-buck-bunny_trailer.mp4'

export const SUBTITLE_TRACKS = [
  {
    id: 'vtt-html',
    label: 'VTT HTML',
    language: 'vtt-html',
    description: 'VTT parser: multiline text and safe inline subtitle markup.',
    isDefault: true,
    stringContent: `WEBVTT

00:00:00.000 --> 00:00:03.000
VTT subtitle track is loaded

00:00:03.000 --> 00:00:06.000
Line one\\nLine two, with <b>bold</b>, <i>italic</i>, <u>underline</u>, and <span class="speaker">safe span</span>

00:00:06.000 --> 00:00:08.000
Ruby text: <ruby>字幕<rt>zi mu</rt></ruby> and <v narrator>voice label</v>
`
  },
  {
    id: 'ass',
    label: 'ASS',
    language: 'ass',
    description: 'ASS parser: plain dialogue events.',
    isDefault: false,
    stringContent: `[Script Info]
Title: xgplayer subtitle ASS demo
ScriptType: v4.00+

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:03.00,Default,,0,0,0,,ASS subtitle track is loaded
Dialogue: 0,0:00:03.00,0:00:06.00,Default,,0,0,0,,This cue verifies ASS parsing
Dialogue: 0,0:00:06.00,0:00:09.00,Default,,0,0,0,,ASS dialogue can be switched from the controls
`
  },
  {
    id: 'json-raw',
    label: 'JSON raw',
    language: 'json-raw',
    description: 'JSON render: raw subtitle arrays.',
    isDefault: false,
    json: [
      {
        start: 0,
        end: 3,
        index: 0,
        text: ['JSON subtitle track is loaded']
      },
      {
        start: 3,
        end: 6,
        index: 1,
        text: ['Raw JSON text is rendered without HTML insertion']
      },
      {
        start: 6,
        end: 9,
        index: 2,
        text: ['JSON cue with plain text from an object source']
      }
    ]
  },
  {
    id: 'json-encoded',
    label: 'JSON encoded',
    language: 'json-encoded',
    description: 'Renderer: encoded text stays readable.',
    isDefault: false,
    json: [
      {
        start: 0,
        end: 3,
        index: 0,
        text: ['Encoded JSON subtitle track is loaded']
      },
      {
        start: 3,
        end: 6,
        index: 1,
        text: ['The next cue simulates encoded subtitle text']
      },
      {
        start: 6,
        end: 9,
        index: 2,
        text: ['Encoded brackets: &lt;subtitle&gt;readable text&lt;/subtitle&gt;']
      }
    ]
  },
  {
    id: 'double',
    label: '双语',
    language: 'double',
    description: 'Bilingual WebVTT track with language tags.',
    isDefault: false,
    stringContent: `WEBVTT

00:00:00.000 --> 00:00:03.000
<cmn-Hans-CN>双语字幕：中文第一行已加载</cmn-Hans-CN>
<eng-US>Bilingual subtitle: English second line is loaded</eng-US>

00:00:03.000 --> 00:00:06.000
<cmn-Hans-CN>这条用于验证多行字幕展示</cmn-Hans-CN>
<eng-US>This cue verifies multi-line subtitle rendering</eng-US>

00:00:06.000 --> 00:00:09.000
<cmn-Hans-CN>第三条双语字幕用于验证时间线切换</cmn-Hans-CN>
<eng-US>The third bilingual cue verifies timeline seeking</eng-US>
`
  },
  {
    id: 'cn',
    label: '中文',
    language: 'cn',
    description: 'Plain Chinese WebVTT switching track.',
    isDefault: false,
    stringContent: `WEBVTT

00:00:00.000 --> 00:00:03.000
中文外挂字幕已加载

00:00:03.000 --> 00:00:06.000
这是第二条中文字幕，用于验证字幕切换

00:00:06.000 --> 00:00:09.000
这是第三条中文字幕，用于验证时间线展示
`
  }
]

export const XSS_CASES = [
  {
    id: 'img-event',
    label: 'img onerror',
    start: 6,
    end: 8,
    text: 'img event payload: <img src=x onerror="window.__xgSubtitleXss=1">Tom & Jerry'
  },
  {
    id: 'script-element',
    label: 'script',
    start: 8,
    end: 10,
    text: 'script element payload: <script>window.__xgSubtitleXss=1</script>'
  },
  {
    id: 'svg-event',
    label: 'svg onload',
    start: 10,
    end: 12,
    text: 'svg event payload: <svg onload="window.__xgSubtitleXss=1"></svg>'
  },
  {
    id: 'javascript-url',
    label: 'javascript URL',
    start: 12,
    end: 14,
    text: 'javascript URL payload: <a href="javascript:window.__xgSubtitleXss=1">click</a>'
  },
  {
    id: 'math-namespace',
    label: 'math href',
    start: 14,
    end: 16,
    text: 'math namespace payload: <math href="javascript:window.__xgSubtitleXss=1">math</math>'
  },
  {
    id: 'unsafe-attrs',
    label: 'onclick/style',
    start: 16,
    end: 18,
    text: 'unsafe attribute payload: <span onclick="window.__xgSubtitleXss=1" style="color:red">unsafe attrs</span>'
  }
]

export const XSS_SUBTITLE_TRACK = {
  id: XSS_TRACK_ID,
  label: 'XSS 验证',
  language: XSS_TRACK_ID,
  description: 'XSS validation track: common payloads should stay inert text.',
  isDefault: false,
  isXss: true,
  stringContent: `WEBVTT

${XSS_CASES.map(item => `${formatVttTimestamp(item.start)} --> ${formatVttTimestamp(item.end)}\n${item.text}`).join('\n\n')}
`
}

export const DEMO_TRACKS = [...SUBTITLE_TRACKS, XSS_SUBTITLE_TRACK]

export function cloneSubtitleTracks () {
  return DEMO_TRACKS.map(track => ({ ...track }))
}

export function getTrackById (trackId) {
  return DEMO_TRACKS.find(track => track.id === trackId) || SUBTITLE_TRACKS[0]
}

export function getXssCaseByTime (time) {
  return XSS_CASES.find(item => time >= item.start && time < item.end) || null
}

function formatVttTimestamp (time) {
  const totalSeconds = Math.max(0, Number(time) || 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const milliseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000)

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    `${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
  ].join(':')
}
