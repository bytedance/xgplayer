import { NALu } from './nalu'
import { ExpGolomb } from '../utils'

export class HEVC {
  static parseHEVCDecoderConfigurationRecord (data, hvcC = {}) {
    if (data.length < 23) return
    hvcC = hvcC || {}
    const nalUnitSize = (data[21] & 3) + 1

    let vpsParsed
    let spsParsed
    const spsArr = []
    const ppsArr = []
    const vpsArr = []

    let offset = 23
    const numOfArrays = data[22]

    let nalUnitType
    let numNalus
    let nalSize
    for (let i = 0; i < numOfArrays; i++) {
      nalUnitType = data[offset] & 0x3f
      numNalus = (data[offset + 1] << 8) | data[offset + 2]

      offset += 3

      for (let j = 0; j < numNalus; j++) {
        nalSize = (data[offset] << 8) | data[offset + 1]
        offset += 2
        if (!nalSize) continue
        switch (nalUnitType) {
          case 32: {
            const vps = data.subarray(offset, offset + nalSize)
            if (!vpsParsed) vpsParsed = HEVC.parseVPS(NALu.removeEPB(vps), hvcC)
            vpsArr.push(vps)
          }
            break
          case 33: {
            const sps = data.subarray(offset, offset + nalSize)
            if (!spsParsed) spsParsed = HEVC.parseSPS(NALu.removeEPB(sps), hvcC)
            spsArr.push(sps)
          }
            break
          case 34:
            ppsArr.push(data.subarray(offset, offset + nalSize))
            break
          default:
        }

        offset += nalSize
      }
    }

    return {
      hvcC,
      sps: spsParsed,
      spsArr,
      ppsArr,
      vpsArr,
      nalUnitSize
    }
  }

  static parseVPS (unit, hvcC) {
    hvcC = hvcC || {}
    const eg = new ExpGolomb(unit)
    eg.readUByte()
    eg.readUByte()

    eg.readBits(12)
    const vpsMaxSubLayersMinus1 = eg.readBits(3)
    hvcC.numTemporalLayers = Math.max(hvcC.numTemporalLayers || 0, vpsMaxSubLayersMinus1 + 1)
    eg.readBits(17)
    HEVC._parseProfileTierLevel(eg, vpsMaxSubLayersMinus1, hvcC)

    return hvcC
  }

  static parseSPS (unit, hvcC = {}) {
    hvcC = hvcC || {}
    const eg = new ExpGolomb(unit)
    eg.readUByte()
    eg.readUByte()

    eg.readBits(4)
    const spsMaxSubLayersMinus1 = eg.readBits(3)
    hvcC.numTemporalLayers = Math.max(spsMaxSubLayersMinus1 + 1, hvcC.numTemporalLayers || 0)
    hvcC.temporalIdNested = eg.readBits(1)
    HEVC._parseProfileTierLevel(eg, spsMaxSubLayersMinus1, hvcC)

    eg.readUEG() // sps_seq_parameter_set_id

    const chromaFormatIdc = hvcC.chromaFormatIdc = eg.readUEG()
    let chromaFormat = 420
    if (chromaFormatIdc <= 3) chromaFormat = [0, 420, 422, 444][chromaFormatIdc]

    let separateColourPlaneFlag = 0
    if (chromaFormatIdc === 3) {
      separateColourPlaneFlag = eg.readBits(1)
    }

    let width = eg.readUEG() // pic_width_in_luma_samples
    let height = eg.readUEG() // pic_height_in_luma_samples

    const conformanceWindowFlag = eg.readBits(1)

    let confWinLeftOffset
    let confWinRightOffset
    let confWinTopOffset
    let confWinBottomOffset
    if (conformanceWindowFlag === 1) {
      confWinLeftOffset = eg.readUEG() // conf_win_left_offset
      confWinRightOffset = eg.readUEG() // conf_win_right_offset
      confWinTopOffset = eg.readUEG() // conf_win_top_offset
      confWinBottomOffset = eg.readUEG() // conf_win_bottom_offset
    }

    hvcC.bitDepthLumaMinus8 = eg.readUEG() // bit_depth_luma_minus8
    hvcC.bitDepthChromaMinus8 = eg.readUEG() // bit_depth_chroma_minus8

    if (conformanceWindowFlag === 1) {
      const subWidthC = (((chromaFormatIdc === 1) || (chromaFormatIdc === 2)) && (separateColourPlaneFlag === 0)) ? 2 : 1
      const subHeightC = ((chromaFormatIdc === 1) && (separateColourPlaneFlag === 0)) ? 2 : 1
      width -= (subWidthC * (confWinRightOffset + confWinLeftOffset))
      height -= (subHeightC * (confWinBottomOffset + confWinTopOffset))
    }

    return {
      codec: 'hev1.1.6.L93.B0',
      width,
      height,
      chromaFormat,
      hvcC
    }
  }

  static _parseProfileTierLevel (eg, maxSubLayersMinus1, hvcC) {
    const generalTierFlag = hvcC.generalTierFlag || 0
    hvcC.generalProfileSpace = eg.readBits(2)
    hvcC.generalTierFlag = Math.max(eg.readBits(1), generalTierFlag)
    hvcC.generalProfileIdc = Math.max(eg.readBits(5), hvcC.generalProfileIdc || 0)
    hvcC.generalProfileCompatibilityFlags = eg.readBits(32)
    hvcC.generalConstraintIndicatorFlags = [eg.readBits(8), eg.readBits(8), eg.readBits(8), eg.readBits(8), eg.readBits(8), eg.readBits(8)]
    const generalLevelIdc = eg.readBits(8)
    if (generalTierFlag < hvcC.generalTierFlag) {
      hvcC.generalLevelIdc = generalLevelIdc
    } else {
      hvcC.generalLevelIdc = Math.max(generalLevelIdc, hvcC.generalLevelIdc || 0)
    }

    const subLayerProfilePresentFlag = []
    const subLayerLevelPresentFlag = []
    for (let j = 0; j < maxSubLayersMinus1; j++) {
      subLayerProfilePresentFlag[j] = eg.readBits(1)
      subLayerLevelPresentFlag[j] = eg.readBits(1)
    }

    if (maxSubLayersMinus1 > 0) {
      eg.readBits((8 - maxSubLayersMinus1) * 2)
    }

    for (let i = 0; i < maxSubLayersMinus1; i++) {
      if (subLayerProfilePresentFlag[i] !== 0) {
        eg.readBits(2)
        eg.readBits(1)
        eg.readBits(5)

        eg.readBits(16)
        eg.readBits(16)

        eg.readBits(4)

        eg.readBits(16)
        eg.readBits(16)
        eg.readBits(12)
      }
      if (subLayerLevelPresentFlag[i] !== 0) {
        eg.readBits(8)
      }
    }
  }
}
