/**
 * Parser for HEVC SPS NAL
*/

class HEVCSpsParser {
  constructor(data) {
    this.data = data;
    // the number of bytes left to examine in this.data
    this.bytesAvailable = this.data.byteLength;
    // the current word being examined
    this.word = 0; // :uint
    // the number of bits left to examine in the current word
    this.bitsAvailable = 0; // :uint

    // this.data = data;
    // // the number of bytes left to examine in this.data
    // this.bytesAvailable = this.data.byteLength;
    // // the number of bits left to examine in the current word
    // this.bitsAvailable = 0; // :uint
    // this.firstByte = 0xff;
    // this.cache = 0xff;
    // this.bitsInCache = 0;
  }

  // ():void
  loadWord() {
    var
      position = this.data.byteLength - this.bytesAvailable,
      workingBytes = new Uint8Array(4),
      availableBytes = Math.min(4, this.bytesAvailable);
    if (availableBytes === 0) {
      throw new Error('no bytes available');
    }
    workingBytes.set(this.data.subarray(position, position + availableBytes));
    this.word = new DataView(workingBytes.buffer).getUint32(0);
    // track the amount of this.data that has been processed
    this.bitsAvailable = availableBytes * 8;
    this.bytesAvailable -= availableBytes;
  }

  // (count:int):void
  skipBits(count) {
    var skipBytes; // :int
    if (this.bitsAvailable > count) {
      this.word <<= count;
      this.bitsAvailable -= count;
    } else {
      count -= this.bitsAvailable;
      skipBytes = count >> 3;
      count -= (skipBytes >> 3);
      this.bytesAvailable -= skipBytes;
      this.loadWord();
      this.word <<= count;
      this.bitsAvailable -= count;
    }
  }

  // (size:int):uint
  readBits(size) {
    var
      bits = Math.min(this.bitsAvailable, size), // :uint
      valu = this.word >>> (32 - bits); // :uint
    if (size > 32) {
      logger.error('Cannot read more than 32 bits at a time');
    }
    this.bitsAvailable -= bits;
    if (this.bitsAvailable > 0) {
      this.word <<= bits;
    } else if (this.bytesAvailable > 0) {
      this.loadWord();
    }
    bits = size - bits;
    if (bits > 0) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  }

