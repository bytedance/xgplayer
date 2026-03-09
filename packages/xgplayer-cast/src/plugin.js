import { Plugin } from "xgplayer";
import { Logger } from "xgplayer-streaming-shared";
import CastSvg from "./assets/cast.svg";
import { Airplay, isAirPlayAvailable } from "./platform/airplay";

import './cast-i18n';
import "./index.scss";

const logger = new Logger("CastPlugin");

/**
 * @typedef { {
 *   [propName: string]: any
 *  } } ICastConfig
 */

export class CastPlugin extends Plugin {
  static get pluginName() {
    return "cast";
  }

  /**
   * @type ICastConfig
   */
  static get defaultConfig() {
    return {
      position: Plugin.POSITIONS.CONTROLS_RIGHT,
      index: 7,
      disable: true,
      showIcon: true,
      airplay: false,
      chromecast: false,
      showAirplayMutedTip: true, // 是否显示 AirPlay 连接时需要取消静音的提示
    };
  }

  get version() {
    return __VERSION__;
  }

  constructor(args) {
    // 允许通过 player.config.airplay 显式开关按钮
    if (
      typeof args.player.config.airplay === "boolean" &&
      isAirPlayAvailable(args.player)
    ) {
      args.config.disable = false;
      args.config.showIcon = args.player.config.airplay;
    }

    super(args);
  }

  afterCreate() {
    super.afterCreate();
    if (this.config.disable) {
      return;
    }
    const video = this.player.media || this.player.video;
    this.appendChild(".xgplayer-icon", this.icons.cast);
    this._handler = this.hook("click", this._doCast, {
      pre: (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
    });
    this.bind(["click", "touchend"], this._handler);

    if (this.config.airplay && isAirPlayAvailable(this.player)) {
      this._airplay = new Airplay(this.player);
      this._airplay.install();
    }

    if (this.config.chromecast) {
      // ...
    }
  }

  registerIcons() {
    return {
      cast: { icon: CastSvg, class: "xg-cast-icon" },
    };
  }

  _doCast = (e) => {
    this.emitUserAction(e, "cast");
    this.emit("requestcast");
  };

  /**
   * @public
   */
  prompt() {
    this.emit("requestcast");
  }

  destroy() {
    super.destroy();
    this.unbind(["click", "touchend"], this._handler);
    this._airplay?.destroy();
  }

  render() {
    if (this.config.disable) {
      return;
    }
    return `<xg-icon class="xgplayer-cast">
      <div class="xgplayer-icon"></div>
      ${Plugin.iconTip(this, "CAST", this.playerConfig.isHideTips)}
    </xg-icon>`;
  }
}
