import Golomb from './golomb'

class SPSParser {
  /**
   *
   * @param {Uint8Array} uint8array
   * @return {Uint8Array}
   */
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

  /**
   * @param {Uint8Array} uint8array
   * @return {{width: *, general_profile_idc: number, chromaFormatIdc: *, general_level_idc: number, general_tier_flag: number, bitDepthLumaMinus8: (*|number), bitDepthChromaMinus8: (*|number), general_profile_space: number, height: *}}
   */
  static parseSPS (uint8array) {
    let rbsp = SPSParser._ebsp2rbsp(uint8array)
    let gb = new Golomb(rbsp)

    let
      vpsId = 0
    let maxSubLayersMinus1 = 0
    let tINf = 0
    let spsId = 0
    let separate_colour_plane_flag = 0
    let chromaFormatIdc = 0
    let width = 0
    let height = 0
    let conf_win_left_offset = 0
    let conf_win_right_offset = 0
    let conf_win_top_offset = 0
    let conf_win_bottom_offset = 0
    let conformanceWindowFlag = 0
    let bitDepthLumaMinus8 = 0
    let bitDepthChromaMinus8 = 0
    let sub_width_c = 0
    let sub_height_c = 0
    let profileTierLevel = {}

    gb.readByte() // NAL header
    gb.readByte()

    vpsId = gb.readBits(4) // vps_id
    maxSubLayersMinus1 = gb.readBits(3) // max_sub_layers_minus1
    tINf = gb.readBits(1) // temporal_id_nesting_flag

    profileTierLevel = SPSParser._readProfileTierLevel(gb, maxSubLayersMinus1)

    spsId = gb.readUEG() // sps id
    chromaFormatIdc = gb.readUEG()
    if (chromaFormatIdc === 3) {
      separate_colour_plane_flag = gb.readBits(1) // separate_colour_plane_flag
    }

    width = gb.readUEG() // pic_width_in_luma_samples
    height = gb.readUEG() // pic_height_in_luma_samples

    conformanceWindowFlag = gb.readBits(1)
    if (conformanceWindowFlag === 1) {
      conf_win_left_offset = gb.readUEG() // conf_win_left_offset
      conf_win_right_offset = gb.readUEG() // conf_win_right_offset
      conf_win_top_offset = gb.readUEG() // conf_win_top_offset
      conf_win_bottom_offset = gb.readUEG() // conf_win_bottom_offset
    }

    bitDepthLumaMinus8 = gb.readUEG() // bit_depth_luma_minus8
    bitDepthChromaMinus8 = gb.readUEG() // bit_depth_chroma_minus8

    if (conformanceWindowFlag === 1) {
      sub_width_c = (((chromaFormatIdc === 1) || (chromaFormatIdc === 2)) && (separate_colour_plane_flag === 0)) ? 2 : 1
      sub_height_c = ((chromaFormatIdc === 1) && (separate_colour_plane_flag === 0)) ? 2 : 1
      width -= (sub_width_c * conf_win_right_offset + sub_width_c * conf_win_left_offset)
      height -= (sub_height_c * conf_win_bottom_offset + sub_height_c * conf_win_top_offset)
    }

    gb.destroy()
    gb = null

    return { width: width,
      height: height,
      general_profile_space: profileTierLevel.general_profile_space,
      general_tier_flag: profileTierLevel.general_tier_flag,
      general_profile_idc: profileTierLevel.general_profile_idc,
      general_level_idc: profileTierLevel.general_level_idc,
      chromaFormatIdc: chromaFormatIdc,
      bitDepthLumaMinus8: bitDepthLumaMinus8,
      bitDepthChromaMinus8: bitDepthChromaMinus8 }
  }

