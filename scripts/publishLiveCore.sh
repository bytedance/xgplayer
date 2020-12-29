#!/usr/bin/env bash

SRC_DIR=$(pwd)
TAG_ARG=$1

echo ${TAG_ARG}

lerna exec --scope xgplayer-helper-codec -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
lerna exec --scope xgplayer-helper-models -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
lerna exec --scope xgplayer-helper-transmuxers -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
lerna exec --scope xgplayer-helper-utils -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
