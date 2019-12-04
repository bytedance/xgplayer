import Filter from '../filter';
import GLUtil from '../glutil';
class Rgba extends Filter {
  constructor (config) {
    super();
    this.vShader = [
      'attribute vec4 vertexPos;',
      'attribute vec2 texturePos;',
      'varying vec2 textureCoord;',
      'void main()',
      '{',
      '  gl_Position = vertexPos;',
      '  textureCoord = texturePos;',
      '}'].join('\n');
    this.fShader = [
      'precision highp float;',
      'varying highp vec2 textureCoord;',
      'uniform sampler2D sampler;',
      'void main(void) {',
      '  vec4 color = texture2D(sampler, textureCoord);',
      '  gl_FragColor = vec4(color[0],color[1],color[2],color[3]);',
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
    this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

    let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.sampler, 0);

    this.inputTextures.push(textureRef);
  }

  render (data, width, height) {
    if (data instanceof ImageData){
      data = data.data;
    } else {
      data = data[0];
    }
    let gl = this.gl;
    let program = this.program;
    let textureRef = this.inputTextures[0];

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
}

export default Rgba;
