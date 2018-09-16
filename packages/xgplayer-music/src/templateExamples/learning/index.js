import playIcon from './images/play.png'
import pauseIcon from './images/pause.png'
import nextIcon from './images/next.png'
import prevIcon from './images/prev.png'
import seekNextIcon from './images/seek-next.png'
import seekPrevIcon from './images/seek-prev.png'

export default {
  template: `
    <div class="learning">
      <div class="intro">
        <div class="cover">
          <img src="//sf1-ttcdn-tos.pstatp.com/img/learning/974a8c9f6140ffd9779491092713f799~noop.jpeg" />
        </div>
        <h1>{{ title }}</h1>
      </div>
      <div class="progress">
        <div class="progress-bar-wrap">
          <div class="progress-bar">
            <div class="prgress-loaded" style="width: 0"></div>
            <div class="prgress-played" v-bind:style="'width: 22%; background: rgb(68, 68, 68);'">
                <span class="prgress-thumb" style="background: #444444;">
                </span>
            </div>
          </div>
        </div>
      </div>
      <div class="controllers">
        <div class="controller seek-prev-btn" v-on:click="seekPrev"></div>
        <div class="controller prev-btn" v-on:click="prev"></div>
        <div class="controller play-btn" v-bind:class="playingClass" v-on:click="togglePlayState"></div>
        <div class="controller next-btn" v-on:click="next"></div>
        <div class="controller seek-next-btn" v-on:click="seekNext"></div>
      </div>
      {{ playingClass }}
    </div>
  `,
  style: `
  .learning {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: auto;
  }
  .learning .intro {
    width: 100%;
    padding: 40px 0 100px 0;
    background: #8c6a6e;
    text-align: center;
  }
  .learning h1 {
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
  .learning .cover img {
    width: 200px;
    height: 220px;
    border-radius: 10px;
  }
  .learning .controllers {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #f6f7fa;
    width: 100%;
    height: 122px;
  }
  .learning .controller {
    transition: 0.2s all ease-in;
    cursor: pointer;
    background-size: contain;
  }
  .play-btn.pause {
    width: 60px;
    height: 60px;
    background-image: url('${pauseIcon}');
  }
  .play-btn.play {
    width: 60px;
    height: 60px;
    background-image: url('${playIcon}');
  }
  .seek-prev-btn {
    width: 24px;
    height: 24px;
    background-image: url('${seekPrevIcon}');
  }
  .prev-btn {
    width: 40px;
    height: 40px;
    background-image: url('${prevIcon}');
  }
  .next-btn {
    width: 40px;
    height: 40px;
    background-image: url('${nextIcon}');
  }
  .seek-next-btn {
    width: 24px;
    height: 24px;
    background-image: url('${seekNextIcon}');
  }



  .learning .progress .progress-bar-wrap {
    margin: 0 5px;
    padding: 4px 0;
    cursor: pointer !important;
    flex: 1;
  }
  .learning .progress .progress-bar-wrap:hover .progress-bar .progress-played .progress-thumb {
    transform: scale(1);
  }
  .learning .progress .progress-bar-wrap .progress-bar {
    position: relative;
    height: 2px;
    width: 100%;
    background: #cdcdcd;
  }
  .learning .progress .progress-bar-wrap .progress-bar .progress-loaded {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #aaa;
    height: 2px;
    transition: all 0.5s ease;
  }
  .learning .progress .progress-bar-wrap .progress-bar .progress-played {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 2px;
  }
  .learning .progress .progress-bar-wrap .progress-bar .progress-played .progress-thumb {
    position: absolute;
    top: 0;
    right: 5px;
    margin-top: -4px;
    margin-right: -10px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    transform: scale(0);
  }

  `
}
