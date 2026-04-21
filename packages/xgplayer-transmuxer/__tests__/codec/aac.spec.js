import { AAC } from '../../src/codec'

describe('AAC', () => {

  test('invalid aac data', () => {
    const result = AAC.parseADTS(new Uint8Array([
      11, 2, 3, 421, 125, 1, 5, 2, 5
    ]))

    expect(result.skip).toBe(7)
    expect(result.remaining).toEqual(new Uint8Array([2, 5]))
    expect(result.frames.length).toBe(0)

    expect(AAC.parseAudioSpecificConfig(new Uint8Array([999]))).toBe(undefined)

    expect(AAC.parseADTS(new Uint8Array())).toBe(undefined)
    expect(AAC.parseAudioSpecificConfig(new Uint8Array())).toBe(undefined)
  })

  test('parseADTS', () => {
    const frame1 = [222, 4, 0, 0, 108, 105, 98, 102, 97, 97, 99, 32, 49, 46, 50, 56, 0, 0, 66, 0, 147, 32, 4, 50, 0, 71]
    const frame2 = [33, 32, 73, 144, 2, 25, 0, 35, 128]

    const data = new Uint8Array([
      255, 241, 80, 128, 4, 63, 252, // header 1
      ...frame1,
      255, 241, 80, 128, 2, 31, 252, // header 2
      ...frame2
    ])

    const result = AAC.parseADTS(data, 900909)

    expect(result.skip).toBe(0)
    expect(result.remaining).toBe(undefined)
    expect(result.frames.length).toBe(2)
    expect(result.frames[0].pts).toBe(900909)
    expect(result.frames[1].pts).toBe(902998.7959183673)
    expect(result.frames[0].data).toEqual(new Uint8Array(frame1))
    expect(result.frames[1].data).toEqual(new Uint8Array(frame2))
    expect(result.config).toEqual([18, 16])
    expect(result.codec).toBe('mp4a.40.2')
    expect(result.originCodec).toBe('mp4a.40.2')
    expect(result.channelCount).toBe(2)
    expect(result.objectType).toBe(2)
    expect(result.sampleRate).toBe(44100)
  })

  test('parseADTS drops frames whose declared length <= ADTS header', () => {
    // 与 hls.js src/demux/audio/adts.ts 的 aac_frame_length 校验对齐：
    // 当一个 ADTS 帧声明的 frame_length 小于/等于 header 长度（即 raw_data_block 为空）时，
    // 这种帧在 iOS WKWebView 的 decodeAudioData / MSE 上会直接触发解码失败，
    // demux 层应主动丢弃，继续扫描后续健康帧。
    const frame2 = [33, 32, 73, 144, 2, 25, 0, 35, 128]
    const data = new Uint8Array([
      // 第一个 header 声明 frameLength = 7（仅 header 无 payload），应当被丢弃
      0xff, 0xf1, 0x50, 0x80, 0x00, 0xe0, 0xfc,
      // 第二个是合法帧：header + 9 字节 payload，frameLength = 16
      0xff, 0xf1, 0x50, 0x80, 0x02, 0x1f, 0xfc,
      ...frame2
    ])

    const result = AAC.parseADTS(data, 1000)

    expect(result.droppedFrames).toBe(1)
    expect(result.frames.length).toBe(1)
    expect(result.frames[0].data).toEqual(new Uint8Array(frame2))
    expect(result.frames[0].pts).toBe(1000)
  })

  test('parseAudioSpecificConfig', () => {
    const data = new Uint8Array([18, 16])

    const result = AAC.parseAudioSpecificConfig(data)

    expect(result.channelCount).toBe(2)
    expect(result.objectType).toBe(2)
    expect(result.codec).toBe('mp4a.40.2')
    expect(result.originCodec).toBe('mp4a.40.2')
    expect(result.sampleRate).toBe(44100)
    expect(result.config).toEqual([18, 16])
  })

  test('getFrameDuration', () => {
    expect(AAC.getFrameDuration(44100)).toBe(1024 * 90000 / 44100)
    expect(AAC.getFrameDuration(22050, 1000)).toBe(1024 * 1000 / 22050)
  })

  test('getSilentFrame', () => {
    expect(AAC.getSilentFrame('mp4a.40.2', 1)).toEqual(new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]))
    expect(AAC.getSilentFrame()).toBe(undefined)
  })

})
