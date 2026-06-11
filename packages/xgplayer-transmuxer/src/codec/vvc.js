
// import { avc } from 'xgplayer-helper-codec'
import { BitReader } from '../utils/bit-reader'
import { ByteReader } from '../utils/byte-reader'
import ExpGolomb from './ExpGolomb'

// aligned(8) class VvcPTLRecord(num_sublayers) {
//   bit(2) reserved = 0;
//   unsigned int(6) num_bytes_constraint_info;
//   unsigned int(7) general_profile_idc;
//   unsigned int(1) general_tier_flag;
//   unsigned int(8) general_level_idc;
//   unsigned int(1) ptl_frame_only_constraint_flag;
//   unsigned int(1) ptl_multilayer_enabled_flag;
//   unsigned int(8*num_bytes_constraint_info - 2) general_constraint_info;
//   for (i=num_sublayers - 2; i >= 0; i--)
//     unsigned int(1) ptl_sublayer_level_present_flag[i];
//   for (j=num_sublayers; j<=8 && num_sublayers > 1; j++)
//     bit(1) ptl_reserved_zero_bit = 0;
//   for (i=num_sublayers-2; i >= 0; i--)
//     if (ptl_sublayer_level_present[i])
//       unsigned int(8) sublayer_level_idc[i];
//   unsigned int(8) num_sub_profiles;
//   for (j=0; j < num_sub_profiles; j++)
//     unsigned int(32) general_sub_profile_idc[j];
// }


function readUint8Array (reader, len) {
  if (!len) return new Uint8Array()
  return reader.readToUint8(len).slice()
}

const VVC_NAL_TYPE_RASL = 3
const VVC_NAL_TYPE_IDR_W_RADL = 7
const VVC_NAL_TYPE_IDR_N_LP = 8
const VVC_NAL_TYPE_CRA = 9

// biome-ignore lint/complexity/noStaticOnlyClass: Allow static-only class for codec utilities
export class VVC {
  static getNalType (unit) {
    if (!unit || unit.byteLength <= 1) {
      return
    }
    return (unit[1] & 0xf8) >> 3
  }

  static getNalTypes (units) {
    if (!units?.length) {
      return []
    }

    return units
      .map(unit => VVC.getNalType(unit))
      .filter(type => typeof type === 'number')
  }

  static getNalInfo (units) {
    const nalTypes = VVC.getNalTypes(units)
    if (!nalTypes.length) {
      return
    }

    let randomAccessType = ''
    if (nalTypes.includes(VVC_NAL_TYPE_IDR_W_RADL) || nalTypes.includes(VVC_NAL_TYPE_IDR_N_LP)) {
      randomAccessType = 'idr'
    } else if (nalTypes.includes(VVC_NAL_TYPE_CRA)) {
      randomAccessType = 'cra'
    }

    return {
      nalTypes,
      randomAccessType,
      rasl: nalTypes.includes(VVC_NAL_TYPE_RASL)
    }
  }

  /**
   * Per RFC 9328 the VVC codec string is:
   *   <SampleEntry4CC>.<general_profile_idc>.<L|H><general_level_idc>[.C<constraints>][.O<sub_profiles>]
   * where:
   *   - SampleEntry4CC: 'vvc1' or 'vvi1'
   *   - tier code 'L' for Main tier (general_tier_flag = 0), 'H' for High tier
   * We only emit the 4CC + profile + tier/level part here; constraint/sub-profile
   * info is optional and not required by MSE for isTypeSupported checks.
   */
  static buildCodecString (sampleEntryType, ptlRecord) {
    const fourCC = sampleEntryType || 'vvc1'
    if (!ptlRecord) {
      // Fallback to something reasonable so downstream code always gets a codec string.
      return `${fourCC}.1.L93`
    }
    // Per ISO/IEC 23090-3 valid profile_idc/level_idc are never 0, so a falsy
    // value here means the field is missing (ptlPresentFlag = 0) or came from
    // a malformed bitstream. Treat both as "use defaults" so the emitted codec
    // string is always something MSE can understand.
    const profile = ptlRecord.generalProfileIdc || 1
    const tier = ptlRecord.generalTierFlag ? 'H' : 'L'
    const level = ptlRecord.generalLevelIdc || 93
    return `${fourCC}.${profile}.${tier}${level}`
  }

