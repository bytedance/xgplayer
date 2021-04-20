import type { BasePlugin } from 'xgplayer';
declare class HlsVodMsePlayer extends BasePlugin {
  static get pluginName(): string;
  static get defaultConfig(): object;
  constructor(options: any);
  public beforePlayerInit(): void;
  private _initEvents(): void;
  private _offEvents(): void;
  public handleUrlChange(url: string): void;
  public playForHooks(): Promise<void>;
  public play(): undefined | Promise<void>;
  public reload(): Promise<void>;
  public handleDefinitionChange(change: any): void;
  private _destroy(): Promise<void>;
  public destroy(): void;
}

declare class HlsVodMobilePlayer extends BasePlugin {
  public static get pluginName(): string;
  public static get defaultConfig(): object;
  constructor(options: any);
  public beforePlayerInit(): void;
  private _initProcess(): void;
  public afterCreate(): void;
  public initEvents(): void;
  public lowdecode(): void;
  private _degrade(url: string, useMse: boolean | undefined): void;
  private _toUseMse(): void;
  public forceDegradeToVideo(url: string): void;
  public initHls(): void;
  public play(): void;
  public loadData(): void;
  public handleDefinitionChange(change: any): void;
  public switchURL(url: string): void;
  public addLiveFlag(): void;
  public destroy(): void;
  private _destroy(): void;
}


export default HlsVodMsePlayer;

export {
  HlsVodMsePlayer,
  HlsVodMobilePlayer
}
