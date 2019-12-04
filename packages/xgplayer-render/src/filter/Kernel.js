import {Template} from "./Template";
import {kernel} from "./config";


export class Kernel extends Template{
    constructor(props) {
        super(props);
        this.kernel = props.kernel;

        this._checkKernel = (kernel) => {
            if (!Array.isArray(kernel)){
                console.warn('format dismatch');
            }
            if (kernel.length !== 9 && kernel.length !== 25){
                console.warn('weight dismatch');
            }
        };

        this._checkKernel(this.kernel);

        this.props.fragmentSource = kernel.fShader;
        this.props.vertexSource = kernel.vShader;

        this.props.getUniformLocations = (gl,program) => {
            return {
                u_kernelWeight: gl.getUniformLocation(program, 'u_kernelWeight'),
                'u_kernel[0]':gl.getUniformLocation(program, 'u_kernel[0]'),
                u_textureSize:gl.getUniformLocation(program, "u_textureSize")
            }
        };
        this.props.sendUniformData = (gl,locations) => {
            gl.uniform1f(locations.u_kernelWeight, this._getKernelWeight(this.kernel));
            console.log(this.kernel,locations['u_kernel[0]'])
            gl.uniform1fv(locations['u_kernel[0]'],this.kernel);
            //this.pipelineState from super
            gl.uniform2f(locations.u_textureSize, this.pipelineState.sourceWidth, this.pipelineState.sourceHeight);
        }

        this._getKernelWeight = (kernel) => {
            let w = kernel.reduce((p,c) => p + c);
            w = w <= 0 ? 1 : w;
            return w;
        }

    }

    init(render) {
        super.init(render);
    }

    render(originTexture, width, height) {
        return super.render(originTexture, width, height);
    }


}
