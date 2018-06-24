import Concat from 'concat-typed-array';
import Stream from './stream';
import ExpGolomb from './expGolomb';

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

const readSPS = (buffer)=>{
    let start = buffer.readUint32();
    let sps = [], next, flag = true, check = false;

    if (start === 1) {
        do {
            next = buffer.readUint8();
            if (!check) {
                if ((next & 0x1f) !== 7) {
                    flag = false;
                    buffer.back(5);
                    break;
                } else {
                    check = true;
                }
            }
            if (next !== 0) {
                sps.push(next);
            } else {
                next = buffer.readUint24();
                if (next === 1) {
                    flag = false;
                    buffer.back(4);
                } else {
                    buffer.back(4);
                    sps.push(buffer.readUint8());
                }
            }
        } while (flag);
    } else {
        buffer.back(4);
    }
    return sps;
};

const readPPS = (buffer)=>{
    let start = buffer.readUint32();
    let pps = [], next, flag = true, check = false;
    if (start === 1) {
        do {
            next = buffer.readUint8();
            if (!check) {
                if ((next & 0x1f) !== 8) {
                    flag = false;
                    buffer.back(5);
                    break;
                } else {
                    check = true;
                }
            }
            if (next !== 0) {
                pps.push(next);
            } else {
                next = buffer.readUint16();
                if (next === 1) {
                    flag = false;
                    buffer.back(3);
                } else {
                    buffer.back(3);
                    pps.push(buffer.readUint8());
                }
            }
        } while (flag);
    } else {
        buffer.back(4);
    }
    return pps;
};

