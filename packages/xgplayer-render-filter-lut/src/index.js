
import GLUtil from '../../xgplayer-render/src/glutil.js';
class LutFilter {
  constructor (config) {
    this.opacity = config.opacity === undefined ? 1 : config.opacity;
    this.lut = document.createElement('img');
    this.lut.src = config.lut;
    this.lut.crossOrigin = 'anonymous';
    this.vShader = [
      'attribute vec4 vertexPos;',
      'attribute vec2 texturePos;',
      'attribute vec2 lutPos;',
      'varying vec2 textureCoord;',
      'varying vec2 lutCoord;',
      'void main()',
      '{',
      '  gl_Position = vertexPos;',
      '  textureCoord = texturePos;',
      '  lutCoord = lutPos;',
      '}'].join('\n');
    this.fShader = [
      'precision highp float;',
      'varying highp vec2 textureCoord;',
      'uniform float opacity;',
      'uniform sampler2D sampler;',
      'uniform sampler2D lut;',
      'void main(void) {',
      '  vec4 color = texture2D(sampler, vec2(textureCoord.x, 1.0 - textureCoord.y));',
      '  float picnum = ceil((color[0] * 255.0 + 1.0) / 4.0);',
      '  float row = ceil(picnum / 8.0) - 1.0;',
      '  float column = mod(picnum - 1.0 , 8.0);',
      '  float x = column * 64.0 + floor((color[0] * 255.0) / 4.0);',
      '  float y = row * 64.0 + floor((color[1] * 255.0) / 4.0);',
      '  vec4 lut = texture2D(lut, vec2(x / 512.0, y / 512.0));',
      '  float r = (opacity * lut[0]) + ((1.0 - opacity) * color[0]);',
      '  float g = (opacity * lut[1]) + ((1.0 - opacity) * color[1]);',
      '  float b = (opacity * lut[2]) + ((1.0 - opacity) * color[2]);',
      '  gl_FragColor = vec4(r, g, b,color[3]);',
      '}'].join('\n');
  }

  setLut (imgsrc) {
    if (!this.lut) {
      this.lut = document.createElement('img');
      this.lut.crossOrigin = 'anonymous';
    }
    this.lut.src = imgsrc;
    this.lut.addEventListener('load', this._bindLutTex);
  }

  setOpacity (num) {
    this.gl.useProgram(this.program);
    if (num > 1) {
      num = 1;
    }
    if (num < 0) {
      num = 0;
    }

    this.opacity = num;
    this.gl.uniform1f(this.pw.opacity, this.opacity);
  }

  init (render) {
    this.gl = render.gl;
    let gl = this.gl = render.gl;
    this.rend = render;
    this.canvas = render.canvas;

    // create program
    this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
    this.program = this.pw.program;
    gl.useProgram(this.program);

    // vertexPos
    let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
    GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

    // texturePos
    let texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, texturePosBuffer, this.pw.texturePos, 2);

    this.samplerTexture = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.sampler, 0);

    gl.uniform1f(this.pw.opacity, this.opacity);

    this.outputTexture = GLUtil.createTexture(gl, gl.LINEAR);

    this._bindLutTex = this._bindLutTexutre.bind(this);
    this.lut.addEventListener('load', this._bindLutTex);
  }

  _bindLutTexutre () {
    this.gl.useProgram(this.program);
    this.lutTexture = GLUtil.createTexture(this.gl, this.gl.LINEAR, this.lut);
    this.gl.uniform1i(this.pw.lut, 1);
    this.lut.removeEventListener('load', this._bindLutTex);
  }

  render (texture, width, height) {
    let gl = this.gl;
    let program = this.program;

    if (!this.width ||
       !this.height ||
       this.height !== height ||
       this.width !== width) {
      this.width = width;
      this.height = height;
      this.outputTexture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(this.width * this.height * 4), this.width, this.height);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexture, 0);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.activeTexture(gl.TEXTURE1);
    this.lutTexture = GLUtil.createTexture(this.gl, this.gl.LINEAR, this.lut);
    this.gl.uniform1i(this.pw.lut, 1);
    
    gl.bindTexture(gl.TEXTURE_2D, this.lutTexture);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    return this.outputTexture;
  }
}

export default LutFilter;
