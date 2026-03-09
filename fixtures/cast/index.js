import Player from "../../packages/xgplayer/src/index";
import CastPlugin from "../../packages/xgplayer-cast/src/index";

window.player = new Player({
  id: "video",
  url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
  airplay: true,
  loop: false,
  autoplay: false,
  autoplayMuted: true,
  preloadTime: 20,
  width: "96%",
  plugins: [CastPlugin],
  height: 300,
  cast: {
    showIcon: true,
    airplay: true,
    chromecast: true,
    showAirplayMutedTip: true,
  }
});
