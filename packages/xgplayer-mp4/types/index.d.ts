import { BasePlugin } from 'xgplayer';
declare module 'xgplayer-mp4' {
  export interface IPluginConfig {
    // 请求是否带cookie
    withCredentials?: boolean;
    // 自定义请求头
    headers?: {
      [k: string]: any;
    },
    // 预加载时长, 默认30s
    preloadTime?: number,
    // 最大缓存范围, 默认35s
    maxCache?: number,
    // 每次请求chunk大小
    chunkSize?: number,
    // 加载定时器时间间隔，默认300
    mp4ProgressTimer?: number
  }
  export default class Mp4Player extends BasePlugin {
    public static get pluginName(): string;
    public static get defaultConfig(): any;
    constructor(options: any);
    private _destroy(): void;
  }

  export class M4aPlayer extends BasePlugin {
    public static get pluginName(): string;
    public static get defaultConfig(): any;
    constructor(options: any);
    private _destroy(): void;
  }
}
