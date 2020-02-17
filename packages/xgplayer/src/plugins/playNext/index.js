import Plugin from '../../plugin';
import PlayNextIcon from '../assets/playNext.svg';

class PlayNext extends Plugin {
  static get pluginName () {
    return 'PlayNext';
  }

  constructor (options) {
    super(options);
    this.urlList = options.urlList;
    this.idx = -1;
  }

  registerIcons () {
    return {
      'playNext': PlayNextIcon
    };
  }

  afterCreate () {
    const {player} = this;
    this.bind('svg', 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.idx + 1 < this.urlList.length) {
        this.idx++;
        player.video.pause();
        player.currentTime = 0;
        player.video.autoplay = true;
        player.src = this.urlList[this.idx];
        player.emit('playerNext', this.idx + 1);
      } else {
        player.emit('urlList last');
      }
    });
  }

  render () {
    return `<xg-play-next class="xgplayer-play-next">
      ${this.icons.playNext}
    </xg-play-next>`;
  }
}

export default PlayNext;
