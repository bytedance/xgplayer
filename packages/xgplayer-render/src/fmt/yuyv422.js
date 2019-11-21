import Filter from '../filter';
import GLUtil from '../glutil';
class Yuyv422 extends Filter {
  constructor (render, config) {
    super();
    this.vShader = ['attribute vec4 vertexPos;',
      'attribute vec2 texturePos;',
      'varying vec2 textureCoord;',
      'void main()',
      '{',
      '  gl_Position = vertexPos;',
      '  textureCoord = texturePos;',
      '}'].join('\n');
    this.fShader = ['precision highp float;',
      'varying highp vec2 textureCoord;',
      'uniform sampler2D sampler;',
      'uniform vec2 outerSize;',
      'uniform mat4 yuv2rgb;',
      'void main(void) {',
      '  float cx = 1.0 / outerSize.x;',
      '  float odd = floor(mod(textureCoord.x * outerSize.x, 2.0));',
      '  float x = textureCoord.x + 0.5 * cx - odd * cx;',
      '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));',
      '  float ydata = odd < 0.5?color[0]:color[2];',
      '  float udata = color[1];',
      '  float vdata = color[3];',
      '  gl_FragColor = vec4(ydata, udata, vdata, 1) * yuv2rgb;',
      '}'].join('\n');
    this.rend = render;
    this.canvas = render.canvas;
  }

  init (gl) {
    this.gl = gl;
    this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
    this.program = this.pw.program;
    gl.useProgram(this.program);
    // vertexPos
    let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
    GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

    // texturePos
    this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

    let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.sampler, 0);

    this.inputTextures.push(textureRef);

    let yuv2rgb = [
      1.16438, 0.00000, 1.59603, -0.87079,
      1.16438, -0.39176, -0.81297, 0.52959,
      1.16438, 2.01723, 0.00000, -1.08139,
      0, 0, 0, 1
    ];
    gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
  }

  render (data, width, height) {
    data = data[0];
    let gl = this.gl;
    let program = this.program;
    let textureRef = this.inputTextures[0];

    gl.useProgram(program);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    gl.uniform2fv(this.pw.outerSize, [width, height]);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Yuyv422;
