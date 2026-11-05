// Original xgplayer bridge. FFmpeg remains responsible for format and time indexing.
#include <algorithm>
#include <cerrno>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <limits>
#include <string>
#include <vector>
#include <emscripten.h>

extern "C" {
#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>
#include <libavutil/audio_fifo.h>
#include <libavutil/opt.h>
#include <libswresample/swresample.h>
}

EM_ASYNC_JS(int, source_read, (double offset, int destination, int length), {
  return await Module.readSource(offset, destination, length);
});
EM_JS(int, source_interrupted, (), { return Module.isInterrupted() ? 1 : 0; });

namespace {
constexpr int IO_SIZE = 65536;
constexpr size_t OUTPUT_LIMIT = 8 * 1024 * 1024;
constexpr int CANCELLED = AVERROR_EXIT;
constexpr AVRational SECONDS = {1, AV_TIME_BASE};

class Pipeline {
public:
  int64_t size;
  int64_t cursor = 0;
  AVFormatContext *input = nullptr;
  AVIOContext *reader = nullptr;
  AVFormatContext *output = nullptr;
  AVIOContext *writer = nullptr;
  AVCodecContext *decoder = nullptr;
  AVCodecContext *encoder = nullptr;
  SwrContext *resampler = nullptr;
  AVAudioFifo *fifo = nullptr;
  AVPacket *packet = av_packet_alloc();
  AVPacket *encoded = av_packet_alloc();
  AVFrame *frame = av_frame_alloc();
  AVFrame *converted = av_frame_alloc();
  AVFrame *encoding = av_frame_alloc();
  int audio = -1;
  int kind = 0;
  int outputRate = 0;
  int outputChannels = 0;
  int bitrate = 0;
  int64_t origin = 0;
  int64_t fifoPts = AV_NOPTS_VALUE;
  int64_t nextDecodedPts = AV_NOPTS_VALUE;
  double duration = INFINITY;
  double segmentSeconds = 1;
  double target = 0;
  double bias = 0;
  double fragmentStart = INFINITY;
  double fragmentEnd = 0;
  double resultStart = 0;
  double resultEnd = 0;
  bool copy = false;
  bool inputEnded = false;
  bool decoderDrained = false;
  bool resamplerDrained = false;
  bool encoderFlushed = false;
  bool ended = false;
  bool pendingPacket = false;
  std::vector<uint8_t> bytes;
  std::string error;
  std::string metadata;
  std::string format;
  int rawRate;
  int rawChannels;

  Pipeline(int64_t length, const char *demuxer, int rate, int channels)
      : size(length), format(demuxer), rawRate(rate), rawChannels(channels) {}

  ~Pipeline() {
    resetOutput();
    avformat_close_input(&input);
    if (reader) {
      av_freep(&reader->buffer);
      avio_context_free(&reader);
    }
    av_packet_free(&packet);
    av_packet_free(&encoded);
    av_frame_free(&frame);
    av_frame_free(&converted);
    av_frame_free(&encoding);
  }

  int fail(int code, const char *operation) {
    char description[AV_ERROR_MAX_STRING_SIZE];
    av_strerror(code, description, sizeof(description));
    error = std::string(operation) + ": " + description;
    return code;
  }

  static int read(void *opaque, uint8_t *buffer, int length) {
    auto &p = *static_cast<Pipeline *>(opaque);
    if (source_interrupted()) return CANCELLED;
    if (p.cursor >= p.size) return AVERROR_EOF;
    length = static_cast<int>(std::min<int64_t>(length, p.size - p.cursor));
    int result = source_read(static_cast<double>(p.cursor),
                             reinterpret_cast<intptr_t>(buffer), length);
    if (result > length) return AVERROR(EIO);
    if (result > 0) p.cursor += result;
    return result == 0 ? AVERROR_EOF : result;
  }

  static int64_t seekBytes(void *opaque, int64_t offset, int whence) {
    auto &p = *static_cast<Pipeline *>(opaque);
    if (whence & AVSEEK_SIZE) return p.size;
    whence &= ~AVSEEK_FORCE;
    int64_t base;
    switch (whence) {
      case SEEK_SET: base = 0; break;
      case SEEK_CUR: base = p.cursor; break;
      case SEEK_END: base = p.size; break;
      default: return AVERROR(EINVAL);
    }
    if (offset < -base || offset > p.size - base) return AVERROR(EINVAL);
    p.cursor = base + offset;
    return p.cursor;
  }