  /**
   * Parse a standard VVC decoder configuration record carried inside `vvcC`
   * next to `vvc1` / `vvi1` sample entries.
   */
  static parseVVCDecoderConfigurationRecord (data, sampleEntryType) {
    return VVC._parseStandardVvcConfigurationRecord(data, sampleEntryType || 'vvc1')
  }

  /**
   * Standard VvcDecoderConfigurationRecord per ISO/IEC 14496-15:2022 / Amd.2.
   */
  static _parseStandardVvcConfigurationRecord (data, sampleEntryType) {
    let payload = data
    // Auto-detect a 4-byte FullBox version+flags preamble. Any valid
    // VvcDecoderConfigurationRecord starts with reserved = '11111'b, so its
    // first byte is always >= 0xF8; a leading 0x00 cannot be legal and is a
    // reliable signal that the enclosing box was written as a FullBox.
    if (payload.length >= 5 && payload[0] < 0xF8) {
      payload = payload.subarray(4)
    }

    const reader = ByteReader.fromUint8(payload)
    const headerBits = BitReader.fromByte(reader, 1)
    headerBits.read(5) // reserved = '11111'b
    const lengthSizeMinusOne = headerBits.read(2)
    const ptlPresentFlag = headerBits.read(1)

    let olsIdx
    let numSublayers = 1
    let constantFrameRate
    let chromaFormatIdc
    let bitDepthLumaMinus8
    let ptlRecord = {}
    let maxPictureWidth
    let maxPictureHeight
    let avgFrameRate

    if (ptlPresentFlag) {
      const olsBits = BitReader.fromByte(reader, 2)
      olsIdx = olsBits.read(9)
      numSublayers = olsBits.read(3)
      constantFrameRate = olsBits.read(2)
      chromaFormatIdc = olsBits.read(2)

      const depthBits = BitReader.fromByte(reader, 1)
      bitDepthLumaMinus8 = depthBits.read(3)
      depthBits.read(5) // reserved = '11111'b

      ptlRecord = VVC.parseVVCPTLRecord(reader, numSublayers)

      maxPictureWidth = reader.read(2)
      maxPictureHeight = reader.read(2)
      avgFrameRate = reader.read(2)
    }

    const nalArrays = VVC._parseVVCNalArrays(reader)

    return {
      data,
      codec: VVC.buildCodecString(sampleEntryType, ptlRecord),
      sampleEntryType: sampleEntryType || 'vvc1',
      nalUnitSize: lengthSizeMinusOne + 1,
      ptlPresentFlag,
      olsIdx,
      numSublayers,
      constantFrameRate,
      chromaFormatIdc,
      bitDepthLumaMinus8,
      ptlRecord,
      width: maxPictureWidth,
      height: maxPictureHeight,
      sampleRate: avgFrameRate,
      numOfArrays: nalArrays.numOfArrays,
      vps: nalArrays.vps,
      sps: nalArrays.sps,
      pps: nalArrays.pps,
      spsParsed: nalArrays.spsParsed
    }
  }

  /**
   * Shared helper that walks the `num_of_arrays` loop at the tail of a VVC
   * decoder configuration record. DCI (13) and OPI (12) NAL types carry a
   * single NAL without a num_nalus count per Amd.2.
   */
  static _parseVVCNalArrays (reader) {
    const VVC_NALU_OPI = 12
    const VVC_NALU_DEC_PARAM = 13

    const numOfArrays = reader.read(1)
    const vpsArr = []
    const spsArr = []
    const ppsArr = []
    let spsParsed = null

    for (let i = 0; i < numOfArrays; i++) {
      const arrayBits = BitReader.fromByte(reader, 1)
      arrayBits.read(1) // array_completeness
      arrayBits.read(2) // reserved
      const naluType = arrayBits.read(5)

      let numNalus = 1
      if (naluType !== VVC_NALU_DEC_PARAM && naluType !== VVC_NALU_OPI) {
        numNalus = reader.read(2)
      }

      for (let j = 0; j < numNalus; j++) {
        const len = reader.read(2)
        switch (naluType) {
          case 14:
            vpsArr.push(readUint8Array(reader, len))
            break
          case 15: {
            const sps = readUint8Array(reader, len)
            if (!spsParsed) {
              try { spsParsed = VVC.parseSPS(VVC.removeEPB(sps)) } catch (e) { /* best-effort */ }
            }
            spsArr.push(sps)
            break
          }
          case 16:
            ppsArr.push(readUint8Array(reader, len))
            break
          default:
            // Skip unknown NAL types (APS, DCI, OPI, …) – we only care about
            // SPS/PPS/VPS for downstream remuxing.
            readUint8Array(reader, len)
        }
      }
    }

    return { numOfArrays, vps: vpsArr, sps: spsArr, pps: ppsArr, spsParsed }
  }

