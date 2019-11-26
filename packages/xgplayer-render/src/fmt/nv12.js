import Filter from '../filter';
import GLUtil from '../glutil';
class Nv12 extends Filter {
  constructor (config) {
    super();
    this.vShader = ['attribute vec4 vertexPos;',
      'attribute vec2 yTexturePos;',
      'attribute vec2 uvTexturePos;',
      'varying vec2 yTextureCoord;',
      'varying vec2 uvTextureCoord;',
      'void main()',
      '{',
      '  gl_Position = vertexPos;',
      '  yTextureCoord = yTexturePos;',
      '  uvTextureCoord = uvTexturePos;',
      '}'].join('\n');
    this.fShader = ['precision highp float;',
      'varying highp vec2 yTextureCoord;',
      'varying highp vec2 uvTextureCoord;',
      'uniform sampler2D ySampler;',
      'uniform sampler2D uvSampler;',
      'uniform mat4 yuv2rgb;',
      'void main(void) {',
      '  vec4 colory = texture2D(ySampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));', 
      '  vec4 coloruv = texture2D(uvSampler, vec2(uvTextureCoord.x / 2.0, uvTextureCoord.y));',
      '  gl_FragColor = vec4(colory[0], coloruv[0], coloruv[1], 1) * yuv2rgb;',
      '}'].join('\n');
  }

  init (render) {
    this.rend = render;
    this.canvas = render.canvas;
    let gl = this.gl = render.gl;
    this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
    this.program = this.pw.program;
    gl.useProgram(this.program);
    // vertexPos
    let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
    GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

    // texturePos
    let yTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);

    let uvTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, uvTexturePosBuffer, this.pw.uvTexturePos, 2);

    let yTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.ySampler, 0);

    this.inputTextures.push(yTextureRef);

    let uvTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.uvSampler, 1);

    this.inputTextures.push(uvTextureRef);

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
    let uvdata = data[1];
    let gl = this.gl;
    let program = this.program;
    let yTextureRef = this.inputTextures[0];
    let uvTextureRef = this.inputTextures[1];

    gl.useProgram(program);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, ydata);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, uvTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, uvdata);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Nv12;