  static int interrupt(void *) { return source_interrupted(); }

  static int write(void *opaque, const uint8_t *data, int length) {
    auto &p = *static_cast<Pipeline *>(opaque);
    if (length < 0 || p.bytes.size() + length > OUTPUT_LIMIT) return AVERROR(ENOMEM);
    p.bytes.insert(p.bytes.end(), data, data + length);
    return length;
  }

  int open() {
    av_log_set_level(AV_LOG_ERROR);
    reader = avio_alloc_context(static_cast<uint8_t *>(av_malloc(IO_SIZE)), IO_SIZE,
                                0, this, read, nullptr, seekBytes);
    input = avformat_alloc_context();
    if (!reader || !reader->buffer || !input || !packet || !encoded || !frame ||
        !converted || !encoding) return fail(AVERROR(ENOMEM), "Allocate input");
    reader->seekable = AVIO_SEEKABLE_NORMAL;
    input->pb = reader;
    input->flags |= AVFMT_FLAG_CUSTOM_IO;
    input->interrupt_callback = {interrupt, this};
    input->probesize = 131072;
    input->max_analyze_duration = AV_TIME_BASE;
    AVDictionary *options = nullptr;
    const AVInputFormat *demuxer = nullptr;
    if (!format.empty()) {
      demuxer = av_find_input_format(format.c_str());
      if (!demuxer) return fail(AVERROR_DEMUXER_NOT_FOUND, "Raw audio demuxer");
      av_dict_set_int(&options, "sample_rate", rawRate, 0);
      AVChannelLayout layout;
      av_channel_layout_default(&layout, rawChannels);
      char description[128];
      av_channel_layout_describe(&layout, description, sizeof(description));
      av_dict_set(&options, "ch_layout", description, 0);
      av_channel_layout_uninit(&layout);
    }
    int result = avformat_open_input(&input, nullptr, demuxer, &options);
    av_dict_free(&options);
    if (result < 0) return fail(result, "Open input");
    result = avformat_find_stream_info(input, nullptr);
    if (result < 0) return fail(result, "Probe input");
    audio = av_find_best_stream(input, AVMEDIA_TYPE_AUDIO, -1, -1, nullptr, 0);
    if (audio < 0) return fail(audio, "Select audio");
    const AVStream *stream = input->streams[audio];
    origin = stream->start_time != AV_NOPTS_VALUE ? stream->start_time :
        input->start_time != AV_NOPTS_VALUE
            ? av_rescale_q(input->start_time, SECONDS, stream->time_base) : 0;
    if (input->duration != AV_NOPTS_VALUE)
      duration = static_cast<double>(input->duration) / AV_TIME_BASE;
    else if (stream->duration != AV_NOPTS_VALUE)
      duration = stream->duration * av_q2d(stream->time_base);
    char info[512];
    std::snprintf(info, sizeof(info),
        "{\"duration\":%s,\"codec\":\"%s\",\"sampleRate\":%d,\"channels\":%d}",
        std::isfinite(duration) ? std::to_string(duration).c_str() : "null",
        avcodec_get_name(stream->codecpar->codec_id), stream->codecpar->sample_rate,
        stream->codecpar->ch_layout.nb_channels);
    metadata = info;
    return 0;
  }

  void resetOutput() {
    if (output) {
      output->pb = nullptr;
      avformat_free_context(output);
      output = nullptr;
    }
    if (writer) {
      av_freep(&writer->buffer);
      avio_context_free(&writer);
    }
    avcodec_free_context(&decoder);
    avcodec_free_context(&encoder);
    swr_free(&resampler);
    av_audio_fifo_free(fifo);
    fifo = nullptr;
    av_packet_unref(packet);
    av_packet_unref(encoded);
    av_frame_unref(frame);
    av_frame_unref(converted);
    av_frame_unref(encoding);
    bytes.clear();
    kind = 0;
    fifoPts = AV_NOPTS_VALUE;
    nextDecodedPts = AV_NOPTS_VALUE;
    inputEnded = decoderDrained = resamplerDrained = encoderFlushed = ended = false;
    pendingPacket = false;
    fragmentStart = INFINITY;
    fragmentEnd = 0;
    bias = 0;
  }

