import Player from '../player'
import bezier from '../utils/bezier'

const endEasing = bezier(0, 0.88, 0.36, 0.86)
const startEasing = bezier(0.18, 0.86, 0.44, 0.79)
let controller
controller = function () {
  let player = this
  let util = Player.util
  const {panoramic, config} = player
  let container = util.createDom('xg-controller', `
  <svg class="xgplayer-controller-svg" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="全景按钮" transform="translate(-99.000000, -16.000000)">
              <g id="Group-10" transform="translate(99.000000, 16.000000)">
                  <g id="Group-7-Copy">
                      <circle id="Oval-3" fill="#FFFFFF" cx="24" cy="24" r="24">
                      
                        </circle>
                      <g id="Fullscreen" transform="rotate(45.000000) translate(22, -12)" fill="#000000" fill-opacity="0.54">
                          <g id="arrow-down">
                              <path d="M22,22 L22,18.4910052 C22,18.2198305 22.214035,18 22.5046844,18 L23.4953156,18 C23.7740451,18 24,18.2278805 24,18.4910052 L24,23.5089948 C24,23.727822 23.8606236,23.9132146 23.6540828,23.9766365 C23.6078825,23.9918141 23.5590771,24 23.5089948,24 L18.4910052,24 C18.2198305,24 18,23.785965 18,23.4953156 L18,22.5046844 C18,22.2259549 18.2278805,22 18.4910052,22 L22,22 Z" id="Combined-Shape"></path>
                          </g>
                          <g id="Group-6" transform="translate(0.000000, 18.000000)">
                              <path d="M2,4 L5.50899482,4 C5.78016949,4 6,4.21403503 6,4.50468445 L6,5.49531555 C6,5.77404508 5.77211952,6 5.50899482,6 L0.491005182,6 C0.272178011,6 0.0867853791,5.86062364 0.0233635234,5.65408277 C0.00818589696,5.6078825 0,5.55907707 0,5.50899482 L0,0.491005182 C0,0.219830508 0.214035034,-1.10134124e-13 0.504684448,-1.10134124e-13 L1.49531555,-1.10134124e-13 C1.77404508,-1.10134124e-13 2,0.227880478 2,0.491005182 L2,4 Z" id="Combined-Shape"></path>
                          </g>
                          <g id="Group-4">
                              <path d="M0.345917234,0.0233635234 C0.392117505,0.00818589696 0.440922929,0 0.491005182,0 L5.50899482,0 C5.78016949,0 6,0.214035034 6,0.504684448 L6,1.49531555 C6,1.77404508 5.77211952,2 5.50899482,2 L2,2 L2,5.50899482 C2,5.78016949 1.78596497,6 1.49531555,6 L0.504684448,6 C0.225954924,6 0,5.77211952 0,5.50899482 L0,0.491005182 C0,0.272178011 0.139376356,0.0867853791 0.345917234,0.0233635234 Z" id="Combined-Shape"></path>
                          </g>
                          <g id="Group-5" transform="translate(18.000000, 0.000000)">
                              <path d="M5.97663648,0.345917234 C5.9918141,0.392117505 6,0.440922929 6,0.491005182 L6,5.50899482 C6,5.78016949 5.78596497,6 5.49531555,6 L4.50468445,6 C4.22595492,6 4,5.77211952 4,5.50899482 L4,2 L0.491005182,2 C0.219830508,2 0,1.78596497 0,1.49531555 L0,0.504684448 C0,0.225954924 0.227880478,0 0.491005182,0 L5.50899482,0 C5.72782199,0 5.91321462,0.139376356 5.97663648,0.345917234 Z" id="Combined-Shape"></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>
  </svg>
    `, {}, 'xgplayer-controller')
  let root = player.root
  let btn = container.querySelector('#Group-7-Copy')
  root.appendChild(container)
  // player.on('play', function () {
  //   container.querySelector('.xgplayer-controller-txt').textContent = 'controller'
  //   // if (!player.config.loop) {
  //   util.addClass(root, 'controller')
  //   // }
  // })
  let sensitivity = config.sensitivity || 1
  const MAX_SPEED = sensitivity * 3
  const state = {
    _startRaf: null,
    _startTs: null,
    _endRaf: null,
    _endTs: null,
    speed: {
      ver: 0,
      hor: 0
    },
    speedTop: {
      ver: 0,
      hor: 0
    }
  }
  // let speed = {
  //   ver: 0,
  //   hor: 0
  // }
  // let _raf = null
  // let timeStamp = null
  const clearAnim = () => {
    if (state._endRaf) {
      window.cancelAnimationFrame(state._endRaf)
      state._endTs = null
      state._endRaf = null
      state.speed = {
        ver: 0,
        hor: 0
      }
      state.speedTop = {
        ver: 0,
        hor: 0
      }
    }
    if (state._startRaf) {
      window.cancelAnimationFrame(state._startRaf)
      state._startTs = null
      state._startRaf = null
    }
  }
  let doStartAnimation = () => {}
  const doStartAnimationCurry = (direction, dt) => {
    if (!state._startTs) state._startTs = dt
    const totalDt = dt - state._startTs
    if (Math.abs(state.speed.hor) < MAX_SPEED && ['left', 'right'].includes(direction)) {
      state.speed.hor = (direction === 'right' ? 1 : -1) * MAX_SPEED * (startEasing(totalDt / MAX_SPEED / 1000))
      state.speedTop.hor = state.speed.hor
    }
    if (Math.abs(state.speed.ver) < MAX_SPEED && ['up', 'down'].includes(direction)) {
      state.speed.ver = (direction === 'up' ? 1 : -1) * MAX_SPEED * (startEasing(totalDt / MAX_SPEED / 1000))
      state.speedTop.ver = state.speed.ver
    }
    panoramic.setCameraSpeed({
      verSpeed: state.speed.ver,
      horSpeed: state.speed.hor
    })
    if (Math.abs(state.speed.ver) < MAX_SPEED && Math.abs(state.speed.hor) < MAX_SPEED) {
      state._startRaf = window.requestAnimationFrame(doStartAnimation)
    } else {
      clearAnim()
    }
  }
  btn.addEventListener('mousedown', function (e) {
    e.stopPropagation()
    const {clientX, clientY} = e
    clearAnim()
    const {bottom, right, width, height} = btn.getBoundingClientRect()
    const centerY = bottom - (height / 2)
    const centerX = right - (width / 2)
    const deltaX = clientX - centerX
    const deltaY = clientY - centerY
    const k = deltaY / deltaX
    let direction
    if (k >= -1 && k <= 1) {
      direction = deltaX > 0 ? 'right' : 'left'
    } else {
      direction = deltaY > 0 ? 'down' : 'up'
    }
    doStartAnimation = doStartAnimationCurry.bind(null, direction)
    state._startRaf = window.requestAnimationFrame(doStartAnimation)
  })

  const doEndAnimate = (dt = 0) => {
    if (!state._endTs) state._endTs = dt
    const totalDt = dt - state._endTs

    if (state.speed.hor !== 0) {
      state.speed.hor = state.speedTop.hor * (1 - endEasing(totalDt / Math.abs(state.speedTop.hor) / 1000))
    }
    if (state.speed.ver !== 0) {
      state.speed.ver = state.speedTop.ver * (1 - endEasing(totalDt / Math.abs(state.speedTop.ver) / 1000))
    }
    if (state.speed.hor === 0 && state.speed.ver === 0) {
      return
    }
    console.log(state.speed.ver, state.speed.hor)
    panoramic.setCameraSpeed({
      verSpeed: state.speed.ver,
      horSpeed: state.speed.hor
    })
    if (Math.abs(state.speed.ver) > 0.01 || Math.abs(state.speed.hor) > 0.01) {
      state._endRaf = window.requestAnimationFrame(doEndAnimate)
    } else {
      clearAnim()
    }
  }
  btn.addEventListener('mouseup', function (e) {
    e.stopPropagation()
    clearAnim()
    state._endRaf = window.requestAnimationFrame(doEndAnimate)
  })
  player.once('destroy', () => {
    btn = null
  })
}

Player.install('controller', controller)
