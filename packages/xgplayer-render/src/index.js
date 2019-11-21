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
    } else if (config.image) {
      this.image = config.image;
    } else {
      this._initFmt(config)
    }

    this.filters = [];
    if (config.opacity !== undefined ||
       !!config.flip) {
      let filter = new Basic(this, {opacity: config.opacity, flip: config.flip});
      this.filters.push(filter);
    }

    if (config.flip !== undefined) {

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

  _initFilter () {

  }
  _initVideo () {
    let gl = this.contextGL;
    this.inputTexture = GLUtil.createTexture(gl, gl.LINEAR, this.video);
    console.log(this.filters);
  }
  _initImage () {

  }

  _init () {
    this._initContextGL();
    if (!this.contextGL) {
      throw new Error(`fail to init gl`)
    }

    let gl = this.contextGL;
    this.fb = gl.createFramebuffer();

    if (this.fmt) {
      this.fmt.init(this.contextGL);
    } else {
      // TODO
    }

    for (let i = 0; i < this.filters.length; i++) {
      let filter = this.filters[i];
      filter.init(gl);
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

    this.contextGL = gl;
  };

  _drawPicture (data, width, height) {
    let gl = this.contextGL;
    let tempTexture, inputTexture;
    if (this.fmt) {
      if (this.filters.length < 1) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        tempTexture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tempTexture, 0);
      }

      this.fmt.render(data, width, height);
    }

    for (let i = 0; i < this.filters.length - 1; i++) {
      // TODO
      let filter = this.filters[i];
      let inputTexture = tempTexture;
      tempTexture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height)
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tempTexture, 0);
      filter.render(inputTexture, width, height);
    }

    if (this.filters.length > 0) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      let lastFilter = this.filters[this.filters.length - 1];
      lastFilter.render(tempTexture, width, height);
    }
  }

  render (data, width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this._drawPicture(data, width, height)
  }
}

export default Render;