class TS {
    constructor (ctx) {
        let buffer = new Stream(ctx);
        this.header = new TS.Header(buffer);
        this.body = new TS.Payload(buffer, this);
    }
    static Header (buffer) {
        this.sync = buffer.readUint8();
        let next = buffer.readUint16();
        this.error = next >>> 15;
        this.payload = next >>> 14 & 1;
        this.priority = next >>> 13 & 1;
        this.pid = next & 0x1fff;
        next = buffer.readUint8();
        this.scrambling = next >> 6 & 0x3; // 是否加密，00表示不加密

        /**
         * 00 ISO/IEC未来使用保留
         * 01 没有调整字段，仅含有184B有效净荷
         * 02 没有有效净荷，仅含有183B调整字段
         * 03 0~182B调整字段后为有效净荷
         */
        this.adaptation = next >> 4 & 0x3;
        this.continuity = next & 15;
        this.packet = this.pid === 0 ? 'PAT' : 'MEDIA';
    }
    static Payload (buffer, root) {
        let header = root.header, pid = header.pid, r;
        switch (pid) {
            case 0:
                r = new TS.PAT(buffer);
                break;
            case 1:
                r = new TS.CAT(buffer);
                break;
            case 2:
                r = new TS.TSDT(buffer);
                break;
            case 0x1fff:
                r = false;
                break;
            default:
                if (TS.PATSpace.some((item) => { return item.pid === pid; })) {
                    r = new TS.PMT(buffer, root);
                } else {
                    let ts = TS.PMTSpace ? TS.PMTSpace.filter((item) => item.pid === pid) : [];
                    r = ts.length ? new TS.Media(buffer, root, StreamType[ts[0].streamType][0]) : false;
                }
        }
        return r;
    }
    static PAT (buffer) {
        let next = buffer.readUint8();
        buffer.skip(next);
        next = buffer.readUint8();
        this.tabelID = next;
        next = buffer.readUint16();
        this.error = next >>> 7;
        this.zero = next >>> 6 & 1;
        this.sectionLength = next & 0xfff;
        this.streamID = buffer.readUint16();
        this.current = buffer.readUint8() & 1;
        this.sectionNumber = buffer.readUint8();
        this.lastSectionNumber = buffer.readUint8();
        // N=(section_length-9)/4
        let N = (this.sectionLength - 9) / 4, list = [];
        for (let i = 0; i < N; i++) {
            let programNumber = buffer.readUint16();
            let pid = buffer.readUint16() & 0x1fff;
            list.push({
                program: programNumber,
                pid,
                type: programNumber === 0 ? 'network' : 'mapPID',
            });
        }
        this.list = list;
        TS.PATSpace = TS.PATSpace.concat(list);
        this.program = buffer.readUint16();
        this.pid = buffer.readUint16() & 0x1fff;
        if (buffer.dataview.byteLength - buffer.position >= 4) {
            this.crc32 = buffer.readUint32();
        }
    }
    static PMT (buffer, it) {
        it.header.packet = 'PMT';
        let next = buffer.readUint8();
        buffer.skip(next);
        next = buffer.readUint8();
        this.tableID = next;
        next = buffer.readUint16();
        this.sectionLength = next & 0xfff;
        this.program = buffer.readUint16();
        this.current = buffer.readUint8() & 1;
        this.order = buffer.readUint8();
        this.lastOrder = buffer.readUint8();
        this.PCR_PID = buffer.readUint16() & 0x1fff;
        this.programLength = buffer.readUint16() & 0xfff;
        let N = (this.sectionLength - 13) / 5, list = [];
        for (let i = 0; i < N; i++) {
            list.push({
                streamType: buffer.readUint8(),
                pid: buffer.readUint16() & 0x1fff, // 0x07e5 视频，0x07e6
                es: buffer.readUint16() & 0xfff,
            });
        }
        this.list = list;
        if (!TS.PMTSpace) {
            TS.PMTSpace = [];
        }
        TS.PMTSpace = TS.PMTSpace.concat(list.map((item) => {
            return {
                pid: item.pid,
                es: item.es,
                streamType: item.streamType,
                program: this.program,
            };
        }));
        if (buffer.dataview.byteLength - buffer.position >= 4) {
            this.crc32 = buffer.readUint32();
        }
    }
    static Media (buffer, it, type) {
        let header = it.header;
        this.start = buffer.position;
        this.type = type;
        if (header.adaptation === 0x03) {
            this.adaptationLength = buffer.readUint8();
            if (this.adaptationLength > 0) {
                let next = buffer.readUint8();
                this.discontinue = next >>> 7;
                this.access = next >>> 6 & 0x01;
                this.priority = next >>> 5 & 0x01;
                this.PCR = next >>> 4 & 0x01;
                this.OPCR = next >>> 3 & 0x01;
                this.splicePoint = next >>> 2 & 0x01;
                this.transportPrivate = next >>> 1 & 0x01;
                this.adaptationField = next & 0x01;
                let _start = buffer.position;
                if (this.PCR === 1) {
                    this.programClockBase = buffer.readUint32() << 1;
                    next = buffer.readUint16();
                    this.programClockBase |= next >>> 15;
                    this.programClockExtension = next & 0x1ff;
                }
                if (this.OPCR === 1) {
                    this.originProgramClockBase = buffer.readUint32() << 1;
                    next = buffer.readUint16();
                    this.originProgramClockBase += next >>> 15;
                    this.originProgramClockExtension = next & 0x1ff;
                }
                if (this.splicePoint === 1) {
                    this.spliceCountdown = buffer.readUint8();
                }
                if (this.transportPrivate === 1) {
                    let length = buffer.readUint8(), transportPrivateData = [];
                    for (let i = 0; i < length; i++) {
                        transportPrivateData.push(buffer.readUint8());
                    }
                }
                if (this.adaptationField === 1) {
                    let length = buffer.readUint8(), next = buffer.readUint8(), start = buffer.position;
                    let ltw = next >>> 7, piecewise = next >>> 6 & 0x1, seamless = next >>> 5 & 0x1;
                    if (ltw === 1) {
                        next = buffer.readUint16();
                        this.ltwValid = next >>> 15;
                        this.ltwOffset = next & 0xefff;
                    }
                    if (piecewise === 1) {
                        next = buffer.readUint24();
                        this.piecewiseRate = next & 0x3fffff;
                    }
                    if (seamless === 1) {
                        next = buffer.readInt8();
                        this.spliceType = next >>> 4;
                        this.dtsNextAU1 = next >>> 1 & 0x7;
                        this.marker1 = next & 0x1;
                        next = buffer.readUint16();
                        this.dtsNextAU2 = next >>> 1;
                        this.marker2 = next & 0x1;
                        next = buffer.readUint16();
                        this.dtsNextAU3 = next;
                    }
                    buffer.skip(length - 1 - (buffer.position - start));
                }
                let lastStuffing = this.adaptationLength - 1 - (buffer.position - _start);
                buffer.skip(lastStuffing);
            }
        }
        this.buffer = new Stream(buffer.buffer.slice(buffer.position));
    }
    static PES (ts) {
        let it = ts[0], buffer = it.body.buffer;
        let next = buffer.readUint24();
        this.header = it.header;
        if (next !== 1) {
            throw new Error('this is not pes packet');
        } else {
            let streamID = buffer.readUint8();
            if (streamID >= 0xe0 && streamID <= 0xef) {
                this.type = 'video';
            }
            if (streamID >= 0xc0 && streamID <= 0xdf) {
                this.type = 'audio';
            }
            let packetLength = buffer.readUint16();
            this.packetLength = packetLength;
            if (this.type === 'video' || this.type === 'audio') {
                let next = buffer.readUint8();
                let first = next >>> 6;
                if (first !== 0x02) {
                    throw new Error('error when parse pes header');
                }
                next = buffer.readUint8();
                this.ptsDTSFlag = next >>> 6;
                this.escrFlag = next >>> 5 & 0x01;
                this.esRateFlag = next >>> 4 & 0x01;
                this.dsmFlag = next >>> 3 & 0x01;
                this.additionalFlag = next >>> 2 & 0x01;
                this.crcFlag = next >>> 1 & 0x01;
                this.extensionFlag = next & 0x01;
                this.pesHeaderLength = buffer.readUint8();
                let N1 = this.pesHeaderLength;

                if (this.ptsDTSFlag === 2) {
                    let pts = [];
                    next = buffer.readUint8();
                    pts.push(next >>> 1 & 0x07);
                    next = buffer.readUint16();
                    pts.push(next >>> 1);
                    next = buffer.readUint16();
                    pts.push(next >>> 1);
                    this.pts = (pts[0] << 30 | pts[1] << 15 | pts[2]);
                    N1 -= 5;
                    // 视频如果没有dts用pts
                    if (this.type === 'video') {
                        this.dts = this.pts;
                    }
                }
                if (this.ptsDTSFlag === 3) {
                    let pts = [];
                    next = buffer.readUint8();
                    pts.push(next >>> 1 & 0x07);
                    next = buffer.readUint16();
                    pts.push(next >>> 1);
                    next = buffer.readUint16();
                    pts.push(next >>> 1);
                    this.pts = (pts[0] << 30 | pts[1] << 15 | pts[2]);
                    let dts = [];
                    next = buffer.readUint8();
                    dts.push(next >>> 1 & 0x07);
                    next = buffer.readUint16();
                    dts.push(next >>> 1);
                    next = buffer.readUint16();
                    dts.push(next >>> 1);
                    this.dts = (dts[0] << 30 | dts[1] << 15 | dts[2]);
                    N1 -= 10;
                }
                if (this.escrFlag === 1) {
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
                    this.escr = (escr[0] << 30 | escr[1] << 28 | escr[2] << 15 | escr[3] << 13 | escr[4]) * 300 + (ex[0] << 7 | ex[1]);
                    N1 -= 6;
                }
                if (this.esRateFlag === 1) {
                    next = buffer.readUint24();
                    this.esRate = next >>> 1 & 0x3fffff;
                    N1 -= 3;
                }
                if (this.dsmFlag === 1) {
                    throw new Error('not support DSM_trick_mode');
                }
                if (this.additionalFlag === 1) {
                    next = buffer.readUint8();
                    this.additionalCopyInfo = next & 0x7f;
                    N1 -= 1;
                }
                if (this.crcFlag === 1) {
                    this.pesCRC = buffer.readUint16();
                    N1 -= 2;
                }
                if (this.extensionFlag === 1) {
                    throw new Error('not support extension');
                }
                if (N1 > 0) {
                    buffer.skip(N1);
                }
                this.ES = new TS.ES(buffer, this.type, ts.slice(1));
            } else {
                throw new Error('format is not supported');
            }
        }
    }
    static ES (buffer, type, ts) {
        let next;
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
            this.sps = readSPS(buffer);
            this.pps = readPPS(buffer);
            let nal;
            if (this.sps.length) {
                this.info = new ExpGolomb(new Uint8Array(this.sps)).readSPS();
                nal = buffer.readUint24();
            } else {
                nal = buffer.readUint24();
                if (nal === 0) {
                    nal = buffer.readUint8();
                }
            }
            if (nal === 1) {
                let vdata = TS.Merge(buffer, ts);
                this.buffer = Concat(Uint8Array, buffer.writeUint32(vdata.byteLength), vdata);
            } else {
                throw new Error('h264 convert to avcc error');
            }
        } else if (type === 'audio') {
            next = buffer.readUint16();
            // adts的同步字节，12位
            if (next >>> 4 !== 0xfff) {
                throw new Error('aac ES parse Error');
            }
            const fq = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
            this.id = (next >>> 3 & 0x01) === 0 ? 'MPEG-4' : 'MPEG-2';
            this.layer = next >>> 1 & 0x03;
            this.absent = next & 0x01;
            next = buffer.readUint16();
            this.audioObjectType = (next >>> 14 & 0x03) + 1;
            this.profile = this.audioObjectType - 1;
            this.frequencyIndex = next >>> 10 & 0x0f;
            this.frequence = fq[this.frequencyIndex];
            this.channel = next >>> 6 & 0x07;
            this.frameLength = (next & 0x03) << 11 | (buffer.readUint16() >>> 5);
            this.audioConfig = TS.getAudioConfig(this.audioObjectType, this.channel, this.frequencyIndex);
            buffer.skip(1);
            this.buffer = TS.Merge(buffer, ts);
        } else {
            throw `ES ${type} is not supported`;
        }
    }
    static TSDT () {
        return {};
    }
    static CAT (buffer, it) {
        this.tableID = buffer.readUint8();
        let next = buffer.readUint16();
        this.sectionIndicator = next >>> 7;
        this.sectionLength = next & 0x0fff;
        buffer.skip(2);
        next = buffer.readUint8();
        this.version = next >>> 3;
        this.currentNextIndicator = next & 0x01;
        this.sectionNumber = buffer.readUint8();
        this.lastSectionNumber = buffer.readUint8();
        let N = (this.sectionLength - 9) / 4, list = [];
        for (let i = 0; i < N; i++) {
            list.push({});
        }
        this.crc32 = buffer.readUint32();
    }
    static Merge (buffer, ts) {
        let length = buffer.length - buffer.position, data, offset = length;
        ts.forEach(item=>{
            length += item.body.buffer.length;
        });
        data = new Uint8Array(length);
        data.set(new Uint8Array(buffer.buffer, buffer.position), 0);
        ts.forEach(item=>{
            buffer = item.body.buffer;
            data.set(new Uint8Array(buffer.buffer, buffer.position), offset);
            offset += buffer.length - buffer.position;
        });
        return data;
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
TS.PATSpace = [];
export default TS;
