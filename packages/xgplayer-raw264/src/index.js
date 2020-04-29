import Player from 'xgplayer';
import Context from 'xgplayer-transmuxer-context'
import Core from './raw-264'
import Events from 'xgplayer-transmuxer-constant-events'
import LoaderBuffer from 'xgplayer-transmuxer-buffer-xgbuffer';
import FetchLoader from 'xgplayer-transmuxer-loader-fetch';
import 'xgplayer-mobilevideo';

class Raw264Player extends Player {
  constructor (props) {
    if (!props.mediaType) {
      props.mediaType = 'mobile-video'
    }
    super(props);

    this.handleTimeupdate = this.handleTimeupdate.bind(this)
    this.hasPlayed = false;
  }

  start () {

    this.context = new Context(Events.HlsAllowedEvents);
    this.context.registry('LOADER_BUFFER', LoaderBuffer);
    this.core = this.context.registry('RAW_264_CONTROLLER', Core)({ player: this, fps: this.config.fps })
    if  (!this.config.isLive) {
      this.context.registry('FETCH_LOADER', FetchLoader);
      this.core.load(this.config.url)
    }
    this.context.init();

    super.start()
    this.video.setAttribute('noaudio', true)
    this.video.addEventListener('timeupdate', this.handleTimeupdate, false)
  }

  replay () {
    this.video._cleanBuffer()
    this.currentTime = 0;
    this.start();
    this.play();
  }

  handleTimeupdate () {
    if (this.config.isLive) {
      this.video._cleanBuffer();
    } else {
      if (this.currentTime >= this.duration) {
        this.pause();
        this.emit('ended')
      }
    }
  }

  destroy (isDelDom) {
    super.destroy(isDelDom);
    this.core.destroy();
    this.context.destroy();
    this.core = null;
    this.context = null;
  }

  pushBuffer(arr) {
    if (this.buffer) {
      this.buffer.push(arr)
      this.core.handleDataLoaded()
    }
  }

  get buffer () {
    return this.context.getInstance('LOADER_BUFFER');
  }

  set currentTime (time) {
    const oldTime = super.currentTime;
    const buffered = this.getBufferedRange();
    if (buffered[0] <= time && buffered[1] >= time) {
      this.video.currentTime = time;
    } else {
      this.video.currentTime = oldTime;
    }
  }
  get currentTime () {
    return super.currentTime;
  }

  get duration () {
    if (this.core && this.core.duration) {
      return this.core.duration
    }
    return this.video.duration;
  }
}

export default Raw264Player;
