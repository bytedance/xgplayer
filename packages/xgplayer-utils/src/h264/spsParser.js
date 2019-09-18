/* eslint-disable camelcase  */
/* eslint-disable one-var  */
import Golomb from './golomb'

class SpsParser {
  static _ebsp2rbsp (uint8array) {
    let src = uint8array
    let srcLength = src.byteLength
    let dst = new Uint8Array(srcLength)
    let dstIdx = 0

    for (let i = 0; i < srcLength; i++) {
      if (i >= 2) {
        if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
          continue
        }
      }
      dst[dstIdx] = src[i]
      dstIdx++
    }

    return new Uint8Array(dst.buffer, 0, dstIdx)
  }

  static parseSPS (uint8array) {
    let rbsp = SpsParser._ebsp2rbsp(uint8array)
    let gb = new Golomb(rbsp)

    gb.readByte()
    let profileIdc = gb.readByte()
    gb.readByte()
    let levelIdc = gb.readByte()
    gb.readUEG()

    let profile_string = SpsParser.getProfileString(profileIdc)
    let level_string = SpsParser.getLevelString(levelIdc)
    let chroma_format_idc = 1
    let chroma_format = 420
    let chroma_format_table = [0, 420, 422, 444]
    let bit_depth = 8

    if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 ||
      profileIdc === 244 || profileIdc === 44 || profileIdc === 83 ||
      profileIdc === 86 || profileIdc === 118 || profileIdc === 128 ||
      profileIdc === 138 || profileIdc === 144) {
      chroma_format_idc = gb.readUEG()
      if (chroma_format_idc === 3) {
        gb.readBits(1)
      }
      if (chroma_format_idc <= 3) {
        chroma_format = chroma_format_table[chroma_format_idc]
      }

      bit_depth = gb.readUEG() + 8
      gb.readUEG()
      gb.readBits(1)
      if (gb.readBool()) {
        let scaling_list_count = (chroma_format_idc !== 3) ? 8 : 12
        for (let i = 0; i < scaling_list_count; i++) {
          if (gb.readBool()) {
            if (i < 6) {
              SpsParser._skipScalingList(gb, 16)
            } else {
              SpsParser._skipScalingList(gb, 64)
            }
          }
        }
      }
    }
    gb.readUEG()
    let pic_order_cnt_type = gb.readUEG()
    if (pic_order_cnt_type === 0) {
      gb.readUEG()
    } else if (pic_order_cnt_type === 1) {
      gb.readBits(1)
      gb.readSEG()
      gb.readSEG()
      let num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG()
      for (let i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
        gb.readSEG()
      }
    }
    gb.readUEG()
    gb.readBits(1)

    let pic_width_in_mbs_minus1 = gb.readUEG()
    let pic_height_in_map_units_minus1 = gb.readUEG()

    let frame_mbs_only_flag = gb.readBits(1)
    if (frame_mbs_only_flag === 0) {
      gb.readBits(1)
    }
    gb.readBits(1)

    let frame_crop_left_offset = 0
    let frame_crop_right_offset = 0
    let frame_crop_top_offset = 0
    let frame_crop_bottom_offset = 0

    let frame_cropping_flag = gb.readBool()
    if (frame_cropping_flag) {
      frame_crop_left_offset = gb.readUEG()
      frame_crop_right_offset = gb.readUEG()
      frame_crop_top_offset = gb.readUEG()
      frame_crop_bottom_offset = gb.readUEG()
    }

    let sar_width = 1, sar_height = 1
    let fps = 0, fps_fixed = true, fps_num = 0, fps_den = 0

    let vui_parameters_present_flag = gb.readBool()
    if (vui_parameters_present_flag) {
      if (gb.readBool()) { // aspect_ratio_info_present_flag
        let aspect_ratio_idc = gb.readByte()
        let sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2]
        let sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1]

        if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
          sar_width = sar_w_table[aspect_ratio_idc - 1]
          sar_height = sar_h_table[aspect_ratio_idc - 1]
        } else if (aspect_ratio_idc === 255) {
          sar_width = gb.readByte() << 8 | gb.readByte()
          sar_height = gb.readByte() << 8 | gb.readByte()
        }
      }

      if (gb.readBool()) {
        gb.readBool()
      }
      if (gb.readBool()) {
        gb.readBits(4)
        if (gb.readBool()) {
          gb.readBits(24)
        }
      }
      if (gb.readBool()) {
        gb.readUEG()
        gb.readUEG()
      }
      if (gb.readBool()) {
        let num_units_in_tick = gb.readBits(32)
        let time_scale = gb.readBits(32)
        fps_fixed = gb.readBool()

        fps_num = time_scale
        fps_den = num_units_in_tick * 2
        fps = fps_num / fps_den
      }
    }

    let sarScale = 1
    if (sar_width !== 1 || sar_height !== 1) {
      sarScale = sar_width / sar_height
    }

    let crop_unit_x = 0, crop_unit_y = 0
    if (chroma_format_idc === 0) {
      crop_unit_x = 1
      crop_unit_y = 2 - frame_mbs_only_flag
    } else {
      let sub_wc = (chroma_format_idc === 3) ? 1 : 2
      let sub_hc = (chroma_format_idc === 1) ? 2 : 1
      crop_unit_x = sub_wc
      crop_unit_y = sub_hc * (2 - frame_mbs_only_flag)
    }

    let codec_width = (pic_width_in_mbs_minus1 + 1) * 16
    let codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16)

    codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x
    codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y

    let present_width = Math.ceil(codec_width * sarScale)

    gb.destroy()
    gb = null

    return {
      profile_string: profile_string,
      level_string: level_string,
      bit_depth: bit_depth,
      chroma_format: chroma_format,
      chroma_format_string: SpsParser.getChromaFormatString(chroma_format),

      frame_rate: {
        fixed: fps_fixed,
        fps: fps,
        fps_den: fps_den,
        fps_num: fps_num
      },

      sar_ratio: {
        width: sar_width,
        height: sar_height
      },

      codec_size: {
        width: codec_width,
        height: codec_height
      },

      present_size: {
        width: present_width,
        height: codec_height
      }
    }
  }

  static _skipScalingList (gb, count) {
    let last_scale = 8, next_scale = 8
    let delta_scale = 0
    for (let i = 0; i < count; i++) {
      if (next_scale !== 0) {
        delta_scale = gb.readSEG()
        next_scale = (last_scale + delta_scale + 256) % 256
      }
      last_scale = (next_scale === 0) ? last_scale : next_scale
    }
  }

  static getProfileString (profileIdc) {
    switch (profileIdc) {
      case 66:
        return 'Baseline'
      case 77:
        return 'Main'
      case 88:
        return 'Extended'
      case 100:
        return 'High'
      case 110:
        return 'High10'
      case 122:
        return 'High422'
      case 244:
        return 'High444'
      default:
        return 'Unknown'
    }
  }

  static getLevelString (levelIdc) {
    return (levelIdc / 10).toFixed(1)
  }

  static getChromaFormatString (chroma) {
    switch (chroma) {
      case 420:
        return '4:2:0'
      case 422:
        return '4:2:2'
      case 444:
        return '4:4:4'
      default:
        return 'Unknown'
    }
  }

  static toVideoMeta (spsConfig) {
    let meta = {}
    if (spsConfig && spsConfig.codec_size) {
      meta.codecWidth = spsConfig.codec_size.width
      meta.codecHeight = spsConfig.codec_size.height
      meta.presentWidth = spsConfig.present_size.width
      meta.presentHeight = spsConfig.present_size.height
    }

    meta.profile = spsConfig.profile_string
    meta.level = spsConfig.level_string
    meta.bitDepth = spsConfig.bit_depth
    meta.chromaFormat = spsConfig.chroma_format

    meta.sarRatio = {
      width: spsConfig.sar_ratio.width,
      height: spsConfig.sar_ratio.height
    }

    if (spsConfig.frame_rate.fixed && spsConfig.frame_rate.fps_num > 0 && spsConfig.frame_rate.fps_den > 0) {
      meta.frameRate = spsConfig.frame_rate
    }

    let fpsDen = meta.frameRate.fps_den
    let fpsNum = meta.frameRate.fps_num
    meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum))
  }
}

export default SpsParser