  static parseVVCPTLRecord (reader, numSublayers) {
    const ptlBits = BitReader.fromByte(reader, 2)
    ptlBits.read(2)
    const numBytesConstraintInfo = ptlBits.read(6)
    const generalProfileIdc = ptlBits.read(7)
    const generalTierFlag = ptlBits.read(1)
    const generalLevelIdc = reader.read(1)

    let constraintBits = BitReader.fromByte(reader, 1)
    const ptlFrameOnlyConstraintFlag = constraintBits.read(1)
    const ptlMultilayerEnabledFlag = constraintBits.read(1)
    const generalConstraintInfo = new Uint8Array(numBytesConstraintInfo)
    if (numBytesConstraintInfo) {
      for (let i = 0; i < numBytesConstraintInfo - 1; i++) {
        const cnstr1 = constraintBits.read(6)
        constraintBits = BitReader.fromByte(reader, 1)
        const cnstr2 = constraintBits.read(2)
        generalConstraintInfo[i] = ((cnstr1 << 2) | cnstr2)
      }
      generalConstraintInfo[numBytesConstraintInfo - 1] = constraintBits.read(6)
    } else {
      constraintBits.read(6)
    }

    const subLayerLevelIdc = []
    if (numSublayers > 1) {
      const subLayerBits = BitReader.fromByte(reader, 1)
      let ptlSublayerPresentMask = 0

      for (let j = numSublayers - 2; j >= 0; --j) {
        const val = subLayerBits.read(1)
        ptlSublayerPresentMask |= val << j
      }

      for (let j = numSublayers; j <= 8 && numSublayers > 1; ++j) {
        subLayerBits.read(1)
      }

      for (let j = numSublayers - 2; j >= 0; --j) {
        if (ptlSublayerPresentMask & (1 << j)) {
          subLayerLevelIdc[j] = reader.read(1)
        }
      }
    }

    const ptlNumSubProfiles = reader.read(1)
    const generalSubProfileIdc = []
    if (ptlNumSubProfiles) {
      for (let i = 0; i < ptlNumSubProfiles; i++) {
        generalSubProfileIdc.push(reader.readInt(4))
      }
    }

    return {
      generalProfileIdc,
      generalTierFlag,
      generalLevelIdc,
      ptlFrameOnlyConstraintFlag,
      ptlMultilayerEnabledFlag,
      generalConstraintInfo,
      subLayerLevelIdc,
      generalSubProfileIdc,
      ptlNumSubProfiles,
      numBytesConstraintInfo
    }

  }

  static getAvccNals (buffer) {
    const nals = []
    while (buffer.position < buffer.length - 4) {
      const length = buffer.dataview.getInt32(buffer.dataview.position)
      if (buffer.length - buffer.position >= length) {
        const header = buffer.buffer.slice(buffer.position, buffer.position + 4)
        buffer.skip(4)
        const body = new Uint8Array(buffer.buffer.slice(buffer.position, buffer.position + length))
        buffer.skip(length)
        nals.push({header, body})
        continue
      }
      break
    }
    return nals
  }

  static analyseNal (unit) {
    const type = (unit.body[1] & 0xf8) >> 3
    unit.type = type
    switch (type) {
      case 23:
      case 24:
        // try {
        //     unit.sei = SEIParser.parse(unit.body.slice(1))
        //   } catch (e) {}
        break
      case 7:
      case 8:
        unit.key = true
        break
      case 14:
        unit.vps = true
        break
      case 15:
        unit.sps = true
        // todo: parse sps
        break
      case 16:
        unit.pps = true
        break
      case 17:
        unit.aps = true
        break
      default:
    }
  }

