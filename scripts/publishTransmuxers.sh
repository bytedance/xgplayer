#!/usr/bin/env bash

SRC_DIR=$(pwd)


cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-playlist && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-presource && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-stream && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-track && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-xgbuffer && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-aac && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-compatibility && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-avc && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-hevc && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-constant-events && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-context && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-flv && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-m3u8 && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-ts && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-loader-fetch && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-mediainfo && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-mediasegmentlist && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-trackmeta && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-tracksample && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-remux-mp4 && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-mobilevideo && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-crypto && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-mse && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-sniffer && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-utf8 && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv-vod && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv-live && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls-live && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls-vod && npm publish --tag=alpha --registry https://registry.npmjs.org
