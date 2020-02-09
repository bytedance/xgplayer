import EventEmitter from 'events'
class AudioCtx extends EventEmitter {
  constructor (config) {
    super();
    this.config = Object.assign({}, config);
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
    this.meta = undefined;
    this.samples = [];
    this.preloadTime = this.config.preloadTime || 3;
    this.duration = 0;

    this._currentBuffer = undefined;
    this._nextBuffer = undefined;
    this._lastpts = undefined;
    this._preDecode = [];
    this._currentTime = 0;
    this._decoding = false;
    this._volume = this.config.volume || 0.6

    // 记录外部传输的状态
    this._played = false;
    this.paused = true;
    this.playFinish = null; // pending play task
    this.waitNextID = null; // audio source end and next source not loaded
  }

  get currentTime () {
    return this._currentTime;
  }

  decodeAudio (audioTrack) {
    let {samples, meta} = audioTrack;
    let data = samples;
    audioTrack.samples = [];
    if (meta) {
      this.setAudioData(data);
    }
  }
  setAudioData (data) {
    for (let i = 0; i < data.length; i++) {
      data[i].pts = (data[i].pts === undefined) ? data[i].dts : data[i].pts;
      this._preDecode.push(data[i]);
    }
    if (this._preDecode.length > 0) {
      if (this._lastpts === undefined) {
        this._lastpts = this._preDecode[0].pts;
      }
      if ((this._preDecode[this._preDecode.length - 1].pts - this._lastpts) / 1000 > this.preloadTime) {
        this.decodeAAC();
      }
    }
  }

  decodeAAC () {
    if (this._decoding) {
      return;
    }
    this._decoding = true;
    let data = this._preDecode;
    let samples = [];
    let _this = this;
    let sample = data.shift();
    while (sample) {
      let sampleData = AudioCtx.getAACData(this.meta, sample)
      samples.push(sampleData);
      this._lastpts = sample.pts;
      sample = data.shift()
    }
    let buffer = AudioCtx.combileData(samples);
    try {
      this.context.decodeAudioData(buffer.buffer, function (buffer) {
        let audioSource = _this.context.createBufferSource();
        audioSource.buffer = buffer;
        // audioSource.onended = _this.onSourceEnded.bind(_this);
        _this.samples.push({
          time: _this.duration,
          duration: buffer.duration,
          data: audioSource
        })

        _this.duration += buffer.duration;

        if (!_this._currentBuffer) {
          _this._currentBuffer = _this.getTimeBuffer(_this.currentTime);
        }

        if (!_this._nextBuffer && _this._currentBuffer) {
          _this._nextBuffer = _this.getTimeBuffer(_this.currentTime + _this._currentBuffer.duration);
        }
        _this._decoding = false;

        if ((_this._preDecode.length > 0 && _this._preDecode[_this._preDecode.length - 1].pts - _this._lastpts) / 1000 >= _this.preloadTime) {
          _this.decodeAAC();
        }

        if (_this.playFinish) {
          _this.playFinish()
        }
      }, (e) => {
        console.error(e)
      })
    } catch (err) {
      console.error(err);
    }
  }

  onSourceEnded () {
    if (this.paused) {
      return;
    }
    if (!this._nextBuffer || !this._played) {
      this.waitNextID = setTimeout(() => {
        this.onSourceEnded();
      }, 200);
      return;
    }
    let audioSource = this._nextBuffer.data;
    audioSource.start();
    audioSource.connect(this.gainNode);
    let _this = this;
    this.waitNextID = setTimeout(() => {
      _this.onSourceEnded.call(this);
    }, audioSource.buffer.duration * 1000 - 10);
    this._currentBuffer = this._nextBuffer;
    this._currentTime = this._currentBuffer.time;
    this._nextBuffer = this.getTimeBuffer(this.currentTime);
    if (this._currentBuffer) {
      this._nextBuffer = this.getTimeBuffer(this.currentTime + this._currentBuffer.duration);
    }
    this.emit('AUDIO_SOURCE_END')
  }

