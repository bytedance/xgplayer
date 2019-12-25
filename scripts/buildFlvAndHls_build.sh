#!/usr/bin/env bash

SRC_DIR=$(pwd)


cd ${SRC_DIR}/packages/xgplayer-utils/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-codec/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-demux/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-remux/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-buffer/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-loader/ && npm run build

lerna link
cd ${SRC_DIR}/packages/xgplayer-flv-live/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-flv-vod/ && npm run build
lerna link
cd ${SRC_DIR}/packages/xgplayer-flv/ && npm run build

cd ${SRC_DIR}/packages/xgplayer-hls-live/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-hls-vod/ && npm run build
lerna link
cd ${SRC_DIR}/packages/xgplayer-hls/ && npm run build


