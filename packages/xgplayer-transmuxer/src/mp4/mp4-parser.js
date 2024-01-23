import { AudioCodecType, VideoCodecType } from '../model'
import { getAvcCodec, readBig16, readBig24, readBig32, readBig64 } from '../utils'
import { AAC, VVC } from '../codec'
export class MP4Parser {
  static findBox (data, names, start = 0) {
    const ret = []
    if (!data) return ret

    let size = 0
    let type = ''
    let headerSize = 0
    while (data.length > 7) {
      size = readBig32(data)
      type = String.fromCharCode.apply(null, data.subarray(4, 8))
      headerSize = 8
      if (size === 1) {
        size = readBig64(data, 8)
        headerSize += 8
      } else if (!size) {
        size = data.length
      }
      if (!names[0] || type === names[0]) {
        const subData = data.subarray(0, size)
        if (names.length < 2) {
          ret.push({
            start,
            size,
            headerSize,
            type,
            data: subData
          })
        } else {
          return MP4Parser.findBox(subData.subarray(headerSize), names.slice(1), start + headerSize)
        }
      }

      start += size
      data = data.subarray(size)
    }

    return ret
  }

  static tfhd (box) {
    return parseBox(box, true, (ret, data) => {
      ret.trackId = readBig32(data)
      let start = 4
      const baseDataOffsetPresent = (ret.flags & 0xff) & 0x01
      const sampleDescriptionIndexPresent = (ret.flags & 0xff) & 0x02
      const defaultSampleDurationPresent = (ret.flags & 0xff) & 0x08
      const defaultSampleSizePresent = (ret.flags & 0xff) & 0x10
      const defaultSampleFlagsPresent = (ret.flags & 0xff) & 0x20

      if (baseDataOffsetPresent) {
        start += 4 // truncate top 4 bytes
        ret.baseDataOffset = readBig32(data, start)
        start += 4
      }
      if (sampleDescriptionIndexPresent) {
        ret.sampleDescriptionIndex = readBig32(data, start)
        start += 4
      }
      if (defaultSampleDurationPresent) {
        ret.defaultSampleDuration = readBig32(data, start)
        start += 4
      }
      if (defaultSampleSizePresent) {
        ret.defaultSampleSize = readBig32(data, start)
        start += 4
      }
      if (defaultSampleFlagsPresent) {
        ret.defaultSampleFlags = readBig32(data, start)
      }
    })
  }

  static sidx (box) {
    return parseBox(box, true, (ret, data) => {
      let start = 0
      ret.reference_ID = readBig32(data, start)// stream.readUint32();
      start += 4
      ret.timescale = readBig32(data, start)
      start += 4
      if (ret.version === 0) {
        ret.earliest_presentation_time = readBig32(data, start)
        start += 4
        ret.first_offset = readBig32(data, start)
        start += 4
      } else {
        ret.earliest_presentation_time = readBig64(data, start)
        start += 8
        ret.first_offset = readBig64(data, start)
        start += 8
      }
      start += 2
      ret.references = []
      const count = readBig16(data, start)
      start += 2
      for (let i = 0; i < count; i++) {
        const ref = {}
        ret.references.push(ref)
        let tmp32 = readBig32(data, start)
        start += 4
        ref.reference_type = (tmp32 >> 31) & 0x1
        ref.referenced_size = tmp32 & 0x7FFFFFFF
        ref.subsegment_duration = readBig32(data, start)
        start += 4
        tmp32 = readBig32(data, start)
        start += 4
        ref.starts_with_SAP = (tmp32 >> 31) & 0x1
        ref.SAP_type = (tmp32 >> 28) & 0x7
        ref.SAP_delta_time = tmp32 & 0xFFFFFFF
      }
    })
  }