  // ():uint
  skipLZ() {
    var leadingZeroCount; // :uint
    for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
      if (0 !== (this.word & (0x80000000 >>> leadingZeroCount))) {
        // the first bit of working word is 1
        this.word <<= leadingZeroCount;
        this.bitsAvailable -= leadingZeroCount;
        return leadingZeroCount;
      }
    }
    // we exhausted word and still have not found a 1
    this.loadWord();
    return leadingZeroCount + this.skipLZ();
  }

  // ():void
  skipUEG() {
    this.skipBits(1 + this.skipLZ());
  }

  // ():void
  skipEG() {
    this.skipBits(1 + this.skipLZ());
  }

  // ():uint
  readUEG() {
    var clz = this.skipLZ(); // :uint
    return this.readBits(clz + 1) - 1;
  }

  // ():int
  readEG() {
    var valu = this.readUEG(); // :int
    if (0x01 & valu) {
      // the number is odd if the low order bit is set
      return (1 + valu) >>> 1; // add 1 to make it even, and divide by 2
    } else {
      return -1 * (valu >>> 1); // divide by two then make it negative
    }
  }

  // Some convenience functions
  // :Boolean
  readBoolean() {
    return 1 === this.readBits(1);
  }

  // ():int
  readUByte() {
    return this.readBits(8);
  }

  // ():int
  readUShort() {
    return this.readBits(16);
  }
    // ():int
  readUInt() {
    return this.readBits(32);
  }

  // ():void
  readProfileTierLevel(maxSubLayersMinus1) {
    let general_profile_space = 0
    let general_tier_flag = 0
    let general_profile_idc = 0
    let general_level_idc = 0
    general_profile_space = this.readBits(2) || 0; // profile_space
    general_tier_flag = this.readBits(1) || 0; // tierFlag
    general_profile_idc = this.readBits(5) || 0; // profileIdc

    this.skipBits(16); // some 32bits
    this.skipBits(16);

    this.skipBits(1); // progressiveSourceFlag
    this.skipBits(1); // interlacedSourceFlag
    this.skipBits(1); // nonPackedConstraintFlag
    this.skipBits(1); // frameOnlyConstraintFlag


    this.skipBits(16); // reserved zero bits
    this.skipBits(16);
    this.skipBits(12);

    general_level_idc = this.readBits(8) || 0; // level_idc

    var subLayerProfilePresentFlag = [];
    var subLayerLevelPresentFlag = [];
    for (var j = 0; j < maxSubLayersMinus1; j++) {
      subLayerProfilePresentFlag[j] = this.readBits(1);
      subLayerLevelPresentFlag[j] = this.readBits(1);
    }

    if (maxSubLayersMinus1 > 0) {
      this.skipBits( (8 - maxSubLayersMinus1) * 2 );
    }

    for (var i = 0; i < maxSubLayersMinus1; i++) {
      if(subLayerProfilePresentFlag[i] !== 0){
        this.skipBits(2);
        this.skipBits(1);
        this.skipBits(5);

        this.skipBits(16);
        this.skipBits(16);

        this.skipBits(4);

        this.skipBits(16);
        this.skipBits(16);
        this.skipBits(12);
      }
      if(subLayerLevelPresentFlag[i] !== 0){
        this.skipBits(8);
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
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the HEVC metadata that
   * describes the properties of upcoming video frames.
   * @param data {Uint8Array} the bytes of a sequence parameter set
   * @return {object} an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  readSPSHEVC() {
    let
      vpsId = 0,
      maxSubLayersMinus1 = 0,
      tINf = 0,
      spsId = 0,
      separate_colour_plane_flag = 0,
      chromaFormatIdc = 0,
      width = 0,
      height = 0,
      conf_win_left_offset = 0,
      conf_win_right_offset = 0,
      conf_win_top_offset = 0,
      conf_win_bottom_offset = 0,
      conformanceWindowFlag = 0,
      bitDepthLumaMinus8 = 0,
      bitDepthChromaMinus8 = 0,
      sub_width_c = 0,
      sub_height_c = 0,
      profileTierLevel = {};

      // this.readUByte(); // NAL header
      var temp = this.readUByte(); // NAL header
      this.readUByte();

      vpsId = this.readBits(4); // vps_id
      maxSubLayersMinus1 = this.readBits(3); // max_sub_layers_minus1
      tINf = this.readBits(1); // temporal_id_nesting_flag

      profileTierLevel = this.readProfileTierLevel(maxSubLayersMinus1);

      spsId = this.readUEG(); // sps id
      chromaFormatIdc = this.readUEG();
      if(chromaFormatIdc === 3) {
        separate_colour_plane_flag = this.readBits(1); // separate_colour_plane_flag
      }

      width = this.readUEG(); // pic_width_in_luma_samples
      height = this.readUEG(); // pic_height_in_luma_samples

      conformanceWindowFlag = this.readBits(1);
      if( conformanceWindowFlag === 1) {
         conf_win_left_offset = this.readUEG(); // conf_win_left_offset
         conf_win_right_offset = this.readUEG(); // conf_win_right_offset
         conf_win_top_offset = this.readUEG(); // conf_win_top_offset
         conf_win_bottom_offset = this.readUEG(); // conf_win_bottom_offset
      }

      bitDepthLumaMinus8 = this.readUEG(); // bit_depth_luma_minus8
      bitDepthChromaMinus8 = this.readUEG(); // bit_depth_chroma_minus8

      if(conformanceWindowFlag === 1) {
        sub_width_c  = (((1 === chromaFormatIdc)||(2 === chromaFormatIdc)) && (0 === separate_colour_plane_flag)) ? 2 : 1;
        sub_height_c = ((1 === chromaFormatIdc) && (0 === separate_colour_plane_flag)) ? 2 : 1;
        width  -= (sub_width_c * conf_win_right_offset + sub_width_c * conf_win_left_offset);
        height -= (sub_height_c * conf_win_bottom_offset + sub_height_c * conf_win_top_offset);
      }

      // console.log('conformanceWindowFlag: ', conformanceWindowFlag)
      // console.log('chromaFormatIdc: ', chromaFormatIdc)
      // console.log('separate_colour_plane_flag: ', separate_colour_plane_flag)
      // console.log('sub_width_c: ', sub_width_c)
      // console.log('sub_height_c: ', sub_height_c)
      // console.log('conf_win_left_offset: ', conf_win_left_offset)
      // console.log('conf_win_right_offset: ', conf_win_right_offset)
      // console.log('conf_win_top_offset: ', conf_win_top_offset)
      // console.log('conf_win_bottom_offset: ', conf_win_bottom_offset)
      // console.log('width: ', width)
      // console.log('height: ', height)

      return { width : width, height : height,
        general_profile_space: profileTierLevel.general_profile_space,
        general_tier_flag: profileTierLevel.general_tier_flag,
        general_profile_idc: profileTierLevel.general_profile_idc,
        general_level_idc: profileTierLevel.general_level_idc,
        chromaFormatIdc : chromaFormatIdc,
        bitDepthLumaMinus8 : bitDepthLumaMinus8,
        bitDepthChromaMinus8 :  bitDepthChromaMinus8 };

      // this.readBits(8); // NAL header
      // this.readBits(8); // NAL header
      //
      // vpsId = this.readBits(4); // vps_id
      // maxSubLayersMinus1 = this.readBits(3); // max_sub_layers_minus1
      // tINf = this.readBits(1); // temporal_id_nesting_flag
      //
      // this.readProfileTierLevel(maxSubLayersMinus1);
      //
      // spsId = this.readUE(); // sps id
      // chromaFormatIdc = this.readUE();
      // if(chromaFormatIdc === 3) {
      //   this.skipBits(1); // separate_colour_plane_flag
      // }
      //
      // width = this.readUE(); // pic_width_in_luma_samples
      // height = this.readUE(); // pic_height_in_luma_samples
      //
      //
      // conformanceWindowFlag = this.readBits(1);
      // if( conformanceWindowFlag === 1) {
      //    this.skipUE(); // conf_win_left_offset
      //    this.skipUE(); // conf_win_right_offset
      //    this.skipUE(); // conf_win_top_offset
      //    this.skipUE(); // conf_win_bottom_offset
      // }
      //
      // bitDepthLumaMinus8 = this.readUE(); // bit_depth_luma_minus8
      // bitDepthChromaMinus8 = this.readUE(); // bit_depth_chroma_minus8
      //
      // return { width : width, height : height,
      //   chromaFormatIdc : chromaFormatIdc,
      //   bitDepthLumaMinus8 : bitDepthLumaMinus8,
      //   bitDepthChromaMinus8 :  bitDepthChromaMinus8 };
  }
}

export default HEVCSpsParser;
