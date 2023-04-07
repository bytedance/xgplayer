import { AudioTrack, MetadataTrack, VideoTrack, VideoSample, AudioSample, WarningType } from '../../src'
import { TsFixer } from '../../src/mpeg-ts/fixer'

describe('TsFixer', () => {
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
    fixer = new TsFixer(videoTrack, audioTrack, metadataTrack)
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

    expect(audioTrack.sampleDuration).toBe(1920)
    expect(audioTrack.samples[0].pts).toBe(10)
    expect(audioTrack.samples[1].pts).toBe(10 + audioTrack.sampleDuration)
    expect(audioTrack.samples[2].pts).toBe(10 + audioTrack.sampleDuration * 2)
    expect(audioTrack.samples[3].pts).toBe(10 + audioTrack.sampleDuration * 3)
  })

  test('drop audio frame when overlap', () => {
    videoTrack.samples.push(new VideoSample(0, 0))
    videoTrack.samples.push(new VideoSample(10, 10))
    videoTrack.samples.push(new VideoSample(20, 20))
    audioTrack.samples.push(new AudioSample(0, FakeData))
    audioTrack.samples.push(new AudioSample(10, FakeData))
    audioTrack.samples.push(new AudioSample(-2000, FakeData))

    fixer.fix()

    expect(audioTrack.samples.length).toBe(2)
  })

  test('fill audio frame when have gap', () => {
    videoTrack.samples.push(new VideoSample(0, 0))
    videoTrack.samples.push(new VideoSample(10, 10))
    videoTrack.samples.push(new VideoSample(20, 20))
    audioTrack.samples.push(new AudioSample(0, FakeData))
    audioTrack.samples.push(new AudioSample(10, FakeData))
    audioTrack.samples.push(new AudioSample(1920 * 5, FakeData))

    fixer.fix()

    expect(audioTrack.samples.length).toBe(6)
    expect(audioTrack.warnings.filter(x => x.type === WarningType.AUDIO_FILLED)[0].count).toBe(3)
  })

})