  static moov (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.mvhd = MP4Parser.mvhd(MP4Parser.findBox(data, ['mvhd'], start)[0])
      ret.trak = MP4Parser.findBox(data, ['trak'], start).map(trak => MP4Parser.trak(trak))
      ret.pssh = MP4Parser.pssh(MP4Parser.findBox(data, ['pssh'], start)[0])
    })
  }

  static mvhd (box) {
    return parseBox(box, true, (ret, data) => {
      let start = 0
      if (ret.version === 1) {
        ret.timescale = readBig32(data, 16)
        ret.duration = readBig64(data, 20)
        start += 28
      } else {
        ret.timescale = readBig32(data, 8)
        ret.duration = readBig32(data, 12)
        start += 16
      }
      ret.nextTrackId = readBig32(data, start + 76)
    })
  }

  static trak (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.tkhd = MP4Parser.tkhd(MP4Parser.findBox(data, ['tkhd'], start)[0])
      ret.mdia = MP4Parser.mdia(MP4Parser.findBox(data, ['mdia'], start)[0])
      ret.edts = MP4Parser.edts(MP4Parser.findBox(data, ['edts'], start)[0])
    })
  }

  static tkhd (box) {
    return parseBox(box, true, (ret, data) => {
      let start = 0
      if (ret.version === 1) {
        ret.trackId = readBig32(data, 16)
        ret.duration = readBig64(data, 24)
        start += 32
      } else {
        ret.trackId = readBig32(data, 8)
        ret.duration = readBig32(data, 16)
        start += 20
      }
      ret.width = readBig32(data, start + 52)
      ret.height = readBig32(data, start + 56)
    })
  }

  static mdia (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.mdhd = MP4Parser.mdhd(MP4Parser.findBox(data, ['mdhd'], start)[0])
      ret.hdlr = MP4Parser.hdlr(MP4Parser.findBox(data, ['hdlr'], start)[0])
      ret.minf = MP4Parser.minf(MP4Parser.findBox(data, ['minf'], start)[0])
    })
  }

  static edts (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.elst = MP4Parser.elst(MP4Parser.findBox(data, ['elst'], start)[0])
    })
  }

  static elst (box) {
    return parseBox(box, true, (ret, data, start) => {
      ret.entries = []
      ret.entriesData = data
      let offset = 0
      const entry_count = readBig32(data, offset)
      offset += 4
      for (let i = 0; i < entry_count; i++) {
        const entry = {}
        ret.entries.push(entry)
        if (ret.version === 1) {
          entry.segment_duration = readBig64(data, offset)
          offset += 8
          entry.media_time = readBig64(data, offset)
          offset += 8
        } else {
          entry.segment_duration = readBig32(data, offset)
          offset += 4
          entry.media_time = readBig32(data, offset)
          offset += 4
        }
        entry.media_rate_integer = readBig16(data, offset)
        offset += 2
        entry.media_rate_fraction = readBig16(data, start)
        offset += 2
      }
    })
  }

  static mdhd (box) {
    return parseBox(box, true, (ret, data) => {
      let start = 0
      if (ret.version === 1) {
        ret.timescale = readBig32(data, 16)
        ret.duration = readBig64(data, 20)
        start += 28
      } else {
        ret.timescale = readBig32(data, 8)
        ret.duration = readBig32(data, 12)
        start += 16
      }
      const lang = readBig16(data, start)
      ret.language = String.fromCharCode(((lang >> 10) & 0x1F) + 0x60, ((lang >> 5) & 0x1F) + 0x60, (lang & 0x1F) + 0x60)
    })
  }

  static hdlr (box) {
    return parseBox(box, true, (ret, data) => {
      if (ret.version === 0) {
        ret.handlerType = String.fromCharCode.apply(null, data.subarray(4, 8))
      }
    })
  }

  static minf (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.vmhd = MP4Parser.vmhd(MP4Parser.findBox(data, ['vmhd'], start)[0])
      ret.smhd = MP4Parser.smhd(MP4Parser.findBox(data, ['smhd'], start)[0])
      ret.stbl = MP4Parser.stbl(MP4Parser.findBox(data, ['stbl'], start)[0])
    })
  }

  static vmhd (box) {
    return parseBox(box, true, (ret, data) => {
      ret.graphicsmode = readBig16(data)
      ret.opcolor = [readBig16(data, 2), readBig16(data, 4), readBig16(data, 6)]
    })
  }

  static smhd (box) {
    return parseBox(box, true, (ret, data) => {
      ret.balance = readBig16(data)
    })
  }

  static stbl (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.stsd = MP4Parser.stsd(MP4Parser.findBox(data, ['stsd'], start)[0])
      ret.stts = MP4Parser.stts(MP4Parser.findBox(data, ['stts'], start)[0])
      ret.ctts = MP4Parser.ctts(MP4Parser.findBox(data, ['ctts'], start)[0])
      ret.stsc = MP4Parser.stsc(MP4Parser.findBox(data, ['stsc'], start)[0])
      ret.stsz = MP4Parser.stsz(MP4Parser.findBox(data, ['stsz'], start)[0])
      ret.stco = MP4Parser.stco(MP4Parser.findBox(data, ['stco'], start)[0])
      if (!ret.stco) {
        ret.co64 = MP4Parser.co64(MP4Parser.findBox(data, ['co64'], start)[0])
        ret.stco = ret.co64
      }
      const default_IV_size = ret.stsd.entries[0]?.sinf?.schi?.tenc.default_IV_size
      ret.stss = MP4Parser.stss(MP4Parser.findBox(data, ['stss'], start)[0])
      ret.senc = MP4Parser.senc(MP4Parser.findBox(data, ['senc'], start)[0], default_IV_size)
    })
  }

  static senc (box, iv = 8) {
    return parseBox(box, true, (ret, data) => {
      let start = 0
      const sampleCount = readBig32(data, start)
      start += 4
      ret.samples = []
      for (let i = 0; i < sampleCount; i++) {
        const sample = {}
        sample.InitializationVector = []
        for (let j = 0; j < iv; j++){
          sample.InitializationVector[j] = data[start + j]
        }
        start += iv
        if (ret.flags & 0x2) {
          sample.subsamples = []
          const subsampleCount = readBig16(data, start)
          start += 2
          for (let j = 0; j < subsampleCount; j++) {
            const subsample = {}
            subsample.BytesOfClearData = readBig16(data, start)
            start += 2
            subsample.BytesOfProtectedData = readBig32(data, start)
            start += 4
            sample.subsamples.push(subsample)
          }
        }
        ret.samples.push(sample)
      }
    })
  }

  static pssh (box) {
    return parseBox(box, true, (ret, data) => {
      const keyIds = []
      const systemId = []
      let start = 0
      for (let i = 0; i < 16; i++) {
        systemId.push(toHex(data[start + i]))
      }
      start += 16
      if (ret.version > 0) {
        const numKeyIds = readBig32(data, start)
        start += 4
        for (let i = 0; i < ('' + numKeyIds).length; i++) {
          for (let j = 0; j < 16; j++) {
            const keyId = data[start]
            start += 1
            keyIds.push(toHex(keyId))
          }
        }
      }
      const dataSize = readBig32(data, start)
      ret.data_size = dataSize
      start += 4
      ret.kid = keyIds
      ret.system_id = systemId
      ret.buffer = data
    })
  }


  static bvc2 (box) {
    return parseBox(box, false, (ret, data, start) => {
      const bodyStart = parseVisualSampleEntry(ret, data)
      const bodyData = data.subarray(bodyStart)
      start += bodyStart
      ret.vvcC = MP4Parser.bv2C(MP4Parser.findBox(bodyData, ['bv2C'], start)[0])
      ret.pasp = MP4Parser.pasp(MP4Parser.findBox(bodyData, ['pasp'], start)[0])
    })
  }

  static bv2C (box) {
    return parseBox(box, false, (ret, data, start) => {
      const record = VVC.parseVVCDecoderConfigurationRecord(data)
      for (const key in record) {
        if (Object.prototype.hasOwnProperty.call(record, key)) {
          ret[key] = record[key]
        }
      }
    })
  }

  static stsd (box) {
    return parseBox(box, true, (ret, data, start) => {
      ret.entryCount = readBig32(data)
      ret.entries = MP4Parser.findBox(data.subarray(4), [], start + 4).map(b => {
        switch (b.type) {
          case 'avc1':
          case 'avc2':
          case 'avc3':
          case 'avc4':
            return MP4Parser.avc1(b)
          case 'hvc1':
          case 'hev1':
            return MP4Parser.hvc1(b)
          // 266
          case 'bvc2':
            return MP4Parser.bvc2(b)
          case 'mp4a':
            return MP4Parser.mp4a(b)
          case 'alaw':
          case 'ulaw':
            return MP4Parser.alaw(b)
          case 'enca':
            // sinf->schi->tenc
            return parseBox(b, false, (ret, data, start) => {
              ret.channelCount = readBig16(data, 16)
              ret.samplesize = readBig16(data, 18)
              ret.sampleRate = (readBig32(data, 24) / (1 << 16))
              data = data.subarray(28)
              ret.sinf = MP4Parser.sinf(MP4Parser.findBox(data, ['sinf'], start)[0])
              ret.esds = MP4Parser.esds(MP4Parser.findBox(data, ['esds'], start)[0])
            })
          case 'encv':
            // sinf->schi->tenc
            return parseBox(b, false, (ret, data, start) => {
              ret.width = readBig16(data, 24)
              ret.height = readBig16(data, 26)
              ret.horizresolution = readBig32(data, 28)
              ret.vertresolution = readBig32(data, 32)
              data = data.subarray(78)
              ret.sinf = MP4Parser.sinf(MP4Parser.findBox(data, ['sinf'], start)[0])
              ret.avcC = MP4Parser.avcC(MP4Parser.findBox(data, ['avcC'], start)[0])
              ret.hvcC = MP4Parser.hvcC(MP4Parser.findBox(data, ['hvcC'], start)[0])
              ret.pasp = MP4Parser.pasp(MP4Parser.findBox(data, ['pasp'], start)[0])
            })
          default:
        }
      }).filter(Boolean)
    })
  }

  static tenc (box) {
    return parseBox(box, false, (ret, data) => {
      let start = 6
      ret.default_IsEncrypted = data[start]
      start += 1
      ret.default_IV_size = data[start]
      start += 1
      ret.default_KID = []
      for (let i = 0; i < 16; i++) {
        ret.default_KID.push(toHex(data[start]))
        start += 1
      }
    })
  }

  static schi (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.tenc = MP4Parser.tenc(MP4Parser.findBox(data, ['tenc'], start)[0])
    })
  }

  static sinf (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.schi = MP4Parser.schi(MP4Parser.findBox(data, ['schi'], start)[0])
      ret.frma = MP4Parser.frma(MP4Parser.findBox(data, ['frma'], start)[0])
    })
  }

  static frma (box) {
    return parseBox(box, false, (ret, data) => {
      ret.data_format = ''
      for (let i = 0; i < 4; i++) {
        ret.data_format += String.fromCharCode(data[i])
      }
    })
  }

  static avc1 (box) {
    return parseBox(box, false, (ret, data, start) => {
      const bodyStart = parseVisualSampleEntry(ret, data)
      const bodyData = data.subarray(bodyStart)
      start += bodyStart
      ret.avcC = MP4Parser.avcC(MP4Parser.findBox(bodyData, ['avcC'], start)[0])
      ret.pasp = MP4Parser.pasp(MP4Parser.findBox(bodyData, ['pasp'], start)[0])
    })
  }

  static avcC (box) {
    return parseBox(box, false, (ret, data) => {
      ret.data = box.data
      ret.configurationVersion = data[0]
      ret.AVCProfileIndication = data[1]
      ret.profileCompatibility = data[2]
      ret.AVCLevelIndication = data[3]
      ret.codec = getAvcCodec([data[1], data[2], data[3]])
      ret.lengthSizeMinusOne = data[4] & 0x3
      ret.spsLength = data[5] & 0x1F
      ret.sps = []
      let start = 6
      for (let i = 0; i < ret.spsLength; i++) {
        const size = readBig16(data, start)
        start += 2
        ret.sps.push(data.subarray(start, start + size))
        // ret.spsInfo = SpsParser.parseSPS(ret.sps[i])
        // ret.pixelRatio = ret.spsInfo.par_ratio
        start += size
      }
      ret.ppsLength = data[start]
      start += 1
      ret.pps = []
      for (let i = 0; i < ret.ppsLength; i++) {
        const size = readBig16(data, start)
        start += 2
        ret.pps.push(data.subarray(start, start += size))
        start += size
      }
    })
  }

  static hvc1 (box) {
    return parseBox(box, false, (ret, data, start) => {
      const bodyStart = parseVisualSampleEntry(ret, data)
      const bodyData = data.subarray(bodyStart)
      start += bodyStart
      ret.hvcC = MP4Parser.hvcC(MP4Parser.findBox(bodyData, ['hvcC'], start)[0])
      ret.pasp = MP4Parser.pasp(MP4Parser.findBox(bodyData, ['pasp'], start)[0])
    })
  }

  static hvcC (box) {
    return parseBox(box, false, (ret, data) => {
      ret.data = box.data
      ret.codec = 'hev1.1.6.L93.B0'
      ret.configurationVersion = data[0]
      const tmp = data[1]
      ret.generalProfileSpace = tmp >> 6
      ret.generalTierFlag = (tmp & 0x20) >> 5
      ret.generalProfileIdc = tmp & 0x1F
      ret.generalProfileCompatibility = readBig32(data, 2)
      ret.generalConstraintIndicatorFlags = data.subarray(6, 12)
      ret.generalLevelIdc = data[12]
      ret.avgFrameRate = readBig16(data, 19)
      ret.numOfArrays = data[22]
      ret.vps = []
      ret.sps = []
      ret.pps = []
      let start = 23
      let type = 0
      let numNalus = 0
      let size = 0
      for (let i = 0; i < ret.numOfArrays; i++) {
        type = data[start] & 0x3F
        numNalus = readBig16(data, start + 1)
        start += 3
        const nalus = []
        for (let j = 0; j < numNalus; j++) {
          size = readBig16(data, start)
          start += 2
          nalus.push(data.subarray(start, start + size))
          start += size
        }

        if (type === 32) {
          ret.vps.push(...nalus)
        } else if (type === 33) {
          ret.sps.push(...nalus)
        } else if (type === 34) {
          ret.pps.push(...nalus)
        }
      }
    })
  }

  static pasp (box) {
    return parseBox(box, false, (ret, data) => {
      ret.hSpacing = readBig32(data)
      ret.vSpacing = readBig32(data, 4)
    })
  }

  static mp4a (box) {
    return parseBox(box, false, (ret, data, start) => {
      const bodyStart = parseAudioSampleEntry(ret, data)
      ret.esds = MP4Parser.esds(MP4Parser.findBox(data.subarray(bodyStart), ['esds'], start + bodyStart)[0])
    })
  }

  static esds (box) {
    return parseBox(box, true, (ret, data) => {
      ret.codec = 'mp4a.'
      let start = 0
      let byteRead = 0
      let size = 0
      let tag = 0
      while (data.length) {
        start = 0
        tag = data[start]
        byteRead = data[start + 1]
        start += 2
        while (byteRead & 0x80) {
          size = (byteRead & 0x7F) << 7
          byteRead = data[start]
          start += 1
        }
        size += byteRead & 0x7F
        if (tag === 3) {
          data = data.subarray(start + 3)
        } else if (tag === 4) {
          ret.codec += (data[start].toString(16) + '.').padStart(3, '0')
          data = data.subarray(start + 13)
        } else if (tag === 5) {
          const config = ret.config = data.subarray(start, start + size)
          let objectType = (config[0] & 0xF8) >> 3
          if (objectType === 31 && config.length >= 2) {
            objectType = 32 + ((config[0] & 0x7) << 3) + ((config[1] & 0xE0) >> 5)
          }
          ret.objectType = objectType
          ret.codec += objectType.toString(16)
          if (ret.codec[ret.codec.length - 1] === '.') {
            ret.codec = ret.codec.substring(0, ret.codec.length - 1)
          }
          return
        } else {
          if (ret.codec[ret.codec.length - 1] === '.') {
            ret.codec = ret.codec.substring(0, ret.codec.length - 1)
          }
          return
        }
      }
    })
  }

  static alaw (box) {
    return parseBox(box, false, (ret, data) => {
      parseAudioSampleEntry(ret, data)
    })
  }

  static stts (box) {
    return parseBox(box, true, (ret, data) => {
      const entryCount = readBig32(data)
      const entries = []
      let start = 4
      for (let i = 0; i < entryCount; i++) {
        entries.push({
          count: readBig32(data, start),
          delta: readBig32(data, start + 4)
        })
        start += 8
      }
      ret.entryCount = entryCount
      ret.entries = entries
    })
  }

  static ctts (box) {
    return parseBox(box, true, (ret, data) => {
      const entryCount = readBig32(data)
      const entries = []
      let start = 4
      if (ret.version === 1) {
        for (let i = 0; i < entryCount; i++) {
          entries.push({
            count: readBig32(data, start),
            offset: readBig32(data, start + 4)
          })
          start += 8
        }
      } else {
        for (let i = 0; i < entryCount; i++) {
          entries.push({
            count: readBig32(data, start),
            offset: -(~readBig32(data, start + 4) + 1)
          })
          start += 8
        }
      }
      ret.entryCount = entryCount
      ret.entries = entries
    })
  }

  static stsc (box) {
    return parseBox(box, true, (ret, data) => {
      const entryCount = readBig32(data)
      const entries = []
      let start = 4
      for (let i = 0; i < entryCount; i++) {
        entries.push({
          firstChunk: readBig32(data, start),
          samplesPerChunk: readBig32(data, start + 4),
          sampleDescriptionIndex: readBig32(data, start + 8)
        })
        start += 12
      }
      ret.entryCount = entryCount
      ret.entries = entries
    })
  }

  static stsz (box) {
    return parseBox(box, true, (ret, data) => {
      const sampleSize = readBig32(data)
      const sampleCount = readBig32(data, 4)
      const entrySizes = []
      if (!sampleSize) {
        let start = 8
        for (let i = 0; i < sampleCount; i++) {
          entrySizes.push(readBig32(data, start))
          start += 4
        }
      }
      ret.sampleSize = sampleSize
      ret.sampleCount = sampleCount
      ret.entrySizes = entrySizes
    })
  }

  static stco (box) {
    return parseBox(box, true, (ret, data) => {
      const entryCount = readBig32(data)
      const entries = []
      let start = 4
      for (let i = 0; i < entryCount; i++) {
        entries.push(readBig32(data, start))
        start += 4
      }
      ret.entryCount = entryCount
      ret.entries = entries
    })
  }

  static co64 (box) {
    return parseBox(box, true, (ret, data) => {
      const entryCount = readBig32(data)
      const entries = []
      let start = 4
      for (let i = 0; i < entryCount; i++) {
        entries.push(readBig64(data, start))
        start += 8
      }
      ret.entryCount = entryCount
      ret.entries = entries
    })
  }

  static stss (box) {
    return parseBox(box, true, (ret, data) => {
      const entryCount = readBig32(data)
      const entries = []
      let start = 4
      for (let i = 0; i < entryCount; i++) {
        entries.push(readBig32(data, start))
        start += 4
      }
      ret.entryCount = entryCount
      ret.entries = entries
    })
  }

  static moof (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.mfhd = MP4Parser.mfhd(MP4Parser.findBox(data, ['mfhd'], start)[0])
      ret.traf = MP4Parser.findBox(data, ['traf'], start).map(t => MP4Parser.traf(t))
    })
  }

  static mfhd (box) {
    return parseBox(box, true, (ret, data) => {
      ret.sequenceNumber = readBig32(data)
    })
  }

  static traf (box) {
    return parseBox(box, false, (ret, data, start) => {
      ret.tfhd = MP4Parser.tfhd(MP4Parser.findBox(data, ['tfhd'], start)[0])
      ret.tfdt = MP4Parser.tfdt(MP4Parser.findBox(data, ['tfdt'], start)[0])
      ret.trun = MP4Parser.trun(MP4Parser.findBox(data, ['trun'], start)[0])
    })
  }

  static trun (box) {
    return parseBox(box, true, (ret, data) => {
      const { version, flags } = ret
      const dataLen = data.length
      const sampleCount = ret.sampleCount = readBig32(data)
      let offset = 4
      if (dataLen > offset && flags & 1) {
        ret.dataOffset = -(~readBig32(data, offset) + 1)
        offset += 4
      }
      if (dataLen > offset && flags & 4) {
        ret.firstSampleFlags = readBig32(data, offset)
        offset += 4
      }
      ret.samples = []
      if (dataLen > offset) {
        let sample
        for (let i = 0; i < sampleCount; i++) {
          sample = {}
          if (flags & 0x100) {
            sample.duration = readBig32(data, offset)
            offset += 4
          }
          if (flags & 0x200) {
            sample.size = readBig32(data, offset)
            offset += 4
          }
          if (flags & 0x400) {
            sample.flags = readBig32(data, offset)
            offset += 4
          }
          if (flags & 0x800) {
            if (version) {
              sample.cts = -(~readBig32(data, offset + 4) + 1)
            } else {
              sample.cts = readBig32(data, offset)
            }
            offset += 4
          }
          ret.samples.push(sample)
        }
      }
    })
  }

  static tfdt (box) {
    return parseBox(box, true, (ret, data) => {
      if (ret.version === 1) {
        ret.baseMediaDecodeTime = readBig64(data)
      } else {
        ret.baseMediaDecodeTime = readBig32(data)
      }
    })
  }

  static probe (data) {
    return !!MP4Parser.findBox(data, ['ftyp'])
  }

  static parseSampleFlags (flags) {
    return {
      isLeading: (flags[0] & 0x0c) >>> 2,
      dependsOn: flags[0] & 0x03,
      isDependedOn: (flags[1] & 0xc0) >>> 6,
      hasRedundancy: (flags[1] & 0x30) >>> 4,
      paddingValue: (flags[1] & 0x0e) >>> 1,
      isNonSyncSample: flags[1] & 0x01,
      degradationPriority: (flags[2] << 8) | flags[3]
    }
  }

  static moovToTrack (moov, videoTrack, audioTrack) {
    const tracks = moov.trak
    if (!tracks || !tracks.length) return
    const vTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'vide')
    const aTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'soun')
    if (vTrack && videoTrack) {
      const v = videoTrack
      const _vTrackId = vTrack.tkhd?.trackId
      if (_vTrackId !== null && _vTrackId !== undefined) v.id = vTrack.tkhd.trackId
      v.tkhdDuration = vTrack.tkhd.duration
      v.mvhdDurtion = moov.mvhd.duration
      v.mvhdTimecale = moov.mvhd.timescale
      v.timescale = v.formatTimescale = vTrack.mdia.mdhd.timescale
      v.duration = vTrack.mdia.mdhd.duration || (v.mvhdDurtion / v.mvhdTimecale * v.timescale)
      if (vTrack.edts?.elst) {
        v.editList = vTrack.edts.elst
        v.editListApplied = vTrack.editListApplied
      }
      const e1 = vTrack.mdia.minf.stbl.stsd.entries[0]
      v.width = e1.width
      v.height = e1.height
      if (e1.pasp) {
        v.sarRatio = [e1.pasp.hSpacing, e1.pasp.vSpacing]
      }
      if (e1.hvcC) {
        v.codecType = VideoCodecType.HEVC
        v.codec = e1.hvcC.codec
        v.vps = e1.hvcC.vps
        v.sps = e1.hvcC.sps
        v.pps = e1.hvcC.pps
        v.hvcC = e1.hvcC.data
      } else if (e1.avcC) {
        v.codec = e1.avcC.codec
        v.sps = e1.avcC.sps
        v.pps = e1.avcC.pps
      } else if (e1.vvcC) {
        v.codecType = VideoCodecType.VVCC
        v.codec = e1.vvcC.codec
        v.sps = e1.vvcC.sps
        v.pps = e1.vvcC.pps
        v.vps = e1.vvcC.vps
        v.vvcC = e1.vvcC.data
      } else {
        throw new Error('unknown video stsd entry')
      }
      v.present = true
      v.ext = {}
      v.ext.stss = vTrack.mdia?.minf?.stbl?.stss
      v.ext.ctts = vTrack.mdia?.minf?.stbl?.ctts

      if (e1 && e1.type === 'encv') {
        v.isVideoEncryption = true
        e1.default_KID = e1.sinf?.schi?.tenc.default_KID
        e1.default_IsEncrypted = e1.sinf?.schi?.tenc.default_IsEncrypted
        e1.default_IV_size = e1.sinf?.schi?.tenc.default_IV_size
        v.videoSenc = vTrack.mdia.minf.stbl.senc && vTrack.mdia.minf.stbl.senc.samples
        e1.data_format = e1.sinf?.frma?.data_format
        v.useEME = moov.useEME
        v.kidValue = moov.kidValue
        v.pssh = moov.pssh
        v.encv = e1
      }
    }

    if (aTrack && audioTrack) {
      const a = audioTrack
      const _aTrackId = aTrack.tkhd?.trackId
      if (_aTrackId !== null && _aTrackId !== undefined) a.id = aTrack.tkhd.trackId
      a.tkhdDuration = aTrack.tkhd.duration
      a.mvhdDurtion = moov.mvhd.duration
      a.mvhdTimecale = moov.mvhd.timescale
      a.timescale = a.formatTimescale = aTrack.mdia.mdhd.timescale
      a.duration = aTrack.mdia.mdhd.duration || (a.mvhdDurtion / a.mvhdTimecale * a.timescale)
      if (aTrack.edts?.elst) {
        a.editList = aTrack.edts.elst
        a.editListApplied = aTrack.editListApplied
      }
      const e1 = aTrack.mdia.minf.stbl.stsd.entries[0]
      a.sampleSize = e1.sampleSize
      a.sampleRate = e1.sampleRate
      a.channelCount = e1.channelCount
      a.present = true

      switch (e1.type) {
        case 'alaw':
          a.codecType = a.codec = AudioCodecType.G711PCMA
          a.sampleRate = 8000
          break
        case 'ulaw':
          a.codecType = a.codec = AudioCodecType.G711PCMU
          a.sampleRate = 8000
          break
        default:
          a.sampleDuration = AAC.getFrameDuration(a.sampleRate, a.timescale)
          a.sampleRateIndex = AAC.getRateIndexByRate(a.sampleRate)
          a.objectType = e1.esds?.objectType || 2
          if (e1.esds) a.config = Array.from(e1.esds.config)
          a.codec = e1.esds?.codec || 'mp4a.40.2'
          break
      }
      a.sampleDuration = AAC.getFrameDuration(a.sampleRate, a.timescale)
      a.objectType = e1.esds?.objectType || 2
      if (e1.esds) {
        if (e1.esds.config) {
          a.config = Array.from(e1.esds.config)
        } else {
          console.warn('esds config is null')
        }
      }
      a.codec = e1.esds?.codec || 'mp4a.40.2'
      a.sampleRateIndex = AAC.getRateIndexByRate(a.sampleRate)
      a.ext = {}
      a.ext.stss = aTrack.mdia?.minf?.stbl?.stss
      a.ext.ctts = aTrack.mdia?.minf?.stbl?.ctts
      a.present = true
      if (e1 && e1.type === 'enca') {
        a.isAudioEncryption = true
        e1.data_format = e1.sinf?.frma?.data_format
        e1.default_KID = e1.sinf?.schi?.tenc.default_KID
        e1.default_IsEncrypted = e1.sinf?.schi?.tenc.default_IsEncrypted
        e1.default_IV_size = e1.sinf?.schi?.tenc.default_IV_size
        a.audioSenc = aTrack.mdia.minf.stbl.senc && aTrack.mdia.minf.stbl.senc.samples
        a.useEME = moov.useEME
        a.kidValue = moov.kidValue
        a.enca = e1
      }
    }

    audioTrack && (audioTrack.isVideoEncryption = videoTrack ? videoTrack.isVideoEncryption : false)
    videoTrack && (videoTrack.isAudioEncryption = audioTrack ? audioTrack.isAudioEncryption : false)

    if (videoTrack?.encv || audioTrack?.enca) {
      const vkid = videoTrack?.encv?.default_KID
      const akid = audioTrack?.enca?.default_KID
      const kid = (vkid || akid) ? (vkid || akid).join('') : null
      videoTrack && (videoTrack.kid = kid)
      audioTrack && (audioTrack.kid = kid)
    }

    videoTrack && (videoTrack.flags = 0xf01)
    audioTrack && (audioTrack.flags = 0x701)

    return {
      videoTrack,
      audioTrack
    }
  }

  static evaluateDefaultDuration (videoTrack, audioTrack, videoSampleCount) {
    const audioSampleCount = audioTrack?.samples?.length

    // audio
    if (!audioSampleCount) return 1024

    const segmentDuration = 1024 * audioSampleCount / audioTrack.timescale

    return segmentDuration * videoTrack.timescale / videoSampleCount
  }

  static moofToSamples (moof, videoTrack, audioTrack) {
    const ret = {}

    if (moof.mfhd) {
      if (videoTrack) videoTrack.sequenceNumber = moof.mfhd.sequenceNumber
      if (audioTrack) audioTrack.sequenceNumber = moof.mfhd.sequenceNumber
    }

    moof.traf.forEach(({ tfhd, tfdt, trun }) => {
      if (!tfhd || !trun) return
      if (tfdt) {
        if (videoTrack && videoTrack.id === tfhd.trackId) videoTrack.baseMediaDecodeTime = tfdt.baseMediaDecodeTime
        if (audioTrack && audioTrack.id === tfhd.trackId) audioTrack.baseMediaDecodeTime = tfdt.baseMediaDecodeTime
      }
      const defaultSize = tfhd.defaultSampleSize || 0
      const defaultDuration = tfhd.defaultSampleDuration || MP4Parser.evaluateDefaultDuration(videoTrack, audioTrack, trun.samples.length || trun.sampleCount)
      let offset = trun.dataOffset || 0
      let dts = 0
      let gopId = -1
      if (!trun.samples.length && trun.sampleCount) {
        ret[tfhd.trackId] = []
        for (let i = 0; i < trun.sampleCount; i++) {
          ret[tfhd.trackId].push({
            offset,
            dts,
            duration: defaultDuration,
            size: defaultSize
          })
          dts += defaultDuration
          offset += defaultSize
        }
      } else {
        ret[tfhd.trackId] = trun.samples.map((s, index) => {
          s = {
            offset,
            dts,
            pts: dts + (s.cts || 0),
            duration: s.duration || defaultDuration,
            size: s.size || defaultSize,
            gopId,
            keyframe: index === 0 || ((s.flags !== null && s.flags !== undefined) && ((s.flags & 65536) >>> 0) !== 65536)
          }
          if (s.keyframe) {
            gopId++
            s.gopId = gopId
          }
          dts += s.duration
          offset += s.size
          return s
        })
      }
    })

    return ret
  }

  static moovToSamples (moov) {
    const tracks = moov.trak
    if (!tracks || !tracks.length) return
    const vTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'vide')
    const aTrack = tracks.find(t => t.mdia?.hdlr?.handlerType === 'soun')
    if (!vTrack && !aTrack) return
    let videoSamples
    let audioSamples
    if (vTrack) {
      const videoStbl = vTrack.mdia?.minf?.stbl
      if (!videoStbl) return
      const { stts, stsc, stsz, stco, stss, ctts } = videoStbl
      if (!stts || !stsc || !stsz || !stco || !stss) return
      videoSamples = getSamples(stts, stsc, stsz, stco, ctts, stss)
    }
    if (aTrack) {
      const audioStbl = aTrack.mdia?.minf?.stbl
      if (!audioStbl) return
      const timescale = aTrack.mdia.mdhd?.timescale
      const { stts, stsc, stsz, stco } = audioStbl
      if (!timescale || !stts || !stsc || !stsz || !stco) return
      audioSamples = getSamples(stts, stsc, stsz, stco)
    }

    return {
      videoSamples,
      audioSamples
    }
  }
}