  int configure(bool passthrough, int rate, int channels, int bits, double segment) {
    copy = passthrough;
    outputRate = rate;
    outputChannels = channels;
    bitrate = bits;
    segmentSeconds = segment;
    if (copy) {
      if (input->streams[audio]->codecpar->codec_id != AV_CODEC_ID_FLAC)
        return fail(AVERROR(EINVAL), "Unsupported passthrough codec");
      return 0;
    }
    const AVCodecParameters *parameters = input->streams[audio]->codecpar;
    const AVCodec *codec = avcodec_find_decoder(parameters->codec_id);
    if (!codec) return fail(AVERROR_DECODER_NOT_FOUND, "Audio decoder");
    decoder = avcodec_alloc_context3(codec);
    if (!decoder) return fail(AVERROR(ENOMEM), "Allocate decoder");
    int result = avcodec_parameters_to_context(decoder, parameters);
    if (result < 0) return fail(result, "Decoder parameters");
    decoder->pkt_timebase = input->streams[audio]->time_base;
    if ((result = avcodec_open2(decoder, codec, nullptr)) < 0)
      return fail(result, "Open decoder");
    codec = avcodec_find_encoder(AV_CODEC_ID_AAC);
    encoder = avcodec_alloc_context3(codec);
    if (!codec || !encoder) return fail(AVERROR_ENCODER_NOT_FOUND, "AAC encoder");
    if (!rate) {
      const void *supported = nullptr;
      result = avcodec_get_supported_config(encoder, codec, AV_CODEC_CONFIG_SAMPLE_RATE,
                                           0, &supported, nullptr);
      if (result < 0 || !supported) return fail(AVERROR(EINVAL), "AAC sample rates");
      auto rates = static_cast<const int *>(supported);
      outputRate = rates[0];
      for (; *rates; ++rates)
        if (std::abs(*rates - decoder->sample_rate) <
            std::abs(outputRate - decoder->sample_rate)) outputRate = *rates;
    }
    encoder->sample_rate = outputRate;
    encoder->sample_fmt = AV_SAMPLE_FMT_FLTP;
    if (!channels && decoder->ch_layout.order != AV_CHANNEL_ORDER_UNSPEC)
      av_channel_layout_copy(&encoder->ch_layout, &decoder->ch_layout);
    else
      av_channel_layout_default(&encoder->ch_layout,
                                channels ? channels : decoder->ch_layout.nb_channels);
    encoder->time_base = {1, outputRate};
    encoder->bit_rate = bits ? bits : 64000 * encoder->ch_layout.nb_channels;
    encoder->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;
    encoder->profile = AV_PROFILE_AAC_LOW;
    if ((result = avcodec_open2(encoder, codec, nullptr)) < 0)
      return fail(result, "Open AAC encoder");
    fifo = av_audio_fifo_alloc(encoder->sample_fmt, encoder->ch_layout.nb_channels,
                              encoder->frame_size * 2);
    if (!fifo) return fail(AVERROR(ENOMEM), "Allocate audio FIFO");
    return 0;
  }

  int beginMux(const AVPacket *first) {
    AVRational timeBase = copy ? input->streams[audio]->time_base : encoder->time_base;
    int64_t dts = first->dts != AV_NOPTS_VALUE ? first->dts : first->pts;
    if (dts == AV_NOPTS_VALUE) return fail(AVERROR_INVALIDDATA, "Missing output time");
    bias = std::max(0.0, -dts * av_q2d(timeBase));
    int result = avformat_alloc_output_context2(&output, nullptr, "mp4", nullptr);
    if (result < 0 || !output) return fail(result < 0 ? result : AVERROR(ENOMEM), "Muxer");
    writer = avio_alloc_context(static_cast<uint8_t *>(av_malloc(IO_SIZE)), IO_SIZE,
                               1, this, nullptr, write, nullptr);
    if (!writer || !writer->buffer) return fail(AVERROR(ENOMEM), "Output I/O");
    output->pb = writer;
    output->flags |= AVFMT_FLAG_CUSTOM_IO;
    output->avoid_negative_ts = AVFMT_AVOID_NEG_TS_DISABLED;
    AVStream *stream = avformat_new_stream(output, nullptr);
    if (!stream) return fail(AVERROR(ENOMEM), "Output track");
    result = copy ? avcodec_parameters_copy(stream->codecpar, input->streams[audio]->codecpar)
                  : avcodec_parameters_from_context(stream->codecpar, encoder);
    if (result < 0) return fail(result, "Output parameters");
    stream->codecpar->codec_tag = 0;
    stream->time_base = timeBase;
    output->strict_std_compliance = FF_COMPLIANCE_EXPERIMENTAL;
    AVDictionary *options = nullptr;
    av_dict_set(&options, "movflags",
                "empty_moov+default_base_moof+frag_custom+frag_discont+skip_trailer", 0);
    av_dict_set(&options, "use_editlist", "0", 0);
    result = avformat_write_header(output, &options);
    av_dict_free(&options);
    avio_flush(writer);
    if (result < 0 || writer->error)
      return fail(result < 0 ? result : writer->error, "Write init segment");
    kind = 1;
    resultStart = resultEnd = 0;
    return kind;
  }

