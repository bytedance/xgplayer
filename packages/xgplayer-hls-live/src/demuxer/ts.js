import Stream from "../stream";
const StreamType = {
  0x01: ['video', 'MPEG-1'],
  0x02: ['video', 'MPEG-2'],
  0x1b: ['video', 'AVC.H264'],
  0xea: ['video', 'VC-1'],
  0x03: ['audio', 'MPEG-1'],
  0x04: ['audio', 'MPEG-2'],
  0x0f: ['audio', 'MPEG-2.AAC'],
  0x11: ['audio', 'MPEG-4.AAC'],
  0x80: ['audio', 'LPCM'],
  0x81: ['audio', 'AC3'],
  0x06: ['audio', 'AC3'],
  0x82: ['audio', 'DTS'],
  0x83: ['audio', 'Dolby TrueHD'],
  0x84: ['audio', 'AC3-Plus'],
  0x85: ['audio', 'DTS-HD'],
  0x86: ['audio', 'DTS-MA'],
  0xa1: ['audio', 'AC3-Plus-SEC'],
  0xa2: ['audio', 'DTS-HD-SEC'],
};

class TsDemuxer {
  constructor(configs) {
    this.configs = Object.assign({}, configs);
    this.demuxing = false;
    this.pat = [];
    this.pmt = [];
  }

  init() {
    this.inputbuffer = this._context.getInstance(this.configs.inputbuffer)
  }

  demux() {
    if (this.demuxing) {
      return
    }

    let buffer = this.inputbuffer;
    let frags = { pat: [], pmt: [] };

    while (buffer.length >= 188) {
      let buf = buffer.shift(188);
      let tsstream = new Stream(buf.buffer);
      let ts = {};
      TsDemuxer.read(tsstream, ts, frags);
    }
  }

  static read(stream, ts, frags) {
    TsDemuxer.readHeader(stream, ts);
    TsDemuxer.readPayload(stream, ts, frags);
    if(ts.header.packet === "MEDIA" && ts.header.payload === 1) {
      let pes = TsDemuxer.PES(ts);
      console.log(pes)
    } else if(ts.header.packet === "MEDIA" ) {
      console.log(ts);
    }
    
  }

  static readPayload(stream, ts, frags) {
    let header = ts.header, pid = header.pid;
    let r = null;
    switch (pid) {
      case 0:
        TsDemuxer.PAT(stream, ts, frags);
        break;
      /*
      case 1:
        r = TsDemuxer.CAT(buffer);
        break;
       
      case 2:
        r = TsDemuxer.TSDT(buffer);
        break;
        */
      case 0x1fff:
        break;
      default:
        //TODO: some的写法不太好，得改
        if (frags.pat.some((item) => { return item.pid === pid; })) {
          TsDemuxer.PMT(stream, ts, frags);
        } else {
          let sts = frags.pmt ? frags.pmt.filter((item) => item.pid === pid) : [];
          if (sts.length > 0) TsDemuxer.Media(stream, ts, StreamType[sts[0].streamType][0]);
        }
    }
  }

  static readHeader(stream, ts) {
    let header = {};
    header.sync = stream.readUint8();
    let next = stream.readUint16();
    header.error = next >>> 15;
    header.payload = next >>> 14 & 1;
    header.priority = next >>> 13 & 1;
    header.pid = next & 0x1fff;

    next = stream.readUint8();

    header.scrambling = next >> 6 & 0x3; // 是否加密，00表示不加密

    /**
     * 00 ISO/IEC未来使用保留
     * 01 没有调整字段，仅含有184B有效净荷
     * 02 没有有效净荷，仅含有183B调整字段
     * 03 0~182B调整字段后为有效净荷
     */
    header.adaptation = next >> 4 & 0x3;
    header.continuity = next & 15;
    header.packet = header.pid === 0 ? 'PAT' : 'MEDIA';
    ts.header = header;
  }

