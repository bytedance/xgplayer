# xgplayer-helper-codec
utils for h264、h265、aac、utf-8 data parsing and converting

## h264 Utils

usage of NalunitUtil
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
const nalunits = NalunitUtil.getNalunits(dataView);

// param "unit" is a NalUnit 
const analyzedNalUnit = NalunitUtil.analyseNal(unit);
```

SPSParser
```typescript
import { avc } from 'xgplayer-helper-codec';
const { SPSParser } = avc;

interface SPS {
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

// the variable sps is SPS  
const sps = SPSParser.parseSPS(uint8Array);
```

## h265 utils
