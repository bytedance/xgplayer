class GLUtil {
  static createTexture(gl, filter, data, width, height) {
    let textureRef = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    if (data instanceof Uint8Array) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    } else if (data instanceof HTMLVideoElement) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    } else if (data instanceof HTMLImageElement) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    return textureRef;
  }

  static createBuffer(gl, data) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
  }

  static createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }

    return shader;
  }

  static createProgram(gl, vertexSource, fragmentSource) {
    var program = gl.createProgram();
    var vertexShader = GLUtil.createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = GLUtil.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }

    var wrapper = {
      program: program
    };
    var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < numAttributes; i++) {
      var attribute = gl.getActiveAttrib(program, i);
      wrapper[attribute.name] = gl.getAttribLocation(program, attribute.name);
    }

    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (var i$1 = 0; i$1 < numUniforms; i$1++) {
      var uniform = gl.getActiveUniform(program, i$1);
      wrapper[uniform.name] = gl.getUniformLocation(program, uniform.name);
    }

    return wrapper;
  }

  static bindAttribute(gl, buffer, attribute, numComponents) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
  }

}

class LutFilter {
  constructor(config) {
    this.lut = document.createElement('img');
    this.lut.src = config.lut;
    this.lut.crossOrigin = 'true';
    this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'attribute vec2 lutPos;', 'varying vec2 textureCoord;', 'varying vec2 lutCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '  lutCoord = lutPos;', '}'].join('\n');
    this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform sampler2D lut;', 'void main(void) {', '  vec4 lut = texture2D(lut, textureCoord);', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[0],color[1],color[2],color[3]);', '}'].join('\n');
  }

  setLut(imgsrc) {
    this.lut = imgsrc;
  }

  init(render) {
    this.gl = render.gl;
    let gl = this.gl = render.gl;
    this.rend = render;
    this.canvas = render.canvas; // create program

    this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
    this.program = this.pw.program;
    gl.useProgram(this.program); // vertexPos

    let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
    GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

    let texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, texturePosBuffer, this.pw.texturePos, 2);
    let lutPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
    GLUtil.bindAttribute(gl, lutPosBuffer, this.pw.lutPos, 2);
    this.samplerTexture = GLUtil.createTexture(gl, gl.LINEAR);
    gl.uniform1i(this.pw.sampler, 0);
    this.outputTexture = GLUtil.createTexture(gl, gl.LINEAR);

    let _this = this;

    this.lut.addEventListener('load', () => {
      _this.lutTexture = GLUtil.createTexture(gl, gl.LINEAR, this.lut);
      gl.uniform1i(_this.pw.lut, 1);
    });
  }

  render(texture, width, height) {
    let gl = this.gl;
    let program = this.program;

    if (!this.width || !this.height || this.height !== height || this.width !== width) {
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
    gl.bindTexture(gl.TEXTURE_2D, this.lutTexture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return this.outputTexture;
  }

}

export default LutFilter;