  static PAT(stream, ts, frags) {
    let ret = {};
    let next = stream.readUint8();
    stream.skip(next);
    next = stream.readUint8();
    ret.tabelID = next;
    next = stream.readUint16();
    ret.error = next >>> 7;
    ret.zero = next >>> 6 & 1;
    ret.sectionLength = next & 0xfff;
    ret.streamID = stream.readUint16();
    ret.current = stream.readUint8() & 1;
    ret.sectionNumber = stream.readUint8();
    ret.lastSectionNumber = stream.readUint8();
    let N = (ret.sectionLength - 9) / 4, list = [];
    for (let i = 0; i < N; i++) {
      let programNumber = stream.readUint16();
      let pid = stream.readUint16() & 0x1fff;
      list.push({
        program: programNumber,
        pid,
        type: programNumber === 0 ? 'network' : 'mapPID',
      });
    }
    if (list.length > 0) {
      frags.pat = frags.pat.concat(list);
    }
    ret.list = list;
    ret.program = stream.readUint16();
    ret.pid = stream.readUint16() & 0x1fff;
    ts.payload = ret;
    // TODO CRC
  }

  static PMT(stream, ts, frags) {
    let ret = {}, header = ts.header;
    header.packet = 'PMT';
    let next = stream.readUint8();
    stream.skip(next);
    next = stream.readUint8();
    ret.tableID = next;
    next = stream.readUint16();
    ret.sectionLength = next & 0xfff;
    ret.program = stream.readUint16();
    ret.current = stream.readUint8() & 1;
    ret.order = stream.readUint8();
    ret.lastOrder = stream.readUint8();
    ret.PCR_PID = stream.readUint16() & 0x1fff;
    ret.programLength = stream.readUint16() & 0xfff;
    let N = (ret.sectionLength - 13) / 5, list = [];
    for (let i = 0; i < N; i++) {
      list.push({
        streamType: stream.readUint8(),
        pid: stream.readUint16() & 0x1fff, // 0x07e5 视频，0x07e6
        es: stream.readUint16() & 0xfff,
      });
    }
    ret.list = list;
    if (!this.pmt) {
      this.pmt = [];
    }
    frags.pmt = this.pmt.concat(list.map((item) => {
      return {
        pid: item.pid,
        es: item.es,
        streamType: item.streamType,
        program: ret.program,
      };
    }));
    ts.payload = ret;
  }

  static Media(stream, ts, type) {
    let header = ts.header, payload = {};
    header.type = type;
    if (header.adaptation === 0x03) {
      payload.adaptationLength = stream.readUint8();
      if (payload.adaptationLength > 0) {
        let next = stream.readUint8();
        payload.discontinue = next >>> 7;
        payload.access = next >>> 6 & 0x01;
        payload.priority = next >>> 5 & 0x01;
        payload.PCR = next >>> 4 & 0x01;
        payload.OPCR = next >>> 3 & 0x01;
        payload.splicePoint = next >>> 2 & 0x01;
        payload.transportPrivate = next >>> 1 & 0x01;
        payload.adaptationField = next & 0x01;
        let _start = stream.position;
        if (payload.PCR === 1) {
          payload.programClockBase = stream.readUint32() << 1;
          next = stream.readUint16();
          payload.programClockBase |= next >>> 15;
          payload.programClockExtension = next & 0x1ff;
        }
        if (payload.OPCR === 1) {
          payload.originProgramClockBase = stream.readUint32() << 1;
          next = stream.readUint16();
          payload.originProgramClockBase += next >>> 15;
          payload.originProgramClockExtension = next & 0x1ff;
        }
        if (payload.splicePoint === 1) {
          payload.spliceCountdown = stream.readUint8();
        }
        if (payload.transportPrivate === 1) {
          let length = stream.readUint8(), transportPrivateData = [];
          for (let i = 0; i < length; i++) {
            transportPrivateData.push(stream.readUint8());
          }
        }
        if (payload.adaptationField === 1) {
          let length = stream.readUint8(), next = stream.readUint8(), start = stream.position;
          let ltw = next >>> 7, piecewise = next >>> 6 & 0x1, seamless = next >>> 5 & 0x1;
          if (ltw === 1) {
            next = stream.readUint16();
            payload.ltwValid = next >>> 15;
            payload.ltwOffset = next & 0xefff;
          }
          if (piecewise === 1) {
            next = stream.readUint24();
            payload.piecewiseRate = next & 0x3fffff;
          }
          if (seamless === 1) {
            next = stream.readInt8();
            payload.spliceType = next >>> 4;
            payload.dtsNextAU1 = next >>> 1 & 0x7;
            payload.marker1 = next & 0x1;
            next = stream.readUint16();
            payload.dtsNextAU2 = next >>> 1;
            payload.marker2 = next & 0x1;
            next = stream.readUint16();
            payload.dtsNextAU3 = next;
          }
          stream.skip(length - 1 - (stream.position - start));
        }
        let lastStuffing = payload.adaptationLength - 1 - (stream.position - _start);
        stream.skip(lastStuffing);
      }
    }
    payload.stream = new Stream(stream.buffer.slice(stream.position));
    ts.payload = payload;
  }

