import GLUtil from "../glutil";
import Filter from "../filter";

// 行主序改为gl的列主序
const transGLOrder = (matrix) => {
    return [
        matrix[0],matrix[3],matrix[6],
        matrix[1],matrix[4],matrix[7],
        matrix[2],matrix[5],matrix[8],
    ]
};

const clamp = (v,max,min) => {
    if (v > max) return max;
    if (v < min) return min;
    return v;
}
// fixme 后面抽象一下看能不能放在fmt中 作为一个可选输出
 class Converter extends Filter{
    constructor(){
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
                vec4 color = texture2D(sampler, vec2(textureCoord.x,1.0 - textureCoord.y));
                vec4 yuv = color * rgb2yuv;
                gl_FragColor = vec4(yuv.xyz,1.0);
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

            // ycbcr
            let rgb2yuv = ([
                0.2578125,0.50390625,0.09765625,0.0625,
                -0.1484375,-0.291,0.439,0.5,
                0.439,-0.368,-0.071,0.5,
                0,0,0,1
            ]);
            gl.uniformMatrix4fv(this.pw.rgb2yuv, false, rgb2yuv);

        };

        this._exportPixels = (width,height,type = 'yuv444') => {
            let rs = {
                y:[],
                u:[],
                v:[]
            };
            const loop = (widthLimit,heightLimit,cb) => {
                let u8a = new Uint8Array(widthLimit * heightLimit * 4);
                this.gl.readPixels(0,0,widthLimit,heightLimit,this.gl.RGBA,this.gl.UNSIGNED_BYTE,u8a);
                for (let i = 0; i < u8a.length; ){
                    cb([u8a[i],u8a[i + 1],u8a[i + 2]]);
                    i += 4
                }
            };
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
                y:new Uint8Array(rs.y),
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

export const rgb2yuv = (imageData,type = 'yuv444') => {
    const c = new Converter();
    return c.convert(imageData,type.toLocaleLowerCase());
};

