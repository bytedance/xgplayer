var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Filter from '../filter';
import GLUtil from '../glutil';

var Basic = function (_Filter) {
  _inherits(Basic, _Filter);

  function Basic(config) {
    _classCallCheck(this, Basic);

    var _this = _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this));

    _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
    _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform highp float opacity;', 'uniform sampler2D sampler;', 'uniform highp float flipx;', 'uniform highp float flipy;', 'void main(void) {', '  float cordx = textureCoord.x;', '  if(flipx > 0.5) {', '     cordx = 1.0 - textureCoord.x;', '  }', '  float cordy = 1.0 - textureCoord.y;', '  if(flipy > 0.5) {', '    cordy = textureCoord.y;', '  }', '  vec4 color = texture2D(sampler,vec2(cordx, cordy));', '  gl_FragColor = vec4(color[0],color[1],color[2],opacity);', '}'].join('\n');

    _this.opacity = config.opacity === undefined ? 1 : config.opacity;
    _this.flip = config.flip;
    return _this;
  }

  _createClass(Basic, [{
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
    key: 'setFlip',
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
    key: 'render',
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

export default Basic;