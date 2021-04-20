import { BasePlugin } from 'xgplayer';
declare class FlvLiveMobilePlayer extends BasePlugin {
  static get pluginName(): string;
  constructor(options: any);
  public beforePlayerInit(): void;
  public afterCreate(): void;
  public initFlvEvents(flv: any): void;
  public initEvents(): void;
  public lowdecode(): void;
  private _degrade(): void;
  private _toUseMse(url: string): void;
  public forceDegradeToVideo(url: string): void;
  public offEvents(): void;
  public initFlv(): void;
  public canplay(): void;
  public play(): void;
  public pause(): void;
  public loadData(time: number): void;
  public switchURL(url: string): void;
  public progress(): void;
  public destroy(): void;
  public addLiveFlag(): void;
  private _destroy(): void;
}

declare class FlvLiveMsePlayer extends BasePlugin {
  static get pluginName(): string;
  constructor(options: any);
  public beforePlayerInit(): void;
  public initFlvEvents(flv: any, ctx: any, keepBuffer: boolean | undefined): void;
  public initEvents(): void;
  public initFlv(): void;
  public playHook(url: string): undefined | Promise<void>;
  public play(): undefined | Promise<void>;
  public reload(): Promise<void>;
  public pause(): void;
  public loadData(time: number): void;
  public destroy(): void;
  private _destroy(): Promise<void>;
  public handleDefinitionChange(change: any): void;
  public switchURL(url: string, abr: boolean | undefined): void;
  public static isSupported(): boolean
}


export default FlvLiveMsePlayer;

export {
  FlvLiveMobilePlayer,
  FlvLiveMsePlayer
};
