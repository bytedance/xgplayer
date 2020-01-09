import Filter from '../filter';
import GLUtil from '../glutil';
class Rgb24 extends Filter {
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
      'uniform vec2 outerSize;',
      'uniform mat4 YUV2RGB;',
      'void main(void) {',
      '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));',
      '  float cy = 1.0 / outerSize.y;',

      '  float mx = floor(mod(outerSize.x, 4.0));',
      '  float cx = 1.0 / outerSize.x;',
      '  float width =  outerSize.x + mx;',
      '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);',
      '  x = cx * mod(x * outerSize.x, width);',
      '  float bdata, gdata, rdata;',

      '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));',
      '  rdata = color[0];',
      '  gdata = color[1];',
      '  bdata = color[2];',
      '  gl_FragColor = vec4(bdata, gdata, rdata, 1);',
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
    data = data[0];
    let gl = this.gl;
    let program = this.program;
    let textureRef = this.inputTextures[0];

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

    let outerSizeRef = gl.getUniformLocation(program, 'outerSize');
    gl.uniform2fv(outerSizeRef, [width, height]);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    let inputx = width - (width % 4);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    return {
      texture: this.outputTexuture,
      width,
      height
    };
  }
}

export default Rgb24;
