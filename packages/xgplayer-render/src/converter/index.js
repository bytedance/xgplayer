import GLUtil from "../glutil";
import Filter from "../filter";
// fixme 后面抽象一下看能不能放在fmt中 作为一个可选输出
export default class Converter extends Filter{
    constructor(config){
        super();
        this.canvas = document.createElement('canvas');

        this.vShader = `
            attribute vec4 vertexPos;
            attribute vec2 texturePos;
            varying vec2 textureCoord;
            void main() {
                gl_Position = vertexPos;
                textureCoord = texturePos;
            }
        `;

        this.fShader = `
            precision highp float;
            varying highp vec2 textureCoord;
            uniform sampler2D sampler;
            uniform mat4 rgb2yuv;
            void main(void) {
                vec4 color = texture2D(sampler, textureCoord);
                vec4 yuv = vec4(color[0],color[1],color[2],color[3]) * rgb2yuv;
                gl_FragColor = yuv;
                // gl_FragColor = vec4(yuv.x,yuv.x,yuv.x,1.0);
                // gl_FragColor = vec4(yuv.y,yuv.y,yuv.y,1.0);
            }
        `;

        this.inputTextures = [];

        this._init = () => {
            this._initContext();
            this._initShader();
        };

        this._initContext = () => {
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
            };

            this.gl = gl;
        }

        this._initShader = () => {
            let gl = this.gl;
            let canvas = this.canvas;
            this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
            this.program = this.pw.program;
            gl.useProgram(this.program);
            // vertexPos
            let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
            GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

            this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
            GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

            let textureRef = GLUtil.createTexture(gl, gl.LINEAR);
            gl.uniform1i(this.pw.sampler, 0);
            this.inputTextures.push(textureRef);
            // todo 在glutil中加一个行主序的util方法
            // let rgb2yuv = [
            //     0.257,  0.504,  0.098,  0.0625,
            //     0.439,  -0.368, -0.071, 0.500,
            //     -0.148, -0.291, 0.439,  0.500,
            //     0.0,    0.0,    0.0,    1.0
            // ];
            // let rgb2yuv = [
            //     1, 1, 1, 0,
            //     0, -0.39465, - 0.58060,0,
            //     1, 2.032, 0,0,
            //     0,0,0,1
            // ];
            // let rgb2yuv = [
            //     0.299,-0.14731,0.615,0,
            //     0.587, -0.28886, -0.51499,0,
            //     0.114, 0.436, -0.10001,0,
            //     0,0,0,1
            // ];
            // 601
            let rgb2yuv = [
                0.299,-0.14731,0.615,0,
                0.587, -0.28886, -0.51499,0,
                0.114, 0.436, -0.10001,0,
                0,0,0,1
            ];
            // let rgb2yuv = [
            //     0.299,0.587,0.114,0,
            //     -0.14731, -0.28886,0.436,0,
            //     0.615, -0.51499,-0.10001,0,
            //     0,0,0,1
            // ];
            // 709
            // let rgb2yuv = [
            //     0.2126,-0.09991,0.615,0,
            //     0.7152, -0.33609, -0.55861,0,
            //     0.0722, 0.436, -0.05639,0,
            //     0,0,0,1
            // ];
            // 普通顺序
            // let rgb2yuv = [
            //     0.2126,0.7152,0.0722,0,
            //     -0.09991, -0.33609, 0.436,0,
            //     0.615, -0.55861, -0.05639,0,
            //     0,0,0,1
            // ];
            gl.uniformMatrix4fv(this.pw.rgb2yuv, false, rgb2yuv);

        };

        this._exportPixels = (width,height,type = 'yuv444') => {
            let rs = {
                y:[],
                u:[],
                v:[]
            };
            const loop = (widthLimit,heightLimit,cb) => {
                for (let x = 0; x < widthLimit; x++ ){
                    for (let y = 0; y < heightLimit; y++){
                        let u8a = new Uint8Array(4);
                        this.gl.readPixels(x,y,1,1,this.gl.RGBA,this.gl.UNSIGNED_BYTE,u8a);
                        cb(u8a);
                    }
                }
            };
            // 量还挺大，判断一次吧
            if (type === 'yuv444') {
                loop(width,height,(yuvArr) => {
                    rs.y.push(yuvArr[0]);
                    rs.u.push(yuvArr[1]);
                    rs.v.push(yuvArr[2]);
                })
            } else if (type === 'yuv420') {
                loop(width,height,(yuvArr) => {
                    rs.y.push(yuvArr[0]);
                });
                // 420 重画一次
                {
                    let gl = this.gl;
                    gl.viewport(0, 0, width/2, height/2);
                    // gl.clear(gl.COLOR_BUFFER_BIT);
                    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                }
                loop(width/2,height/2,(yuvArr) => {
                    rs.u.push(yuvArr[1]);
                    rs.v.push(yuvArr[2]);
                });
            }
            return {
                y:new Uint8ClampedArray(rs.y),
                u:new Uint8Array(rs.u),
                v:new Uint8Array(rs.v),

            };

        };

        this._init();
    }

    render(data,width, height) {
        let gl = this.gl;
        let textureRef = this.inputTextures[0];

        {
            this.canvas.width = width;
            this.canvas.height = height;
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.viewport(0, 0, width, height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    convert(imageData,type = 'yuv444') {
        let {data,width,height} = imageData;
        const supportList = ['yuv420',"yuv444"];
        if (!supportList.includes(type)){
            throw new Error('illegal video format');
        }

        this.render(data,width,height);
        return this._exportPixels(width,height,type);
    }
}
