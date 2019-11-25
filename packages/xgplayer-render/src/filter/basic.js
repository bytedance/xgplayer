import Filter from '../filter';
import GLUtil from '../glutil';
class Basic extends Filter {
  constructor (render, config) {
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
      'uniform highp float opacity;',
      'uniform sampler2D sampler;',
      'uniform highp float flipx;',
      'uniform highp float flipy;',
      'void main(void) {',
      '  float cordx = textureCoord.x;',
      '  if(flipx > 0.5) {',
      '     cordx = 1.0 - textureCoord.x;',
      '  }',
      '  float cordy = 1.0 - textureCoord.y;',
      '  if(flipy > 0.5) {',
      '    cordy = textureCoord.y;',
      '  }',
      '  vec4 color = texture2D(sampler,vec2(cordx, cordy));',
      '  gl_FragColor = vec4(color[0],color[1],color[2],opacity);',
      '}'].join('\n');
    
    this.canvas = render.canvas;
    this.opacity = config.opacity === undefined ? 1 : config.opacity;
    this.flip = config.flip;
  }

  init (render, gl) {
    this.rend = render;
    this.gl = gl;
    this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
    this.program = this.pw.program;
    gl.useProgram(this.program);

    // vertexPos
    let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
    GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

    // texturePos
    let texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, texturePosBuffer, this.pw.texturePos, 2);

    GLUtil.createTexture(gl, gl.LINEAR);

    gl.uniform1f(this.pw.opacity, this.opacity);

    let flipx = 0;
    let flipy = 0;

    if (this.flip === 'x' || this.flip === 'xy') {
      flipx = 1;
    }

    if (this.flip === 'y' || this.flip === 'xy') {
      flipy = 1;
    }

    gl.uniform1f(this.pw.flipx, flipx);
    gl.uniform1f(this.pw.flipy, flipy);
  }

  render (texture, width, height) {
    let gl = this.gl;
    let program = this.program;

    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Basic;
