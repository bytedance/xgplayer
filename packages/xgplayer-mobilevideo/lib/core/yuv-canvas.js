'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YUVCanvas = function () {
  function YUVCanvas(configs) {
    _classCallCheck(this, YUVCanvas);

    this.configs = Object.assign({}, configs);
    this.canvas = this.configs.canvas;
    this.meta = Object.assign({}, this.configs.meta);
    this._initMeta();
    // this.canvas.style.width = configs.style.width;
    // this.canvas.style.height = configs.style.height;
    this._initContextGL();
    if (this.contextGL) {
      this._initProgram();
      this._initBuffers();
      this._initTextures();
    };
  }

  _createClass(YUVCanvas, [{
    key: '_initMeta',
    value: function _initMeta() {
      this.chroma = this.meta.chromaFormat;
      this.height = this.meta.presentHeight;
      this.width = this.meta.presentWidth;
      this.canvas.width = this.meta.presentWidth;
      this.canvas.height = this.meta.presentHeight;
    }
  }, {
    key: '_initContextGL',
    value: function _initContextGL() {
      var canvas = this.canvas;
      var gl = null;

      var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
      var nameIndex = 0;

      while (!gl && nameIndex < validContextNames.length) {
        var contextName = validContextNames[nameIndex];

        try {
          if (this.contextOptions) {
            gl = canvas.getContext(contextName, this.contextOptions);
          } else {
            gl = canvas.getContext(contextName);
          };
        } catch (e) {
          gl = null;
        }

        if (!gl || typeof gl.getParameter !== 'function') {
          gl = null;
        }

        ++nameIndex;
      };

      this.contextGL = gl;
    }
  }, {
    key: '_initProgram',
    value: function _initProgram() {
      var gl = this.contextGL;

      // vertex shader is the same for all types
      var vertexShaderScript;
      var fragmentShaderScript;
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '  uTextureCoord = uTexturePos.xy;', '  vTextureCoord = vTexturePos.xy;', '}'].join('\n');

      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');

      var YUV2RGB = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexShaderScript);
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
      }

      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderScript);
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
      }

      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
      }

      gl.useProgram(program);

      var YUV2RGBRef = gl.getUniformLocation(program, 'YUV2RGB');
      gl.uniformMatrix4fv(YUV2RGBRef, false, YUV2RGB);

      this.shaderProgram = program;
    }
  }, {
    key: '_initBuffers',
    value: function _initBuffers() {
      var gl = this.contextGL;
      var program = this.shaderProgram;

      var vertexPosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);

      var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
      gl.enableVertexAttribArray(vertexPosRef);
      gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

      var texturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

      var texturePosRef = gl.getAttribLocation(program, 'texturePos');
      gl.enableVertexAttribArray(texturePosRef);
      gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);

      this.texturePosBuffer = texturePosBuffer;

      var uTexturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

      var uTexturePosRef = gl.getAttribLocation(program, 'uTexturePos');
      gl.enableVertexAttribArray(uTexturePosRef);
      gl.vertexAttribPointer(uTexturePosRef, 2, gl.FLOAT, false, 0, 0);

      this.uTexturePosBuffer = uTexturePosBuffer;

      var vTexturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

      var vTexturePosRef = gl.getAttribLocation(program, 'vTexturePos');
      gl.enableVertexAttribArray(vTexturePosRef);
      gl.vertexAttribPointer(vTexturePosRef, 2, gl.FLOAT, false, 0, 0);

      this.vTexturePosBuffer = vTexturePosBuffer;
    }
  }, {
    key: '_initTextures',
    value: function _initTextures() {
      var gl = this.contextGL;
      var program = this.shaderProgram;
      var yTextureRef = this._initTexture();
      var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
      gl.uniform1i(ySamplerRef, 0);
      this.yTextureRef = yTextureRef;

      var uTextureRef = this._initTexture();
      var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
      gl.uniform1i(uSamplerRef, 1);
      this.uTextureRef = uTextureRef;

      var vTextureRef = this._initTexture();
      var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
      gl.uniform1i(vSamplerRef, 2);
      this.vTextureRef = vTextureRef;
    }
  }, {
    key: '_initTexture',
    value: function _initTexture() {
      var gl = this.contextGL;

      var textureRef = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textureRef);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);

      return textureRef;
    }
  }, {
    key: '_drawPictureGL',
    value: function _drawPictureGL(data, width, height, yLinesize, uvLinesize) {
      var ylen = yLinesize * height;
      var uvlen = uvLinesize * height / 2;
      if (this.chroma === 444 || this.chroma === 422) {
        uvlen *= 2;
      }
      data = new Uint8Array(data);
      var renderData = {
        yData: data.subarray(0, ylen),
        uData: data.subarray(ylen, ylen + uvlen),
        vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
      };
      this._drawPictureGL420(renderData, width, height, yLinesize, uvLinesize);
    }
  }, {
    key: '_drawPictureGL420',
    value: function _drawPictureGL420(data, width, height, yLinesize, uvLinesize) {
      var gl = this.contextGL;
      var texturePosBuffer = this.texturePosBuffer;
      var uTexturePosBuffer = this.uTexturePosBuffer;
      var vTexturePosBuffer = this.vTexturePosBuffer;

      var yTextureRef = this.yTextureRef;
      var uTextureRef = this.uTextureRef;
      var vTextureRef = this.vTextureRef;

      var yData = data.yData;
      var uData = data.uData;
      var vData = data.vData;

      var yDataPerRow = yLinesize;
      var yRowCnt = height;

      var uDataPerRow = width / 2;
      var uRowCnt = height / 2;

      if (this.chroma === 422 || this.chroma === 444) {
        uRowCnt = height;
      }

      var vDataPerRow = uvLinesize;
      var vRowCnt = uRowCnt;

      var ratiow = this.canvas.width / this.width;
      var ratioh = this.canvas.height / this.height;
      var left = 0;
      var top = 0;
      var w = this.canvas.width;
      var h = this.canvas.height;
      if (ratiow < ratioh) {
        h = this.height * this.canvas.width / this.width;
        top = parseInt((this.canvas.height - this.height * this.canvas.width / this.width) / 2);
      } else {
        w = this.width * this.canvas.height / this.height;
        left = parseInt((this.canvas.width - this.width * this.canvas.height / this.height) / 2);
      }
      gl.viewport(left, top, w, h);

      var texturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
      gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

      var uTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
      gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

      var vTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
      gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vTexturePosValues, gl.DYNAMIC_DRAW);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);

      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }, {
    key: '_drawPictureRGB',
    value: function _drawPictureRGB(data) {}
  }, {
    key: 'render',
    value: function render(data, width, height, yLinesize, uvLinesize) {
      var gl = this.contextGL;
      if (gl) {
        this._drawPictureGL(data, width, height, yLinesize, uvLinesize);
      } else {
        this._drawPictureRGB(data);
      }
    }
  }, {
    key: 'resetMeta',
    value: function resetMeta(meta) {
      this.meta = Object.assign({}, meta);
      this._initMeta();
    }
  }]);

  return YUVCanvas;
}();

exports.default = YUVCanvas;