  int flushFragment() {
    int result = av_write_frame(output, nullptr);
    avio_flush(writer);
    if (result < 0 || writer->error)
      return fail(result < 0 ? result : writer->error, "Flush fragment");
    if (bytes.empty()) return 0;
    kind = 2;
    resultStart = fragmentStart;
    resultEnd = fragmentEnd;
    fragmentStart = INFINITY;
    return kind;
  }

  int writePacket() {
    AVRational timeBase = copy ? input->streams[audio]->time_base : encoder->time_base;
    auto &p = *encoded;
    if (p.pts == AV_NOPTS_VALUE || p.duration <= 0)
      return fail(AVERROR_INVALIDDATA, "Missing audio packet timeline");
    double start = p.pts * av_q2d(timeBase);
    fragmentStart = std::min(fragmentStart, start);
    fragmentEnd = (p.pts + p.duration) * av_q2d(timeBase);
    const int64_t shift = std::llround(bias / av_q2d(timeBase));
    p.pts += shift;
    if (p.dts != AV_NOPTS_VALUE) p.dts += shift;
    av_packet_rescale_ts(&p, timeBase, output->streams[0]->time_base);
    p.stream_index = 0;
    int result = av_interleaved_write_frame(output, &p);
    av_packet_unref(encoded);
    pendingPacket = false;
    if (result < 0) return fail(result, "Write audio packet");
    return fragmentEnd - fragmentStart >= segmentSeconds ? flushFragment() : 0;
  }

  int convertFrame() {
    int result;
    if (!resampler) {
      result = swr_alloc_set_opts2(&resampler, &encoder->ch_layout, encoder->sample_fmt,
          outputRate, &frame->ch_layout, static_cast<AVSampleFormat>(frame->format),
          frame->sample_rate, 0, nullptr);
      if (result < 0 || (result = swr_init(resampler)) < 0)
        return fail(result, "Audio resampler");
    }
    int64_t pts = frame->best_effort_timestamp;
    if (pts == AV_NOPTS_VALUE) pts = frame->pts;
    // Decoders may drain delayed samples without PTS. Continue the sample clock
    // anchored by a real decoded timestamp, never by the requested seek target.
    int64_t samplePts = pts == AV_NOPTS_VALUE ? nextDecodedPts :
        av_rescale_q(pts - origin, input->streams[audio]->time_base, encoder->time_base);
    if (samplePts == AV_NOPTS_VALUE)
      return fail(AVERROR_INVALIDDATA, "Missing decoded time origin");
    nextDecodedPts = samplePts + av_rescale_q(frame->nb_samples,
        AVRational{1, frame->sample_rate}, encoder->time_base);
    samplePts -= swr_get_delay(resampler, outputRate);
    const int samples = swr_get_out_samples(resampler, frame->nb_samples);
    result = allocateFrame(converted, samples);
    if (result < 0) return result;
    result = swr_convert(resampler, converted->extended_data, samples,
                         const_cast<const uint8_t **>(frame->extended_data),
                         frame->nb_samples);
    if (result < 0) return fail(result, "Resample frame");
    // Keep decode/encode pre-roll before the user target. Initial negative source
    // samples are excluded; AAC delay is represented by its actual packet DTS.
    int skip = static_cast<int>(std::min<int64_t>(result, std::max<int64_t>(0, -samplePts)));
    for (int channel = 0; channel < encoder->ch_layout.nb_channels; ++channel)
      converted->extended_data[channel] += skip * sizeof(float);
    if (fifoPts == AV_NOPTS_VALUE && result > skip) fifoPts = samplePts + skip;
    int written = av_audio_fifo_write(fifo, reinterpret_cast<void **>(converted->extended_data),
                                     result - skip);
    av_frame_unref(converted);
    av_frame_unref(frame);
    return written == result - skip ? 0 : fail(AVERROR(ENOMEM), "Buffer samples");
  }

