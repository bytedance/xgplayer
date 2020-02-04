(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Render = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var GLUtil =
  /*#__PURE__*/
  function () {
    function GLUtil() {
      _classCallCheck(this, GLUtil);
    }

    _createClass(GLUtil, null, [{
      key: "createTexture",
      value: function createTexture(gl, filter, data, width, height) {
        var textureRef = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        if (data instanceof Uint8Array) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof HTMLVideoElement) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof HTMLImageElement) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof ImageData) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);
        return textureRef;
      }
    }, {
      key: "createBuffer",
      value: function createBuffer(gl, data) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        return buffer;
      }
    }, {
      key: "createShader",
      value: function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader));
        }

        return shader;
      }
    }, {
      key: "createProgram",
      value: function createProgram(gl, vertexSource, fragmentSource) {
        var program = gl.createProgram();
        var vertexShader = GLUtil.createShader(gl, gl.VERTEX_SHADER, vertexSource);
        var fragmentShader = GLUtil.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program));
        }

        var wrapper = {
          program: program
        };
        var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

        for (var i = 0; i < numAttributes; i++) {
          var attribute = gl.getActiveAttrib(program, i);
          wrapper[attribute.name] = gl.getAttribLocation(program, attribute.name);
        }

        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (var i$1 = 0; i$1 < numUniforms; i$1++) {
          var uniform = gl.getActiveUniform(program, i$1);
          wrapper[uniform.name] = gl.getUniformLocation(program, uniform.name);
        }

        return wrapper;
      }
    }, {
      key: "bindAttribute",
      value: function bindAttribute(gl, buffer, attribute, numComponents) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
      }
    }]);

    return GLUtil;
  }();

  var Filter = function Filter() {
    _classCallCheck(this, Filter);

    this.inputTextures = [];
  };

  var Basic =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Basic, _Filter);

    function Basic(config) {
      var _this;

      _classCallCheck(this, Basic);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Basic).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform highp float opacity;', 'uniform sampler2D sampler;', 'uniform highp float flipx;', 'uniform highp float flipy;', 'void main(void) {', '  float cordx = textureCoord.x;', '  if(flipx > 0.5) {', '     cordx = 1.0 - textureCoord.x;', '  }', '  float cordy = 1.0 - textureCoord.y;', '  if(flipy > 0.5) {', '    cordy = textureCoord.y;', '  }', '  vec4 color = texture2D(sampler,vec2(cordx, cordy));', '  gl_FragColor = vec4(color[0],color[1],color[2],opacity);', '}'].join('\n');
      _this.opacity = config.opacity === undefined ? 1 : config.opacity;
      _this.flip = config.flip;
      return _this;
    }

    _createClass(Basic, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        var texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, texturePosBuffer, this.pw.texturePos, 2);
        GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        gl.uniform1f(this.pw.opacity, this.opacity);
        var flipx = 0;
        var flipy = 0;

        if (this.flip === 'x' || this.flip === 'xy') {
          flipx = 1;
        }

        if (this.flip === 'y' || this.flip === 'xy') {
          flipy = 1;
        }

        gl.uniform1f(this.pw.flipx, flipx);
        gl.uniform1f(this.pw.flipy, flipy);
      }
    }, {
      key: "setFlip",
      value: function setFlip(flip) {
        var flipx = 0;
        var flipy = 0;
        this.flip = flip;

        if (this.flip === 'x' || this.flip === 'xy') {
          flipx = 1;
        }

        if (this.flip === 'y' || this.flip === 'xy') {
          flipy = 1;
        }

        this.gl.uniform1f(this.pw.flipx, flipx);
        this.gl.uniform1f(this.pw.flipy, flipy);
      }
    }, {
      key: "render",
      value: function render(texture, width, height) {
        var gl = this.gl;
        var program = this.program;
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }]);

    return Basic;
  }(Filter);

  var Yuyv422 =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Yuyv422, _Filter);

    function Yuyv422(config) {
      var _this;

      _classCallCheck(this, Yuyv422);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Yuyv422).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  float cx = 1.0 / outerSize.x;', '  float odd = floor(mod(textureCoord.x * outerSize.x, 2.0));', '  float x = textureCoord.x + 0.5 * cx - odd * cx;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  float ydata = odd < 0.5?color[0]:color[2];', '  float udata = color[1];', '  float vdata = color[3];', '  gl_FragColor = vec4(ydata, udata, vdata, 1) * yuv2rgb;', '}'].join('\n');
      return _this;
    }

    _createClass(Yuyv422, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
        var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.uniform2fv(this.pw.outerSize, [width, height]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return this.outputTexuture;
      }
    }]);

    return Yuyv422;
  }(Filter);

  var Rgb32 =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Rgb32, _Filter);

    function Rgb32(config) {
      var _this;

      _classCallCheck(this, Rgb32);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rgb32).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'void main(void) {', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[2],color[1],color[0],color[3]);', '}'].join('\n');
      return _this;
    }

    _createClass(Rgb32, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return this.outputTexuture;
      }
    }]);

    return Rgb32;
  }(Filter);

  var Rgb24 =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Rgb24, _Filter);

    function Rgb24(config) {
      var _this;

      _classCallCheck(this, Rgb24);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rgb24).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(bdata, gdata, rdata, 1);', '}'].join('\n');
      return _this;
    }

    _createClass(Rgb24, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        var outerSizeRef = gl.getUniformLocation(program, 'outerSize');
        gl.uniform2fv(outerSizeRef, [width, height]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        var inputx = width - width % 4;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }]);

    return Rgb24;
  }(Filter);

  var Nv12 =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Nv12, _Filter);

    function Nv12(config) {
      var _this;

      _classCallCheck(this, Nv12);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Nv12).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uvTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uvTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uvTextureCoord = uvTexturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uvTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uvSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  vec4 colory = texture2D(ySampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));', '  vec4 coloruv = texture2D(uvSampler, vec2(uvTextureCoord.x / 2.0, uvTextureCoord.y));', '  gl_FragColor = vec4(colory[0], coloruv[0], coloruv[1], 1) * yuv2rgb;', '}'].join('\n');
      return _this;
    }

    _createClass(Nv12, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        var yTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);
        var uvTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, uvTexturePosBuffer, this.pw.uvTexturePos, 2);
        var yTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.ySampler, 0);
        this.inputTextures.push(yTextureRef);
        var uvTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.uvSampler, 1);
        this.inputTextures.push(uvTextureRef);
        var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        var ydata = data[0];
        var uvdata = data[1];
        var gl = this.gl;
        var program = this.program;
        var yTextureRef = this.inputTextures[0];
        var uvTextureRef = this.inputTextures[1];
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, ydata);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uvTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, uvdata);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return this.outputTexuture;
      }
    }]);

    return Nv12;
  }(Filter);

  var Yuv420 =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Yuv420, _Filter);

    function Yuv420(render, config) {
      var _this;

      _classCallCheck(this, Yuv420);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Yuv420).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uTexturePos;', 'attribute vec2 vTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uTextureCoord = uTexturePos;', '  vTextureCoord = vTexturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  vec4 colory = texture2D(ySampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));', '  vec4 coloru = texture2D(uSampler, vec2(uTextureCoord.x / 4.0, uTextureCoord.y));', '  vec4 colorv = texture2D(vSampler, vec2(vTextureCoord.x / 4.0, vTextureCoord.y));', '  gl_FragColor = vec4(colory[0], coloru[0], colorv[0], 1) * yuv2rgb;', '}'].join('\n');
      return _this;
    }

    _createClass(Yuv420, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        var yTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);
        var uTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, uTexturePosBuffer, this.pw.uTexturePos, 2);
        var vTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, vTexturePosBuffer, this.pw.vTexturePos, 2);
        var yTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.ySampler, 0);
        this.inputTextures.push(yTextureRef);
        var uTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.uSampler, 1);
        this.inputTextures.push(uTextureRef);
        var vTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.vSampler, 2);
        this.inputTextures.push(vTextureRef);
        var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        var ydata = data[0];
        var udata = data[1];
        var vdata = data[2];
        var gl = this.gl;
        var program = this.program;
        var yTextureRef = this.inputTextures[0];
        var uTextureRef = this.inputTextures[1];
        var vTextureRef = this.inputTextures[2];
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, ydata);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 8, 0, gl.RGBA, gl.UNSIGNED_BYTE, udata);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 8, 0, gl.RGBA, gl.UNSIGNED_BYTE, vdata);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return this.outputTexuture;
      }
    }]);

    return Yuv420;
  }(Filter);

  var Rgba =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Rgba, _Filter);

    function Rgba(config) {
      var _this;

      _classCallCheck(this, Rgba);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rgba).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'void main(void) {', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[0],color[1],color[2],color[3]);', '}'].join('\n');
      return _this;
    }

    _createClass(Rgba, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        if (data instanceof ImageData) {
          data = data.data;
        } else {
          data = data[0];
        }

        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return this.outputTexuture;
      }
    }]);

    return Rgba;
  }(Filter);

  var Rgb =
  /*#__PURE__*/
  function (_Filter) {
    _inherits(Rgb, _Filter);

    function Rgb(config) {
      var _this;

      _classCallCheck(this, Rgb);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rgb).call(this));
      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(rdata, gdata, bdata, 1);', '}'].join('\n');
      return _this;
    }

    _createClass(Rgb, [{
      key: "init",
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program); // vertexPos

        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);
        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        var outerSizeRef = gl.getUniformLocation(program, 'outerSize');
        gl.uniform2fv(outerSizeRef, [width, height]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        var inputx = width - width % 4;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }]);

    return Rgb;
  }(Filter);

  var Render =
  /*#__PURE__*/
  function () {
    function Render(config) {
      _classCallCheck(this, Render);

      this.canvas = config.canvas; // input

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
      key: "_initFmt",
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
        }
      }
    }, {
      key: "_initImage",
      value: function _initImage() {}
    }, {
      key: "_init",
      value: function _init() {
        this._initContextGL();

        if (!this.gl) {
          throw new Error("fail to init gl");
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
      key: "_initContextGL",
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
        }
        this.gl = gl;
      }
    }, {
      key: "_drawPicture",
      value: function _drawPicture(data, width, height) {
        var texture = this.fmt.render(data, width, height);

        this._applyFilters(texture, width, height);
      }
    }, {
      key: "_drawVideo",
      value: function _drawVideo() {
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);

        this._applyFilters(this.videoTexture, this.video.videoWidth, this.video.videoHeight);
      }
    }, {
      key: "_applyFilters",
      value: function _applyFilters(texture, width, height) {
        var gl = this.gl;

        for (var i = 0; i < this.filters.length; i++) {
          var filter = this.filters[i];
          texture = filter.render(texture, width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.basicFilter.render(texture, width, height);
      }
    }, {
      key: "render",
      value: function render(data, width, height) {
        if (this.fmt) {
          this.canvas.width = width;
          this.canvas.height = height;
          this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

          this._drawPicture(data, width, height);
        } else if (this.video) {
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
          this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

          this._drawVideo();
        }
      }
    }]);

    return Render;
  }();

  return Render;

})));