  static removeEPB (uint) {
    const length = uint.byteLength
    const emulationPreventionBytesPositions = []
    let i = 1

    while (i < length - 2) {
      if (uint[i] === 0 && uint[i + 1] === 0 && uint[i + 2] === 0x03) {
        emulationPreventionBytesPositions.push(i + 2)
        i += 2
      } else {
        i++
      }
    }

    if (!emulationPreventionBytesPositions.length) return uint

    const newLength = length - emulationPreventionBytesPositions.length
    const newData = new Uint8Array(newLength)

    let sourceIndex = 0
    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === emulationPreventionBytesPositions[0]) {
        sourceIndex++
        emulationPreventionBytesPositions.shift()
      }
      newData[i] = uint[sourceIndex]
    }

    return newData
  }

  static parseVps () {

  }

  static parseSPS (sps) {
    // console.log(sps)
    const eg = new ExpGolomb(sps)

    eg.readUByte()
    eg.readUByte()

    eg.skipBits(4)

    const spsVideoParameterSetId = eg.readBits(4)
    const spsMaxSubLayerMinus1 = eg.readBits(3)
    const chromaFormatIdc = eg.readBits(2)
    let chromaFormat = 420
    if (chromaFormatIdc <= 3) chromaFormat = [0, 420, 422, 444][chromaFormatIdc]

    eg.readBits(2)
    eg.readBits(1)


    const ptlInfo = VVC._parseProfileTierLevel(eg, 1, spsMaxSubLayerMinus1)

    eg.readBits(1)
    if (eg.readBits(1)) {
      eg.readBits(1)
    }

    const width = eg.readUEG()
    const height = eg.readUEG()

    return {
      width,
      height,
      spsMaxSubLayerMinus1,
      spsVideoParameterSetId,
      chromaFormatIdc,
      chromaFormat,
      ptlInfo
    }
  }

  static _parseProfileTierLevel (eg, ptPresentFlag, spsMaxSubLayerMinus1) {
    const generalProfileIdc = eg.readBits(7)
    const generalTierFlag = eg.readBits(1)
    const generalLevelIdc = eg.readBits(8)
    const ptlFrameOnlyConstraintFlag = eg.readBits(1)
    const ptlMultilayerEnabledFlag = eg.readBits(1)
    let gciInfo
    if (ptPresentFlag) {
      gciInfo = VVC._parseGeneralConstraintsInfo(eg)
    }

    const loop = spsMaxSubLayerMinus1 - 1
    const ptlSublayerLevelPresentFlags = []
    const ptlSublayerLevelIdcs = []
    const ptlSubProfileIdcs = []

    for (let i = loop; i >= 0; --i) {
      ptlSublayerLevelPresentFlags[i] = eg.readBits(1)
    }

    while (!eg.byteAligned()) {
      eg.readBits(1)
    }

    for (let i = loop; i >= 0; --i) {
      if (ptlSublayerLevelPresentFlags[i]) {
        ptlSublayerLevelIdcs[i] = eg.readUByte()
      }
    }

    if (ptPresentFlag) {
      const ptlNumSubProfiles = eg.readUByte()
      for (let i = 0; i < ptlNumSubProfiles; i++) {
        ptlSubProfileIdcs[i] = eg.readBits(32)
      }
    }

    return {
      generalProfileIdc,
      generalTierFlag,
      generalLevelIdc,
      ptlFrameOnlyConstraintFlag,
      ptlMultilayerEnabledFlag,
      ptlSublayerLevelPresentFlags,
      ptlSublayerLevelIdcs,
      ptlSubProfileIdcs,
      gciInfo
    }

  }

  static _parseGeneralConstraintsInfo (eg) {
    const gciPresentFlag = eg.readBits(1)

    if (gciPresentFlag) {
      eg.skipBits(71)
      const gciNumReservedBits = eg.readBits(8)
      if (gciNumReservedBits) {
        eg.skipBits(gciNumReservedBits)
      }
    }

    const zeroBits = 8 - eg.bitsPos() % 8
    eg.skipBits(zeroBits)

    return {
      gciPresentFlag
    }
  }
}