  static PES(ts) {
    let ret = {};
    let buffer = ts.payload.stream;
    let next = buffer.readUint24();
    if (next !== 1) {
      ret.ES = {};
      ret.ES.buffer = buffer;
    } else {
      let streamID = buffer.readUint8();
      if (streamID >= 0xe0 && streamID <= 0xef) {
        ret.type = 'video';
      }
      if (streamID >= 0xc0 && streamID <= 0xdf) {
        ret.type = 'audio';
      }
      let packetLength = buffer.readUint16();
      ret.packetLength = packetLength;
      if (ret.type === 'video' || ret.type === 'audio') {
        let next = buffer.readUint8();
        let first = next >>> 6;
        if (first !== 0x02) {
          throw new Error('error when parse pes header');
        }
        next = buffer.readUint8();
        ret.ptsDTSFlag = next >>> 6;
        ret.escrFlag = next >>> 5 & 0x01;
        ret.esRateFlag = next >>> 4 & 0x01;
        ret.dsmFlag = next >>> 3 & 0x01;
        ret.additionalFlag = next >>> 2 & 0x01;
        ret.crcFlag = next >>> 1 & 0x01;
        ret.extensionFlag = next & 0x01;
        ret.pesHeaderLength = buffer.readUint8();
        let N1 = ret.pesHeaderLength;

        if (ret.ptsDTSFlag === 2) {
          let pts = [];
          next = buffer.readUint8();
          pts.push(next >>> 1 & 0x07);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          ret.pts = (pts[0] << 30 | pts[1] << 15 | pts[2]);
          N1 -= 5;
          // 视频如果没有dts用pts
          if (ret.type === 'video') {
            ret.dts = this.pts;
          }
        }
        if (ret.ptsDTSFlag === 3) {
          let pts = [];
          next = buffer.readUint8();
          pts.push(next >>> 1 & 0x07);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          ret.pts = (pts[0] << 30 | pts[1] << 15 | pts[2]);
          let dts = [];
          next = buffer.readUint8();
          dts.push(next >>> 1 & 0x07);
          next = buffer.readUint16();
          dts.push(next >>> 1);
          next = buffer.readUint16();
          dts.push(next >>> 1);
          ret.dts = (dts[0] << 30 | dts[1] << 15 | dts[2]);
          N1 -= 10;
        }
        if (ret.escrFlag === 1) {
          let escr = [], ex = [];
          next = buffer.readUint8();
          escr.push(next >>> 3 & 0x07);
          escr.push(next & 0x03);
          next = buffer.readUint16();
          escr.push(next >>> 13);
          escr.push(next & 0x03);
          next = buffer.readUint16();
          escr.push(next >>> 13);
          ex.push(next & 0x03);
          next = buffer.readUint8();
          ex.push(next >>> 1);
          ret.escr = (escr[0] << 30 | escr[1] << 28 | escr[2] << 15 | escr[3] << 13 | escr[4]) * 300 + (ex[0] << 7 | ex[1]);
          N1 -= 6;
        }
        if (ret.esRateFlag === 1) {
          next = buffer.readUint24();
          ret.esRate = next >>> 1 & 0x3fffff;
          N1 -= 3;
        }
        if (ret.dsmFlag === 1) {
          throw new Error('not support DSM_trick_mode');
        }
        if (ret.additionalFlag === 1) {
          next = buffer.readUint8();
          ret.additionalCopyInfo = next & 0x7f;
          N1 -= 1;
        }
        if (ret.crcFlag === 1) {
          ret.pesCRC = buffer.readUint16();
          N1 -= 2;
        }
        if (ret.extensionFlag === 1) {
          throw new Error('not support extension');
        }
        if (N1 > 0) {
          buffer.skip(N1);
        }
        ret.ES = TsDemuxer.ES(buffer, ret.type);
      } else {
        throw new Error('format is not supported');
      }
    }
    return ret;
  }

