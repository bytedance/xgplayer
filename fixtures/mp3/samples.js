const TOS_BASE = 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/mp3/'

function tos(file) {
  return `${TOS_BASE}${file}`
}

export const MP3_FIXTURE_SAMPLES = [
  {
    group: 'Primary',
    items: [
      {
        name: 'SoundHelix Song 1',
        url: tos('soundhelix-song-1.mp3'),
        artist: 'T. Schürger',
        attribution: 'SoundHelix Song 1 by T. Schürger, created with SoundHelix.',
        tags: ['long file', 'CBR', 'manual seek']
      }
    ]
  },
  {
    group: 'Core matrix',
    items: [
      {
        name: 'Chromium CBR / Info TOC',
        url: tos('chromium-bear-cbr-has-toc.mp3'),
        tags: ['MPEG-1', '44.1 kHz', 'stereo', 'CBR', 'Info TOC']
      },
      {
        name: 'Chromium CBR / no TOC',
        url: tos('chromium-bear-cbr-no-toc.mp3'),
        tags: ['MPEG-1', '44.1 kHz', 'stereo', 'CBR', 'Info no TOC']
      },
      {
        name: 'Chromium VBR / Xing TOC',
        url: tos('chromium-bear-vbr-has-toc.mp3'),
        tags: ['MPEG-1', '44.1 kHz', 'stereo', 'VBR', 'Xing TOC']
      },
      {
        name: 'Chromium VBR / no TOC',
        url: tos('chromium-bear-vbr-no-toc.mp3'),
        tags: ['MPEG-1', '44.1 kHz', 'stereo', 'VBR', 'Xing no TOC']
      },
      {
        name: 'WPT MPEG-2 low sample rate',
        url: tos('wpt-sound-5-mpeg2-vbr.mp3'),
        tags: ['MPEG-2', '22.05 kHz', 'mono', 'VBR', 'Xing TOC']
      },
      {
        name: 'WPT sine CBR',
        url: tos('wpt-sine440-cbr.mp3'),
        tags: ['MPEG-1', '44.1 kHz', 'mono', 'CBR']
      }
    ]
  },
  {
    group: 'Metadata and malformed streams',
    items: [
      {
        name: 'Chromium large ID3 PNG',
        url: tos('chromium-id3-png-test.mp3'),
        tags: ['ID3', 'large cover art', 'probe']
      },
      {
        name: 'Chromium midstream config change',
        url: tos('chromium-midstream-config-change.mp3'),
        tags: ['mono/stereo change', 'edge case']
      },
      {
        name: 'Chromium truncated final frame',
        url: tos('chromium-synth-bad-truncated.mp3'),
        tags: ['truncated', 'bad frame']
      },
      {
        name: 'Chromium trailing garbage',
        url: tos('chromium-trailing-garbage.mp3'),
        tags: ['trailing garbage', 'end boundary']
      }
    ]
  },
  {
    group: 'Parser-focused short files',
    items: [
      {
        name: 'TinyTag MPEG-2.5 VBR',
        url: tos('tinytag-mpeg25-11025hz-vbr.mp3'),
        tags: ['MPEG-2.5', '11.025 kHz', 'VBR', 'short']
      },
      {
        name: 'TinyTag Xing header',
        url: tos('tinytag-vbr-xing-header.mp3'),
        tags: ['Xing', 'VBR', 'short']
      },
      {
        name: 'TinyTag VBRI header',
        url: tos('tinytag-vbri.mp3'),
        tags: ['VBRI', 'metadata only', 'short']
      }
    ]
  }
]

export const DEFAULT_MP3_FIXTURE_SAMPLE = MP3_FIXTURE_SAMPLES[0].items[0]
