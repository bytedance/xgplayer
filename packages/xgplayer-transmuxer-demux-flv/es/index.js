var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import EVENTS from 'xgplayer-transmuxer-constant-events';
import { AudioTrackMeta, VideoTrackMeta } from 'xgplayer-transmuxer-model-trackmeta';
import { SpsParser, NalUnit } from 'xgplayer-transmuxer-codec-avc';
import { SpsParserHEVC, NalUnitHEVC } from 'xgplayer-transmuxer-codec-hevc';
import { VideoTrack, AudioTrack } from 'xgplayer-transmuxer-buffer-track';
import AMFParser from './amf-parser';
import Stream from 'xgplayer-transmuxer-buffer-stream';

var DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;

var FlvDemuxer = function () {
  function FlvDemuxer() {
    _classCallCheck(this, FlvDemuxer);

    this._firstFragmentLoaded = false;
    this._trackNum = 0;
    this._hasScript = false;
  }

  _createClass(FlvDemuxer, [{
    key: 'init',
    value: function init() {
      this.on(DEMUX_EVENTS.DEMUX_START, this.doParseFlv.bind(this));
    }

    /**
     * if the flv head is valid
     * @param data
     * @returns {boolean}
     */

  }, {
    key: 'doParseFlv',
    value: function doParseFlv() {
      if (!this._firstFragmentLoaded) {
        if (this.loaderBuffer.length < 13) {
          return;
        }
        var header = this.loaderBuffer.shift(13);
        this.parseFlvHeader(header);
        this.doParseFlv(); // 递归调用，继续解析flv流
      } else {
        if (this.loaderBuffer.length < 11) {
          return;
        }
        var chunk = void 0;

        var loopMax = 10000; // 防止死循环产生
        do {
          // console.log('mark4')
          chunk = this._parseFlvTag();
        } while (chunk && loopMax-- > 0);

        this.emit(DEMUX_EVENTS.DEMUX_COMPLETE);
      }
    }
  }, {
    key: 'parseFlvHeader',
    value: function parseFlvHeader(header) {
      if (!FlvDemuxer.isFlvFile(header)) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('invalid flv file'));
        this.doParseFlv();
      } else {
        this._firstFragmentLoaded = true;
        // const playType = FlvDemuxer.getPlayType(header[4])

        this.initVideoTrack();
        this.initAudioTrack();
      }
      this.doParseFlv();
    }

    /**
     * init default video track configs
     */

  }, {
    key: 'initVideoTrack',
    value: function initVideoTrack() {
      this._trackNum++;
      var videoTrack = new VideoTrack();
      videoTrack.meta = new VideoTrackMeta();
      videoTrack.id = videoTrack.meta.id = this._trackNum;

      this.tracks.videoTrack = videoTrack;
    }

    /**
     * init default audio track configs
     */

  }, {
    key: 'initAudioTrack',
    value: function initAudioTrack() {
      this._trackNum++;
      var audioTrack = new AudioTrack();
      audioTrack.meta = new AudioTrackMeta();
      audioTrack.id = audioTrack.meta.id = this._trackNum;

      this.tracks.audioTrack = audioTrack;
    }

    /**
     * Package the data as the following data structure
     * {
     *    data: Uint8Array. the Stream data.
     *    info: The first byte info of the Tag.
     *    tagType: 8、9、18
     *    timeStamp: the timestemp
     * }
     */

  }, {
    key: '_parseFlvTag',
    value: function _parseFlvTag() {
      if (this.loaderBuffer.length < 11) {
        return null;
      }
      var chunk = this._parseFlvTagHeader();
      if (chunk) {
        this._processChunk(chunk);
      }
      return chunk;
    }

    /**
     * Parse the 11 byte tag Header
     */

  }, {
    key: '_parseFlvTagHeader',
    value: function _parseFlvTagHeader() {
      var offset = 0;
      var chunk = {};

      var tagType = this.loaderBuffer.toInt(offset, 1);
      offset += 1;

      // 2 bit FMS reserved, 1 bit filtered, 5 bit tag type
      chunk.filtered = (tagType & 32) >>> 5;
      chunk.tagType = tagType & 31;

      // 3 Byte datasize
      chunk.datasize = this.loaderBuffer.toInt(offset, 3);
      offset += 3;

      if (chunk.tagType !== 8 && chunk.tagType !== 9 && chunk.tagType !== 11 && chunk.tagType !== 18 || this.loaderBuffer.toInt(8, 3) !== 0) {
        if (this.loaderBuffer && this.loaderBuffer.length > 0) {
          this.loaderBuffer.shift(1);
        }
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('tagType ' + chunk.tagType), false);
        return null;
      }

      if (this.loaderBuffer.length < chunk.datasize + 15) {
        return null;
      }

      // read the data.
      this.loaderBuffer.shift(4);

      // 3 Byte timestamp
      var timestamp = this.loaderBuffer.toInt(0, 3);
      this.loaderBuffer.shift(3);

      // 1 Byte timestampExt
      var timestampExt = this.loaderBuffer.shift(1)[0];
      if (timestampExt > 0) {
        timestamp += timestampExt * 0x1000000;
      }

      chunk.dts = timestamp;

      // streamId
      this.loaderBuffer.shift(3);
      return chunk;
    }
  }, {
    key: '_processChunk',
    value: function _processChunk(chunk) {
      switch (chunk.tagType) {
        case 18:
          this._parseScriptData(chunk);
          break;
        case 8:
          this._parseAACData(chunk);
          break;
        case 9:
          this._parseHevcData(chunk);
          break;
        case 11:
          // for some CDN that did not process the currect RTMP messages
          this.loaderBuffer.shift(3);
          break;
        default:
          this.loaderBuffer.shift(1);
      }
    }

    /**
     * parse flv script data
     * @param chunk
     * @private
     */

  }, {
    key: '_parseScriptData',
    value: function _parseScriptData(chunk) {
      var audioTrack = this.tracks.audioTrack;
      var videoTrack = this.tracks.videoTrack;

      var data = this.loaderBuffer.shift(chunk.datasize);

      var info = new AMFParser().resolve(data, data.length);

      var onMetaData = this._context.onMetaData = info ? info.onMetaData : undefined;

      // fill mediaInfo
      this._context.mediaInfo.duration = onMetaData.duration;
      this._context.mediaInfo.hasVideo = onMetaData.hasVideo;
      this._context.mediaInfo.hsaAudio = onMetaData.hasAudio;

      var validate = this._datasizeValidator(chunk.datasize);
      if (validate) {
        this.emit(DEMUX_EVENTS.MEDIA_INFO);
        this._hasScript = true;
      }

      // Edit default meta.
      if (audioTrack && !audioTrack.hasSpecificConfig) {
        var meta = audioTrack.meta;
        if (onMetaData.audiosamplerate) {
          meta.sampleRate = onMetaData.audiosamplerate;
        }

        if (onMetaData.audiochannels) {
          meta.channelCount = onMetaData.audiochannels;
        }

        switch (onMetaData.audiosamplerate) {
          case 44100:
            meta.sampleRateIndex = 4;
            break;
          case 22050:
            meta.sampleRateIndex = 7;
            break;
          case 11025:
            meta.sampleRateIndex = 10;
            break;
        }
      }
      if (videoTrack && !videoTrack.hasSpecificConfig) {
        var _meta = videoTrack.meta;
        if (typeof onMetaData.framerate === 'number') {
          var fpsNum = Math.floor(onMetaData.framerate * 1000);
          if (fpsNum > 0) {
            var fps = fpsNum / 1000;
            if (!_meta.frameRate) {
              _meta.frameRate = {};
            }
            _meta.frameRate.fixed = true;
            _meta.frameRate.fps = fps;
            _meta.frameRate.fps_num = fpsNum;
            _meta.frameRate.fps_den = 1000;
          }
        }
      }
    }
  }, {
    key: '_aacSequenceHeaderParser',
    value: function _aacSequenceHeaderParser(data) {
      var ret = {};
      ret.hasSpecificConfig = true;
      ret.objectType = data[1] >>> 3;
      ret.sampleRateIndex = (data[1] & 7) << 1 | data[2] >>> 7;
      ret.audiosamplerate = this._switchAudioSampleRate(ret.sampleRateIndex);
      ret.channelCount = (data[2] & 120) >>> 3;
      ret.frameLength = (data[2] & 4) >>> 2;
      ret.dependsOnCoreCoder = (data[2] & 2) >>> 1;
      ret.extensionFlagIndex = data[2] & 1;

      var userAgent = window.navigator.userAgent.toLowerCase();
      var extensionSamplingIndex = void 0;

      var config = void 0;
      var samplingIndex = ret.sampleRateIndex;

      if (userAgent.indexOf('firefox') !== -1) {
        // firefox: use SBR (HE-AAC) if freq less than 24kHz
        if (ret.sampleRateIndex >= 6) {
          ret.objectType = 5;
          config = new Array(4);
          extensionSamplingIndex = samplingIndex - 3;
        } else {
          // use LC-AAC
          ret.objectType = 2;
          config = new Array(2);
          extensionSamplingIndex = samplingIndex;
        }
      } else if (userAgent.indexOf('android') !== -1 || userAgent.indexOf('safari') !== -1) {
        // android: always use LC-AAC
        ret.objectType = 2;
        config = new Array(2);
        extensionSamplingIndex = samplingIndex;
      } else {
        // for other browsers, e.g. chrome...
        // Always use HE-AAC to make it easier to switch aac codec profile
        ret.objectType = 5;
        extensionSamplingIndex = ret.sampleRateIndex;
        config = new Array(4);

        if (ret.sampleRateIndex >= 6) {
          extensionSamplingIndex = ret.sampleRateIndex - 3;
        } else if (ret.channelCount === 1) {
          // Mono channel
          ret.objectType = 2;
          config = new Array(2);
          extensionSamplingIndex = ret.sampleRateIndex;
        }
      }
      ret.codec = 'mp4a.40.' + ret.objectType;
      config[0] = ret.objectType << 3;
      config[0] |= (ret.sampleRateIndex & 0x0F) >>> 1;
      config[1] = (ret.sampleRateIndex & 0x0F) << 7;
      config[1] |= (ret.channelCount & 0x0F) << 3;
      if (ret.objectType === 5) {
        config[1] |= (extensionSamplingIndex & 0x0F) >>> 1;
        config[2] = (extensionSamplingIndex & 0x01) << 7;
        // extended audio object type: force to 2 (LC-AAC)
        config[2] |= 2 << 2;
        config[3] = 0;
      }
      ret.config = config;
      return ret;
    }
  }, {
    key: '_parseAACData',
    value: function _parseAACData(chunk) {
      var track = this.tracks.audioTrack;
      if (!track) {
        return;
      }

      var meta = track.meta;

      if (!meta) {
        track.meta = new AudioTrackMeta();
        meta = track.meta;
      }

      var info = this.loaderBuffer.shift(1)[0];

      chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);

      var format = (info & 240) >>> 4;

      track.format = format;

      if (format !== 10) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('invalid audio format: ' + format));
      }

      if (format === 10 && !this._hasAudioSequence) {
        meta.sampleRate = this._switchAudioSamplingFrequency(info);
        meta.sampleRateIndex = (info & 12) >>> 2;
        meta.frameLenth = (info & 2) >>> 1;
        meta.channelCount = info & 1;
        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
      }

      var audioSampleRate = meta.audioSampleRate;
      var audioSampleRateIndex = meta.sampleRateIndex;
      var refSampleDuration = meta.refSampleDuration;

      delete chunk.tagType;
      var validate = this._datasizeValidator(chunk.datasize);

      if (chunk.data[0] === 0) {
        // AAC Sequence Header
        var aacHeader = this._aacSequenceHeaderParser(chunk.data);
        audioSampleRate = aacHeader.audiosamplerate || meta.audioSampleRate;
        audioSampleRateIndex = aacHeader.sampleRateIndex || meta.sampleRateIndex;
        refSampleDuration = Math.floor(1024 / audioSampleRate * meta.timescale);

        meta.channelCount = aacHeader.channelCount;
        meta.sampleRate = audioSampleRate;
        meta.sampleRateIndex = audioSampleRateIndex;
        meta.refSampleDuration = refSampleDuration;
        meta.duration = this._context.mediaInfo.duration * meta.timescale;
        meta.config = aacHeader.config;
        meta.objectType = aacHeader.objectType;

        var audioMedia = this._context.mediaInfo.audio;

        // fill audio media info
        audioMedia.codec = aacHeader.codec;
        audioMedia.channelCount = aacHeader.channelCount;
        audioMedia.sampleRate = audioSampleRate;
        audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex;

        if (!this._hasAudioSequence) {
          this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
        } else {
          this.emit(DEMUX_EVENTS.AUDIO_METADATA_CHANGE);
          // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio')
        }
        this._hasAudioSequence = true;

        this._metaChange = true;
      } else {
        if (this._metaChange) {
          chunk.options = {
            meta: track.meta
          };
          this._metaChange = false;
        }

        chunk.data = chunk.data.slice(1, chunk.data.length);
        track.samples.push(chunk);
      }
      if (!validate) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('TAG length error at ' + chunk.datasize), false);
        // this.logger.warn(this.TAG, error.message)
      }
    }

    /**
     * parse hevc/avc video data
     * @param chunk
     * @private
     */

  }, {
    key: '_parseHevcData',
    value: function _parseHevcData(chunk) {
      // header
      var info = this.loaderBuffer.shift(1)[0];
      chunk.frameType = (info & 0xf0) >>> 4;
      chunk.isKeyframe = chunk.frameType === 1;
      // let tempCodecID = this.tracks.videoTrack.codecID
      var codecID = info & 0x0f;
      this.tracks.videoTrack.codecID = codecID;

      // hevc和avc的header解析方式一样
      chunk.avcPacketType = this.loaderBuffer.shift(1)[0];
      chunk.cts = this.loaderBuffer.toInt(0, 3);
      this.loaderBuffer.shift(3);

      // 12 for hevc, 7 for avc
      if (codecID === 7 || codecID === 12) {
        var data = this.loaderBuffer.shift(chunk.datasize - 5);
        if (data[4] === 0 && data[5] === 0 && data[6] === 0 && data[7] === 1) {
          var avcclength = 0;
          for (var i = 0; i < 4; i++) {
            avcclength = avcclength * 256 + data[i];
          }
          avcclength -= 4;
          data = data.slice(4, data.length);
          data[3] = avcclength % 256;
          avcclength = (avcclength - data[3]) / 256;
          data[2] = avcclength % 256;
          avcclength = (avcclength - data[2]) / 256;
          data[1] = avcclength % 256;
          data[0] = (avcclength - data[1]) / 256;
        }

        chunk.data = data;
        // If it is AVC sequece Header.
        if (chunk.avcPacketType === 0) {
          if (codecID === 12) {
            this._hevcSequenceHeaderParser(chunk.data);
          } else {
            this._avcSequenceHeaderParser(chunk.data);
          }
          var validate = this._datasizeValidator(chunk.datasize);
          if (validate) {
            if (!this._hasVideoSequence) {
              this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video');
            } else {
              this.emit(DEMUX_EVENTS.VIDEO_METADATA_CHANGE);
              // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
            }
            this._hasVideoSequence = true;
          }
          this._metaChange = true;
        } else {
          if (!this._datasizeValidator(chunk.datasize)) {
            this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
            return;
          }
          var nals = codecID === 12 ? NalUnitHEVC.getHvccNals(new Stream(chunk.data.buffer)) : NalUnit.getAvccNals(new Stream(chunk.data.buffer));
          for (var _i = 0; _i < nals.length; _i++) {
            var unit = nals[_i];
            codecID === 12 ? NalUnitHEVC.analyseNal(unit) : NalUnit.analyseNal(unit);
            if (unit.sei) {
              this.emit(DEMUX_EVENTS.SEI_PARSED, unit.sei);
            }
          }
          codecID === 12 ? this.tracks.videoTrack.meta.streamType = 0x24 : this.tracks.videoTrack.meta.streamType = 0x1b;
          if (this._metaChange) {
            chunk.options = {
              meta: Object.assign({}, this.tracks.videoTrack.meta)
            };
            this._metaChange = false;
          }
          this.tracks.videoTrack.samples.push(chunk);
          // this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
        }
      } else {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('video codeid is ' + codecID), false);
        chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);
        if (!this._datasizeValidator(chunk.datasize)) {
          this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
        }

        this.tracks.videoTrack.samples.push(chunk);
        this.emit(DEMUX_EVENTS.DEMUX_COMPLETE);
      }
      delete chunk.tagType;
    }

    /**
     * parse avc metadata
     * @param data
     * @private
     */

  }, {
    key: '_avcSequenceHeaderParser',
    value: function _avcSequenceHeaderParser(data) {
      var track = this.tracks.videoTrack;

      if (!track) {
        return;
      }

      var offset = 0;

      if (!track.meta) {
        track.meta = new VideoTrackMeta();
      }
      var meta = track.meta;

      meta.configurationVersion = data[0];
      meta.avcProfileIndication = data[1];
      meta.profileCompatibility = data[2];
      meta.avcLevelIndication = data[3] / 10;
      meta.nalUnitLength = (data[4] & 0x03) + 1;

      var numOfSps = data[5] & 0x1f;
      offset = 6;
      var config = {};

      // parse SPS
      for (var i = 0; i < numOfSps; i++) {
        var size = data[offset] * 255 + data[offset + 1];
        offset += 2;

        var sps = new Uint8Array(size);
        for (var j = 0; j < size; j++) {
          sps[j] = data[offset + j];
        }

        // codec string
        var codecString = 'avc1.';
        for (var _j = 1; _j < 4; _j++) {
          var h = sps[_j].toString(16);
          if (h.length < 2) {
            h = '0' + h;
          }
          codecString += h;
        }

        meta.codec = codecString;

        offset += size;
        this.tracks.videoTrack.meta.sps = sps;
        config = SpsParser.parseSPS(sps);
      }

      var numOfPps = data[offset];

      offset++;

      for (var _i2 = 0; _i2 < numOfPps; _i2++) {
        var _size = data[offset] * 255 + data[offset + 1];
        offset += 2;
        var pps = new Uint8Array(_size);
        for (var _j2 = 0; _j2 < _size; _j2++) {
          pps[_j2] = data[offset + _j2];
        }
        offset += _size;
        this.tracks.videoTrack.meta.pps = pps;
      }

      Object.assign(meta, SpsParser.toVideoMeta(config));

      // fill video media info
      var videoMedia = this._context.mediaInfo.video;

      videoMedia.codec = meta.codec;
      videoMedia.profile = meta.profile;
      videoMedia.level = meta.level;
      videoMedia.chromaFormat = meta.chromaFormat;
      videoMedia.frameRate = meta.frameRate;
      videoMedia.parRatio = meta.parRatio;
      videoMedia.width = videoMedia.width === meta.presentWidth ? videoMedia.width : meta.presentWidth;
      videoMedia.height = videoMedia.height === meta.presentHeight ? videoMedia.width : meta.presentHeight;

      meta.duration = this._context.mediaInfo.duration * meta.timescale;
      meta.avcc = new Uint8Array(data.length);
      meta.avcc.set(data);
      meta.streamType = 0x1b;

      track.meta = meta;
    }

    /**
     * parse hevc metadata
     * @param data
     * @private
     */

  }, {
    key: '_hevcSequenceHeaderParser',
    value: function _hevcSequenceHeaderParser(data) {
      var track = this.tracks.videoTrack;

      if (!track) {
        return;
      }

      var offset = 0;

      if (!track.meta) {
        track.meta = new VideoTrackMeta();
      }
      var meta = track.meta;

      meta.configurationVersion = data[0];
      meta.hevcProfileSpace = (data[1] & 0xc0) >>> 6;
      meta.hevcTierFlag = (data[1] & 0x20) >>> 5;
      meta.hevcProfileIdc = data[1] & 0x1f;
      meta.hevcProfileCompatibilityFlags = [data[2], data[3], data[4], data[5]];
      meta.hevcConstraintIndicatorFlags = [data[6], data[7], data[8], data[9], data[10], data[11]];
      meta.hevcLevelIdc = data[12];
      meta.minSpatialSegmentationIdc = data[13] & 0x0f + data[14] << 4;
      meta.parallelismType = data[15] & 0x03;
      meta.chromaFormat = data[16] & 0x03;
      meta.bitDepthLumaMinus8 = data[17] & 0x07;
      meta.bitDepthChromaMinus8 = data[18] & 0x07;
      meta.avgFrameRate = data[19] * 256 + data[20];
      meta.constantFrameRate = (data[21] & 0xc0) >>> 6;
      meta.numTemporalLayers = (data[21] & 0x38) >>> 3;
      meta.temporalIdNested = (data[21] & 0x04) >>> 2;
      meta.lengthSizeMinusOne = data[21] & 0x03;
      var numOfArrays = data[22];

      offset = 23;
      var config = {};
      var nalUnitType = 0;
      var numNalus = 0;
      var nalUnitSize = 0;
      var hasVPS = false;
      var hasSPS = false;
      var hasPPS = false;
      var vps = void 0,
          sps = void 0,
          pps = void 0;
      for (var i = 0; i < numOfArrays; i++) {
        nalUnitType = data[offset] & 0x3f;
        numNalus = data[offset + 1] * 256 + data[offset + 2];
        offset += 3;
        for (var j = 0; j < numNalus; j++) {
          nalUnitSize = data[offset] * 256 + data[offset + 1];
          switch (nalUnitType) {
            case 32:
              if (!hasVPS) {
                hasVPS = true;
                vps = data.slice(offset + 2, offset + 2 + nalUnitSize);
                this.tracks.videoTrack.meta.vps = SpsParserHEVC._ebsp2rbsp(vps);
              }
              break;
            case 33:
              if (!hasSPS) {
                hasSPS = true;
                sps = data.slice(offset + 2, offset + 2 + nalUnitSize);
                this.tracks.videoTrack.meta.sps = SpsParserHEVC._ebsp2rbsp(sps);
                meta.codec = 'hev1.1.6.L93.B0';
                config = SpsParserHEVC.parseSPS(sps);
              }
              break;
            case 34:
              if (!hasPPS) {
                hasPPS = true;
                pps = data.slice(offset + 2, offset + 2 + nalUnitSize);
                this.tracks.videoTrack.meta.pps = SpsParserHEVC._ebsp2rbsp(pps);
              }
              break;
            case 39:
              // PREFIX_SEI
              break;
            case 40:
              // SUFFIX_SEI
              break;
            default:
              break;
          }
          offset += 2 + nalUnitSize;
        }
      }

      Object.assign(meta, SpsParserHEVC.toVideoMeta(config));

      // fill video media info
      var videoMedia = this._context.mediaInfo.video;

      videoMedia.codec = meta.codec;
      videoMedia.profile = meta.profile;
      videoMedia.level = meta.level;
      videoMedia.chromaFormat = meta.chromaFormat;
      videoMedia.frameRate = meta.frameRate;
      videoMedia.parRatio = meta.parRatio;
      videoMedia.width = videoMedia.width === meta.presentWidth ? videoMedia.width : meta.presentWidth;
      videoMedia.height = videoMedia.height === meta.presentHeight ? videoMedia.width : meta.presentHeight;

      meta.duration = this._context.mediaInfo.duration * meta.timescale;

      meta.streamType = 0x24;

      track.meta = meta;
    }

    /**
     * choose audio sample rate
     * @param samplingFrequencyIndex
     * @returns {number}
     * @private
     */

  }, {
    key: '_switchAudioSampleRate',
    value: function _switchAudioSampleRate(samplingFrequencyIndex) {
      var samplingFrequencyList = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
      return samplingFrequencyList[samplingFrequencyIndex];
    }

    /**
     * choose audio sampling frequence
     * @param info
     * @returns {number}
     * @private
     */

  }, {
    key: '_switchAudioSamplingFrequency',
    value: function _switchAudioSamplingFrequency(info) {
      var samplingFrequencyIndex = (info & 12) >>> 2;
      var samplingFrequencyList = [5500, 11025, 22050, 44100, 48000];
      return samplingFrequencyList[samplingFrequencyIndex];
    }

    /**
     * choose audio channel count
     * @param info
     * @returns {number}
     * @private
     */

  }, {
    key: '_switchAudioChannel',
    value: function _switchAudioChannel(info) {
      var sampleTrackNumIndex = info & 1;
      var sampleTrackNumList = [1, 2];
      return sampleTrackNumList[sampleTrackNumIndex];
    }

    /**
     * check datasize is valid use 4 Byte after current tag
     * @param datasize
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_datasizeValidator',
    value: function _datasizeValidator(datasize) {
      var datasizeConfirm = this.loaderBuffer.toInt(0, 4);
      this.loaderBuffer.shift(4);
      return datasizeConfirm === datasize + 11;
    }
  }, {
    key: 'loaderBuffer',
    get: function get() {
      var buffer = this._context.getInstance('LOADER_BUFFER');
      if (buffer) {
        return buffer;
      } else {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('找不到 loaderBuffer 实例'));
      }
    }
  }, {
    key: 'tracks',
    get: function get() {
      return this._context.getInstance('TRACKS');
    }
  }, {
    key: 'logger',
    get: function get() {
      return this._context.getInstance('LOGGER');
    }
  }], [{
    key: 'isFlvFile',
    value: function isFlvFile(data) {
      return !(data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01);
    }

    /**
     * If the stream has audio or video.
     * @param {number} streamFlag - Data from the stream which is define whether the audio / video track is exist.
     */

  }, {
    key: 'getPlayType',
    value: function getPlayType(streamFlag) {
      var result = {
        hasVideo: false,
        hasAudio: false
      };

      if (streamFlag & 0x01 > 0) {
        result.hasVideo = true;
      }

      if (streamFlag & 0x04 > 0) {
        result.hasAudio = true;
      }

      return result;
    }
  }]);

  return FlvDemuxer;
}();

export default FlvDemuxer;