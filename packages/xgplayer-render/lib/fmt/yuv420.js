'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filter = require('../filter');

var _filter2 = _interopRequireDefault(_filter);

var _glutil = require('../glutil');

var _glutil2 = _interopRequireDefault(_glutil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Yuv420 = function (_Filter) {
  _inherits(Yuv420, _Filter);

  function Yuv420(render, config) {
    _classCallCheck(this, Yuv420);

    var _this = _possibleConstructorReturn(this, (Yuv420.__proto__ || Object.getPrototypeOf(Yuv420)).call(this));

    _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uTexturePos;', 'attribute vec2 vTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uTextureCoord = uTexturePos;', '  vTextureCoord = vTexturePos;', '}'].join('\n');
    _this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  highp float y = texture2D(ySampler,  yTextureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * yuv2rgb;', '}'].join('\n');
    return _this;
  }

  _createClass(Yuv420, [{
    key: 'init',
    value: function init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      var gl = this.gl = render.gl;
      this.pw = _glutil2.default.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program);
      // vertexPos
      var vertexPosBuffer = _glutil2.default.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      _glutil2.default.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

      // texturePos
      var yTexturePosBuffer = _glutil2.default.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      _glutil2.default.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);

      var uTexturePosBuffer = _glutil2.default.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      _glutil2.default.bindAttribute(gl, uTexturePosBuffer, this.pw.uTexturePos, 2);

      var vTexturePosBuffer = _glutil2.default.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      _glutil2.default.bindAttribute(gl, vTexturePosBuffer, this.pw.vTexturePos, 2);

      var yTextureRef = _glutil2.default.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.ySampler, 0);

      this.inputTextures.push(yTextureRef);

      var uTextureRef = _glutil2.default.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.uSampler, 1);

      this.inputTextures.push(uTextureRef);

      var vTextureRef = _glutil2.default.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.vSampler, 2);

      this.inputTextures.push(vTextureRef);

      var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
    }
  }, {
    key: 'render',
    value: function render(data, width, height) {
      var ydata = data[0];
      var udata = data[1];
      var vdata = data[2];
      var gl = this.gl;
      var program = this.program;
      var yTextureRef = this.inputTextures[0];
      var uTextureRef = this.inputTextures[1];
      var vTextureRef = this.inputTextures[2];

      if (this.width !== width || this.height !== height) {
        this.width = width;
        this.height = height;
        this.outputTexuture = _glutil2.default.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
      }

      if (!this.outputTexuture) {
        this.outputTexuture = _glutil2.default.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

      gl.useProgram(program);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);

      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, ydata);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, udata);

      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vdata);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      return {
        texture: this.outputTexuture,
        width: width,
        height: height
      };
    }
  }]);

  return Yuv420;
}(_filter2.default);

exports.default = Yuv420;