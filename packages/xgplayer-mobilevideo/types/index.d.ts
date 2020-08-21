
declare module 'xgplayer-mobilevideo' {
  
  interface VideoExtendsAnalInfo {
      fps: number; // 源流帧率
      decodeFps: number; // 实时解码效率，代表设备软解能力
      decodeCost: number; // 最新一帧解码耗费时间
      bitrate: number; // 实时码率
  }
  
  type DegradeInfo = VideoExtendsAnalInfo & { msg?: MediaError };
  
  interface HTMLMobileVideoElement extends HTMLMediaElement{
      fps: number; // 源流帧率
      decodeFps: number; // 实时解码效率，代表设备软解能力
      decodeCost: number; // 最新一帧解码耗费时间
      bitrate: number; // 实时码率
      degradeInfo: DegradeInfo;
      onDemuxComplete: (videoTrack: any, audioTrack: any) => void;
      setAudioMeta: (meta: any) => void;
      setVideoMeta: (meta: any) => void;
  }
  
  export default HTMLMobileVideoElement;

}