var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Filter from '../filter';
import GLUtil from '../glutil';

var Yuyv422 = function (_Filter) {
  _inherits(Yuyv422, _Filter);

  function Yuyv422(config) {
    _classCallCheck(this, Yuyv422);

    var _this = _possibleConstructorReturn(this, (Yuyv422.__proto__ || Object.getPrototypeOf(Yuyv422)).call(this));

    _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
    _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  float cx = 1.0 / outerSize.x;', '  float odd = floor(mod(textureCoord.x * outerSize.x, 2.0));', '  float x = textureCoord.x + 0.5 * cx - odd * cx;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  float ydata = odd < 0.5?color[0]:color[2];', '  float udata = color[1];', '  float vdata = color[3];', '  gl_FragColor = vec4(ydata, udata, vdata, 1) * yuv2rgb;', '}'].join('\n');
    return _this;
  }

  _createClass(Yuyv422, [{
    key: 'init',
    value: function init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      var gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program);
      // vertexPos
      var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

      // texturePos
      this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

      var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);

      this.inputTextures.push(textureRef);

      var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
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
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
      }

      if (!this.outputTexuture) {
        this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

      gl.useProgram(program);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);

      gl.uniform2fv(this.pw.outerSize, [width, height]);

      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      return {
        texture: this.outputTexuture,
        width: width,
        height: height
      };
    }
  }]);

  return Yuyv422;
}(Filter);

export default Yuyv422;