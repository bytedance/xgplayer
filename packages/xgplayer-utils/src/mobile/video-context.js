class VideoCanvas {
    constructor(config) {
        this.video = config.video;
        this.backupvideo = document.createElement('video');
        this.canvas = document.createElement('canvas');
    }
}