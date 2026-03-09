export function isAirPlayAvailable(player) {
  const video = player?.media || player?.video;

  if (!video) {
    return false;
  }

  return (
    typeof video.webkitShowPlaybackTargetPicker === "function" &&
    typeof WebKitPlaybackTargetAvailabilityEvent === "function"
  );
}

export class Airplay {
  constructor(player) {
    this.player = player;
  }

  install() {
    if (!isAirPlayAvailable(this.player)) {
      return;
    }
    const media = this.player.media || this.player.video;

    if (media instanceof HTMLMediaElement) {
      media.addEventListener(
        "webkitcurrentplaybacktargetiswirelesschanged",
        this._onAirPlayTargetChange,
      );
    }

    this.player.on('requestcast', this._onRequestCast);
  }

  _onAirPlayTargetChange = () => {
    const video = this.player.media || this.player.video;
    const originalSrc = video.src;
    const originalCurrentTime = video.currentTime;
    const isMSESource = originalSrc && originalSrc.startsWith("blob:") && video.currentSrc === originalSrc;

    // if (isMSESource) {
    //   if (video.webkitCurrentPlaybackTargetIsWireless) {
    //     console.log("AirPlay target is now wireless.");
    //     video.src = this.player.config.castUrl || this.player.config.url
    //   } else {
    //     video.src = originalSrc;
    //   }
    //   video.load()
    //   video.currentTime = originalCurrentTime;
    // }
    this.emit("airplaytargetchange", {
      isWireless: video.webkitCurrentPlaybackTargetIsWireless,
    });
  };


  _onRequestCast = () => {
    if (!isAirPlayAvailable(this.player)) {
      return false;
    }

    try {
      const mediaEl = this.player.media || this.player.video;
      const wasMuted = mediaEl.muted;

      // WebKit 的 AirPlay 实现中，静音的Media元素会被认为不需要音频输出设备，系统因此认为没有必要将其路由到外部播放目标
      // 具体见：https://bugs.webkit.org/show_bug.cgi?id=146366
      if (wasMuted) {
        // 这里如果取消静音，可能会涉及用户隐私，谨慎操作
        // video.muted = false;

        this._gcTip();

        // 展示UI提示，告知用户需要取消静音才能投屏
        const tip = document.createElement("div");
        tip.className = "xgplayer-cast-muted-tip";
        tip.innerText = this.player.i18n.CAST_UNMUTE_TIP;
        this.player.root.appendChild(tip);
        this._tipDom = tip

        this._tipTimeout = setTimeout(() => {
          this._gcTip();
        }, 3000);
        return;
      }

      if (typeof mediaEl.webkitShowPlaybackTargetPicker === "function") {
        mediaEl.webkitShowPlaybackTargetPicker();
      }
    } catch (err) {
      // ignore
    }
  }

  _gcTip() {
    if (this._tipTimeout) {
      clearTimeout(this._tipTimeout);
      this._tipTimeout = null;
    }
    if (this._tipDom) {
      this.player.root.removeChild(this._tipDom);
      this._tipDom = null;
    }
  }

  destroy() {
    if (!this.player) {
      return;
    }
    this._gcTip();

    const media = this.player.media || this.player.video;
    if (media instanceof HTMLMediaElement) {
      media.removeEventListener(
        "webkitcurrentplaybacktargetiswirelesschanged",
        this._onAirPlayTargetChange,
      );
    }
    this.player.off('requestcast', this._onRequestCast);
    this.player = null;
  }
}
