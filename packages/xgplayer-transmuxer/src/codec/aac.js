import { isFirefox, isAndroid } from '../utils'

export class AAC {
  static FREQ = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350
  ];

  // ADTS 头布局（ISO/IEC 14496-3 §1.A.2.2.1 adts_frame）：
  //   adts_fixed_header    28 bits
  //   adts_variable_header 28 bits
  //   -> 合计 56 bits = 7 bytes
  // 当 protection_absent = 0 时，再追加一个 16-bit CRC。
  // 规范还允许 number_of_raw_data_blocks_in_frame > 0 时在 block 之间插入额外 CRC，
  // 但主流编码器都按 1 block/frame 产出，这里与 hls.js/Chromium/FFmpeg 保持一致不特殊处理。
  static ADTS_HEADER_LEN_NO_CRC = 7;
  static ADTS_CRC_LEN = 2;

  static getRateIndexByRate (rate) {
    return AAC.FREQ.indexOf(rate)
  }

  static parseADTS (data, pts) {
    const len = data.length
    let i = 0

    while ((i + 2) < len) {
      if (data[i] === 0xff && (data[i + 1] & 0xf6) === 0xf0) {
        break
      }
      i++
    }

    if (i >= len) return

    const skip = i
    const frames = []
    const samplingFrequencyIndex = (data[i + 2] & 0x3c) >>> 2
    const sampleRate = AAC.FREQ[samplingFrequencyIndex]
    if (!sampleRate) throw new Error(`Invalid sampling index: ${samplingFrequencyIndex}`)
    const objectType = ((data[i + 2] & 0xc0) >>> 6) + 1
    const channelCount = ((data[i + 2] & 1) << 2) | ((data[i + 3] & 0xc0) >>> 6)
    const { config, codec } = AAC._getConfig(samplingFrequencyIndex, channelCount, objectType)

    let protectionSkipBytes
    let frameLength
    let headerLength
    let payloadLength
    let frameIndex = 0
    let droppedFrames = 0
    const duration = AAC.getFrameDuration(sampleRate)

    while ((i + 7) < len) {
      if ((data[i] !== 0xff) || (data[i + 1] & 0xF6) !== 0xf0) {
        i++
        continue
      }

      frameLength = ((data[i + 3] & 0x03) << 11) | (data[i + 4] << 3) | ((data[i + 5] & 0xe0) >> 5)
      if (!frameLength || (len - i) < frameLength) break

      // protection_absent = data[i+1] bit0；为 0 时头后紧跟 16-bit CRC（+2 bytes）。
      protectionSkipBytes = (~data[i + 1] & 0x01) * AAC.ADTS_CRC_LEN
      headerLength = AAC.ADTS_HEADER_LEN_NO_CRC + protectionSkipBytes
      payloadLength = frameLength - headerLength

      // 与 hls.js src/demux/audio/adts.ts 对齐：aac_frame_length 必须大于 ADTS 头长度，
      // 否则该帧没有有效的 raw_data_block 载荷，产出空/负长度 payload 会污染下游。
      // 策略：丢弃坏帧的 sync，继续向后扫描，尽量保留健康帧。
      // frameLength 畸形偏小时，至少跳过当前 header，避免在同一个坏 sync 上反复命中。
      if (payloadLength <= 0) {
        droppedFrames++
        i += Math.max(frameLength, headerLength)
        continue
      }

      frames.push({
        pts: pts + frameIndex * duration,
        data: data.subarray(i + headerLength, i + frameLength)
      })

      frameIndex++
      i += frameLength
    }

    return {
      skip,
      remaining: i >= len ? undefined : data.subarray(i),
      frames,
      droppedFrames,
      samplingFrequencyIndex,
      sampleRate,
      objectType,
      channelCount,
      codec,
      config,
      originCodec: `mp4a.40.${objectType}`
    }
  }

  static parseAudioSpecificConfig (data) {
    if (!data.length) return
    const objectType = data[0] >>> 3
    const samplingFrequencyIndex = ((data[0] & 0x07) << 1) | (data[1] >>> 7)
    const channelCount = (data[1] & 0x78) >>> 3
    const sampleRate = AAC.FREQ[samplingFrequencyIndex]
    // play as no audio track stream
    if (!sampleRate) return
    const { config, codec } = AAC._getConfig(samplingFrequencyIndex, channelCount, objectType)

    return {
      samplingFrequencyIndex,
      sampleRate,
      objectType,
      channelCount,
      config,
      codec,
      originCodec: `mp4a.40.${objectType}`
    }
  }

  static getFrameDuration (rate, timescale = 90000) {
    return 1024 * timescale / rate
  }

  static _getConfig (samplingIndex, channelCount, originObjectType) {
    const config = []
    let objectType
    let extensionSamplingIndex
    if (isFirefox) {
      if (samplingIndex >= 6) { // use SBR (HE-AAC)
        objectType = 5
        extensionSamplingIndex = samplingIndex - 3
      } else { // use LC-AAC
        objectType = 2
        extensionSamplingIndex = samplingIndex
      }
    } else if (isAndroid) { // use LC-AAC
      objectType = 2
      extensionSamplingIndex = samplingIndex
    } else { // use HE-AAC
      objectType = 5
      extensionSamplingIndex = samplingIndex

      if (samplingIndex >= 6) {
        extensionSamplingIndex = samplingIndex - 3
      } else if (channelCount === 1) { // Mono channel, use LC-AAC
        objectType = 2
        extensionSamplingIndex = samplingIndex
      }
    }

    config[0] = objectType << 3
    config[0] |= (samplingIndex & 0x0e) >> 1
    config[1] = (samplingIndex & 0x01) << 7
    config[1] |= channelCount << 3
    if (objectType === 5) {
      config[1] |= ((extensionSamplingIndex & 0x0e) >> 1)
      config[2] = (extensionSamplingIndex & 0x01) << 7
      config[2] |= (2 << 2)
      config[3] = 0
    }

    return {
      config,
      codec: `mp4a.40.${objectType}`
    }
  }

  /* c8 ignore next 65 */
  static getSilentFrame (codec, channelCount) {
    switch (codec) {
      case 'mp4a.40.2':
        if (channelCount === 1) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80])
        } if (channelCount === 2) {
          return new Uint8Array([
            0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80
          ])
        } if (channelCount === 3) {
          return new Uint8Array([
            0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64,
            0x00, 0x8e
          ])
        } if (channelCount === 4) {
          return new Uint8Array([
            0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64,
            0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38
          ])
        } if (channelCount === 5) {
          return new Uint8Array([
            0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64,
            0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38
          ])
        } if (channelCount === 6) {
          return new Uint8Array([
            0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64,
            0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2,
            0x00, 0x20, 0x08, 0xe0
          ])
        }
        break
      default:
        if (channelCount === 1) {
          return new Uint8Array([
            0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0,
            0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5e
          ])
        } if (channelCount === 2) {
          return new Uint8Array([
            0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0,
            0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5e
          ])
        } if (channelCount === 3) {
          return new Uint8Array([
            0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0,
            0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a,
            0x5a, 0x5e
          ])
        }
        break
    }
  }
}
