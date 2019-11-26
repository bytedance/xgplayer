import GLUtil from './glutil';
import Basic from './filter/basic';

import Yuyv422 from './fmt/yuyv422';
import Rgb32 from './fmt/rgb32';
import Rgb24 from './fmt/rgb24';
import Nv12 from './fmt/nv12';
import Yuv420 from './fmt/yuv420';

class Render {
  constructor (config) {
    this.canvas = config.canvas;
    // input
    if (config.video) {
      this.video = config.video;
      config.flip = 'y';
    } else if (config.image) {
      this.image = config.image;
    } else {
      this._initFmt(config)
    }

    this.filters = [];

    if (config.opacity !== undefined ||
       !!config.flip) {
      this.basicFilter = new Basic({opacity: config.opacity, flip: config.flip});
    } else {
      this.basicFilter = new Basic({opacity: 1});
    }

    if (config.filters) {
      for (let i = 0; i < config.filters.length; i++) {
        this.filters.push(config.filters[i]);
      }
    }
    this._init();
  }

  _initFmt (config) {
    switch (config.format) {
      case 'YUY2':
        this.fmt = new Yuyv422(this);
        break;
      case 'RGB32':
        this.fmt = new Rgb32(this);
        break;
      case 'RGB24':
        this.fmt = new Rgb24(this);
        break;
      case 'NV12':
        this.fmt = new Nv12(this);
        break;
      case 'YUV420':
        this.fmt = new Yuv420(this);
        break;
      default:
        break;
    }
  }

  _initVideo () {
    let gl = this.gl;
    this.inputTexture = GLUtil.createTexture(gl, gl.LINEAR, this.video);
  }
  _initImage () {

  }

  _init () {
    this._initContextGL();

    if (!this.gl) {
      throw new Error(`fail to init gl`)
    }

    let gl = this.gl;
    this.fb = gl.createFramebuffer();

    if (this.fmt) {
      this.fmt.init(this);
    } else {
      const width = this.video.videoWidth;
      const height = this.video.videoHeight;
      let emptyPixels = new Uint8Array(width * height * 4);
      this.videoTexture = GLUtil.createTexture(gl, gl.LINEAR, emptyPixels, width, height);
    }
    this.basicFilter.init(this)

    for (let i = 0; i < this.filters.length; i++) {
      let filter = this.filters[i];
      filter.init(this);
    }
  }

  _initContextGL () {
    let canvas = this.canvas;
    let gl = null;

    let validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    let nameIndex = 0;

    while (!gl && nameIndex < validContextNames.length) {
      let contextName = validContextNames[nameIndex];

      try {
        gl = canvas.getContext(contextName);
      } catch (e) {
        gl = null;
      }

      if (!gl || typeof gl.getParameter !== 'function') {
        gl = null;
      }

      ++nameIndex;
    };

    this.gl = gl;
  };

  _drawPicture (data, width, height) {
    let gl = this.gl;
    let tempTexture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tempTexture, 0);

    this.fmt.render(data, width, height);

    this._applyFilters(tempTexture, width, height);
  }

  _drawVideo () {
    let gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
    this._applyFilters(this.videoTexture, this.video.videoWidth, this.video.videoHeight)
  }

  _applyFilters (texture, width, height) {
    let gl = this.gl;
    for (let i = 0; i < this.filters.length; i++) {
      let filter = this.filters[i];
      texture = filter.render(texture, width, height);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.basicFilter.render(texture, width, height);
  }

  render (data, width, height) {
    if (this.fmt) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this._drawPicture(data, width, height)
    } else if (this.video) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this._drawVideo();
    }
  }
}

export default Render;
