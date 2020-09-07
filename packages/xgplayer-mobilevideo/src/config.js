
let H264_DECODER_URL;
let ASM_H264_DECODER_URL;

let tv = /wasmversion=1/.test(location.href);

if (tv) {
  H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/n_decoder_1599551996077.js';

  ASM_H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/n_decoder_asm_1599551996077.js'
} else {
  H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/decoder_1599450196791.js';

  ASM_H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/decoder_asm_1599450196791.js';
}

const H265_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h265/decoder_1596185762157.js'

const ASM_H265_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h265/decoder_asm_1594191692633.js';

export {
  H264_DECODER_URL,
  H265_DECODER_URL,
  ASM_H264_DECODER_URL,
  ASM_H265_DECODER_URL
};
