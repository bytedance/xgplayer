#!/usr/bin/env bash

SRC_DIR=$(pwd)


cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-playlist/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-presource/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-stream/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-track/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-xgbuffer/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-aac/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-compatibility/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-avc/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-constant-events/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-context/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-flv/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-m3u8/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-ts/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-loader-fetch/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-mediainfo/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-mediasegmentlist/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-trackmeta/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-tracksample/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-transmuxer-remux-mp4/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-utils/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-utils-crypto/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-utils-mse/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-utils-sniffer/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-utils-utf8/ && npm run build

lerna link
cd ${SRC_DIR}/packages/xgplayer-flv-live/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-flv-vod/ && npm run build
lerna link
cd ${SRC_DIR}/packages/xgplayer-flv/ && npm run build

cd ${SRC_DIR}/packages/xgplayer-hls-live/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-hls-vod/ && npm run build
lerna link
cd ${SRC_DIR}/packages/xgplayer-hls/ && npm run build