function getSamples (stts, stsc, stsz, stco, ctts, stss) {
  const samples = []
  const cttsEntries = ctts?.entries
  const stscEntries = stsc.entries
  const stcoEntries = stco.entries
  const stszEntrySizes = stsz.entrySizes
  const stssEntries = stss?.entries
  let keyframeMap
  if (stssEntries) {
    keyframeMap = {}
    stssEntries.forEach(x => { keyframeMap[x - 1] = true })
  }
  let cttsArr
  if (cttsEntries) {
    cttsArr = []
    cttsEntries.forEach(({ count, offset }) => {
      for (let i = 0; i < count; i++) {
        cttsArr.push(offset)
      }
    })
  }

  let sample
  let gopId = -1
  let dts = 0
  let pos = 0
  let chunkIndex = 0
  let chunkRunIndex = 0
  let offsetInChunk = 0
  let lastSampleInChunk = stscEntries[0].samplesPerChunk
  let lastChunkInRun = stscEntries[1] ? stscEntries[1].firstChunk - 1 : Infinity
  stts.entries.forEach(({ count, delta }) => {
    for (let i = 0; i < count; i++) {
      sample = {
        dts,
        duration: delta,
        size: stszEntrySizes[pos] || stsz.sampleSize,
        offset: stcoEntries[chunkIndex] + offsetInChunk,
        index: pos
      }
      if (stssEntries) {
        sample.keyframe = keyframeMap[pos]
        if (sample.keyframe) {
          gopId++
        }
        sample.gopId = gopId
      }
      // sample.timeOffset = 0
      if (cttsArr && pos < cttsArr.length) {
        sample.pts = sample.dts + cttsArr[pos]
        // sample.timeOffset = cttsArr[pos]
        // if (pos === 0) {
        //   sample.pts = sample.dts
        //   sample.timeOffset = 0
        // }
      }
      samples.push(sample)
      dts += delta
      pos++

      if (pos < lastSampleInChunk) {
        offsetInChunk += sample.size
      } else {
        chunkIndex++
        offsetInChunk = 0
        if (chunkIndex >= lastChunkInRun) {
          chunkRunIndex++
          lastChunkInRun = stscEntries[chunkRunIndex + 1] ? stscEntries[chunkRunIndex + 1].firstChunk - 1 : Infinity
        }
        lastSampleInChunk += stscEntries[chunkRunIndex].samplesPerChunk
      }
    }
  })

  return samples
}

