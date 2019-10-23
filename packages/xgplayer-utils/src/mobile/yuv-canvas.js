class YUVCanvas {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.canvas = this.configs.canvas;
    this.meta = Object.assign({}, this.configs.meta);
    this.chroma = this.meta.chromaFormat;
    this.height = this.meta.presentHeight;
    this.width = this.meta.presentWidth;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this._initContextGL();
    if (this.contextGL) {
      this._initProgram();
      this._initBuffers();
      this._initTextures();
    };
  }

  _initContextGL () {
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
  };

  _initProgram () {
    var gl = this.contextGL;

    // vertex shader is the same for all types
    var vertexShaderScript;
    var fragmentShaderScript;
    if (this.chroma === 420) {
      vertexShaderScript = [
        'attribute vec4 vertexPos;',
        'attribute vec4 texturePos;',
        'attribute vec4 uTexturePos;',
        'attribute vec4 vTexturePos;',
        'varying vec2 textureCoord;',
        'varying vec2 uTextureCoord;',
        'varying vec2 vTextureCoord;',

        'void main()',
        '{',
        '  gl_Position = vertexPos;',
        '  textureCoord = texturePos.xy;',
        '  uTextureCoord = uTexturePos.xy;',
        '  vTextureCoord = vTexturePos.xy;',
        '}'
      ].join('\n');

      fragmentShaderScript = [
        'precision highp float;',
        'varying highp vec2 textureCoord;',
        'varying highp vec2 uTextureCoord;',
        'varying highp vec2 vTextureCoord;',
        'uniform sampler2D ySampler;',
        'uniform sampler2D uSampler;',
        'uniform sampler2D vSampler;',
        'uniform mat4 YUV2RGB;',

        'void main(void) {',
        '  highp float y = texture2D(ySampler,  textureCoord).r;',
        '  highp float u = texture2D(uSampler,  uTextureCoord).r;',
        '  highp float v = texture2D(vSampler,  vTextureCoord).r;',
        '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;',
        '}'
      ].join('\n');
    } else if (this.chroma === 422) {
      vertexShaderScript = [
        'attribute vec4 vertexPos;',
        'attribute vec4 texturePos;',
        'varying vec2 textureCoord;',

        'void main()',
        '{',
        '  gl_Position = vertexPos;',
        '  textureCoord = texturePos.xy;',
        '}'
      ].join('\n');

      fragmentShaderScript = [
        'precision highp float;',
        'varying highp vec2 textureCoord;',
        'uniform sampler2D sampler;',
        'uniform highp vec2 resolution;',
        'uniform mat4 YUV2RGB;',

        'void main(void) {',

        '  highp float texPixX = 1.0 / resolution.x;',
        '  highp float logPixX = 2.0 / resolution.x;', // half the resolution of the texture
        '  highp float logHalfPixX = 4.0 / resolution.x;', // half of the logical resolution so every 4th pixel
        '  highp float steps = floor(textureCoord.x / logPixX);',
        '  highp float uvSteps = floor(textureCoord.x / logHalfPixX);',
        '  highp float y = texture2D(sampler, vec2((logPixX * steps) + texPixX, textureCoord.y)).r;',
        '  highp float u = texture2D(sampler, vec2((logHalfPixX * uvSteps), textureCoord.y)).r;',
        '  highp float v = texture2D(sampler, vec2((logHalfPixX * uvSteps) + texPixX + texPixX, textureCoord.y)).r;',

        // '  highp float y = texture2D(sampler,  textureCoord).r;',
        // '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;',
        '  gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;',
        '}'
      ].join('\n');
    };

    var YUV2RGB = [
      1.16438, 0.00000, 1.59603, -0.87079,
      1.16438, -0.39176, -0.81297, 0.52959,
      1.16438, 2.01723, 0.00000, -1.08139,
      0, 0, 0, 1
    ];
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

  _initBuffers () {
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

    if (this.chroma === 420) {
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
    };
  };

  _initTextures () {
    var gl = this.contextGL;
    var program = this.shaderProgram;

    if (this.chroma === 420) {
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
    } else if (this.chroma === 422) {
      // only one texture for 422
      var textureRef = this._initTexture();
      var samplerRef = gl.getUniformLocation(program, 'sampler');
      gl.uniform1i(samplerRef, 0);
      this.textureRef = textureRef;
    };
  }

  _initTexture () {
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

  _drawPictureGL (data, width, height) {
    if (this.chroma === 420) {
      let nWidth = width;
      var ylen = width * height;
      var uvlen = (width / 2) * (height / 2);
      data = new Uint8Array(data);
      let renderData = {
        yData: data.subarray(0, ylen),
        uData: data.subarray(ylen, ylen + uvlen),
        vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
      }
      if (width % 4 > 0) {
        nWidth = width + 4 - (width % 4);
        let yArray = new Uint8Array(nWidth * height);
        for (let i = 0; i < height; i++) {
          yArray.set(renderData.yData.subarray(i * width, (i + 1) * width), i * nWidth);
        }
        renderData.yData = yArray;
      }

      if ((width / 2) % 4 > 0) {
        nWidth = (width / 2) + 4 - ((width / 2) % 4);
        let uArray = new Uint8Array(nWidth * height / 2);
        let vArray = new Uint8Array(nWidth * height / 2);
        for (let i = 0; i < height / 2; i++) {
          uArray.set(renderData.uData.subarray(i * width / 2, (i + 1) * width / 2), i * nWidth);
          vArray.set(renderData.vData.subarray(i * width / 2, (i + 1) * width / 2), i * nWidth);
        }
        renderData.uData = uArray;
        renderData.vData = vArray;
      }
      this._drawPictureGL420(renderData, width, height);
    } else if (this.chroma === 422) {
      data = new Uint8Array(data);
      this._drawPictureGL422(width, height, data);
    }
  }

  _drawPictureGL422 (data, width, height) {
    var gl = this.contextGL;
    var texturePosBuffer = this.texturePosBuffer;

    var textureRef = this.textureRef;

    var dataPerRow = width * 2;
    var rowCnt = height;

    gl.viewport(0, 0, width, height);

    var tTop = 0;
    var tLeft = 0;
    var tBottom = height / rowCnt;
    var tRight = width / (dataPerRow / 2);
    var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

    gl.uniform2f(gl.getUniformLocation(this.shaderProgram, 'resolution'), dataPerRow, height);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, dataPerRow, rowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _drawPictureGL420 (data, width, height) {
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

    var yDataPerRow = width;
    var yRowCnt = height;

    var uDataPerRow = width / 2;
    var uRowCnt = height / 2;

    var vDataPerRow = uDataPerRow;
    var vRowCnt = uRowCnt;
    gl.viewport(0, 0, this.width, this.height);

    var tTop = 0;
    var tLeft = 0;
    var tBottom = height / yRowCnt;
    var tRight = width / yDataPerRow;
    var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);


    tBottom = (height / 2) / uRowCnt;
    tRight = (width / 2) / uDataPerRow;
    var uTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

    gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

    tBottom = (height / 2) / vRowCnt;
    tRight = (width / 2) / vDataPerRow;

    var vTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

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

  _drawPictureRGB (data) {

  }

  render (data, width, height) {
    var gl = this.contextGL;
    if (gl) {
      this._drawPictureGL(data, width, height);
    } else {
      this._drawPictureRGB(data);
    }
  }
}

export default YUVCanvas;
