var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable camelcase  */
/* eslint-disable one-var  */
import Golomb from './golomb';

var SPSParser = function () {
  function SPSParser() {
    _classCallCheck(this, SPSParser);
  }

  _createClass(SPSParser, null, [{
    key: '_ebsp2rbsp',
    value: function _ebsp2rbsp(uint8array) {
      var src = uint8array;
      var srcLength = src.byteLength;
      var dst = new Uint8Array(srcLength);
      var dstIdx = 0;

      for (var i = 0; i < srcLength; i++) {
        if (i >= 2) {
          if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
            continue;
          }
        }
        dst[dstIdx] = src[i];
        dstIdx++;
      }

      return new Uint8Array(dst.buffer, 0, dstIdx);
    }
  }, {
    key: 'parseSPS',
    value: function parseSPS(uint8array) {
      var rbsp = SPSParser._ebsp2rbsp(uint8array);
      var gb = new Golomb(rbsp);

      gb.readByte();
      var profileIdc = gb.readByte();
      gb.readByte();
      var levelIdc = gb.readByte();
      gb.readUEG();

      var profile_string = SPSParser.getProfileString(profileIdc);
      var level_string = SPSParser.getLevelString(levelIdc);
      var chroma_format_idc = 1;
      var chroma_format = 420;
      var chroma_format_table = [0, 420, 422, 444];
      var bit_depth = 8;

      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128 || profileIdc === 138 || profileIdc === 144) {
        chroma_format_idc = gb.readUEG();
        if (chroma_format_idc === 3) {
          gb.readBits(1);
        }
        if (chroma_format_idc <= 3) {
          chroma_format = chroma_format_table[chroma_format_idc];
        }

        bit_depth = gb.readUEG() + 8;
        gb.readUEG();
        gb.readBits(1);
        if (gb.readBool()) {
          var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
          for (var i = 0; i < scaling_list_count; i++) {
            if (gb.readBool()) {
              if (i < 6) {
                SPSParser._skipScalingList(gb, 16);
              } else {
                SPSParser._skipScalingList(gb, 64);
              }
            }
          }
        }
      }
      gb.readUEG();
      var pic_order_cnt_type = gb.readUEG();
      if (pic_order_cnt_type === 0) {
        gb.readUEG();
      } else if (pic_order_cnt_type === 1) {
        gb.readBits(1);
        gb.readSEG();
        gb.readSEG();
        var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
        for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
          gb.readSEG();
        }
      }
      gb.readUEG();
      gb.readBits(1);

      var pic_width_in_mbs_minus1 = gb.readUEG();
      var pic_height_in_map_units_minus1 = gb.readUEG();

      var frame_mbs_only_flag = gb.readBits(1);
      if (frame_mbs_only_flag === 0) {
        gb.readBits(1);
      }
      gb.readBits(1);

      var frame_crop_left_offset = 0;
      var frame_crop_right_offset = 0;
      var frame_crop_top_offset = 0;
      var frame_crop_bottom_offset = 0;

      var frame_cropping_flag = gb.readBool();
      if (frame_cropping_flag) {
        frame_crop_left_offset = gb.readUEG();
        frame_crop_right_offset = gb.readUEG();
        frame_crop_top_offset = gb.readUEG();
        frame_crop_bottom_offset = gb.readUEG();
      }

      var par_width = 1,
          par_height = 1;
      var fps = 0,
          fps_fixed = true,
          fps_num = 0,
          fps_den = 0;

      var vui_parameters_present_flag = gb.readBool();
      if (vui_parameters_present_flag) {
        if (gb.readBool()) {
          // aspect_ratio_info_present_flag
          var aspect_ratio_idc = gb.readByte();
          var par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
          var par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

          if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
            par_width = par_w_table[aspect_ratio_idc - 1];
            par_height = par_h_table[aspect_ratio_idc - 1];
          } else if (aspect_ratio_idc === 255) {
            par_width = gb.readByte() << 8 | gb.readByte();
            par_height = gb.readByte() << 8 | gb.readByte();
          }
        }

        if (gb.readBool()) {
          gb.readBool();
        }
        if (gb.readBool()) {
          gb.readBits(4);
          if (gb.readBool()) {
            gb.readBits(24);
          }
        }
        if (gb.readBool()) {
          gb.readUEG();
          gb.readUEG();
        }
        if (gb.readBool()) {
          var num_units_in_tick = gb.readBits(32);
          var time_scale = gb.readBits(32);
          fps_fixed = gb.readBool();

          fps_num = time_scale;
          fps_den = num_units_in_tick * 2;
          fps = fps_num / fps_den;
        }
      }

      var parScale = 1;
      if (par_width !== 1 || par_height !== 1) {
        parScale = par_width / par_height;
      }

      var crop_unit_x = 0,
          crop_unit_y = 0;
      if (chroma_format_idc === 0) {
        crop_unit_x = 1;
        crop_unit_y = 2 - frame_mbs_only_flag;
      } else {
        var sub_wc = chroma_format_idc === 3 ? 1 : 2;
        var sub_hc = chroma_format_idc === 1 ? 2 : 1;
        crop_unit_x = sub_wc;
        crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
      }

      var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
      var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

      codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
      codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

      var present_width = Math.ceil(codec_width * parScale);

      gb.destroy();
      gb = null;

      return {
        profile_string: profile_string,
        level_string: level_string,
        bit_depth: bit_depth,
        chroma_format: chroma_format,
        chroma_format_string: SPSParser.getChromaFormatString(chroma_format),

        frame_rate: {
          fixed: fps_fixed,
          fps: fps,
          fps_den: fps_den,
          fps_num: fps_num
        },

        par_ratio: {
          width: par_width,
          height: par_height
        },

        codec_size: {
          width: codec_width,
          height: codec_height
        },

        present_size: {
          width: present_width,
          height: codec_height
        }
      };
    }
  }, {
    key: '_skipScalingList',
    value: function _skipScalingList(gb, count) {
      var last_scale = 8,
          next_scale = 8;
      var delta_scale = 0;
      for (var i = 0; i < count; i++) {
        if (next_scale !== 0) {
          delta_scale = gb.readSEG();
          next_scale = (last_scale + delta_scale + 256) % 256;
        }
        last_scale = next_scale === 0 ? last_scale : next_scale;
      }
    }
  }, {
    key: 'getProfileString',
    value: function getProfileString(profileIdc) {
      switch (profileIdc) {
        case 66:
          return 'Baseline';
        case 77:
          return 'Main';
        case 88:
          return 'Extended';
        case 100:
          return 'High';
        case 110:
          return 'High10';
        case 122:
          return 'High422';
        case 244:
          return 'High444';
        default:
          return 'Unknown';
      }
    }
  }, {
    key: 'getLevelString',
    value: function getLevelString(levelIdc) {
      return (levelIdc / 10).toFixed(1);
    }
  }, {
    key: 'getChromaFormatString',
    value: function getChromaFormatString(chroma) {
      switch (chroma) {
        case 420:
          return '4:2:0';
        case 422:
          return '4:2:2';
        case 444:
          return '4:4:4';
        default:
          return 'Unknown';
      }
    }
  }, {
    key: 'toVideoMeta',
    value: function toVideoMeta(spsConfig) {
      var meta = {};
      if (spsConfig && spsConfig.codec_size) {
        meta.codecWidth = spsConfig.codec_size.width;
        meta.codecHeight = spsConfig.codec_size.height;
        meta.presentWidth = spsConfig.present_size.width;
        meta.presentHeight = spsConfig.present_size.height;
      }

      meta.profile = spsConfig.profile_string;
      meta.level = spsConfig.level_string;
      meta.bitDepth = spsConfig.bit_depth;
      meta.chromaFormat = spsConfig.chroma_format;

      meta.parRatio = {
        width: spsConfig.par_ratio.width,
        height: spsConfig.par_ratio.height
      };

      meta.frameRate = spsConfig.frame_rate;

      var fpsDen = meta.frameRate.fps_den;
      var fpsNum = meta.frameRate.fps_num;
      meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum));
    }
  }]);

  return SPSParser;
}();

export default SPSParser;