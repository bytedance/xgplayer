### Start

1. Install

    ```
    $ npm install xgplayer@next
    $ npm install xgplayer-music@next
    ```

2. Usage

    ```
    $ npm install xgplayer@next
    $ npm install xgplayer-music@next
    ```

    Step 1:

    ```html
    <div id="vs"></div>
    ```
    Step 2:

    ```js
    import Player from 'xgplayer'
    import 'xgplayer/dist/index.min.css'
    import MusicPreset from 'xgplayer-music'
    import 'xgplayer-music/dist/index.min.css'

    const player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
        poster: 'xxxx',
        title: '这是音乐标题',
        /***以下配置音乐播放器一定要有start***/
        controls: {
            mode: 'flex',
            initShow: true
        },
        marginControls: true
        mediaType: 'audio', // 视频为video, h265为 xg-video, 音频为audio
        preset: ['default', MusicPreset],
        /***以上配置音乐播放器一定要有ended***/
        music: {
            // 音乐循环播放列表，如果不需要循环播放可以没有
            list: [{
                url: 'xx',
                vid: '123',
                poster: 'ccc',
                title: 'ccc'
            }]
        },
        width: "100%",
        height: 70
    })
    ```

    This is the easiest way to configure the player,then it runs with video. For more advanced content, see the plug-in section or documentation. [more config](http://h5player.bytedance.com/config.html)


### Mobile Support

xgplayer supports mobile terminal, but android device brand and system are numerous, there are much compatibility problems, the player provides whitelist mechanism to ensure the perfect operation in mobile terminal. [whitelist](http://h5player.bytedance.com/config/#%E7%99%BD%E5%90%8D%E5%8D%95)



### Dev

For debugging, we provide the example video resource which size is large in github. You can clone the whole git repository which includes codes and example videos with 'git clone --recurse-submodules -j8'. With 'git clone' you will pull only codes of xgplayer and its plugins.

```
$ git clone --recurse-submodules -j8 git@github.com:bytedance/xgplayer.git # OR git clone git@github.com:bytedance/xgplayer.git
$ cd xgplayer
$ npm install
$ npm run dev
```

please visit [http://localhost:9090/examples/index.html](http://localhost:9090/examples/index.html)


### License

[MIT](http://opensource.org/licenses/MIT)
