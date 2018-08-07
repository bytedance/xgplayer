/**
 * @author fuyuhao
 */
import {
  PerspectiveCamera,
  VideoTexture,
  Vector3,
  LinearFilter,
  SphereBufferGeometry,
  RGBFormat,
  Scene,
  MeshBasicMaterial,
  WebGLRenderer,
  Mesh,
  DoubleSide,
  Math as THREEMath
} from 'three'
const getDefaultOpts = () => ({
  fov: 75,
  radius: 500,
  width: 600,
  height: 337.5,
  heightSegments: 32,
  widthSegments: 32,
  dpr: window.devicePixelRatio || 2
})
const getDefaultVideoOpts = () => ({
  scale: 0,
  verAngle: 0,
  horAngle: 0,
  verSpeed: 0,
  horSpeed: 0
})

let instance = null
/**
 * panoramic core
 */
class Panoramic {
  constructor (options, player) {
    if (instance !== null) {
      return instance
    }
    this.player = player
    instance = this
    this._options = Object.assign(getDefaultOpts(), options)
    this._GL = {
      camera: null,
      mesh: null,
      texture: null,
      material: null,
      renderer: null,
      geometry: null,
      scene: null
    }
    this._CAMERA = getDefaultVideoOpts()
    this._CAMERA_NEXT = getDefaultVideoOpts()
    this._RAF = null

    this.state = {
      isInited: false,
      isFullScreen: false,
      isStopped: false,
      needUpdate: true
    }
    this.dom = null
    this.listeners = []

    this._bindEvents()
  }

  /**
   * init webGL
   * @param videoEl
   * @returns {*}
   */
  init (videoEl) {
    if (this.state.isInited) return
    const {
      width,
      height,
      fov,
      devicePixelRatio,
      radius,
      heightSegments,
      widthSegments
    } = this._options
    const camera = new PerspectiveCamera(fov, width / height, 0.1, 1000)
    camera.target = new Vector3(0, 0, 0)
    const scene = new Scene()
    // scene.add(axes)
    const texture = new VideoTexture(videoEl)
    const geometry = new SphereBufferGeometry(radius, widthSegments, heightSegments)
    geometry.scale(-1, 1, 1)
    texture.minFilter = LinearFilter
    texture.magFilter = LinearFilter
    texture.format = RGBFormat
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    const renderer = new WebGLRenderer()
    renderer.setPixelRatio(devicePixelRatio)
    renderer.setSize(width, height)
    // camera.target = scene.position
    this._GL = {
      camera,
      scene,
      texture,
      geometry,
      material,
      mesh,
      renderer
    }
    this.state.isInited = true
    this.dom = renderer.domElement
    this.dom.classList.add('xgplayer-panoramic')
    // if there are listeners cached，bind them to canvas DOM
    if (this.listeners.length) {
      this.flushEventListeners()
    }
    return renderer.domElement
  }

  /**
   * start rendering
   */
  start () {
    if (this.state.isInited && this._RAF === null) {
      this._doRender()
    }
    this.state.isStopped = false
  }

  setCameraSpeed ({ verSpeed, horSpeed }) {
    this._CAMERA.verSpeed = verSpeed
    this._CAMERA.horSpeed = horSpeed
    this.state.needUpdate = true
  }
  /**
   * move camera for 360-degree experience
   * @param movements
   */
  cameraMove (movements) {
    const { _CAMERA } = this
    if (_CAMERA.verAngle + movements.verAngle >= 90) {
      movements.verAngle = 0
    }
    if (_CAMERA.verAngle + movements.verAngle <= -90) {
      movements.verAngle = 0
    }
    for (let k in movements) {
      this._CAMERA[k] = movements[k] + this._CAMERA[k]
    }
    this.state.needUpdate = true
  }

  /**
   * flush listeners cache
   */
  flushEventListeners () {
    this.listeners.forEach((args) => {
      this.dom.addEventListener(...args)
    })
    this.listeners.length = 0
  }

  /**
   * add listener to dom
   * @param args
   */
  addEventListener (...args) {
    if (this.state.isInited) {
      this.dom.addEventListener(...args)
    } else {
      this.listeners.push(args)
    }
  }

  /**
   * unbind listeners
   * @param args
   */
  removeEventListener (...args) {
    this.dom.removeEventListener(...args)
  }

  /**
   * stop render process
   */
  stop () {
    this.state.isStopped = true
    window.cancelAnimationFrame(this._RAF)
    this._RAF = null
  }

  /**
   * get radius coord
   * @param deg
   * @returns {*}
   * @private
   */
  static _degToRad (deg) {
    return THREEMath.degToRad(deg)
  }

  /**
   * render a frame
   * @private
   */
  _doRender () {
    if (this.state.isStopped) return
    this._RAF = window.requestAnimationFrame(this._doRender.bind(this))
    const { renderer, scene, camera } = this._GL
    if (this.state.needUpdate) {
      const { radius } = this._options
      const { verSpeed, horSpeed } = this._CAMERA
      const absVerSpeed = Math.abs(verSpeed)
      const absHorSpeed = Math.abs(horSpeed)
      if (absVerSpeed > 0.1) {
        if (Math.abs(this._CAMERA.verAngle + verSpeed) < 90) {
          this._CAMERA.verAngle += verSpeed
        }
      }
      if (absHorSpeed > 0.1) {
        this._CAMERA.horAngle += horSpeed
      }
      let { verAngle, horAngle } = this._CAMERA

      const yPos = radius * Math.sin(Panoramic._degToRad(verAngle))

      const xzRadius = yPos === 0 ? radius : Math.abs(yPos * (1 / Math.tan(Panoramic._degToRad(verAngle))))
      const xPos = xzRadius * Math.cos(Panoramic._degToRad(horAngle))
      const zPos = xzRadius * Math.sin(Panoramic._degToRad(horAngle))
      camera.target = new Vector3(xPos, yPos, zPos)
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 0
      camera.lookAt(camera.target)
      if (absHorSpeed < 0.1 && absVerSpeed < 0.1) {
        this.state.needUpdate = false
      }
    }

    renderer.render(scene, camera)
  }

  /**
   * destroy panoramic
   */
  destroy () {
    this._GL = null
    this._options = null
    this.state = null
    this.dom = null
    this._CAMERA = null
    this.listeners = null
    window.cancelAnimationFrame(this._RAF)
    this._RAF = null
    this._unbindFullScreenEvents()
    instance = null
  }

  /**
   * unbind fullscreen event
   */
  _unbindFullScreenEvents () {
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.removeEventListener(item, this._handleFullScreen)
    })
  }

  /**
   * bind events
   */
  _bindEvents () {
    this._handleFullScreen = () => {
      if (!this.state.isFullScreen) {
        this._GL.renderer.setSize(window.innerWidth, window.innerHeight)
        this._GL.camera.aspect = window.innerWidth / window.innerHeight
        this._GL.camera.updateProjectionMatrix()
      } else {
        this._GL.renderer.setSize(this._options.width, this._options.height)
        this._GL.camera.aspect = this._options.width / this._options.height
        this._GL.camera.updateProjectionMatrix()
      }
      this.state.needUpdate = true
      this.state.isFullScreen = !this.state.isFullScreen
    }
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.addEventListener(item, this._handleFullScreen)
    })
    this.player.once('destroy', () => {
      this.destroy()
    })
  }

  /**
  * get current camera ver/hor angle
   */
  get angle () {
    return {
      ver: this._CAMERA.verAngle,
      hor: this._CAMERA.horAngle
    }
  }
}
export default Panoramic
