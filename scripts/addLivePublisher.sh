#!/usr/bin/env bash

SRC_DIR=$(pwd)

USER_NAME=wudechang

# 为直播各个方向添加发包权限
cd ${SRC_DIR}/packages/xgplayer-livevideo && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-raw264 && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-helper-utils && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-helper-codec && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-helper-mse && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-helper-transmuxers && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv-vod && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-flv-live && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls-live && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-hls-vod && npm owner add ${USER_NAME} --registry https://registry.npmjs.org
