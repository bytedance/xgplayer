import Filter from '../filter';
import GLUtil from '../glutil';
class Yuv420 extends Filter {
  constructor (render, config) {
    super();
    this.vShader = ['attribute vec4 vertexPos;',
      'attribute vec2 yTexturePos;',
      'attribute vec2 uTexturePos;',
      'attribute vec2 vTexturePos;',
      'varying vec2 yTextureCoord;',
      'varying vec2 uTextureCoord;',
      'varying vec2 vTextureCoord;',
      'void main()',
      '{',
      '  gl_Position = vertexPos;',
      '  yTextureCoord = yTexturePos;',
      '  uTextureCoord = uTexturePos;',
      '  vTextureCoord = vTexturePos;',
      '}'].join('\n');
    this.fShader = ['precision highp float;',
      'varying highp vec2 yTextureCoord;',
      'varying highp vec2 uTextureCoord;',
      'varying highp vec2 vTextureCoord;',
      'uniform sampler2D ySampler;',
      'uniform sampler2D uSampler;',
      'uniform sampler2D vSampler;',
      'uniform mat4 yuv2rgb;',
      'void main(void) {',
      '  vec4 colory = texture2D(ySampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));',
      '  vec4 coloru = texture2D(uSampler, vec2(uTextureCoord.x / 4.0, uTextureCoord.y));',
      '  vec4 colorv = texture2D(vSampler, vec2(vTextureCoord.x / 4.0, vTextureCoord.y));',
      '  gl_FragColor = vec4(colory[0], coloru[0], colorv[0], 1) * yuv2rgb;',
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
    let yTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);

    let uTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, uTexturePosBuffer, this.pw.uTexturePos, 2);

    let vTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, vTexturePosBuffer, this.pw.vTexturePos, 2);

    let yTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.ySampler, 0);

    this.inputTextures.push(yTextureRef);

    let uTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.uSampler, 1);

    this.inputTextures.push(uTextureRef);

    let vTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.vSampler, 2);

    this.inputTextures.push(vTextureRef);

    let yuv2rgb = [
      1.16438, 0.00000, 1.59603, -0.87079,
      1.16438, -0.39176, -0.81297, 0.52959,
      1.16438, 2.01723, 0.00000, -1.08139,
      0, 0, 0, 1
    ];
    gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
  }

  render (data, width, height) {
    let ydata = data[0];
    let udata = data[1];
    let vdata = data[2];
    console.log(data);
    let gl = this.gl;
    let program = this.program;
    let yTextureRef = this.inputTextures[0];
    let uTextureRef = this.inputTextures[1];
    let vTextureRef = this.inputTextures[2];

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
  }
}

export default Yuv420;
