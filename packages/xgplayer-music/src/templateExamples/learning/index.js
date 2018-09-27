import playIcon from './images/play.png'
import pauseIcon from './images/pause.png'
import nextIcon from './images/next.png'
import prevIcon from './images/prev.png'
import seekNextIcon from './images/seek-next.png'
import seekPrevIcon from './images/seek-prev.png'

const utils = {
  getElementViewLeft: (element) => {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent
    const elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
      }
    } else {
      while (current !== null && current !== element) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
      }
    }
    return actualLeft - elementScrollLeft
  },

  getElementViewTop: (element, noScrollTop) => {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    let elementScrollTop = 0
    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }
    elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop
    return noScrollTop ? actualTop : actualTop - elementScrollTop
  },
  secondToTime: (second) => {
    const add0 = (num) => num < 10 ? '0' + num : '' + num
    const hour = Math.floor(second / 3600)
    const min = Math.floor((second - hour * 3600) / 60)
    const sec = Math.floor(second - hour * 3600 - min * 60)
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
  },

  timeToSecond: (time) => {
    const [min, sec] = time.split(':').map((num) => parseInt(num))
    return (min * 60) + sec
  }
}

// TODO: 异步加载模版
// TODO: 在线播放器模版编辑及预览
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
        <div class="progress-bar-wrap" v-on:mousedown="handleProgressMousedown">
          <div class="progress-bar">
            <div class="progress-loaded" style="width: 0"></div>
            <div class="progress-played" style="width: 22%;">
                <span class="progress-thumb" style="background: #444444;">
                </span>
            </div>
          </div>
        </div>
      </div>
      <div class="controllers">
        <div class="controller seek-prev-btn" v-on:click="seekPrev"></div>
        <div class="controller prev-btn" v-on:click="prev"></div>
        <div class="controller play-btn play" v-on:click="togglePlayState"></div>
        <div class="controller next-btn" v-on:click="next"></div>
        <div class="controller seek-next-btn" v-on:click="seekNext"></div>
      </div>
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
  .progress {
    width: 100%;
  }
  .progress-loaded {
    color: #ffda43; 
  }
  .progress-played {
    background: rgb(68, 68, 68);
    color: #ffda43; 
  }
  `,
  model: {
    data: {
      title: '如何练就逻辑清晰的好口才',
      duration: '02:00',
      playState: 'paused',
      playingClass: 'play',
      disableTimeupdate: false
    },
    mounted () {
      this.$player.on('timeupdate', (player) => {
        console.log('player progress')
        const progressPlayed = document.querySelector('.progress-played')
        const playedPercentage = (player.currentTime / player.duration * 100).toFixed(2)
        console.log('playedPercentage:', playedPercentage)
        if (!this.disableTimeupdate) {
          progressPlayed.setAttribute('style', `width: ${playedPercentage}%`)
        }
      })
    },
    methods: {
      togglePlayState: function () {
        console.log('click toggle')
        if (this.playState === 'playing') {
          this.$player.pause()
          // 是不是可以考虑模版里面加个ref
          this.$util.removeClass(document.querySelector('.play-btn'), 'pause')
          this.$util.addClass(document.querySelector('.play-btn'), 'play')
        } else {
          this.$player.play()
          this.$util.removeClass(document.querySelector('.play-btn'), 'play')
          this.$util.addClass(document.querySelector('.play-btn'), 'pause')
        }
        this.playState = this.playState === 'playing' ? 'paused' : 'playing'
        this.playingClass = this.playingClass === 'play' ? 'pause' : 'play'
      },
      seekNext: function () {
        this.$player.forward()
      },
      seekPrev: function () {
        this.$player.backward()
      },
      prev: function () {
        this.$player.prev()
      },
      next: function () {
        this.$player.next()
      },
      handleProgressMousedown: function (e) {
        // progress事件绑定
        const progressWrap = document.querySelector('.progress-bar-wrap')
        const progressPlayed = document.querySelector('.progress-played')
        const thumbMove = (e) => {
          let percentage = (((e.clientX || e.changedTouches[0].clientX) - utils.getElementViewLeft(progressWrap)) / progressWrap.clientWidth) * 100
          percentage = Math.max(percentage, 0)
          percentage = Math.min(percentage, 100)
          // this.playedTimeNode.innerHTML = utils.secondToTime(percentage * this.$player.duration)
          console.log('[progress] seek mousemove: ', percentage, '%')
          progressPlayed.setAttribute('style', `width: ${percentage}%`)
        }

        const thumbUp = (e) => {
          document.removeEventListener('mouseup', thumbUp)
          document.removeEventListener('mousemove', thumbMove)

          let percentage = (((e.clientX || e.changedTouches[0].clientX) - utils.getElementViewLeft(progressWrap)) / progressWrap.clientWidth) * 100

          percentage = Math.max(percentage, 0)
          percentage = Math.min(percentage, 100)
          this.$player.currentTime = percentage / 100 * this.$player.duration
          this.disableTimeupdate = false
          console.log(`[progress] seek time into ${percentage * this.$player.duration}`)
        }
        this.disableTimeupdate = true
        document.addEventListener('mousemove', thumbMove)
        document.addEventListener('mouseup', thumbUp)
      }
    }
  }
}