  play () {
    if (this.playFinish) {
      return;
    }
    this._played = true;
    if (this.context.state === 'suspended') {
      this.context.resume()
    }
    let _this = this;
    const playStart = () => {
      let audioSource = this._currentBuffer.data;
      audioSource.start();
      audioSource.connect(this.gainNode);
      this.paused  = false;
      setTimeout(() => {
        _this.onSourceEnded.call(this);
      }, audioSource.buffer.duration * 1000 - 20);
    }

    if (!this._currentBuffer) {
      return new Promise((resolve) => {
        this.playFinish = resolve;
      }).then(() => {
        this.playFinish = null;
        playStart()
      });
    } else {
      playStart();
      return Promise.resolve()
    }
  }

  pause () {
    const audioCtx = this.context;
    if (audioCtx.state === 'running') {
      audioCtx.suspend()
    }
    this.paused = true;
  }

  getTimeBuffer (time) {
    let ret;
    for (let i = 0; i < this.samples.length; i++) {
      let sample = this.samples[i]
      if (sample.time <= time && (sample.time + sample.duration) > time) {
        ret = sample;
        break;
      }
    }
    return ret;
  }

  setAudioMetaData (meta) {
    this.meta = meta;
  }

  destroy () {
    if (this.waitNextID) {
      window.clearTimeout(this.waitNextID)
    }
    this.paused = true;
    this.context.close();
  }

  set muted (val) {
    if (val) {
      this.gainNode.gain.value = 0
    } else {
      this.gainNode.gain.value = this._volume
    }
    if (this.context.state === 'suspended' && !this.paused) {
      this.context.resume()
    }
  }

  get volume () {
    if (this.context.state === 'suspended' || this.paused) {
      return 0;
    }
    return this._volume
  }

  set volume (val) {
    if (val < 0) {
      this._volume = 0;
      this.gainNode.gain.value = 0
      return;
    } else if (val > 1) {
      this._volume = 1;
      this.gainNode.gain.value = 1
      return;
    }

    this._volume = val;
    this.gainNode.gain.value = val
  }

  static getAACData (meta, sample) {
    let buffer = new Uint8Array(sample.data.byteLength + 7);
    let adts = AudioCtx.getAdts(meta, sample.data);
    buffer.set(adts);
    buffer.set(sample.data, 7);
    return buffer;
  }

  static combileData (samples) {
    // get length
    let length = 0;
    for (let i = 0, k = samples.length; i < k; i++) {
      length += samples[i].byteLength;
    }

    let ret = new Uint8Array(length);
    let offset = 0;
    // combile data;
    for (let i = 0, k = samples.length; i < k; i++) {
      ret.set(samples[i], offset);
      offset += samples[i].byteLength;
    }
    return ret;
  }

  static getAdts (meta, data) {
    let adts = new Uint8Array(7);

    // 设置同步位 0xfff 12bit
    adts[0] = 0xff;
    adts[1] = 0xf0;

    // Object data (没什么人用MPEG-2了，HLS和FLV也全是MPEG-4，这里直接0)  1bit
    // Level always 00 2bit
    // CRC always 1 1bit
    adts[1] = adts[1] | 0x01;

    // profile 2bit
    adts[2] = 0xc0 & ((meta.objectType - 1) << 6);

    // sampleFrequencyIndex
    adts[2] = adts[2] | (0x3c & (meta.sampleRateIndex << 2))

    // private bit 0 1bit
    // chanel configuration 3bit
    adts[2] = adts[2] | (0x01 & meta.channelCount >> 2);
    adts[3] = 0xc0 & (meta.channelCount << 6);

    // original_copy: 0 1bit
    // home: 0 1bit

    // adts_variable_header()
    // copyrighted_id_bit 0 1bit
    // copyrighted_id_start 0 1bit

    // aac_frame_length 13bit;
    let aacframelength = data.byteLength + 7;

    adts[3] = adts[3] | (0x03 & aacframelength >> 11);
    adts[4] = 0xff & (aacframelength >> 3);
    adts[5] = 0xe0 & (aacframelength << 5);

    // adts_buffer_fullness 0x7ff 11bit
    adts[5] = adts[5] | 0x1f
    adts[6] = 0xfc;

    // number_of_raw_data_blocks_in_frame 0 2bit;
    return adts;
  }
}

export default AudioCtx;