  static ES (buffer, type) {
    let next, ret = {};
    if (type === 'video') {
        next = buffer.readUint32();
        if (next !== 1) {
            buffer.back(4);
            next = buffer.readUint24();
            if (next !== 1) {
                throw new Error('h264 nal header parse failed');
            }
        }
        buffer.skip(2);// 09 F0
        // TODO readnalu
        ret.buffer = buffer;
    } else if (type === 'audio') {
        next = buffer.readUint16();
        // adts的同步字节，12位
        if (next >>> 4 !== 0xfff) {
            throw new Error('aac ES parse Error');
        }
        const fq = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
        ret.id = (next >>> 3 & 0x01) === 0 ? 'MPEG-4' : 'MPEG-2';
        ret.layer = next >>> 1 & 0x03;
        ret.absent = next & 0x01;
        next = buffer.readUint16();
        ret.audioObjectType = (next >>> 14 & 0x03) + 1;
        ret.profile = ret.audioObjectType - 1;
        ret.frequencyIndex = next >>> 10 & 0x0f;
        ret.frequence = fq[ret.frequencyIndex];
        ret.channel = next >>> 6 & 0x07;
        ret.frameLength = (next & 0x03) << 11 | (buffer.readUint16() >>> 5);
        ret.audioConfig = TsDemuxer.getAudioConfig(ret.audioObjectType, ret.channel, ret.frequencyIndex);
        buffer.skip(1);
        ret.buffer = buffer;
    } else {
        throw `ES ${type} is not supported`;
    }

    return ret;
  }

  static getAudioConfig (audioObjectType, channel, sampleIndex) {
    let userAgent = navigator.userAgent.toLowerCase(), config, extensionSampleIndex;
    if (/firefox/i.test(userAgent)) {
        if (sampleIndex >= 6) {
            audioObjectType = 5;
            config = new Array(4);
            extensionSampleIndex = sampleIndex - 3;
        } else {
            audioObjectType = 2;
            config = new Array(2);
            extensionSampleIndex = sampleIndex;
        }
    } else if (userAgent.indexOf('android') !== -1) {
        audioObjectType = 2;
        config = new Array(2);
        extensionSampleIndex = sampleIndex;
    } else {
        audioObjectType = 5;
        config = new Array(4);
        if (sampleIndex >= 6) {
            extensionSampleIndex = sampleIndex - 3;
        } else {
            if (channel === 1) {
                audioObjectType = 2;
                config = new Array(2);
            }
            extensionSampleIndex = sampleIndex;
        }
    }

    config[0] = audioObjectType << 3;
    config[0] |= (sampleIndex & 0x0e) >> 1;
    config[1] = (sampleIndex & 0x01) << 7;
    config[1] |= channel << 3;
    if (audioObjectType === 5) {
        config[1] |= (extensionSampleIndex & 0x0e) >> 1;
        config[2] = (extensionSampleIndex & 0x01) << 7;
        config[2] |= 2 << 2;
        config[3] = 0;
    }
    return config;
  }
}

export default TsDemuxer;