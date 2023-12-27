export function getConfig (cfg) {
  if (typeof cfg.fixEditListOffset !== 'boolean') {
    delete cfg.fixEditListOffset
  }
  return {
    vid: '',
    moovEnd: 80000,
    segmentDuration: 2,
    maxDownloadInfoSize: 30,
    responseType: 'arraybuffer',
    fixEditListOffset: true,
    cache: null,
    // ...xgplayer-streaming-shared/src/net/config
    ...cfg
  }
}
