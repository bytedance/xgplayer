import { NALu } from './nalu'
import { ExpGolomb, getAvcCodec } from '../utils'

export class AVC {
  static parseAVCDecoderConfigurationRecord (data) {
    if (data.length < 7) return
    const nalUnitSize = (data[4] & 3) + 1

    let spsParsed
    const spsArr = []
    const ppsArr = []

    let offset = 6
    const spsCount = data[5] & 0x1f
    let spsSize
    for (let i = 0; i < spsCount; i++) {
      spsSize = (data[offset] << 8) | data[offset + 1]
      offset += 2
      if (!spsSize) continue

      const sps = data.subarray(offset, offset + spsSize)
      offset += spsSize
      spsArr.push(sps)

      if (!spsParsed) {
        spsParsed = AVC.parseSPS(NALu.removeEPB(sps))
      }
    }

    const ppsCount = data[offset]
    offset++
    let ppsSize
    for (let i = 0; i < ppsCount; i++) {
      ppsSize = (data[offset] << 8) | data[offset + 1]
      offset += 2
      if (!ppsSize) continue
      ppsArr.push(data.subarray(offset, offset + ppsSize))
      offset += ppsSize
    }

    return {
      sps: spsParsed,
      spsArr,
      ppsArr,
      nalUnitSize
    }
  }

  static parseSPS (unit) {
    const eg = new ExpGolomb(unit)
    eg.readUByte()

    const profileIdc = eg.readUByte()
    const profileCompatibility = eg.readUByte()
    const levelIdc = eg.readUByte()
    eg.skipUEG()

    let chromaFormat = 420
    if (
      profileIdc === 100 ||
      profileIdc === 110 ||
      profileIdc === 122 ||
      profileIdc === 244 ||
      profileIdc === 44 ||
      profileIdc === 83 ||
      profileIdc === 86 ||
      profileIdc === 118 ||
      profileIdc === 128 ||
      profileIdc === 138 ||
      profileIdc === 144
    ) {
      const chromaFormatIdc = eg.readUEG()
      if (chromaFormatIdc <= 3) chromaFormat = [0, 420, 422, 444][chromaFormatIdc]
      if (chromaFormatIdc === 3) eg.skipBits(1)
      eg.skipUEG()
      eg.skipUEG()
      eg.skipBits(1)
      if (eg.readBool()) {
        const scalingListCount = chromaFormatIdc !== 3 ? 8 : 12
        for (let i = 0; i < scalingListCount; i++) {
          if (eg.readBool()) {
            if (i < 6) {
              eg.skipScalingList(16)
            } else {
              eg.skipScalingList(64)
            }
          }
        }
      }
    }

    eg.skipUEG()
    const picOrderCntType = eg.readUEG()
    if (picOrderCntType === 0) {
      eg.readUEG()
    } else if (picOrderCntType === 1) {
      eg.skipBits(1)
      eg.skipUEG()
      eg.skipUEG()
      const numRefFramesInPicOrderCntCycle = eg.readUEG()
      for (let i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        eg.skipUEG()
      }
    }

    eg.skipUEG()
    eg.skipBits(1)
    const picWidthInMbsMinus1 = eg.readUEG()
    const picHeightInMapUnitsMinus1 = eg.readUEG()
    const frameMbsOnlyFlag = eg.readBits(1)
    if (frameMbsOnlyFlag === 0) eg.skipBits(1)
    eg.skipBits(1)

    let frameCropLeftOffset = 0
    let frameCropRightOffset = 0
    let frameCropTopOffset = 0
    let frameCropBottomOffset = 0

    if (eg.readBool()) {
      frameCropLeftOffset = eg.readUEG()
      frameCropRightOffset = eg.readUEG()
      frameCropTopOffset = eg.readUEG()
      frameCropBottomOffset = eg.readUEG()
    }

    let sarRatio
    let fixedFrame
    let fpsNum
    let fpsDen
    let fps
    if (eg.readBool()) {
      if (eg.readBool()) {
        const aspectRatioIdc = eg.readUByte()
        switch (aspectRatioIdc) {
          case 1: sarRatio = [1, 1]; break
          case 2: sarRatio = [12, 11]; break
          case 3: sarRatio = [10, 11]; break
          case 4: sarRatio = [16, 11]; break
          case 5: sarRatio = [40, 33]; break
          case 6: sarRatio = [24, 11]; break
          case 7: sarRatio = [20, 11]; break
          case 8: sarRatio = [32, 11]; break
          case 9: sarRatio = [80, 33]; break
          case 10: sarRatio = [18, 11]; break
          case 11: sarRatio = [15, 11]; break
          case 12: sarRatio = [64, 33]; break
          case 13: sarRatio = [160, 99]; break
          case 14: sarRatio = [4, 3]; break
          case 15: sarRatio = [3, 2]; break
          case 16: sarRatio = [2, 1]; break
          case 255: {
            sarRatio = [
              (eg.readUByte() << 8) | eg.readUByte(),
              (eg.readUByte() << 8) | eg.readUByte()
            ]
            break
          }
          default:
        }
      }

      if (eg.readBool()) eg.readBool()

      if (eg.readBool()) {
        eg.readBits(4)
        if (eg.readBool()) eg.readBits(24)
      }

      if (eg.readBool()) {
        eg.readUEG()
        eg.readUEG()
      }

      if (eg.readBool()) {
        const numUnitsInTick = eg.readBits(32)
        const timeScale = eg.readBits(32)
        fixedFrame = eg.readBool()

        fpsNum = timeScale
        fpsDen = numUnitsInTick * 2
        fps = fpsNum / fpsDen
      }
    }

    return {
      codec: getAvcCodec(unit.subarray(1, 4)),
      profileIdc,
      profileCompatibility,
      levelIdc,
      chromaFormat,
      width: Math.ceil(
        (picWidthInMbsMinus1 + 1) * 16 -
          2 * (frameCropLeftOffset + frameCropRightOffset)
      ),
      height:
        (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 -
        (frameMbsOnlyFlag ? 2 : 4) *
          (frameCropTopOffset + frameCropBottomOffset),
      sarRatio,
      fpsNum,
      fpsDen,
      fps,
      fixedFrame
    }
  }
}
