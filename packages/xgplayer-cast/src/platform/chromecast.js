export function isChromecastAvailable(player) {
  const video = player?.media || player?.video;

  if (!video) {
    return false;
  }

  return typeof chrome !== "undefined" && typeof chrome.cast !== "undefined";
}

export class Chromecast {
  constructor(player) {
    this.player = player;
  }

  install() {
    if (!isChromecastAvailable(this.player)) {
      return;
     }

    this.player.on("cast_request", this._onRequestCast);
  }

  /**
   * @private
   */
  _onRequestCast = () => {
    this.player.emit("cast_request_chromecast");

    // TODO
  }
}