  int allocateFrame(AVFrame *destination, int samples) {
    av_frame_unref(destination);
    destination->format = encoder->sample_fmt;
    destination->sample_rate = outputRate;
    av_channel_layout_copy(&destination->ch_layout, &encoder->ch_layout);
    destination->nb_samples = samples;
    int result = av_frame_get_buffer(destination, 0);
    return result < 0 ? fail(result, "Allocate samples") : 0;
  }

  int feedEncoder() {
    int samples = std::min(av_audio_fifo_size(fifo), encoder->frame_size);
    int result = allocateFrame(encoding, samples);
    if (result < 0) return result;
    if (av_audio_fifo_read(fifo, reinterpret_cast<void **>(encoding->extended_data),
                           samples) != samples)
      return fail(AVERROR(EIO), "Read samples");
    encoding->pts = fifoPts;
    fifoPts += samples;
    result = avcodec_send_frame(encoder, encoding);
    av_frame_unref(encoding);
    return result < 0 ? fail(result, "Encode frame") : 0;
  }

  int drainResampler() {
    if (!resampler) { resamplerDrained = true; return 0; }
    int samples = std::min(4096, swr_get_out_samples(resampler, 0));
    if (!samples) { resamplerDrained = true; return 0; }
    int result = allocateFrame(converted, samples);
    if (result < 0) return result;
    result = swr_convert(resampler, converted->extended_data, samples, nullptr, 0);
    if (result < 0) return fail(result, "Drain resampler");
    if (!result) resamplerDrained = true;
    else if (av_audio_fifo_write(fifo, reinterpret_cast<void **>(converted->extended_data),
                                result) != result)
      return fail(AVERROR(ENOMEM), "Drain samples");
    av_frame_unref(converted);
    return 0;
  }

  int pull() {
    if (kind) return kind;
    if (ended) return 3;
    int packetBytes = 0;
    // Return to JS even for cached I/O. No native invocation owns an entire segment.
    for (int steps = 0; steps < 64 && packetBytes < 262144; ++steps) {
      if (source_interrupted()) return fail(CANCELLED, "Cancelled");
      if (pendingPacket) {
        if (!output) return beginMux(encoded);
        int result = writePacket();
        if (result) return result;
        continue;
      }
      if (copy) {
        int result = av_read_frame(input, encoded);
        if (result == AVERROR_EOF) {
          ended = true;
          return output ? flushFragment() : 3;
        }
        if (result < 0) return fail(result, "Read audio");
        packetBytes += encoded->size;
        if (encoded->stream_index != audio) { av_packet_unref(encoded); continue; }
        if (encoded->pts != AV_NOPTS_VALUE) encoded->pts -= origin;
        if (encoded->dts != AV_NOPTS_VALUE) encoded->dts -= origin;
        pendingPacket = true;
        continue;
      }
      int result = avcodec_receive_packet(encoder, encoded);
      if (result == 0) { pendingPacket = true; continue; }
      if (result == AVERROR_EOF) {
        ended = true;
        return output ? flushFragment() : 3;
      }
      if (result != AVERROR(EAGAIN)) return fail(result, "Receive encoded audio");
      if (av_audio_fifo_size(fifo) >= encoder->frame_size ||
          (resamplerDrained && av_audio_fifo_size(fifo))) {
        if ((result = feedEncoder()) < 0) return result;
        continue;
      }
      if (decoderDrained) {
        if (!resamplerDrained) {
          if ((result = drainResampler()) < 0) return result;
        } else if (!encoderFlushed) {
          result = avcodec_send_frame(encoder, nullptr);
          if (result < 0) return fail(result, "Drain encoder");
          encoderFlushed = true;
        } else return fail(AVERROR_BUG, "Encoder drain stalled");
        continue;
      }
      result = avcodec_receive_frame(decoder, frame);
      if (result == 0) {
        if ((result = convertFrame()) < 0) return result;
        continue;
      }
      if (result == AVERROR_EOF) { decoderDrained = true; continue; }
      if (result != AVERROR(EAGAIN)) return fail(result, "Decode audio");
      if (inputEnded) return fail(AVERROR_BUG, "Decoder drain stalled");
      result = av_read_frame(input, packet);
      if (result == AVERROR_EOF) {
        inputEnded = true;
        result = avcodec_send_packet(decoder, nullptr);
      } else if (result >= 0) {
        packetBytes += packet->size;
        if (packet->stream_index == audio) result = avcodec_send_packet(decoder, packet);
        av_packet_unref(packet);
      }
      if (result < 0) return fail(result, "Read/decode packet");
    }
    return 0;
  }