  // static parseSPS (uint8array) {
  //   let rbsp = SPSParser._ebsp2rbsp(uint8array)
  //   let gb = new Golomb(rbsp)
  //
  //   gb.readByte()
  //   let profileIdc = gb.readByte()
  //   gb.readByte()
  //   let levelIdc = gb.readByte()
  //   gb.readUEG()
  //
  //   let profile_string = SPSParser.getProfileString(profileIdc)
  //   let level_string = SPSParser.getLevelString(levelIdc)
  //   let chroma_format_idc = 1
  //   let chroma_format = 420
  //   let chroma_format_table = [0, 420, 422, 444]
  //   let bit_depth = 8
  //
  //   if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 ||
  //     profileIdc === 244 || profileIdc === 44 || profileIdc === 83 ||
  //     profileIdc === 86 || profileIdc === 118 || profileIdc === 128 ||
  //     profileIdc === 138 || profileIdc === 144) {
  //     chroma_format_idc = gb.readUEG()
  //     if (chroma_format_idc === 3) {
  //       gb.readBits(1)
  //     }
  //     if (chroma_format_idc <= 3) {
  //       chroma_format = chroma_format_table[chroma_format_idc]
  //     }
  //
  //     bit_depth = gb.readUEG() + 8
  //     gb.readUEG()
  //     gb.readBits(1)
  //     if (gb.readBool()) {
  //       let scaling_list_count = (chroma_format_idc !== 3) ? 8 : 12
  //       for (let i = 0; i < scaling_list_count; i++) {
  //         if (gb.readBool()) {
  //           if (i < 6) {
  //             SPSParser._skipScalingList(gb, 16)
  //           } else {
  //             SPSParser._skipScalingList(gb, 64)
  //           }
  //         }
  //       }
  //     }
  //   }
  //   gb.readUEG()
  //   let pic_order_cnt_type = gb.readUEG()
  //   if (pic_order_cnt_type === 0) {
  //     gb.readUEG()
  //   } else if (pic_order_cnt_type === 1) {
  //     gb.readBits(1)
  //     gb.readSEG()
  //     gb.readSEG()
  //     let num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG()
  //     for (let i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
  //       gb.readSEG()
  //     }
  //   }
  //   gb.readUEG()
  //   gb.readBits(1)
  //
  //   let pic_width_in_mbs_minus1 = gb.readUEG()
  //   let pic_height_in_map_units_minus1 = gb.readUEG()
  //
  //   let frame_mbs_only_flag = gb.readBits(1)
  //   if (frame_mbs_only_flag === 0) {
  //     gb.readBits(1)
  //   }
  //   gb.readBits(1)
  //
  //   let frame_crop_left_offset = 0
  //   let frame_crop_right_offset = 0
  //   let frame_crop_top_offset = 0
  //   let frame_crop_bottom_offset = 0
  //
  //   let frame_cropping_flag = gb.readBool()
  //   if (frame_cropping_flag) {
  //     frame_crop_left_offset = gb.readUEG()
  //     frame_crop_right_offset = gb.readUEG()
  //     frame_crop_top_offset = gb.readUEG()
  //     frame_crop_bottom_offset = gb.readUEG()
  //   }
  //
  //   let par_width = 1, par_height = 1
  //   let fps = 0, fps_fixed = true, fps_num = 0, fps_den = 0
  //
  //   let vui_parameters_present_flag = gb.readBool()
  //   if (vui_parameters_present_flag) {
  //     if (gb.readBool()) { // aspect_ratio_info_present_flag
  //       let aspect_ratio_idc = gb.readByte()
  //       let par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2]
  //       let par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1]
  //
  //       if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
  //         par_width = par_w_table[aspect_ratio_idc - 1]
  //         par_height = par_h_table[aspect_ratio_idc - 1]
  //       } else if (aspect_ratio_idc === 255) {
  //         par_width = gb.readByte() << 8 | gb.readByte()
  //         par_height = gb.readByte() << 8 | gb.readByte()
  //       }
  //     }
  //
  //     if (gb.readBool()) {
  //       gb.readBool()
  //     }
  //     if (gb.readBool()) {
  //       gb.readBits(4)
  //       if (gb.readBool()) {
  //         gb.readBits(24)
  //       }
  //     }
  //     if (gb.readBool()) {
  //       gb.readUEG()
  //       gb.readUEG()
  //     }
  //     if (gb.readBool()) {
  //       let num_units_in_tick = gb.readBits(32)
  //       let time_scale = gb.readBits(32)
  //       fps_fixed = gb.readBool()
  //
  //       fps_num = time_scale
  //       fps_den = num_units_in_tick * 2
  //       fps = fps_num / fps_den
  //     }
  //   }
  //
  //   let parScale = 1
  //   if (par_width !== 1 || par_height !== 1) {
  //     parScale = par_width / par_height
  //   }
  //
  //   let crop_unit_x = 0, crop_unit_y = 0
  //   if (chroma_format_idc === 0) {
  //     crop_unit_x = 1
  //     crop_unit_y = 2 - frame_mbs_only_flag
  //   } else {
  //     let sub_wc = (chroma_format_idc === 3) ? 1 : 2
  //     let sub_hc = (chroma_format_idc === 1) ? 2 : 1
  //     crop_unit_x = sub_wc
  //     crop_unit_y = sub_hc * (2 - frame_mbs_only_flag)
  //   }
  //
  //   let codec_width = (pic_width_in_mbs_minus1 + 1) * 16
  //   let codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16)
  //
  //   codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x
  //   codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y
  //
  //   let present_width = Math.ceil(codec_width * parScale)
  //
  //   gb.destroy()
  //   gb = null
  //
  //   return {
  //     profile_string: profile_string,
  //     level_string: level_string,
  //     bit_depth: bit_depth,
  //     chroma_format: chroma_format,
  //     chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
  //
  //     frame_rate: {
  //       fixed: fps_fixed,
  //       fps: fps,
  //       fps_den: fps_den,
  //       fps_num: fps_num
  //     },
  //
  //     par_ratio: {
  //       width: par_width,
  //       height: par_height
  //     },
  //
  //     codec_size: {
  //       width: codec_width,
  //       height: codec_height
  //     },
  //
  //     present_size: {
  //       width: present_width,
  //       height: codec_height
  //     }
  //   }
  // }
  /**
   * @param gb
   * @param maxSubLayersMinus1
   * @return {{general_profile_idc: (*|number), general_level_idc: (*|number), general_tier_flag: (*|number), general_profile_space: (*|number)}}
   */
  static _readProfileTierLevel (gb, maxSubLayersMinus1) {
    let general_profile_space = 0
    let general_tier_flag = 0
    let general_profile_idc = 0
    let general_level_idc = 0
    general_profile_space = gb.readBits(2) || 0 // profile_space
    general_tier_flag = gb.readBits(1) || 0 // tierFlag
    general_profile_idc = gb.readBits(5) || 0 // profileIdc

    gb.readBits(16) // some 32bits
    gb.readBits(16)

    gb.readBits(1) // progressiveSourceFlag
    gb.readBits(1) // interlacedSourceFlag
    gb.readBits(1) // nonPackedConstraintFlag
    gb.readBits(1) // frameOnlyConstraintFlag

    gb.readBits(16) // reserved zero bits
    gb.readBits(16)
    gb.readBits(12)

    general_level_idc = gb.readBits(8) || 0 // level_idc

    let subLayerProfilePresentFlag = []
    let subLayerLevelPresentFlag = []
    for (let j = 0; j < maxSubLayersMinus1; j++) {
      subLayerProfilePresentFlag[j] = gb.readBits(1)
      subLayerLevelPresentFlag[j] = gb.readBits(1)
    }

    if (maxSubLayersMinus1 > 0) {
      gb.readBits((8 - maxSubLayersMinus1) * 2)
    }

    for (let i = 0; i < maxSubLayersMinus1; i++) {
      if (subLayerProfilePresentFlag[i] !== 0) {
        gb.readBits(2)
        gb.readBits(1)
        gb.readBits(5)

        gb.readBits(16)
        gb.readBits(16)

        gb.readBits(4)

        gb.readBits(16)
        gb.readBits(16)
        gb.readBits(12)
      }
      if (subLayerLevelPresentFlag[i] !== 0) {
        gb.readBits(8)
      }
    }

    return {
      general_profile_space,
      general_tier_flag,
      general_profile_idc,
      general_level_idc
    }
  }

