#!/usr/bin/env bash

SRC_DIR=$(pwd)

USER_NAME=wudechang

# 为直播各个方向添加发包权限
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-playlist && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-presource && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-stream && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-track && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-buffer-xgbuffer && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-aac && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-compatibility && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-avc && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-codec-hevc && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-constant-events && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-context && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-flv && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-m3u8 && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-demux-ts && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-loader-fetch && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-mediainfo && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-mediasegmentlist && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-trackmeta && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-model-tracksample && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-transmuxer-remux-mp4 && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-mobilevideo && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-crypto && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-mse && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-sniffer && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-utils-utf8 && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv-vod && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv-live && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls-live && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls-vod && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
