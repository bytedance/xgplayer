import { AudioTrack, VideoTrack, MetadataTrack, VideoSample, AudioSample, WarningType } from '../../src'
import { FlvFixer } from '../../src/flv/fixer'

describe('FlvFixer', () => {
  const videoTrack = new VideoTrack()
  const audioTrack = new AudioTrack()
  const metadataTrack = new MetadataTrack()

  const FakeData = new Uint8Array([])

  let fixer

  beforeEach(() => {
    videoTrack.reset()
    audioTrack.reset()
    metadataTrack.reset()
    videoTrack.timescale = metadataTrack.timescale = 1000
    videoTrack.fpsNum = 2000
    videoTrack.fpsDen = 2
    audioTrack.timescale = audioTrack.sampleRate = 48000
    audioTrack.channelCount = 2
    audioTrack.codec = 'mp4a.40.2'
    fixer = new FlvFixer(videoTrack, audioTrack, metadataTrack)
  })

  test('large av delta of first frame detect', () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108050, 5108050))
    videoTrack.samples.push(new VideoSample(5108083, 5108083))
    audioTrack.samples.push(new AudioSample(5108910, FakeData))
    audioTrack.samples.push(new AudioSample(5108932, FakeData))
    audioTrack.samples.push(new AudioSample(5108953, FakeData))

    fixer.fix()

    expect(videoTrack.samples[0].dts).toBe(0)
    expect(audioTrack.samples[0].pts).toBe(910)
    expect(audioTrack.samples[0].duration).toBe(1024)
  })

  test('video sample dts gap > 1000ms', () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5109080, 5109080))
    videoTrack.samples.push(new VideoSample(5109120, 5109120))
    videoTrack.samples.push(new VideoSample(5109160, 5109160))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108032, FakeData))
    audioTrack.samples.push(new AudioSample(5108053, FakeData))
    audioTrack.samples.push(new AudioSample(5108074, FakeData))
    audioTrack.samples.push(new AudioSample(5108096, FakeData))

    fixer.fix()

    expect(videoTrack.samples[0].dts).toBe(0)
    expect(videoTrack.samples[1].dts).toBe(40)
    expect(videoTrack.samples[2].dts).toBe(1080)
    expect(videoTrack.samples[3].dts).toBe(1120)
    expect(audioTrack.samples[0].pts).toBe(10)
  })

  test("audio sample dts gap >= 1000ms", () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5108080, 5108080))
    videoTrack.samples.push(new VideoSample(5108120, 5108120))
    videoTrack.samples.push(new VideoSample(5108160, 5108160))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108031, FakeData))
    audioTrack.samples.push(new AudioSample(5109053, FakeData))
    audioTrack.samples.push(new AudioSample(5109074, FakeData))
    audioTrack.samples.push(new AudioSample(5109117, FakeData))

    fixer.fix()

    expect(audioTrack.samples[0].pts).toBe(10)
    expect(audioTrack.samples[1].pts).toBe(31.333333333333332)
    expect(audioTrack.samples[2].pts).toBe(52.666666666666664)
    expect(audioTrack.samples[3].pts).toBe(74)
  })

  test("audio fill frames for gap >= 3 * refDuration && < 1000ms ", () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5108080, 5108080))
    videoTrack.samples.push(new VideoSample(5108120, 5108120))
    videoTrack.samples.push(new VideoSample(5108160, 5108160))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108031, FakeData))
    audioTrack.samples.push(new AudioSample(5108253, FakeData))
    audioTrack.samples.push(new AudioSample(5108274, FakeData))
    audioTrack.samples.push(new AudioSample(5108395, FakeData))

    fixer.fix()

    expect(audioTrack.warnings.filter(x => x.type === WarningType.AUDIO_FILLED)[0].count).toBe(9)
  })

  test("audio drop frames for overlap <= -3 * refDuration && > -1000ms", () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5108080, 5108080))
    videoTrack.samples.push(new VideoSample(5108120, 5108120))
    videoTrack.samples.push(new VideoSample(5108160, 5108160))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108031, FakeData))
    audioTrack.samples.push(new AudioSample(5107853, FakeData))
    audioTrack.samples.push(new AudioSample(5107874, FakeData))
    audioTrack.samples.push(new AudioSample(5107995, FakeData))
    audioTrack.samples.push(new AudioSample(5108053, FakeData))

    fixer.fix()

    expect(audioTrack.samples.length).toBe(4)
  })

  test("frames with timestamp that uneven", () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108020, 5108020))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5108100, 5108100))
    videoTrack.samples.push(new VideoSample(5108130, 5108130))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108015, FakeData))
    audioTrack.samples.push(new AudioSample(5108030, FakeData))
    audioTrack.samples.push(new AudioSample(5108080, FakeData))
    audioTrack.samples.push(new AudioSample(5108100, FakeData))

    fixer.fix()

    expect(audioTrack.samples[0].pts).toBe(10)
    expect(audioTrack.samples[1].pts).toBe(31.333333333333332)
  })

  test("offset timestamp when stream broken", () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5108080, 5108080))
    videoTrack.samples.push(new VideoSample(5109100, 5109100))
    videoTrack.samples.push(new VideoSample(5109140, 5109140))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108031, FakeData))
    audioTrack.samples.push(new AudioSample(5108055, FakeData))
    audioTrack.samples.push(new AudioSample(5109100, FakeData))
    audioTrack.samples.push(new AudioSample(5109121, FakeData))

    fixer.fix()

    expect(videoTrack.samples[0].dts).toBe(0)
    expect(audioTrack.samples[0].pts).toBe(10)
  })

  test("reset baseDts for continuous playback", () => {
    videoTrack.samples.push(new VideoSample(5108000, 5108000))
    videoTrack.samples.push(new VideoSample(5108040, 5108040))
    videoTrack.samples.push(new VideoSample(5108080, 5108080))
    audioTrack.samples.push(new AudioSample(5108010, FakeData))
    audioTrack.samples.push(new AudioSample(5108031, FakeData))
    audioTrack.samples.push(new AudioSample(5108055, FakeData))

    fixer.fix()

    expect(audioTrack.samples.length).toBe(3)
    expect(videoTrack.samples.length).toBe(2)

    videoTrack.samples = []
    audioTrack.samples = []

    videoTrack.samples.push(new VideoSample(5109000, 5109000))
    videoTrack.samples.push(new VideoSample(5109040, 5109040))
    videoTrack.samples.push(new VideoSample(5109080, 5109080))
    audioTrack.samples.push(new AudioSample(5109010, FakeData))
    audioTrack.samples.push(new AudioSample(5109031, FakeData))
    audioTrack.samples.push(new AudioSample(5109055, FakeData))

    fixer.fix(0, true, true)

    expect(videoTrack.samples[0].dts).toBe(1000)
    expect(audioTrack.samples[0].pts).toBe(1010)
  })

})