  /**
   *
   *  @param {any} gb
   * @param {number}count
   */
  static _skipScalingList (gb, count) {
    let lastScale = 8
    let nextScale = 8
    let deltaScale = 0
    for (let i = 0; i < count; i++) {
      if (nextScale !== 0) {
        deltaScale = gb.readSEG()
        nextScale = (lastScale + deltaScale + 256) % 256
      }
      lastScale = (nextScale === 0) ? lastScale : nextScale
    }
  }

  /**
   *
   * @param {number} profileIdc
   * @return {string}
   */
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

  /**
   * @param {number} levelIdc
   * @return {string}
   */
  static getLevelString (levelIdc) {
    return (levelIdc / 10).toFixed(1)
  }

  /**
   * @param {number} chroma
   * @return {string}
   */
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

  /**
   * @param {any} spsConfig
   * @return {any}
   */
  static toVideoMeta (spsConfig) {
    let meta = {}
    if (spsConfig && spsConfig.codec_size) {
      meta.codecWidth = spsConfig.codec_size.width
      meta.codecHeight = spsConfig.codec_size.height
      meta.presentWidth = spsConfig.present_size.width
      meta.presentHeight = spsConfig.present_size.height
    } else if (spsConfig.width && spsConfig.height) {
      meta.codecWidth = spsConfig.width
      meta.codecHeight = spsConfig.height
      meta.presentWidth = spsConfig.width
      meta.presentHeight = spsConfig.height
    }

    meta.profile = spsConfig.profile_string
    meta.level = spsConfig.level_string
    meta.bitDepth = spsConfig.bit_depth
    meta.chromaFormat = spsConfig.chroma_format

    // meta.parRatio = {
    //   width: spsConfig.par_ratio.width,
    //   height: spsConfig.par_ratio.height
    // }

    // meta.frameRate = spsConfig.frame_rate

    // let fpsDen = meta.frameRate.fps_den
    // let fpsNum = meta.frameRate.fps_num
    // meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum))
    return meta
  }
}

export default SPSParser