function parseVisualSampleEntry (ret, data) {
  ret.dataReferenceIndex = readBig16(data, 6)
  ret.width = readBig16(data, 24)
  ret.height = readBig16(data, 26)
  ret.horizresolution = readBig32(data, 28)
  ret.vertresolution = readBig32(data, 32)
  ret.frameCount = readBig16(data, 40)
  ret.depth = readBig16(data, 74)
  return 78
}

function parseAudioSampleEntry (ret, data) {
  ret.dataReferenceIndex = readBig16(data, 6)
  ret.channelCount = readBig16(data, 16)
  ret.sampleSize = readBig16(data, 18)
  ret.sampleRate = readBig32(data, 24) / (1 << 16)
  return 28
}

function parseBox (box, isFullBox, parse) {
  if (!box) return
  if (box.size !== box.data.length) throw new Error(`box ${box.type} size !== data.length`)
  const ret = {
    start: box.start,
    size: box.size,
    headerSize: box.headerSize,
    type: box.type
  }
  if (isFullBox) {
    ret.version = box.data[box.headerSize]
    ret.flags = readBig24(box.data, box.headerSize + 1)
    ret.headerSize += 4
  }
  parse(ret, box.data.subarray(ret.headerSize), ret.start + ret.headerSize)
  return ret
}

const padStart = function (str, length, pad) {
  const charstr = String(pad)
  const len = length >> 0
  let maxlen = Math.ceil(len / charstr.length)
  const chars = []
  const r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}

const toHex = function (...value) {
  const hex = []
  value.forEach(item => {
    hex.push(padStart(Number(item).toString(16), 2, 0))
  })
  return hex[0]
}
