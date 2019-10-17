import Workerify from 'webworkify-webpack'
class VideoCanvas {
  constructor (config) {
    // this.curVideo = document.createElement('video'); // 主播放video
    // this.backupvideo = document.createElement('video'); // 替换播放video
    this.canvas = document.createElement('canvas');
    this.config = Object.assign({}, config);
    this.oncanplay = undefined;

    this.wasmworker = Workerify(require.resolve('./decoder_em.js'));
    console.log(this.wasmworker);
  }

  play() {
    
  }
}
export default VideoCanvas;