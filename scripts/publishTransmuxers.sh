#!/usr/bin/env bash

SRC_DIR=$(pwd)


cd ${SRC_DIR}/packages/xgplayer-utils/ && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-codec/ && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-demux/ && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-remux/ && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-buffer/ && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-loader/ && npm publish --tag=alpha --registry https://registry.npmjs.org
cd ${SRC_DIR}/packages/xgplayer-loader/ && npm publish --tag=alpha --registry https://registry.npmjs.org
