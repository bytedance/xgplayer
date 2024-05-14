
// import { avc } from 'xgplayer-helper-codec'
import ExpGolomb from './expGolomb'


// bvc2结构体定义
// aligned(8) class VvcDecoderConfigurationRecord {
//   unsigned int(8) configurationVersion = 1;
//   bit(5) reserved = '0'b;
//   unsigned int(2) lengthSizeMinusOne;
//   unsigned int(1) ptl_present_flag;
//   if (ptl_present_flag) {
//     unsigned int(2) chroma_format_idc;
//     unsigned int(3) bit_depth_minus8;
//     unsigned int(3) numTemporalLayers;
//     unsigned int(2) constantFrameRate;
//     bit(6) reserved = '0'b;
//     VvcPTLRecord(numTemporalLayers) track_ptl;
//     unsigned int(16) output_layer_set_idx;
//     unsigned_int(16) picture_width;
//     unsigned_int(16) picture_height;
//     unsigned int(16) avgFrameRate;
//   }
//   unsigned int(8) numOfArrays;
//   for (j=0; j < numOfArrays; j++) {
//     unsigned int(1) array_completeness;
//     bit(2) reserved = 0;
//     unsigned int(5) NAL_unit_type;
//     unsigned int(16) numNalus;
//     for (i=0; i< numNalus; i++) {
//       unsigned int(16) nalUnitLength;
//       bit(8*nalUnitLength) nalUnit;
//     }
//   }
// }

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


class StreamReader {

  constructor (uint8Arr) {
    this._buffer = uint8Arr
    this._offset = 0
    this._heldBits = 0
    this._numHeldBits = 0
  }

  readUint8 () {
    return this._buffer[this._offset++]
  }

  readUint16 () {
    return (this._buffer[this._offset++] << 8) | this._buffer[this._offset++]
  }

  readUint32 () {
    return (this._buffer[this._offset++] << 24) |
    (this._buffer[this._offset++] << 16) |
    (this._buffer[this._offset++] << 8) |
    (this._buffer[this._offset++])
  }

  readUint8Array (len) {
    const ret = this._buffer.slice(this._offset, this._offset + len)
    this._offset += len
    return ret
  }

  streamRead1Bytes () {
    this._heldBits = this.readUint8()
    this._numHeldBits = 1 * 8
  }

  streamRead2Bytes () {
    this._heldBits = this.readUint16()
    this._numHeldBits = 2 * 8
  }

  extractBits (numBits) {
    const ret = (this._heldBits >> (this._numHeldBits - numBits)) & ((1 << numBits) - 1)
    this._numHeldBits -= numBits
    return ret
  }

}