  int seekTime(double time) {
    const bool mode = copy;
    const int rate = outputRate, channels = outputChannels, bits = bitrate;
    resetOutput();
    // AVERROR_EXIT survives in AVIO. Clear it explicitly before reusing demux state.
    reader->error = 0;
    reader->eof_reached = 0;
    avformat_flush(input);
    const AVStream *stream = input->streams[audio];
    const double preRoll = std::max(0.25,
        stream->codecpar->sample_rate > 0
            ? static_cast<double>(stream->codecpar->seek_preroll) /
                  stream->codecpar->sample_rate : 0.0);
    int64_t position = origin + av_rescale_q(
        std::llround(std::max(0.0, time - preRoll) * AV_TIME_BASE), SECONDS,
        stream->time_base);
    int result = avformat_seek_file(input, audio, INT64_MIN, position, position, 0);
    if (result < 0) return fail(result, "Seek input");
    target = time;
    return configure(mode, rate, channels, bits, segmentSeconds);
  }
};
}

extern "C" {
EMSCRIPTEN_KEEPALIVE Pipeline *xp_create(double size, const char *format, int rate, int channels) {
  return new Pipeline(static_cast<int64_t>(size), format, rate, channels);
}
EMSCRIPTEN_KEEPALIVE void xp_close(Pipeline *p) { delete p; }
EMSCRIPTEN_KEEPALIVE int xp_open(Pipeline *p) { return p->open(); }
EMSCRIPTEN_KEEPALIVE const char *xp_metadata(Pipeline *p) { return p->metadata.c_str(); }
EMSCRIPTEN_KEEPALIVE const char *xp_error(Pipeline *p) { return p->error.c_str(); }
EMSCRIPTEN_KEEPALIVE int xp_configure(Pipeline *p, int copy, int rate, int channels,
                                     int bitrate, double segment) {
  return p->configure(copy, rate, channels, bitrate, segment);
}
EMSCRIPTEN_KEEPALIVE int xp_pull(Pipeline *p) { return p->pull(); }
EMSCRIPTEN_KEEPALIVE int xp_seek(Pipeline *p, double time) { return p->seekTime(time); }
EMSCRIPTEN_KEEPALIVE uint8_t *xp_data(Pipeline *p) { return p->bytes.data(); }
EMSCRIPTEN_KEEPALIVE int xp_length(Pipeline *p) { return p->bytes.size(); }
EMSCRIPTEN_KEEPALIVE double xp_start(Pipeline *p) { return p->resultStart; }
EMSCRIPTEN_KEEPALIVE double xp_end(Pipeline *p) { return p->resultEnd; }
EMSCRIPTEN_KEEPALIVE double xp_bias(Pipeline *p) { return p->bias; }
EMSCRIPTEN_KEEPALIVE int xp_rate(Pipeline *p) {
  return p->copy ? p->input->streams[p->audio]->codecpar->sample_rate : p->encoder->sample_rate;
}
EMSCRIPTEN_KEEPALIVE int xp_channels(Pipeline *p) {
  return p->copy ? p->input->streams[p->audio]->codecpar->ch_layout.nb_channels
                 : p->encoder->ch_layout.nb_channels;
}
EMSCRIPTEN_KEEPALIVE void xp_release(Pipeline *p) { p->bytes.clear(); p->kind = 0; }
}
