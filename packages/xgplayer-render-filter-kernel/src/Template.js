import GLUtil from "../../xgplayer-render/src/glutil";
import {template} from "./config";

let gl = null;

export class Template {
    constructor(props) {
        this.props = props;
    }

    init(render){
        let {canvas:source} = render;
        let {width,height} = source;

        gl = render.gl;

        this.pipelineState = {
            sourceWidth: width,
            sourceHeight: height,
            destinationWidth: width,
            destinationHeight: height,
            context: gl,
            sourceTexture: GLUtil.createTexture(gl, gl.LINEAR),
            targetTexture: GLUtil.createTexture(gl,gl.LINEAR,new Uint8Array(width * height * 4), width, height),
            targetFrameBuffer: gl.createFramebuffer(),
            vertexSource: this.props.vertexSource || template.vShader,
            fragmentSource: this.props.fragmentSource || template.fShader
        };

        this.programWarpper = GLUtil.createProgram(gl, this.pipelineState.vertexSource, this.pipelineState.fragmentSource);
        this.program = this.programWarpper.program;
        gl.useProgram(this.program);

        let vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]))
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.programWarpper['aPosition'],2);

        // textpos
        let texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, texturePosBuffer, this.programWarpper['vTexCoord'],2);

        gl.uniform1i(this.programWarpper['uTexture'],0);

        this.props.getUniformLocations && this.props.sendUniformData
            && this.props.sendUniformData(gl,this.props.getUniformLocations(gl,this.program));
    }

    render(originTexture, width, height){
        this.pipelineState.sourceTexture = originTexture;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.pipelineState.targetFrameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pipelineState.targetTexture,0);

        gl.useProgram(this.program);
        gl.viewport(0,0,width,height);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.pipelineState.sourceTexture);
        gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

        this.pipelineState.targetTexture.__width = width;
        this.pipelineState.targetTexture.__height = height;
        console.log(this.pipelineState.targetTexture);

        return this.pipelineState.targetTexture;
    }

}