export class VVC {
  static parseVVCDecoderConfigurationRecord (data) {

    const reader = new StreamReader(data)
    const configurationVersion = reader.readUint8()
    // VvcDecoderConfigurationRecord
    reader.streamRead1Bytes()
    reader.extractBits(5)

    const lengthSizeMinusOne = reader.extractBits(2) + 1
    const ptlPresentFlag = reader.extractBits(1)

    let olsIdx
    let numSublayers
    let constantFrameRate
    let chromaFormatIdc
    let bitDepthLumaMinus8
    let ptlRecord = {}
    let maxPictrueWidth
    let maxPictureHeight
    let avgFrameRate


    if (ptlPresentFlag) {
      reader.streamRead2Bytes()

      chromaFormatIdc = reader.extractBits(2)
      bitDepthLumaMinus8 = reader.extractBits(3)
      numSublayers = reader.extractBits(3)
      constantFrameRate = reader.extractBits(2)
      reader.extractBits(6) // reserved

      ptlRecord = VVC.parseVVCPTLRecord(reader, numSublayers)
      olsIdx = reader.readUint16()
      maxPictrueWidth = reader.readUint16()
      maxPictureHeight = reader.readUint16()
      avgFrameRate = reader.readUint16()

    } // end if

    const VVC_NALU_OPI = 12
    const VVC_NALU_DEC_PARAM = 13

    // const naluArrays= []
    const numOfArrays = reader.readUint8()

    const vpsArr = []
    const spsArr = []
    const ppsArr = []
    let spsParsed = null

    for (let i = 0; i < numOfArrays; i++) {
      reader.streamRead1Bytes()
      reader.extractBits(1)

      reader.extractBits(2)
      const naluType = reader.extractBits(5)

      let numNalus = 1
      if (naluType !== VVC_NALU_DEC_PARAM && naluType !== VVC_NALU_OPI) {
        numNalus = reader.readUint16()
      }

      for (let j = 0; j < numNalus; j++) {
        const len = reader.readUint16()

        switch (naluType) {
          case 14: {
            vpsArr.push(reader.readUint8Array(len))
            break
          }
          case 15: {
            const sps = reader.readUint8Array(len)
            if (!spsParsed) {
              spsParsed = VVC.parseSPS(VVC.removeEPB(sps))
            }
            spsArr.push(sps)
            break
          }
          case 16: {
            ppsArr.push(reader.readUint8Array(len))
            break
          }
          default:
        }
      }
    }

    const ret = {
      data,
      configurationVersion,
      codec: 'bvc2.1.6.L93.B0',
      nalUnitSize: lengthSizeMinusOne,
      ptlPresentFlag,
      olsIdx,
      numSublayers,
      constantFrameRate,
      chromaFormatIdc,
      bitDepthLumaMinus8,
      ptlRecord,
      width:maxPictrueWidth,
      height:maxPictureHeight,
      sampleRate:avgFrameRate,
      numOfArrays,
      vps:vpsArr,
      sps:spsArr,
      pps:ppsArr,
      spsParsed
    }

    // console.log('parseVVCDecoderConfigurationRecord:', data)
    // console.log(ret)

    return ret
  }

  static parseVVCPTLRecord (reader, numSublayers) {
    reader.streamRead2Bytes()
    reader.extractBits(2)
    const numBytesConstraintInfo = reader.extractBits(6)
    const generalProfileIdc = reader.extractBits(7)
    const generalTierFlag = reader.extractBits(1)
    const generalLevelIdc = reader.readUint8()

    reader.streamRead1Bytes()
    const ptlFrameOnlyConstraintFlag = reader.extractBits(1)
    const ptlMultilayerEnabledFlag = reader.extractBits(1)
    const generalConstraintInfo = new Uint8Array(numBytesConstraintInfo)
    if (numBytesConstraintInfo) {
      for (let i = 0; i < numBytesConstraintInfo - 1; i++) {
        const cnstr1 = reader.extractBits(6)
        reader.streamRead1Bytes()
        const cnstr2 = reader.extractBits(2)
        generalConstraintInfo[i] = ((cnstr1 << 2) | cnstr2)
      }
      generalConstraintInfo[numBytesConstraintInfo - 1] = reader.extractBits(6)
    } else {
      reader.extractBits(6)
    }

    const subLayerLevelIdc = []
    if (numSublayers > 1) {
      reader.streamRead1Bytes()
      let ptlSublayerPresentMask = 0

      for (let j = numSublayers - 2; j >= 0; --j) {
        const val = reader.extractBits(1)
        ptlSublayerPresentMask |= val << j
      }

      for (let j = numSublayers; j <= 8 && numSublayers > 1; ++j) {
        reader.extractBits(1)
      }

      for (let j = numSublayers - 2; j >= 0; --j) {
        if (ptlSublayerPresentMask & (1 << j)) {
          subLayerLevelIdc[j] = reader.readUint8()
        }
      }
    }

    const ptlNumSubProfiles = reader.readUint8()
    const generalSubProfileIdc = []
    if (ptlNumSubProfiles) {
      for (let i = 0; i < ptlNumSubProfiles; i++) {
        generalSubProfileIdc.push(reader.readUint32())
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

