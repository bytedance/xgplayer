class VideoCanvas {
  constructor (config) {
    this.curVideo = document.createElement('video'); // 主播放video
    this.backupvideo = document.createElement('video'); // 替换播放video
    this.canvas = document.createElement('canvas');
  }
}
export default VideoCanvas;