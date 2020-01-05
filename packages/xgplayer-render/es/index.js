var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import GLUtil from './glutil';
import Basic from './filter/basic';

import Yuyv422 from './fmt/yuyv422';
import Rgb32 from './fmt/rgb32';
import Rgb24 from './fmt/rgb24';
import Nv12 from './fmt/nv12';
import Yuv420 from './fmt/yuv420';
import Rgba from './fmt/rgba';
import Rgb from './fmt/rgb';

var Render = function () {
  function Render(config) {
    _classCallCheck(this, Render);

    this.canvas = config.canvas;
    // input
    if (config.video) {
      this.video = config.video;
      config.flip = 'y';
    } else if (config.image) {
      this.image = config.image;
    } else {
      this._initFmt(config);
    }

    this.filters = [];

    this.basicFilter = new Basic({
      opacity: config.opacity !== undefined ? config.opacity : 1,
      flip: config.flip || undefined
    });

    if (config.filters) {
      for (var i = 0; i < config.filters.length; i++) {
        this.filters.push(config.filters[i]);
      }
    }
    this._init();
  }

  _createClass(Render, [{
    key: '_initFmt',
    value: function _initFmt(config) {
      switch (config.format) {
        case 'YUY2':
          this.fmt = new Yuyv422(this);
          break;
        case 'RGBA':
          this.fmt = new Rgba(this);
          break;
        case 'RGB':
          this.fmt = new Rgb(this);
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
  }, {
    key: '_initImage',
    value: function _initImage() {}
  }, {
    key: '_init',
    value: function _init() {
      this._initContextGL();

      if (!this.gl) {
        throw new Error('fail to init gl');
      }

      var gl = this.gl;
      this.fb = gl.createFramebuffer();

      if (this.fmt) {
        this.fmt.init(this);
      } else if (this.video) {
        var width = this.video.videoWidth;
        var height = this.video.videoHeight;
        var emptyPixels = new Uint8Array(width * height * 4);
        this.videoTexture = GLUtil.createTexture(gl, gl.LINEAR, emptyPixels, width, height);
      }
      this.basicFilter.init(this);

      for (var i = 0; i < this.filters.length; i++) {
        var filter = this.filters[i];
        filter.init(this);
      }
    }
  }, {
    key: '_initContextGL',
    value: function _initContextGL() {
      var canvas = this.canvas;
      var gl = null;

      var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
      var nameIndex = 0;

      while (!gl && nameIndex < validContextNames.length) {
        var contextName = validContextNames[nameIndex];

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
    }
  }, {
    key: '_drawPicture',
    value: function _drawPicture(data, iWidth, iHeight) {
      var _fmt$render = this.fmt.render(data, iWidth, iHeight),
          texture = _fmt$render.texture,
          width = _fmt$render.width,
          height = _fmt$render.height;

      this._applyFilters(texture, width, height);
    }
  }, {
    key: '_drawVideo',
    value: function _drawVideo() {
      var gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
      // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
      this._applyFilters(this.videoTexture, this.video.videoWidth, this.video.videoHeight);
    }
  }, {
    key: '_applyFilters',
    value: function _applyFilters(texture, width, height) {
      var gl = this.gl;

      for (var i = 0; i < this.filters.length; i++) {
        var filter = this.filters[i];
        var data = filter.render(texture, width, height);
        texture = data.texture;
        width = data.width;
        height = data.height;
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      if (this.width !== width || this.height !== height) {
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
      }
      this.basicFilter.render(texture, width, height);
    }
  }, {
    key: 'render',
    value: function render(data, width, height) {
      if (this.fmt) {
        if (this.width !== width || this.height !== height) {
          this.width = this.canvas.width = width;
          this.height = this.canvas.height = height;
        }

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this._drawPicture(data, width, height);
      } else if (this.video) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this._drawVideo();
      }
    }
  }]);

  return Render;
}();

export default Render;