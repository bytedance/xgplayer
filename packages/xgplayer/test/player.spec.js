import { expect } from "chai";
import Player from "../src/index";

const CDN_MP4 =
    "https://ugcbsy.qq.com/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/z0793nx4auh.mp4?sdtfrom=v1010&guid=c7d51890de6de82b91e5f4682cb18743&vkey=1BE1E8E83BA87AC8CCC4A4849021BF7C27D4666AFDCDC9B86615A9587566F4FE9D495D6F03223A4A4AAD1A5BBE6A6CE464A4D1F9256578CCADA4B9D38F3E685B55068933B01F9ED71F0E23EFA5D32C9892A7B5DACFB2D5135F912972EA8A77C6945CB2EFA58B545DDA345025FA93E2E8B2E57A62E76EB125";
const CDN_POSTER_IMG =
    "https://cdn.staticfile.org/browser-logos/46.1.0/adblock/adblock_256x256.png";

describe("Player", () => {
    it("exists.", () => {
        expect(Player).to.exist;
    });
    // 测试播放器是否可以设置 poster
    it("Player can set poster.", () => {
        let video = document.createElement("div");
        video.id = "mse";
        document.body.appendChild(video);
        let player = new Player({
            id: "mse",
            poster: CDN_POSTER_IMG,
            url: CDN_MP4
        });
        let poster = document.querySelector(".xgplayer-poster");
        let poster_url = poster.style["background-image"];
        expect(poster_url).to.eq(`url("${CDN_POSTER_IMG}")`);
    });

    // 测试播放器是否可以设置 autoplay
    // Mocha中的异步测试, 需要给it()内函数的参数中添加一个done, 并在异步执行完后必须调用done()
    it("Player can autoplay.", done => {
        let video = document.createElement("div");
        video.id = "mse";
        document.body.appendChild(video);
        let player = new Player({
            id: "mse",
            poster: CDN_POSTER_IMG,
            url: CDN_MP4,
            autoplay: true,
            autoplayMuted: true
        });
        player.on("play", e => {
            // 触发play，说明已 autoplay
            expect(true).to.eq(true);
            done();
        });
    });
});
