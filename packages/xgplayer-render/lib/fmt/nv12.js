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

var Nv12 = function (_Filter) {
  _inherits(Nv12, _Filter);

  function Nv12(config) {
    _classCallCheck(this, Nv12);

    var _this = _possibleConstructorReturn(this, (Nv12.__proto__ || Object.getPrototypeOf(Nv12)).call(this));

    _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uvTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uvTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uvTextureCoord = uvTexturePos;', '}'].join('\n');
    _this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uvTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uvSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  vec4 colory = texture2D(ySampler, yTextureCoord);', '  vec4 coloruv = texture2D(uvSampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));', '  gl_FragColor = vec4(colory[0], coloruv[0], coloruv[1], 1) * yuv2rgb;', '}'].join('\n');
    return _this;
  }

  _createClass(Nv12, [{
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

      var uvTexturePosBuffer = _glutil2.default.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      _glutil2.default.bindAttribute(gl, uvTexturePosBuffer, this.pw.uvTexturePos, 2);

      var yTextureRef = _glutil2.default.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.ySampler, 0);

      this.inputTextures.push(yTextureRef);

      var uvTextureRef = _glutil2.default.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.uvSampler, 1);

      this.inputTextures.push(uvTextureRef);

      var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
    }
  }, {
    key: 'render',
    value: function render(data, width, height) {
      var ydata = data[0];
      var uvdata = data[1];
      var gl = this.gl;
      var program = this.program;
      var yTextureRef = this.inputTextures[0];
      var uvTextureRef = this.inputTextures[1];

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

      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, ydata);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, uvTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, uvdata);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width: width,
        height: height
      };
    }
  }]);

  return Nv12;
}(_filter2.default);

exports.default = Nv12;