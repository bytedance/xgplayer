#!/usr/bin/env bash

SRC_DIR=$(pwd)

cd ${SRC_DIR}/packages/xgplayer-flv-live/ && npm run dev
cd ${SRC_DIR}/packages/xgplayer-flv-vod/ && npm run dev
cd ${SRC_DIR}/packages/xgplayer-flv/ && npm run dev

cd ${SRC_DIR}/packages/xgplayer-hls-live/ && npm run dev
cd ${SRC_DIR}/packages/xgplayer-hls-vod/ && npm run dev
cd ${SRC_DIR}/packages/xgplayer-hls/ && npm run dev


