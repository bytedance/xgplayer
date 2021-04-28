# xgplayer-helper-codec
Utils for h264、h265、aac、utf-8 data parsing and converting

## h264 Utils

Usage of NalunitUtil
```typescript
import { avc } from 'xgplayer-helper-codec';
const NalunitUtil = avc.Nalunit;

interface NalUnit { 
  header: ArrayBuffer;
  body: Uint8Array;
}

interface AnalyzedNalUnit extends NalUnit {
  idr?: boolean;
  ndr?: boolean;
  sei: {
    code: number;
  } | {
    code: 5;
    content: string;
  };
  sps: object;
  pps: Uint8Array;
}

// parse nalunits from h264 stream
const nalunits = NalunitUtil.getNalunits(xgDataView);

// param "unit" is a NalUnit 
const analyzedNalUnit = NalunitUtil.analyseNal(unit);
```

Usage of SPSParser
```typescript
import { avc } from 'xgplayer-helper-codec';
const { SPSParser } = avc;

interface H264_SPS {
  profile_string: string;
  level_string: string;
  bit_depth: string;
  chroma_format: number;
  chroma_format_string: string;

  frame_rate: {
    fixed: boolean;
    fps: number;
    fps_den: number;
    fps_num: number;
  };

  par_ratio: {
    width: number;
    height: number;
  };

  codec_size: {
    width: number;
    height: number;
  };

  present_size: {
    width: number;
    height: number;
  };
}

// the variable sps is H264_SPS  
const sps = SPSParser.parseSPS(spsBuffer);
```

## h265 utils

Usage of NalunitUtil

```typescript
import { hevc } from 'xgplayer-helper-codec';
const NalunitUtil = hevc.Nalunit;

interface NalUnit { 
  header: ArrayBuffer;
  body: Uint8Array;
}

interface AnalyzedNalUnit extends NalUnit {
  slice_trail_n?: boolean;
  slice_trail_r?: boolean;
  slice_tsa_n?: boolean;
  slice_tsa_r?: boolean;
  slice_stsa_n?: boolean;
  slice_stsa_r?: boolean;
  slice_radl_n?: boolean;
  slice_radl_r?: boolean;
  slice_rasl_n?: boolean;
  slice_rasl_r?: boolean;
  slice_bla_w_lp?: boolean;
  slice_bla_w_radl?: boolean;
  slice_bla_n_lp?: boolean;
  slice_idl_w_radl?: boolean;
  slice_idr_n_lp?: boolean;
  slice_cra_nut?: boolean;
  sei?: {
    code: number;
  } | {
    code: 5;
    content: string;
  };
  sps?: SPS;
  pps?: boolean;
  aud?: boolean;
  eob?: boolean;
  fd?: boolean;
  key?: boolean; // is a key frame
}

// parse nalunits from h265 stream
const nalunits = NalunitUtil.getNalunits(xgDataView);

// param "unit" is a NalUnit 
const analyzedNalUnit = NalunitUtil.analyseNal(unit);
```

Usage Of SPSParser
```typescript
import { hevc } from 'xgplayer-helper-codec';
const { SPSParser } = hevc;

interface H265_SPS {
  width: number;
  height: number;
  general_profile_space: string;
  general_profile_idc: string;
  general_tier_flag: string;
  general_level_idc: string;
  chromaFormatIdc: string;
  bitDepthLumaMinus8: number;
  bitDepthChromaMinus8: number;
}

// the variable sps is H265_SPS  
const sps = SPSParser.parseSPS(spsBuffer);
```
