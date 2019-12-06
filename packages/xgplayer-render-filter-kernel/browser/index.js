var KernelFilter = (function (exports) {
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

  const template = {
    vShader: `
        attribute vec4 vertexPos;
        attribute vec2 texturePos;
        varying vec2 textureCoord;
        void main() {
            gl_Position = vertexPos;
            textureCoord = texturePos;
        }
    `,
    fShader: `
        precision highp float;
        varying highp vec2 textureCoord;
        uniform sampler2D sampler;
        void main(void) {
            vec4 color = texture2D(sampler, textureCoord);
            gl_FragColor = color;
        }
    `
  };
  const kernel = {
    vShader: `
        attribute vec4 vertexPos;
        attribute vec2 texturePos;
        varying vec2 textureCoord;
        void main() {
            gl_Position = vertexPos;
            textureCoord = vec2(texturePos.x, 1.0 - texturePos.y);
        }
    `,
    fShader: `
    precision highp float;
    uniform vec2 u_textureSize;
    uniform sampler2D sampler;
    
    uniform float u_kernel[9];
    uniform float u_kernelWeight;
    
    varying vec2 textureCoord;
    
    void main(){
        vec2 onePixel = vec2(1.0,1.0) / u_textureSize;
        
        vec4 colorSum = 
            texture2D(sampler, textureCoord + vec2(-1,-1) * onePixel )  * u_kernel[0] +  
            texture2D(sampler, textureCoord + vec2( 0,-1) * onePixel )  * u_kernel[1] +  
            texture2D(sampler, textureCoord + vec2( 1,-1) * onePixel )  * u_kernel[2] +  
            texture2D(sampler, textureCoord + vec2(-1, 0) * onePixel )  * u_kernel[3] +  
            texture2D(sampler, textureCoord + vec2( 0, 0) * onePixel )  * u_kernel[4] +  
            texture2D(sampler, textureCoord + vec2( 1, 0) * onePixel )  * u_kernel[5] +  
            texture2D(sampler, textureCoord + vec2(-1, 1) * onePixel )  * u_kernel[6] +  
            texture2D(sampler, textureCoord + vec2( 0, 1) * onePixel )  * u_kernel[7] +  
            texture2D(sampler, textureCoord + vec2( 1, 1) * onePixel )  * u_kernel[8];  
            
        gl_FragColor = vec4( (colorSum / u_kernelWeight).rgb, 1.0);
    }
`
  };

  let gl = null;
  class Template {
    constructor(props) {
      this.props = props;
    }

    init(render) {
      let {
        canvas: source
      } = render;
      let {
        width,
        height
      } = source;
      gl = render.gl;
      this.pipelineState = {
        sourceWidth: width,
        sourceHeight: height,
        destinationWidth: width,
        destinationHeight: height,
        context: gl,
        sourceTexture: GLUtil.createTexture(gl, gl.LINEAR),
        targetTexture: GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height),
        targetFrameBuffer: gl.createFramebuffer(),
        vertexSource: this.props.vertexSource || template.vShader,
        fragmentSource: this.props.fragmentSource || template.fShader
      };
      this.programWarpper = GLUtil.createProgram(gl, this.pipelineState.vertexSource, this.pipelineState.fragmentSource);
      this.program = this.programWarpper.program;
      gl.useProgram(this.program);
      let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
      GLUtil.bindAttribute(gl, vertexPosBuffer, this.programWarpper['aPosition'], 2); // textpos

      let texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
      GLUtil.bindAttribute(gl, texturePosBuffer, this.programWarpper['vTexCoord'], 2);
      gl.uniform1i(this.programWarpper['uTexture'], 0);
      this.props.getUniformLocations && this.props.sendUniformData && this.props.sendUniformData(gl, this.props.getUniformLocations(gl, this.program));
    }

    render(originTexture, width, height) {
      this.pipelineState.sourceTexture = originTexture;
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.pipelineState.targetFrameBuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pipelineState.targetTexture, 0);
      gl.useProgram(this.program);
      gl.viewport(0, 0, width, height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.pipelineState.sourceTexture);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      this.pipelineState.targetTexture.__width = width;
      this.pipelineState.targetTexture.__height = height;
      console.log(this.pipelineState.targetTexture);
      return this.pipelineState.targetTexture;
    }

  }

  class Kernel extends Template {
    constructor(props) {
      super(props);
      this.kernel = props.kernel;

      this._checkKernel = kernel => {
        if (!Array.isArray(kernel)) {
          console.warn('format dismatch');
        }

        if (kernel.length !== 9 && kernel.length !== 25) {
          console.warn('weight dismatch');
        }
      };

      this._checkKernel(this.kernel);

      this.props.fragmentSource = kernel.fShader;
      this.props.vertexSource = kernel.vShader;

      this.props.getUniformLocations = (gl, program) => {
        return {
          u_kernelWeight: gl.getUniformLocation(program, 'u_kernelWeight'),
          'u_kernel[0]': gl.getUniformLocation(program, 'u_kernel[0]'),
          u_textureSize: gl.getUniformLocation(program, "u_textureSize")
        };
      };

      this.props.sendUniformData = (gl, locations) => {
        gl.uniform1f(locations.u_kernelWeight, this._getKernelWeight(this.kernel));
        gl.uniform1fv(locations['u_kernel[0]'], this.kernel); //this.pipelineState from super

        gl.uniform2f(locations.u_textureSize, this.pipelineState.sourceWidth, this.pipelineState.sourceHeight);
      };

      this._getKernelWeight = kernel => {
        let w = kernel.reduce((p, c) => p + c);
        w = w <= 0 ? 1 : w;
        return w;
      };
    }

    init(render) {
      super.init(render);
    }

    render(originTexture, width, height) {
      return super.render(originTexture, width, height);
    }

  }

  exports.Kernel = Kernel;

  return exports;

}({}));
