#!/usr/bin/env bash

SRC_DIR=$(pwd)

cd ${SRC_DIR}/packages/xgplayer-flv-live/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-flv-vod/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-flv/ && npm run build

cd ${SRC_DIR}/packages/xgplayer-hls-live/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-hls-vod/ && npm run build
cd ${SRC_DIR}/packages/xgplayer-hls/ && npm run build


