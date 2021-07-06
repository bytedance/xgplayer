declare module 'xgplayer-shaka' {
  import type { BasePlugin } from 'xgplayer';
  export interface IPluginConfig {
    // 请求是否带cookie
    hlsOpts?: { [propName: string]: any; };
  }

  class ShakaPlugin extends BasePlugin {
    public static get pluginName(): string;
    public static get defaultConfig(): any;
    constructor(options: any);
    public _destroy(): void;
    public destroy(): void;
    config: { [propName: string]: any; };
    readonly player: any;
  }

  export default ShakaPlugin;
}
