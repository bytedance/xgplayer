var KernelFilter = (function (GLUtil) {
  'use strict';

  GLUtil = GLUtil && GLUtil.hasOwnProperty('default') ? GLUtil['default'] : GLUtil;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var template = {
    vShader: "\n        attribute vec4 vertexPos;\n        attribute vec2 texturePos;\n        varying vec2 textureCoord;\n        void main() {\n            gl_Position = vertexPos;\n            textureCoord = texturePos;\n        }\n    ",
    fShader: "\n        precision highp float;\n        varying highp vec2 textureCoord;\n        uniform sampler2D sampler;\n        void main(void) {\n            vec4 color = texture2D(sampler, textureCoord);\n            gl_FragColor = color;\n        }\n    "
  };
  var kernel = {
    vShader: "\n        attribute vec4 vertexPos;\n        attribute vec2 texturePos;\n        varying vec2 textureCoord;\n        void main() {\n            gl_Position = vertexPos;\n            textureCoord = vec2(texturePos.x, 1.0 - texturePos.y);\n        }\n    ",
    fShader: "\n    precision highp float;\n    uniform vec2 u_textureSize;\n    uniform sampler2D sampler;\n    \n    uniform float u_kernel[9];\n    uniform float u_kernelWeight;\n    \n    varying vec2 textureCoord;\n    \n    void main(){\n        vec2 onePixel = vec2(1.0,1.0) / u_textureSize;\n        \n        vec4 colorSum = \n            texture2D(sampler, textureCoord + vec2(-1,-1) * onePixel )  * u_kernel[0] +  \n            texture2D(sampler, textureCoord + vec2( 0,-1) * onePixel )  * u_kernel[1] +  \n            texture2D(sampler, textureCoord + vec2( 1,-1) * onePixel )  * u_kernel[2] +  \n            texture2D(sampler, textureCoord + vec2(-1, 0) * onePixel )  * u_kernel[3] +  \n            texture2D(sampler, textureCoord + vec2( 0, 0) * onePixel )  * u_kernel[4] +  \n            texture2D(sampler, textureCoord + vec2( 1, 0) * onePixel )  * u_kernel[5] +  \n            texture2D(sampler, textureCoord + vec2(-1, 1) * onePixel )  * u_kernel[6] +  \n            texture2D(sampler, textureCoord + vec2( 0, 1) * onePixel )  * u_kernel[7] +  \n            texture2D(sampler, textureCoord + vec2( 1, 1) * onePixel )  * u_kernel[8];  \n            \n        gl_FragColor = vec4( (colorSum / u_kernelWeight).rgb, 1.0);\n    }\n"
  };

  var gl = null;
  var Template =
  /*#__PURE__*/
  function () {
    function Template(props) {
      _classCallCheck(this, Template);

      this.props = props;
    }

    _createClass(Template, [{
      key: "init",
      value: function init(render) {
        var source = render.canvas;
        var width = source.width,
            height = source.height;
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
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.programWarpper['aPosition'], 2); // textpos

        var texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, texturePosBuffer, this.programWarpper['vTexCoord'], 2);
        gl.uniform1i(this.programWarpper['uTexture'], 0);
        this.props.getUniformLocations && this.props.sendUniformData && this.props.sendUniformData(gl, this.props.getUniformLocations(gl, this.program));
      }
    }, {
      key: "render",
      value: function render(originTexture, width, height) {
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
    }]);

    return Template;
  }();

  var Kernel =
  /*#__PURE__*/
  function (_Template) {
    _inherits(Kernel, _Template);

    function Kernel(props) {
      var _this;

      _classCallCheck(this, Kernel);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Kernel).call(this, props));
      _this.kernel = props.kernel;

      _this._checkKernel = function (kernel) {
        if (!Array.isArray(kernel)) {
          console.warn('format dismatch');
        }

        if (kernel.length !== 9 && kernel.length !== 25) {
          console.warn('weight dismatch');
        }
      };

      _this._checkKernel(_this.kernel);

      _this.props.fragmentSource = kernel.fShader;
      _this.props.vertexSource = kernel.vShader;

      _this.props.getUniformLocations = function (gl, program) {
        return {
          u_kernelWeight: gl.getUniformLocation(program, 'u_kernelWeight'),
          'u_kernel[0]': gl.getUniformLocation(program, 'u_kernel[0]'),
          u_textureSize: gl.getUniformLocation(program, "u_textureSize")
        };
      };

      _this.props.sendUniformData = function (gl, locations) {
        gl.uniform1f(locations.u_kernelWeight, _this._getKernelWeight(_this.kernel));
        gl.uniform1fv(locations['u_kernel[0]'], _this.kernel); //this.pipelineState from super

        gl.uniform2f(locations.u_textureSize, _this.pipelineState.sourceWidth, _this.pipelineState.sourceHeight);
      };

      _this._getKernelWeight = function (kernel) {
        var w = kernel.reduce(function (p, c) {
          return p + c;
        });
        w = w <= 0 ? 1 : w;
        return w;
      };

      return _this;
    }

    _createClass(Kernel, [{
      key: "init",
      value: function init(render) {
        _get(_getPrototypeOf(Kernel.prototype), "init", this).call(this, render);
      }
    }, {
      key: "render",
      value: function render(originTexture, width, height) {
        return _get(_getPrototypeOf(Kernel.prototype), "render", this).call(this, originTexture, width, height);
      }
    }]);

    return Kernel;
  }(Template);

  return Kernel;

}(GLUtil));
