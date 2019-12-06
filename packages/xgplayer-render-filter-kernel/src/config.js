export const template = {
    vShader :`
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

export const kernel = {
    vShader :`
        attribute vec4 vertexPos;
        attribute vec2 texturePos;
        varying vec2 textureCoord;
        void main() {
            gl_Position = vertexPos;
            textureCoord = vec2(texturePos.x, 1.0 - texturePos.y);
        }
    `,
    fShader:`
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
