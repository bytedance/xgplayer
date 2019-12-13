var Render = (function () {
  'use strict';

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
      } else if (data instanceof ImageData) {
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

  class Filter {
    constructor() {
      this.inputTextures = [];
    }

  }

  class Basic extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform highp float opacity;', 'uniform sampler2D sampler;', 'uniform highp float flipx;', 'uniform highp float flipy;', 'void main(void) {', '  float cordx = textureCoord.x;', '  if(flipx > 0.5) {', '     cordx = 1.0 - textureCoord.x;', '  }', '  float cordy = 1.0 - textureCoord.y;', '  if(flipy > 0.5) {', '    cordy = textureCoord.y;', '  }', '  vec4 color = texture2D(sampler,vec2(cordx, cordy));', '  gl_FragColor = vec4(color[0],color[1],color[2],opacity);', '}'].join('\n');
      this.opacity = config.opacity === undefined ? 1 : config.opacity;
      this.flip = config.flip;
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

      let texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, texturePosBuffer, this.pw.texturePos, 2);
      GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
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

    setFlip(flip) {
      let flipx = 0;
      let flipy = 0;
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

    render(texture, width, height) {
      let gl = this.gl;
      let program = this.program;
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

  }

  class Yuyv422 extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  float cx = 1.0 / outerSize.x;', '  float odd = floor(mod(textureCoord.x * outerSize.x, 2.0));', '  float x = textureCoord.x + 0.5 * cx - odd * cx;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  float ydata = odd < 0.5?color[0]:color[2];', '  float udata = color[1];', '  float vdata = color[3];', '  gl_FragColor = vec4(ydata, udata, vdata, 1) * yuv2rgb;', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

      this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
      let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
      this.inputTextures.push(textureRef);
      let yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
    }

    render(data, width, height) {
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
      gl.uniform2fv(this.pw.outerSize, [width, height]);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width,
        height
      };
    }

  }

  class Rgb32 extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'void main(void) {', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[2],color[1],color[0],color[3]);', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

      this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
      let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
      this.inputTextures.push(textureRef);
    }

    render(data, width, height) {
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
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width,
        height
      };
    }

  }

  class Rgb24 extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(bdata, gdata, rdata, 1);', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

      this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
      let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
      this.inputTextures.push(textureRef);
    }

    render(data, width, height) {
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
      let inputx = width - width % 4;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width,
        height
      };
    }

  }

  class Nv12 extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uvTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uvTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uvTextureCoord = uvTexturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uvTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uvSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  vec4 colory = texture2D(ySampler, yTextureCoord);', '  vec4 coloruv = texture2D(uvSampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));', '  gl_FragColor = vec4(colory[0], coloruv[0], coloruv[1], 1) * yuv2rgb;', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

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
      let yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
    }

    render(data, width, height) {
      let ydata = data[0];
      let uvdata = data[1];
      let gl = this.gl;
      let program = this.program;
      let yTextureRef = this.inputTextures[0];
      let uvTextureRef = this.inputTextures[1];

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
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, ydata);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, uvTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, uvdata);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width,
        height
      };
    }

  }

  class Yuv420 extends Filter {
    constructor(render, config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uTexturePos;', 'attribute vec2 vTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uTextureCoord = uTexturePos;', '  vTextureCoord = vTexturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  highp float y = texture2D(ySampler,  yTextureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * yuv2rgb;', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

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
      let yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
    }

    render(data, width, height) {
      let ydata = data[0];
      let udata = data[1];
      let vdata = data[2];
      let gl = this.gl;
      let program = this.program;
      let yTextureRef = this.inputTextures[0];
      let uTextureRef = this.inputTextures[1];
      let vTextureRef = this.inputTextures[2];

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
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, ydata);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, udata);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vdata);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width: width,
        height: height
      };
    }

  }

  class Rgba extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'void main(void) {', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[0],color[1],color[2],color[3]);', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

      this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
      let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
      this.inputTextures.push(textureRef);
    }

    render(data, width, height) {
      if (data instanceof ImageData) {
        data = data.data;
      } else {
        data = data[0];
      }

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
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width,
        height
      };
    }

  }

  class Rgb extends Filter {
    constructor(config) {
      super();
      this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(rdata, gdata, bdata, 1);', '}'].join('\n');
    }

    init(render) {
      this.rend = render;
      this.canvas = render.canvas;
      let gl = this.gl = render.gl;
      this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
      this.program = this.pw.program;
      gl.useProgram(this.program); // vertexPos

      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2); // texturePos

      this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);
      let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
      gl.uniform1i(this.pw.sampler, 0);
      this.inputTextures.push(textureRef);
    }

    render(data, width, height) {
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
      let inputx = width - width % 4;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return {
        texture: this.outputTexuture,
        width,
        height
      };
    }

  }

  class Render {
    constructor(config) {
      this.canvas = config.canvas; // input

      if (config.video) {
        this.video = config.video;
        config.flip = 'y';
      } else if (config.image) {
        this.image = config.image;
      } else {
        this._initFmt(config);
      }

      this.filters = [];
      this.basicFilter = new Basic({
        opacity: config.opacity !== undefined ? config.opacity : 1,
        flip: config.flip || undefined
      });

      if (config.filters) {
        for (let i = 0; i < config.filters.length; i++) {
          this.filters.push(config.filters[i]);
        }
      }

      this._init();
    }

    _initFmt(config) {
      switch (config.format) {
        case 'YUY2':
          this.fmt = new Yuyv422(this);
          break;

        case 'RGBA':
          this.fmt = new Rgba(this);
          break;

        case 'RGB':
          this.fmt = new Rgb(this);
          break;

        case 'RGB32':
          this.fmt = new Rgb32(this);
          break;

        case 'RGB24':
          this.fmt = new Rgb24(this);
          break;

        case 'NV12':
          this.fmt = new Nv12(this);
          break;

        case 'YUV420':
          this.fmt = new Yuv420(this);
          break;
      }
    }

    _initImage() {}

    _init() {
      this._initContextGL();

      if (!this.gl) {
        throw new Error(`fail to init gl`);
      }

      let gl = this.gl;
      this.fb = gl.createFramebuffer();

      if (this.fmt) {
        this.fmt.init(this);
      } else if (this.video) {
        const width = this.video.videoWidth;
        const height = this.video.videoHeight;
        let emptyPixels = new Uint8Array(width * height * 4);
        this.videoTexture = GLUtil.createTexture(gl, gl.LINEAR, emptyPixels, width, height);
      }

      this.basicFilter.init(this);

      for (let i = 0; i < this.filters.length; i++) {
        let filter = this.filters[i];
        filter.init(this);
      }
    }

    _initContextGL() {
      let canvas = this.canvas;
      let gl = null;
      let validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
      let nameIndex = 0;

      while (!gl && nameIndex < validContextNames.length) {
        let contextName = validContextNames[nameIndex];

        try {
          gl = canvas.getContext(contextName);
        } catch (e) {
          gl = null;
        }

        if (!gl || typeof gl.getParameter !== 'function') {
          gl = null;
        }

        ++nameIndex;
      }
      this.gl = gl;
    }

    _drawPicture(data, iWidth, iHeight) {
      let {
        texture,
        width,
        height
      } = this.fmt.render(data, iWidth, iHeight);

      this._applyFilters(texture, width, height);
    }

    _drawVideo() {
      let gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, this.videoTexture); // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);

      this._applyFilters(this.videoTexture, this.video.videoWidth, this.video.videoHeight);
    }

    _applyFilters(texture, width, height) {
      let gl = this.gl;

      for (let i = 0; i < this.filters.length; i++) {
        let filter = this.filters[i];
        let data = filter.render(texture, width, height);
        texture = data.texture;
        width = data.width;
        height = data.height;
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      if (this.width !== width || this.height !== height) {
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
      }

      this.basicFilter.render(texture, width, height);
    }

    render(data, width, height) {
      if (this.fmt) {
        if (this.width !== width || this.height !== height) {
          this.width = this.canvas.width = width;
          this.height = this.canvas.height = height;
        }

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this._drawPicture(data, width, height);
      } else if (this.video) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this._drawVideo();
      }
    }

  }

  return Render;

}());
