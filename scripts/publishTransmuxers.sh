#!/usr/bin/env bash

SRC_DIR=$(pwd)
TAG_ARG="--tag=alpha"

echo ${TAG_ARG}

#lerna exec --scope xgplayer-helper-codec -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-helper-models -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-helper-transmuxers -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-helper-utils -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-mobilevideo -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-raw264 -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-flv-vod -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
lerna exec --scope xgplayer-flv-live -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
lerna exec --scope xgplayer-hls-vod -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
lerna exec --scope xgplayer-hls-live -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-hls -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
#lerna exec --scope xgplayer-flv -- npm publish ${TAG_ARG} --registry https://registry.npmjs.org
