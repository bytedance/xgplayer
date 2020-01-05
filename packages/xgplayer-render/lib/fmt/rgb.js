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

var Rgb = function (_Filter) {
  _inherits(Rgb, _Filter);

  function Rgb(config) {
    _classCallCheck(this, Rgb);

    var _this = _possibleConstructorReturn(this, (Rgb.__proto__ || Object.getPrototypeOf(Rgb)).call(this));

    _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
    _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(rdata, gdata, bdata, 1);', '}'].join('\n');
    return _this;
  }

  _createClass(Rgb, [{
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
      this.texturePosBuffer = _glutil2.default.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      _glutil2.default.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

      var textureRef = _glutil2.default.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
      this.inputTextures.push(textureRef);
    }
  }, {
    key: 'render',
    value: function render(data, width, height) {
      data = data[0];
      var gl = this.gl;
      var program = this.program;
      var textureRef = this.inputTextures[0];

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

      var outerSizeRef = gl.getUniformLocation(program, 'outerSize');
      gl.uniform2fv(outerSizeRef, [width, height]);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef);
      var inputx = width - width % 4;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      return {
        texture: this.outputTexuture,
        width: width,
        height: height
      };
    }
  }]);

  return Rgb;
}(_filter2.default);

exports.default = Rgb;