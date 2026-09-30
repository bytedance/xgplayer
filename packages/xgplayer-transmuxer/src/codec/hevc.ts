import { ExpGolomb } from '../utils'
import { NALu } from './nalu'

export interface HEVCDecoderConfiguration {
  numTemporalLayers?: number
  temporalIdNested?: number
  spsSeqParameterSetId?: number
  chromaFormatIdc?: number
  separateColourPlaneFlag?: number
  bitDepthLumaMinus8?: number
  bitDepthChromaMinus8?: number
  log2MaxPicOrderCntLsb?: number
  ppsPicParameterSetId?: number
  ppsSeqParameterSetId?: number
  dependentSliceSegmentsEnabledFlag?: number
  outputFlagPresentFlag?: number
  numExtraSliceHeaderBits?: number
  generalProfileSpace?: number
  generalTierFlag?: number
  generalProfileIdc?: number
  generalProfileCompatibilityFlags?: number
  generalConstraintIndicatorFlags?: number[]
  generalLevelIdc?: number
}

export class HEVC {
  static parseHEVCDecoderConfigurationRecord(
    data: Uint8Array,
    hvcC: HEVCDecoderConfiguration | null = {}
  ) {
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
          case 32:
            {
              const vps = data.subarray(offset, offset + nalSize)
              if (!vpsParsed) vpsParsed = HEVC.parseVPS(NALu.removeEPB(vps), hvcC)
              vpsArr.push(vps)
            }
            break
          case 33:
            {
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

  static parseVPS(unit: Uint8Array, hvcC: HEVCDecoderConfiguration | null = {}) {
    hvcC = hvcC || {}
    const eg = new ExpGolomb(unit)
    eg.readUByte()
    eg.readUByte()

    eg.readBits(12)
    const vpsMaxSubLayersMinus1 = eg.readBits(3)
    hvcC.numTemporalLayers = Math.max(
      hvcC.numTemporalLayers || 0,
      vpsMaxSubLayersMinus1 + 1
    )
    eg.readBits(17)
    HEVC._parseProfileTierLevel(eg, vpsMaxSubLayersMinus1, hvcC)

    return hvcC
  }

  static parseSPS(unit: Uint8Array, hvcC: HEVCDecoderConfiguration | null = {}) {
    hvcC = hvcC || {}
    const eg = new ExpGolomb(unit)
    eg.readUByte()
    eg.readUByte()

    eg.readBits(4)
    const spsMaxSubLayersMinus1 = eg.readBits(3)
    hvcC.numTemporalLayers = Math.max(
      spsMaxSubLayersMinus1 + 1,
      hvcC.numTemporalLayers || 0
    )
    hvcC.temporalIdNested = eg.readBits(1)
    HEVC._parseProfileTierLevel(eg, spsMaxSubLayersMinus1, hvcC)

    hvcC.spsSeqParameterSetId = eg.readUEG()

    const chromaFormatIdc = (hvcC.chromaFormatIdc = eg.readUEG())
    let chromaFormat = 420
    if (chromaFormatIdc <= 3) chromaFormat = [0, 420, 422, 444][chromaFormatIdc]

    let separateColourPlaneFlag = 0
    if (chromaFormatIdc === 3) {
      separateColourPlaneFlag = eg.readBits(1)
    }
    hvcC.separateColourPlaneFlag = separateColourPlaneFlag

    let width = eg.readUEG() // pic_width_in_luma_samples
    let height = eg.readUEG() // pic_height_in_luma_samples

    const conformanceWindowFlag = eg.readBits(1)

    let confWinLeftOffset = 0
    let confWinRightOffset = 0
    let confWinTopOffset = 0
    let confWinBottomOffset = 0
    if (conformanceWindowFlag === 1) {
      confWinLeftOffset = eg.readUEG() // conf_win_left_offset
      confWinRightOffset = eg.readUEG() // conf_win_right_offset
      confWinTopOffset = eg.readUEG() // conf_win_top_offset
      confWinBottomOffset = eg.readUEG() // conf_win_bottom_offset
    }

    hvcC.bitDepthLumaMinus8 = eg.readUEG() // bit_depth_luma_minus8
    hvcC.bitDepthChromaMinus8 = eg.readUEG() // bit_depth_chroma_minus8
    // Optional slice metadata must not make an otherwise usable SPS fail parsing.
    delete hvcC.log2MaxPicOrderCntLsb
    try {
      const log2MaxPicOrderCntLsb = eg.readUEG() + 4
      if (log2MaxPicOrderCntLsb <= 16) hvcC.log2MaxPicOrderCntLsb = log2MaxPicOrderCntLsb
    } catch {}

    if (conformanceWindowFlag === 1) {
      const subWidthC =
        (chromaFormatIdc === 1 || chromaFormatIdc === 2) && separateColourPlaneFlag === 0
          ? 2
          : 1
      const subHeightC = chromaFormatIdc === 1 && separateColourPlaneFlag === 0 ? 2 : 1
      width -= subWidthC * (confWinRightOffset + confWinLeftOffset)
      height -= subHeightC * (confWinBottomOffset + confWinTopOffset)
    }

    return {
      codec: 'hev1.1.6.L93.B0',
      width,
      height,
      chromaFormat,
      hvcC
    }
  }

  // Like parseSPS, unit is a NAL unit with emulation prevention bytes already removed.
  static parsePPS(unit?: Uint8Array | null, hvcC: HEVCDecoderConfiguration | null = {}) {
    if (!unit || unit.length < 3 || unit[0] !== 68 || unit[1] !== 1) return
    hvcC = hvcC || {}
    const eg = new ExpGolomb(unit)
    eg.readUByte()
    eg.readUByte()

    try {
      const ppsPicParameterSetId = eg.readUEG()
      const ppsSeqParameterSetId = eg.readUEG()
      if (ppsPicParameterSetId > 63 || ppsSeqParameterSetId > 15 || eg.bitsLeft() < 5)
        return
      return Object.assign(hvcC, {
        ppsPicParameterSetId,
        ppsSeqParameterSetId,
        dependentSliceSegmentsEnabledFlag: eg.readBits(1),
        outputFlagPresentFlag: eg.readBits(1),
        numExtraSliceHeaderBits: eg.readBits(3)
      })
    } catch {
      return
    }
  }

  static parseSliceHeader(
    unit?: Uint8Array | null,
    hvcC?: HEVCDecoderConfiguration | null
  ) {
    // Boundary recovery only needs first-slice metadata from single-layer VCL NAL units.
    // Reject other headers before bit parsing so malformed input cannot mutate parser state.
    if (
      !unit ||
      unit.length < 3 ||
      unit[0] & 0x81 ||
      unit[1] >>> 3 ||
      !(unit[1] & 7) ||
      !hvcC
    ) {
      return
    }

    const log2MaxPicOrderCntLsb = hvcC.log2MaxPicOrderCntLsb
    const ppsPicParameterSetId = hvcC.ppsPicParameterSetId
    const spsSeqParameterSetId = hvcC.spsSeqParameterSetId
    const ppsSeqParameterSetId = hvcC.ppsSeqParameterSetId
    const numExtraSliceHeaderBits = hvcC.numExtraSliceHeaderBits
    if (
      !Number.isInteger(log2MaxPicOrderCntLsb) ||
      typeof log2MaxPicOrderCntLsb !== 'number' ||
      log2MaxPicOrderCntLsb < 4 ||
      log2MaxPicOrderCntLsb > 16 ||
      !Number.isInteger(ppsPicParameterSetId) ||
      typeof ppsPicParameterSetId !== 'number' ||
      ppsPicParameterSetId < 0 ||
      ppsPicParameterSetId > 63 ||
      !Number.isInteger(spsSeqParameterSetId) ||
      typeof spsSeqParameterSetId !== 'number' ||
      spsSeqParameterSetId < 0 ||
      spsSeqParameterSetId > 15 ||
      spsSeqParameterSetId !== ppsSeqParameterSetId ||
      !Number.isInteger(numExtraSliceHeaderBits) ||
      typeof numExtraSliceHeaderBits !== 'number' ||
      numExtraSliceHeaderBits < 0 ||
      numExtraSliceHeaderBits > 7
    ) {
      return
    }

    const nalUnitType = (unit[0] >>> 1) & 0x3f
    if (nalUnitType > 9 && (nalUnitType < 16 || nalUnitType > 21)) return
    const temporalId = (unit[1] & 0x07) - 1
    if (nalUnitType >= 16 && temporalId !== 0) return
    const eg = new ExpGolomb(NALu.removeEPB(unit))
    eg.readUByte()
    eg.readUByte()

    try {
      if (!eg.readBits(1)) return // first_slice_segment_in_pic_flag
      if (nalUnitType >= 16) eg.readBits(1) // no_output_of_prior_pics_flag

      if (eg.readUEG() !== ppsPicParameterSetId) return
      if (eg.bitsLeft() < numExtraSliceHeaderBits) return
      if (numExtraSliceHeaderBits) eg.readBits(numExtraSliceHeaderBits)
      const sliceType = eg.readUEG()
      if (sliceType > 2 || (nalUnitType >= 16 && sliceType !== 2)) return

      const pocBits = nalUnitType === 19 || nalUnitType === 20 ? 0 : log2MaxPicOrderCntLsb
      const flagBits =
        (hvcC.outputFlagPresentFlag ? 1 : 0) + (hvcC.separateColourPlaneFlag ? 2 : 0)
      if (eg.bitsLeft() < pocBits + flagBits) return
      if (hvcC.outputFlagPresentFlag) eg.readBits(1)
      if (hvcC.separateColourPlaneFlag) eg.readBits(2)

      return {
        nalUnitType,
        temporalId,
        sliceType,
        picOrderCntLsb: pocBits ? eg.readBits(pocBits) : 0
      }
    } catch {
      return
    }
  }

  private static _parseProfileTierLevel(
    eg: ExpGolomb,
    maxSubLayersMinus1: number,
    hvcC: HEVCDecoderConfiguration
  ) {
    const generalTierFlag = hvcC.generalTierFlag || 0
    hvcC.generalProfileSpace = eg.readBits(2)
    hvcC.generalTierFlag = Math.max(eg.readBits(1), generalTierFlag)
    hvcC.generalProfileIdc = Math.max(eg.readBits(5), hvcC.generalProfileIdc || 0)
    hvcC.generalProfileCompatibilityFlags = eg.readBits(32)
    hvcC.generalConstraintIndicatorFlags = [
      eg.readBits(8),
      eg.readBits(8),
      eg.readBits(8),
      eg.readBits(8),
      eg.readBits(8),
      eg.readBits(8)
    ]
    const generalLevelIdc = eg.readBits(8)
    if (generalTierFlag < hvcC.generalTierFlag) {
      hvcC.generalLevelIdc = generalLevelIdc
    } else {
      hvcC.generalLevelIdc = Math.max(generalLevelIdc, hvcC.generalLevelIdc || 0)
    }

    const subLayerProfilePresentFlag = []
    const subLayerLevelPresentFlag = []

    if (maxSubLayersMinus1 > eg.bitsAvailable) {
      throw new Error(`maxSubLayersMinus inavlid size ${maxSubLayersMinus1}`)
    }

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
