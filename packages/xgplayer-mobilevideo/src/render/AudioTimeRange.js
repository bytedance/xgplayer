

export default class AudioTimeRange{

    constructor(){
        this._buffers = [];
        this._duration = 0;
    }

    get duration(){
        return this._duration;
    }

    get buffered(){
        return {
            length:1,
            start:()=> 0,
            end:()=> this._duration
        }
    }

    append(audioBuffer,startDts){
        this._buffers.push({
            start:this._duration,
            end:this._duration + audioBuffer.duration,
            startDts,
            buffer:audioBuffer
        })
        this._duration += audioBuffer.duration;
    }


    shift(){
       return this._buffers.shift();
    }

}