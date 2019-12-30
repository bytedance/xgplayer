## [2.3.5](https://github.com/bytedance/xgplayer/compare/v2.3.4...v2.3.5) (2019-11-18)


### Bug Fixes

* **types/index.d.ts:** fix progressDot, width and height ts config ([99c7813](https://github.com/bytedance/xgplayer/commit/99c7813efc3645de08692014f5ee47de036887f7))
* fix the bug when trigger start ([d9dad6a](https://github.com/bytedance/xgplayer/commit/d9dad6a4fb2d55c6bb086bf3c58c48e0daffb106))
* flv audio video unsync ([88d0849](https://github.com/bytedance/xgplayer/commit/88d084929a1fc94461277d3b1369c9b0107a42d6))
* remove invalid sample before first video keyframe ([aca8252](https://github.com/bytedance/xgplayer/commit/aca82528b24f45d71c394d4d8cd7b97bf7e1ad08))
* **xgplayer:** fix fluid and cssFullscreen conflict ([285cb4c](https://github.com/bytedance/xgplayer/commit/285cb4c07b5d82aeac0b2d77303392f1ea12a07d))
* **xgplayer:** fix IE11 play return Promise error ([405aed6](https://github.com/bytedance/xgplayer/commit/405aed63c5a91712c48cf5c4022bb81251392d09))
* **xgplayer-hls.js:** dependencies use stable version ([dd3ac90](https://github.com/bytedance/xgplayer/commit/dd3ac90510daf9e1ec874a9755ebbc4aa0d0e18f))
* **xgplayer-hls.js:** Polyfill Number.isFinite in xgplayer-hls.js ([9556e63](https://github.com/bytedance/xgplayer/commit/9556e6369b1e85df2d356e14d64b75f3a7d17b81))
* **xgplayer-hls.js:** support videoInit ([13dca34](https://github.com/bytedance/xgplayer/commit/13dca34fa5839412bc3887332f2e11414c8b808e))



## [2.3.4](https://github.com/bytedance/xgplayer/compare/v2.3.3...v2.3.4) (2019-11-13)


### Bug Fixes

* **xgplayer-hls.js:** fix autoplay promise error ([eb7b065](https://github.com/bytedance/xgplayer/commit/eb7b0654abeb3f51ea70e3e01491406cd49d6b29))


### Features

* **xgplayer:** add progressDot duration ([3002144](https://github.com/bytedance/xgplayer/commit/3002144be3e4b1b1a1656bc6213331d0faabdd30))



## [2.3.3](https://github.com/bytedance/xgplayer/compare/v2.3.2...v2.3.3) (2019-11-12)


### Bug Fixes

* **xgplayer, xgplayer-hls.js:** fix hls live duration infinity; support X5 camel case config ([0b49b49](https://github.com/bytedance/xgplayer/commit/0b49b497439b22229b0cbe202ae60494dcda0f3b))



## [2.3.2](https://github.com/bytedance/xgplayer/compare/v2.3.1...v2.3.2) (2019-11-11)


### Features

* **xgplayer:** add poster set function ([29114ef](https://github.com/bytedance/xgplayer/commit/29114effaa778b2c9d9facadf719f046f3255121))



## [2.3.1](https://github.com/bytedance/xgplayer/compare/v2.2.1...v2.3.1) (2019-11-11)


### Bug Fixes

* 🐛 ts modify ([a8f4c4b](https://github.com/bytedance/xgplayer/commit/a8f4c4bb0e8c62f947f1b145a55eb77d181e4695))
* fix the bug the Start in /skin can`t add className when the player need to load config.controlStyle ([91b9ab4](https://github.com/bytedance/xgplayer/commit/91b9ab4392aae20083b5d97d2ab8267f5e6cd0b4))
* flv live play return result of video.play() ([d6b8296](https://github.com/bytedance/xgplayer/commit/d6b8296fdaf1878f3cad5ef99360ee819ef675a1))
* hls fix audio/video first frame gap ([694e0b8](https://github.com/bytedance/xgplayer/commit/694e0b87b96b70164fff246d1ad982e74394e4f2))
* hls seeking when last load task not finished ([616f0ea](https://github.com/bytedance/xgplayer/commit/616f0ead2c312f1724a3b0326f5fcbd545238f33))
* reset last sample when seeking ([c47d8b8](https://github.com/bytedance/xgplayer/commit/c47d8b8bd6f221831c7faaeb6b934f06ef12ccb1))
* video first dts before audio first dts ([8df36d5](https://github.com/bytedance/xgplayer/commit/8df36d5624674e49eaf36c0a71224271257a5945))
* **xgplayer:** fix no canPlayType param ([c70d192](https://github.com/bytedance/xgplayer/commit/c70d1923d0e1cc5ce580315403a28bccb65c3581))



## [2.2.1](https://github.com/bytedance/xgplayer/compare/v2.2.0...v2.2.1) (2019-11-04)


### Bug Fixes

* caton after flv remove video buffer ([4960e9a](https://github.com/bytedance/xgplayer/commit/4960e9ac135a7d3df9dec2fd123fe130a6668dba))
* fix flv live caton while clean video buffer ([b066c4b](https://github.com/bytedance/xgplayer/commit/b066c4b6ac051caf36815d611d68457558efc3e6))
* flv live emit ended event to player when loader complete ([815e29f](https://github.com/bytedance/xgplayer/commit/815e29f4f20c6a85dc97f79b5c579729ea7b2281))
* flv live stability upgrade ([ed11f7f](https://github.com/bytedance/xgplayer/commit/ed11f7f72c371d4edae9c4a29af6177d05323a79))
* flv stream change with dts reset ([f8ac083](https://github.com/bytedance/xgplayer/commit/f8ac083b0d9c896ba4a91ed625da667fd979ce80))
* hls options change midstream without large gap (maybe CDN fixed large gap) ([e4f4677](https://github.com/bytedance/xgplayer/commit/e4f4677284970b1d0b56d6c6836164b39b4a0ff4))
* mobile decode dts max integer overflow ([d0c3d50](https://github.com/bytedance/xgplayer/commit/d0c3d5008ccea9f95e55a476ee5453c0b566920b))
* not defined sampleIndex during hls demuxing ([59595f7](https://github.com/bytedance/xgplayer/commit/59595f793af2f71a0e43b14409a25f5111eacdef))
* **xgplayer:** add return and catch for play method; fix volume overflow style ([442c030](https://github.com/bytedance/xgplayer/commit/442c030205d05fdcd369b3b2d08b11483aae04e6))
* **xgplayer-mp4, xgplayer-flv.js:** fix mp4 url array error; fix flv has no play promise in low-end ([d864e83](https://github.com/bytedance/xgplayer/commit/d864e8372dfcf88f145dc0468f263c31d882a4ef))
* record rap while remuxing, keep at least 1 rap before currentTime when clean video buffer ([1738252](https://github.com/bytedance/xgplayer/commit/1738252f28711eaa6e4367495af22f6dfa5f9ff8))
* stash flv last sample for accurate sample duration calc ([a59b405](https://github.com/bytedance/xgplayer/commit/a59b405f0c508e8fd69c48df452679bdf95614ac))
* stash last sample for dts compatibility ([095b958](https://github.com/bytedance/xgplayer/commit/095b958bafc496dc106e7e598e26604f3e9eb74a))
* video decoder config changed midstream ([296b5d7](https://github.com/bytedance/xgplayer/commit/296b5d79015218ba380456b8ac25d4e67f1a9b2b))


### Features

* **xgplayer:** add fitVideoSize function ([cd24625](https://github.com/bytedance/xgplayer/commit/cd24625adf1f2bba808e382fa2295479a65595d5))
* add momory-play module ([dbd511b](https://github.com/bytedance/xgplayer/commit/dbd511b3f7b563e0a5c17a58ab9ff20c766a1c8e))
* hls external ([0f997b3](https://github.com/bytedance/xgplayer/commit/0f997b349d1bf5276dce548c7389ecc886eb478d))
* hls support m3u8 text upload ([625ee71](https://github.com/bytedance/xgplayer/commit/625ee71944b4a440096f7da615882ea990c67db5))
* hls-vod support player ended ([55178d9](https://github.com/bytedance/xgplayer/commit/55178d930722b83b689d4525472a161f31e6ad76))
* momoryPlay module style change ([33337f4](https://github.com/bytedance/xgplayer/commit/33337f4e6305e08bff96d10b5c963a415fbeb9cc))
* track flv live crash using count and log ([1f591a1](https://github.com/bytedance/xgplayer/commit/1f591a11d1877652a0d4eeafdc60708f63ca01ed))



# [2.2.0](https://github.com/bytedance/xgplayer/compare/v2.1.20...v2.2.0) (2019-10-22)


### Bug Fixes

* **xgplayer:** retain the custom classname in destroy ([b353c40](https://github.com/bytedance/xgplayer/commit/b353c40ce66dff1fb6a9a94cb676efb1e2a4d697))
* compatibility与remux兼容中途换视频元信息 ([444a188](https://github.com/bytedance/xgplayer/commit/444a188d5b2fca959f7318f08c62e15d73aaa230))
* hls refsampleduration change cause compatibility problem ([fb06e8c](https://github.com/bytedance/xgplayer/commit/fb06e8c6f609c6bbc62dcf8c37f3e44a64b8e5d3))
* 删除无用的log ([57d5e23](https://github.com/bytedance/xgplayer/commit/57d5e23ff7dab18f80ca3fab36b4694b11ac0184))
* 尝试解决hls无法播放的问题 ([c7e4957](https://github.com/bytedance/xgplayer/commit/c7e4957cb8c811436ab9b01c5f43fd29b099150e))
* 解决hls中途换流导致的seek问题 ([4db978b](https://github.com/bytedance/xgplayer/commit/4db978b0ded59937523965be0f9862bca844a5d4))
* 解决xgplayer存在lang访问不到的问题 ([861ad2b](https://github.com/bytedance/xgplayer/commit/861ad2befe7f8e7658508a1115b6651b29860663))
* 解决完hls的连麦换流问题 ([3adb66d](https://github.com/bytedance/xgplayer/commit/3adb66d754dfdd9d7e1f04d3dfb59b1385e467db))
* 需要接着修复flv的兼容性问题 ([cb8fccb](https://github.com/bytedance/xgplayer/commit/cb8fccb5003c9f7e5dfb91c35634ca1e4823a80f))


### Features

* flv接入通用报错 ([593b018](https://github.com/bytedance/xgplayer/commit/593b0186a8f0b9f497382b89d37fd62cfa693dfd))
* flv解决remove调用过于频繁的问题 ([efaa7db](https://github.com/bytedance/xgplayer/commit/efaa7db2cdacad26a6d34c9289f1c6252c78dd51))
* 修复flv不能及时断流的问题 ([963c185](https://github.com/bytedance/xgplayer/commit/963c1857e78eda28d461eb902d37a7447f6c2514))
* 修复player的lang在销毁后获取报错的问题 ([d4f63e5](https://github.com/bytedance/xgplayer/commit/d4f63e5e608f0d4df7e7fcd487a5d63154172201))
* 再发一个xgplayer ([239184f](https://github.com/bytedance/xgplayer/commit/239184f47c3c33533ca8e6d0bc9f5e47a29b51f8))
* 完成直播flv和hls的各自方向专项优化 ([1d1e7b9](https://github.com/bytedance/xgplayer/commit/1d1e7b9e0b95be960e64c366d77f0a874aeba26f))
* 解决loader在cancel时可能出现的空值问题 ([76cc367](https://github.com/bytedance/xgplayer/commit/76cc3676b7fbe189f4c0e6eabd11fdd51b26fb89))
* 重新build flv转码器 ([bf9c695](https://github.com/bytedance/xgplayer/commit/bf9c69589d18174b313c230a45313cc13c19cab4))
* 重新编译flv/hls转码器 ([1fa6537](https://github.com/bytedance/xgplayer/commit/1fa65370fcf601e09b3198ab45031498338b1846))



## [2.1.20](https://github.com/bytedance/xgplayer/compare/v2.1.19...v2.1.20) (2019-10-12)


### Bug Fixes

* flv点播支持在跨域场景下使用整文件下载的方式进行播放，避免视频无法播放的case出现 ([eb99727](https://github.com/bytedance/xgplayer/commit/eb9972732daaf43bfd0a2fb809756528f7548c5f))
* 从mobile pick context修复部分代码，解决内存泄漏问题 ([f254688](https://github.com/bytedance/xgplayer/commit/f25468805c6ccd5ebbe654d6b170283a56e20000))
* 修复流播放过程中音频不流畅的问题，降低直播过程中追帧的频率 ([dc182c2](https://github.com/bytedance/xgplayer/commit/dc182c2a78a9e82740d1f790328f9357b963091a))
* 修复直播暂停造成的context冲突 ([4d0cc27](https://github.com/bytedance/xgplayer/commit/4d0cc2769240f577a657a34303ad4d4f7c50c06c))
* 修复直播过程中的音频overlap导致声音不清晰问题 ([9f4c415](https://github.com/bytedance/xgplayer/commit/9f4c415d1568807c4c52bbba6aa6af8f8992f805))
* 在直播时清空mse的已播放buffer，降低内存占用 ([8dcdf22](https://github.com/bytedance/xgplayer/commit/8dcdf22c117293fb21e9aa0390abdba3a3e34a04))
* 解决mse原生事件监听的内存泄漏问题 ([1f14854](https://github.com/bytedance/xgplayer/commit/1f14854c9d778c678ef3f11c37b5db47719da5e6))
* **xgplayer:** fix volume UI ([01eda0b](https://github.com/bytedance/xgplayer/commit/01eda0b1057fa3f3d0bbbd2a436a7c91c43c1fab))
* **xgplayer-music:** fix music lyric update problem ([3c95f20](https://github.com/bytedance/xgplayer/commit/3c95f205a71c3dde65f2b937f4a1d04ca9d33c72))


### Features

* flv可以正常destory ([52b3dfa](https://github.com/bytedance/xgplayer/commit/52b3dfa721803675c7eaba59d2feb361092f7a99))
* flv解码可以在网络错误时正确通知到player，展示报错信息 ([9d0b09a](https://github.com/bytedance/xgplayer/commit/9d0b09a4d20fb3b0e5f11046e4e4bf9dec08758c))
* hls点播转码器可以在网络请求失败时正确展示错误 ([2d6341d](https://github.com/bytedance/xgplayer/commit/2d6341d00a574a407446dfb9bdae0b9e54c8b922))
* 可以支持直播的暂停销毁，DOM这一层还有一些小问题 ([9c0005b](https://github.com/bytedance/xgplayer/commit/9c0005bff2e846aa83273d9d3342c3b17b8bdffe))
* 完善flv直播暂停重新播放的逻辑，在重新播放之后要重建实例 ([8ab5189](https://github.com/bytedance/xgplayer/commit/8ab5189e01d65d35861736e2eb9f3788937c9801))
* 提高帧重定位门槛，对于极小的偏差不进行强制重定位 ([a982323](https://github.com/bytedance/xgplayer/commit/a982323c1a843c5aaa3b9efc4af321f4144ecc7f))
* 解决flv部分视频无法开播的问题 ([f4219d1](https://github.com/bytedance/xgplayer/commit/f4219d19a7b2e1c0158219ec027ffcfd54e5d5f8))
* 重新打包flv和hls代码，避免context监听导致的内存泄漏 ([08ff2b9](https://github.com/bytedance/xgplayer/commit/08ff2b9f5c0856519f39d33ae437bb5bf3a4d3cf))



## [2.1.19](https://github.com/bytedance/xgplayer/compare/v2.1.18...v2.1.19) (2019-10-08)


### Bug Fixes

* 尝试修复compat对视频帧修复的问题 ([4ac3d0e](https://github.com/bytedance/xgplayer/commit/4ac3d0e5af3fc0cc28a78727da3632184e520f02))
* **xgplayer:** add cssFullscreen api ([34eac81](https://github.com/bytedance/xgplayer/commit/34eac81fd44f4a5cddf416819589ccb1e0da413b))



## [2.1.18](https://github.com/bytedance/xgplayer/compare/v2.1.17...v2.1.18) (2019-10-08)


### Bug Fixes

* 修复api调用错误 ([5ef7099](https://github.com/bytedance/xgplayer/commit/5ef70997df004b0abc7115a8779896eb68d1f18b))
* 修复hls小姐姐流compat计算问题 ([650a174](https://github.com/bytedance/xgplayer/commit/650a174dfdfbb89714cbb0dc51f056c3e6523038))
* 修复hls计算下一个片段的方式太严格的问题 ([f443948](https://github.com/bytedance/xgplayer/commit/f44394875aee24c6e45d583594fc591ae7b7dcca))
* 修复音频流大量缺失场景下需要重设音频duration的问题 ([903bca7](https://github.com/bytedance/xgplayer/commit/903bca77f0285a8855aecd710a13b47c57ccd1c2))
* 在flv包中支持点播和直播根据config切换 ([a8f5aa2](https://github.com/bytedance/xgplayer/commit/a8f5aa24d91deb89a8ccdd2deadefd5164c0805b))
* 完成flv直播转码器的层级重组 ([8028d69](https://github.com/bytedance/xgplayer/commit/8028d696e0b9cd54baa5a3e89c213228bcfd872e))
* **xgplayer, xgplayer-mp4, xgplayer-music:** add cssfullscreen in live style; add withCredentials co ([7d5c298](https://github.com/bytedance/xgplayer/commit/7d5c298ecd2136359a9757fb19b0a02bd21de9b4))
* 暂时不处理丢帧的逻辑,处理完video补帧的逻辑 ([4fb6066](https://github.com/bytedance/xgplayer/commit/4fb60669e6a6fe7d2c12819cf47a204fa5cfa15c))
* 解决flv点播包拆分的问题 ([00afd11](https://github.com/bytedance/xgplayer/commit/00afd11e29250f838be487f29fbb0d1ae1e80b6f))
* 解决flv点播包拆分的问题 ([fdbd84e](https://github.com/bytedance/xgplayer/commit/fdbd84e612edea6b8569c3881325487b9fa22c2f))
* 解决flv点播无法播放的问题 ([d14bfe8](https://github.com/bytedance/xgplayer/commit/d14bfe8378752541b29a3d1ee8796f6e3c6dd034))


### Features

* video的兼容性基本开发完成，需要调整算法，不处理丢帧 ([dbb7e02](https://github.com/bytedance/xgplayer/commit/dbb7e026887e82efdf917fea23643bb30933b1dd))
* 优化segment间duration计算策略 ([7da0c78](https://github.com/bytedance/xgplayer/commit/7da0c7892db6d946c0699a238bce0fb3f8060715))
* 修复video补帧补多了的问题 ([82429bb](https://github.com/bytedance/xgplayer/commit/82429bbb0b79372ef823072d1884d67733bd44ff))
* 修复问题流没有refSampleDuration的问题 ([44b25fb](https://github.com/bytedance/xgplayer/commit/44b25fbdfe8f7ccb73587807dfb9ca0f003a23f7))
* 写完了音频帧的补帧、丢帧策略，待测试 ([eda78fa](https://github.com/bytedance/xgplayer/commit/eda78fa4549f9522f6e2b4c7007016b49940cbe0))
* 开始做音频的补帧 ([479b0b3](https://github.com/bytedance/xgplayer/commit/479b0b3fcaf7711d590b1c098f1aac993c03df77))
* 调整flv和hls的controller调用组件方式，统一在controller对各个组件发消息 ([c40f837](https://github.com/bytedance/xgplayer/commit/c40f837221b0cd659c55cb29677c849055743652))



## [2.1.17](https://github.com/bytedance/xgplayer/compare/v2.1.16...v2.1.17) (2019-09-23)


### Bug Fixes

* audio sample定义补全 ([936d929](https://github.com/bytedance/xgplayer/commit/936d929a1609b70b6eec1c2bcf8147fa917cf057))
* audio 的remux存在问题 ([3a7dbca](https://github.com/bytedance/xgplayer/commit/3a7dbcaeff1cd5beb568c0c8a86a49d186da2c1a))
* fetch-loader的package上线 ([f01cb40](https://github.com/bytedance/xgplayer/commit/f01cb4022a4db24e7239478e9c48b39729d56a5c))
* remux dist ([fc14d0f](https://github.com/bytedance/xgplayer/commit/fc14d0f6641b712cd533dca711d5d39bcfb1a4aa))
* 兼容firefox和android下的channel ([e5131a2](https://github.com/bytedance/xgplayer/commit/e5131a2de6a78af0fa5cf6b54e8477246df99807))
* 补上sdtp的flag判断 ([49f6308](https://github.com/bytedance/xgplayer/commit/49f6308522cbeda106b7036737b3357f38fe6c02))
* 解决fmp4remux时mvex的track没有分开的问题 ([d42f1ee](https://github.com/bytedance/xgplayer/commit/d42f1ee771c05c008b41edc615518e8b5926e8cf))
* **xgplayer:** fix volume decimal accuracy and rotate method ([26d6be6](https://github.com/bytedance/xgplayer/commit/26d6be6477c7b21550c23873fccfbf4a2d108a9e))
* 解决remux时moof盒子dts基准不正确的问题 ([4723887](https://github.com/bytedance/xgplayer/commit/4723887e6137529d4fca62f67e6e2f62847061f9))
* 解决remux的依赖问题 ([6e528d3](https://github.com/bytedance/xgplayer/commit/6e528d3e91b41daca41f50be8fa561054ff8be37))
* 解决音频不能正确播放的问题 ([e539977](https://github.com/bytedance/xgplayer/commit/e53997732e0e6e9aa0348119208a3ecf9b99c9d9))


### Features

* sample和mediainfo开发完成 ([a54cf84](https://github.com/bytedance/xgplayer/commit/a54cf8489ed2315d7ee1686dd143d77541c5c9b3))
* track的meta信息model抽取 ([1a7c3cb](https://github.com/bytedance/xgplayer/commit/1a7c3cba572362c1444097573de3f58a9679dee7))
* 完成remux部分的开发 ([ad33e58](https://github.com/bytedance/xgplayer/commit/ad33e580d43afd98fb3e2094df0a0abce6ff9402))
* 提交remux模块的打包代码 ([981f8ad](https://github.com/bytedance/xgplayer/commit/981f8adecec5e54072a05960d14a3baf52e70828))
* 解决一下mse和remux的问题 ([e568a2e](https://github.com/bytedance/xgplayer/commit/e568a2e693d247ae62b945eeb8c1c00970d28062))
* 调整一些解码流程的规范 ([0e55ac2](https://github.com/bytedance/xgplayer/commit/0e55ac208789c7dd306bc91e66c685f359f57e7a))



## [2.1.16](https://github.com/bytedance/xgplayer/compare/v2.1.15...v2.1.16) (2019-09-18)


### Bug Fixes

* **xgplayer:** del ios9 limit in replay plugin ([236234f](https://github.com/bytedance/xgplayer/commit/236234fe1d3fee1d3e95a7584840d6b3da4c3cf1))


### Features

* flv的demux功能完成 ([c646cf8](https://github.com/bytedance/xgplayer/commit/c646cf8d0d10df31021ad768f0a2989676781da4))
* flv直播解码器模型代码搭载完毕 ([9e48f1f](https://github.com/bytedance/xgplayer/commit/9e48f1fbe8202baa9959d65bd2c85886dfb254e2))
* 写写数据获取侧 ([806bf0f](https://github.com/bytedance/xgplayer/commit/806bf0f03c1c2b7794c7950f565f2fda7fc0402e))
* 基本完成flv的demux部分重构 ([58c14ec](https://github.com/bytedance/xgplayer/commit/58c14ec795fb7ea3361220000432abc1e2839101))
* 完成context核心插件的开发 ([98ce60b](https://github.com/bytedance/xgplayer/commit/98ce60bf542ea2ab5201ec8ce20e93210e1787df))
* 开始写flv的remux部分 ([0443b76](https://github.com/bytedance/xgplayer/commit/0443b761c2626ee9010e041f0c998c78b8c85f1a))
* 开始对接flv的解码层 ([8f994fd](https://github.com/bytedance/xgplayer/commit/8f994fd71bc142170172a69954cb4bcba4b76b84))
* 提交flv-demuxer代码 ([577294f](https://github.com/bytedance/xgplayer/commit/577294f26229266dbe4538215444b4f2f26654d1))



## [2.1.15](https://github.com/bytedance/xgplayer/compare/v2.1.14...v2.1.15) (2019-09-12)


### Bug Fixes

* **xgplayer:** fix mobile volume icon touch error ([1213353](https://github.com/bytedance/xgplayer/commit/12133537461a4792a7a9080fbcac9db86026f32b))



## [2.1.14](https://github.com/bytedance/xgplayer/compare/v2.1.13...v2.1.14) (2019-09-06)


### Bug Fixes

* **xgplayer:** fix progressBar exceed container; fix replay svg error ([6778a1c](https://github.com/bytedance/xgplayer/commit/6778a1c4d8d2b42f925d5dd8796df81a9c2ff8b4))



## [2.1.13](https://github.com/bytedance/xgplayer/compare/v2.1.12...v2.1.13) (2019-09-02)


### Bug Fixes

* **xgplayer, xgplayer-flv.js, xgplayer-music:** fix fullscreen bug; delete initial code in switching ([174220b](https://github.com/bytedance/xgplayer/commit/174220b2ba2d5acb1180a347fcd924825b21a3db))



## [2.1.12](https://github.com/bytedance/xgplayer/compare/v2.1.11...v2.1.12) (2019-08-23)


### Features

* **xgplayer:** add cssfullscreen emit event ([d7469e7](https://github.com/bytedance/xgplayer/commit/d7469e7dbb3919e488bf25b30caa7d99e43be16a))



## [2.1.11](https://github.com/bytedance/xgplayer/compare/v2.1.10...v2.1.11) (2019-08-23)


### Bug Fixes

* **xgplayer:** fix replay, progress style in IE11 ([0c7f3d7](https://github.com/bytedance/xgplayer/commit/0c7f3d750342786e3a89979b63e089a40746b372))



## [2.1.10](https://github.com/bytedance/xgplayer/compare/v2.1.9...v2.1.10) (2019-08-21)


### Bug Fixes

* **xgplayer, xgplayer-flv.js:** fix xgplayer init error text appear; support rotate controls; fix op ([378e8e1](https://github.com/bytedance/xgplayer/commit/378e8e13a5d94c5d0738227ba90700783142710d))



## [2.1.9](https://github.com/bytedance/xgplayer/compare/v2.1.7...v2.1.9) (2019-08-20)


### Bug Fixes

* **xgplayer, xgplayer-flv.js:** fix live style; fix xgplayer-flv.js url change method; change progre ([ba5ed07](https://github.com/bytedance/xgplayer/commit/ba5ed075a258953f55161cdcd5788aea1da0c7a5))



## [2.1.7](https://github.com/bytedance/xgplayer/compare/v2.1.6...v2.1.7) (2019-08-14)


### Bug Fixes

* **xgplayer:** optimize style of progress and tips in mobile; fix localStorage error in some webview ([3a094d8](https://github.com/bytedance/xgplayer/commit/3a094d80aa296d3719fe2ff2c59fd5dace6ddd54))
* **xgplayer-music:** music support xgplayer rebuild version ([feeedaf](https://github.com/bytedance/xgplayer/commit/feeedaf6a9441ef76400eadda199a18ac876c848))



## [2.1.6](https://github.com/bytedance/xgplayer/compare/v2.1.5...v2.1.6) (2019-08-11)


### Bug Fixes

* **xgplayer:** change enter background; change progress width and progressBtn shape ([62b621b](https://github.com/bytedance/xgplayer/commit/62b621b7d4adffb1c4677412a6e9bd0b57a2b118))



## [2.1.5](https://github.com/bytedance/xgplayer/compare/v2.1.4...v2.1.5) (2019-08-11)


### Bug Fixes

* **xgplayer:** add loading key-frame ([e2cc494](https://github.com/bytedance/xgplayer/commit/e2cc4948cc846ac762bb501789e651c2a416fcea))



## [2.1.4](https://github.com/bytedance/xgplayer/compare/v2.1.3...v2.1.4) (2019-08-07)


### Bug Fixes

* **xgplayer:** replace startsWith for polyfill problem ([099efc7](https://github.com/bytedance/xgplayer/commit/099efc7529a63ba0865d62607dfcd77ccfa94a71))



## [2.1.3](https://github.com/bytedance/xgplayer/compare/v2.1.2...v2.1.3) (2019-08-01)


### Bug Fixes

* **xgplayer:** add this context in rotate function ([b03f020](https://github.com/bytedance/xgplayer/commit/b03f020108e358edc2609d79526bf092a0cca986))
* **xgplayer-example:** delete controlStyle.json ([491d0ac](https://github.com/bytedance/xgplayer/commit/491d0acab07a97bd18b86446da794087334bbfeb))
* **xgplayer-example:** remove readme conflict ([84de53c](https://github.com/bytedance/xgplayer/commit/84de53c5f40f6d29c702c86025b2b0f9ca2358c7))
* **xgplayer-example:** remove readme conflict text ([151e00d](https://github.com/bytedance/xgplayer/commit/151e00d38faee4fbf6cc54493b74ed042d644595))



## [2.1.2](https://github.com/bytedance/xgplayer/compare/v2.1.1...v2.1.2) (2019-07-19)


### Bug Fixes

* **xgplayer:** fix live style ([7e2e7c7](https://github.com/bytedance/xgplayer/commit/7e2e7c7d7805bf8d099f957b047e76d46365faa9))



## [2.1.1](https://github.com/bytedance/xgplayer/compare/v2.1.0...v2.1.1) (2019-07-18)


### Bug Fixes

* **xgplayer:** fix: time control width problem ([35697d7](https://github.com/bytedance/xgplayer/commit/35697d701216702b9ae34a3bc26cb32bc219a8ea))



# [2.1.0](https://github.com/bytedance/xgplayer/compare/v2.0.4...v2.1.0) (2019-07-12)


### Bug Fixes

* **xgplayer:** add pip config; support player string size ([7a65c68](https://github.com/bytedance/xgplayer/commit/7a65c683319b73ec38d14f93dbb615b1de063626))
* **xgplayer:** remove events of player.root in destroy ([42a471a](https://github.com/bytedance/xgplayer/commit/42a471a77437e57bf5a0500e810ca706c99c2f28))



## [2.0.4](https://github.com/bytedance/xgplayer/compare/v2.0.3...v2.0.4) (2019-06-26)


### Bug Fixes

* **xgplayer:** fix ignores not effctive in rebuild version ([ad2e9bc](https://github.com/bytedance/xgplayer/commit/ad2e9bcb4ccc173a8da40285004e04cd9e3abe5b))
* **xgplayer-mp4:** replace the timeupdate event with setInterval func ([325b935](https://github.com/bytedance/xgplayer/commit/325b935d09c28ed2b85633acdfd3909a14469290))



## [2.0.3](https://github.com/bytedance/xgplayer/compare/v2.0.2...v2.0.3) (2019-06-17)


### Features

* **xgplayer:** support mobile ([608ee84](https://github.com/bytedance/xgplayer/commit/608ee84a041f7b30e5687f91dd3853410aac5ffd))



## [2.0.2](https://github.com/bytedance/xgplayer/compare/v2.0.1...v2.0.2) (2019-06-14)


### Bug Fixes

* **xgplayer-dash, xgplayer-flv.js, xgplayer-hls.js:** xgplayer-flv.js add optionConfig; xgplayer-hls ([f218760](https://github.com/bytedance/xgplayer/commit/f2187601d412c3ab70e3a78ffd8216daeeee5ae0)), closes [#182](https://github.com/bytedance/xgplayer/issues/182) [#178](https://github.com/bytedance/xgplayer/issues/178)
* definition list error in dash ([85673e9](https://github.com/bytedance/xgplayer/commit/85673e92ecad2a773292d9b0897acf574154a462))



## [2.0.1](https://github.com/bytedance/xgplayer/compare/v2.0.0...v2.0.1) (2019-06-12)


### Bug Fixes

* **xgplayer:** fix onCanplay name error in progress.js ([4d04ae5](https://github.com/bytedance/xgplayer/commit/4d04ae5a66cc38742afad6ea2d5f0d610b8dc66a))



# [2.0.0](https://github.com/bytedance/xgplayer/compare/v1.1.7...v2.0.0) (2019-06-10)


### Features

* **xgplayer:** supply the jp text in player; add error.js in control; add issue template; publish v ([4b5521f](https://github.com/bytedance/xgplayer/commit/4b5521f48dbe92ad0b63cd68db2d507edf519b68))


### BREAKING CHANGES

* **xgplayer:** publish v2.0.0



## [1.1.7](https://github.com/bytedance/xgplayer/compare/v1.1.5...v1.1.7) (2019-06-06)


### Bug Fixes

* fix innerRotate ([7215a91](https://github.com/bytedance/xgplayer/commit/7215a91a0d79096238769f001b84ea78ead0a92b))
* improve seek to cache后卡死现象 ([7b8a989](https://github.com/bytedance/xgplayer/commit/7b8a989dd8e521a58c226350f7f7ea59ff360e63))
* 修复flv flv.js hls hls.js 插件清晰度问题 ([9c60978](https://github.com/bytedance/xgplayer/commit/9c6097865c7c75681b29a3bd0d8bd15614c8ac71))
* 修复flv flv.js hls hls.js 清晰度切换问题 ([0e4b45e](https://github.com/bytedance/xgplayer/commit/0e4b45e58eed1cb3c262ea14705b5d45b7196fdb))
* **xgplayer:** add danmu container click/dblclick handle ([78433ce](https://github.com/bytedance/xgplayer/commit/78433cee4c659a792416023a1b0c2d717e02b46c)), closes [#174](https://github.com/bytedance/xgplayer/issues/174)
* **xgplayer:** add execBeforePluginsCall exist judgement ([2e076b7](https://github.com/bytedance/xgplayer/commit/2e076b79845850747f92ccf32860117a6082cfda))
* **xgplayer:** fix bugs about progress, playbackrate and danmu ([3e8dc45](https://github.com/bytedance/xgplayer/commit/3e8dc45862d49d5df1004abd13cdcead0a79ee4b))
* **xgplayer:** fix order between mobile.js and xgplayer-mp4 ([9b9d571](https://github.com/bytedance/xgplayer/commit/9b9d571b33a9d1b1aa95e852e88d397f20e92b05))
* **xgplayer:** fix playbackrate when switching url ([96a30f4](https://github.com/bytedance/xgplayer/commit/96a30f4668316633df2ab184e44df74e60957b39)), closes [#171](https://github.com/bytedance/xgplayer/issues/171)
* **xgplayer:** fix progress set player.currentTime on waiting ([1e45b0c](https://github.com/bytedance/xgplayer/commit/1e45b0c911a081992270f891efc8612be3864f25))


### Features

* support fullscreen mode ESC event ([c8612a4](https://github.com/bytedance/xgplayer/commit/c8612a4e9abd7357cf390b95e440988846f870a4))
* **xgplayer:** add allowSeekAfterEnded config; fix controls displayer:none when errors ([0f69094](https://github.com/bytedance/xgplayer/commit/0f690947a74d9734777bbdb50ae67d38bf0fec1a))
* **xgplayer:** add execBeforePluginsCall; publish 1.1.6-beta.2 ([632c794](https://github.com/bytedance/xgplayer/commit/632c794530b7ec3fe277b0cb529fb77fd3860f26))
* **xgplayer:** rebuild with customizing the skin and improving the plugin system ([04e8a67](https://github.com/bytedance/xgplayer/commit/04e8a6743d63cca730475c9c1fc02bb38c95d22e))
* **xgplayer-hls.js:** decide whether using hls parse code with config ([3dd89f7](https://github.com/bytedance/xgplayer/commit/3dd89f76b9748a1637dfb356f710f52e9aa78b43)), closes [#175](https://github.com/bytedance/xgplayer/issues/175)


### BREAKING CHANGES

* **xgplayer:** v2.0 init



## [1.1.5](https://github.com/bytedance/xgplayer/compare/v1.1.4...v1.1.5) (2019-04-25)


### Bug Fixes

* **xgplayer:** fix memory leak of event center ([4e8733f](https://github.com/bytedance/xgplayer/commit/4e8733f568c49dbc9c8c8f7a71d0562e50e199fb))
* **xgplayer:** fix progressBtn left problem when resizing player ([d469f7e](https://github.com/bytedance/xgplayer/commit/d469f7ef930f11a03eef3f4b3d8a301a512fc9b5))
* **xgplayer:** test ([60bcba4](https://github.com/bytedance/xgplayer/commit/60bcba41f960b80f64c3f1c27bec30b56846fe08))
* **xgplayer-hls.js:** fix check browser error in onePlus ([122ff61](https://github.com/bytedance/xgplayer/commit/122ff61cbe369f7c10e70ef1b0ccf00a07ecb2a3))
* **xgplayer, xgplayer-hls.js:** fix autoplay in xgplayer-hls.js ([0310931](https://github.com/bytedance/xgplayer/commit/0310931dbf9a520da4f592a395eea010a95e0fcd))


### Features

* **xgplayer:** add config: closeFocusVideoFocus, closePlayVideoFocus ([0cde8ba](https://github.com/bytedance/xgplayer/commit/0cde8ba1ac7cfb7f60f7e54e604790ceb3c5c495))
* **xgplayer:** add danmu resetArea ([16ce984](https://github.com/bytedance/xgplayer/commit/16ce984d10e4ee6fb31d101b7af0adf83aef2b85))
* **xgplayer:** add playNext config ([bdaff2e](https://github.com/bytedance/xgplayer/commit/bdaff2ec625b2880ace785970db19ec699daabe1))
* **xgplayer:** danmu add will-change ([a2a7116](https://github.com/bytedance/xgplayer/commit/a2a71166bf0eb1b7f4cb4450a25e2575633b5d14))
* **xgplayer:** v1.1.5 ([02dba42](https://github.com/bytedance/xgplayer/commit/02dba42d536255e923740403c44192e0bdc298bc))



## [1.1.4](https://github.com/bytedance/xgplayer/compare/v1.1.3...v1.1.4) (2019-02-27)


### Bug Fixes

* **$flv:** fix flv seek to a time before currentTime ([5543ba0](https://github.com/bytedance/xgplayer/commit/5543ba0231f8c9cc463a4646895cecb0b6591d29))
* **examples:** fix examples ([1382e95](https://github.com/bytedance/xgplayer/commit/1382e95f22b3a5bda849254f51425a7926321424))
* **flv/[Flv.js, index.js. tasks/liveTask.js, parse/mainParser.js]:** fix flv multi player instance a ([bfb7be7](https://github.com/bytedance/xgplayer/commit/bfb7be7ca4efe10ef1b12387eeaaa76f4ead9a56))
* **xgplayer:** add api method for bullet; hide cursor in fullscreen ([15a2504](https://github.com/bytedance/xgplayer/commit/15a2504daf237fae83edfbded997a2c3176ca491))
* **xgplayer:** add bullet adjust offset; publish xgplayer@1.1.4-beta.7 ([cd251c3](https://github.com/bytedance/xgplayer/commit/cd251c31b79ef30ffeaecad68aa3a51a925bc83d))
* **xgplayer:** add bullet density ([9e8b648](https://github.com/bytedance/xgplayer/commit/9e8b6485878215eb70c0afbc82f06231ca49894b))
* **xgplayer:** add bullet prior show ([e7172a4](https://github.com/bytedance/xgplayer/commit/e7172a4a55f8f30a26b2a8fed4e8efe6763b6673))
* **xgplayer:** add enter config support in mobile ([b059edc](https://github.com/bytedance/xgplayer/commit/b059edc653b99d68ea5f4f6eaa5da5e3810a81d3))
* **xgplayer:** add progress dot tips ([7b895f1](https://github.com/bytedance/xgplayer/commit/7b895f16bf1315ced8fc005d8fba033c204b57fd))
* **xgplayer:** change centerBtn img config; add requestFullscreen and exitFullscreen event ([d1ba2d1](https://github.com/bytedance/xgplayer/commit/d1ba2d1fabc7c3465cf8e8eff020f37cdfeafd76))
* **xgplayer:** change interactive of definition and volume; fix loading bug; fix log error when auto ([6312524](https://github.com/bytedance/xgplayer/commit/6312524c7625c099ecc6833619259bd27a0f6224))
* **xgplayer:** close some default log events ([bf1f840](https://github.com/bytedance/xgplayer/commit/bf1f840984bfcfeb29191f6a2ef4d1b74519cf80))
* **xgplayer:** emit error when have no url; fix progress problem in mobile ([f86fd8d](https://github.com/bytedance/xgplayer/commit/f86fd8db8813393bd53d6782c7eef75fdc3945da))
* **xgplayer:** fix autoplay execution order ([3e286ae](https://github.com/bytedance/xgplayer/commit/3e286ae0909e836cc351acc220ac364cac4733eb))
* **xgplayer:** fix bullet and enter tips problem in IE ([9d1341f](https://github.com/bytedance/xgplayer/commit/9d1341f3bc87e0440a724e14388007d8171d6f08))
* **xgplayer:** fix bullet click event ([60c5fef](https://github.com/bytedance/xgplayer/commit/60c5fefd8e783db478137143cc46e5292e87b3b5))
* **xgplayer:** fix bullet cursor, keydown and user-select ([0f3ec53](https://github.com/bytedance/xgplayer/commit/0f3ec53f474aaa911229c35fa9a6020d086d6aeb))
* **xgplayer:** fix bullet error in resizing the player ([6b36185](https://github.com/bytedance/xgplayer/commit/6b361854615769e4991b3ff4806fcb17da7ce84a))
* **xgplayer:** fix bullet fontsize; publish xgplayer@1.1.4-beta.6 ([5948ea2](https://github.com/bytedance/xgplayer/commit/5948ea2cd2eadd60ecc0de43132f9d66889b947f))
* **xgplayer:** fix bullet in border position when resizing ([416effc](https://github.com/bytedance/xgplayer/commit/416effcad80c96d4395b36ec83291ea8f327a9ac))
* **xgplayer:** fix controls display none after switch new src from error ([fc3ef9a](https://github.com/bytedance/xgplayer/commit/fc3ef9a950eb24d75be38f727f04c9142c075dfd))
* **xgplayer:** fix defination compatibility ([106c17f](https://github.com/bytedance/xgplayer/commit/106c17f1b848fcf8a5c984fd09dde8c04ffe65e2))
* **xgplayer:** fix destroy method ([d667a8d](https://github.com/bytedance/xgplayer/commit/d667a8dc6c548383747a6b951f021b84d4665a6a))
* **xgplayer:** fix enter class removing order ([2de869e](https://github.com/bytedance/xgplayer/commit/2de869e15d7d582bf9b30194cffe31ec95e26761))
* **xgplayer:** fix exitFullscreen event problem in Android ([3eff095](https://github.com/bytedance/xgplayer/commit/3eff095690569e94655ff6e8c6f67ae170a3fc83))
* **xgplayer:** fix fullscreen problem in Android Chrome ([4c6d3ba](https://github.com/bytedance/xgplayer/commit/4c6d3ba4a1831b4bd05322238fc6121184f5c07a))
* **xgplayer:** fix ipad treated as PC problem; fix ios fullscreen behavior ([e9234ac](https://github.com/bytedance/xgplayer/commit/e9234acc737b6290d51419119681a0de1442967f))
* **xgplayer:** fix no-controls config; fix controls focus problem ([f07a5fa](https://github.com/bytedance/xgplayer/commit/f07a5fae2dee1ab936c9803fac3118fba0a570bd))
* **xgplayer:** fix progress cache update ([fcdcc30](https://github.com/bytedance/xgplayer/commit/fcdcc30d7fe5d9da28b35ba965d69de746b57eb6))
* **xgplayer:** fix replay problem in ios9 ([58eb8e9](https://github.com/bytedance/xgplayer/commit/58eb8e9f1f17aa07ef768289befcf4078d4239ad))
* **xgplayer:** fix the dom which binding keydown event: document -> player.video ([28ed120](https://github.com/bytedance/xgplayer/commit/28ed120787ce51eeadfa61998895f4da6053144c))
* **xgplayer:** fix xg-play svg switch error in mobile ([04ae83b](https://github.com/bytedance/xgplayer/commit/04ae83bb81dcfdee1e7ee837e71b3d56be68372d))
* **xgplayer:** fix xgplayer centerBtn img config bug ([9d7b5c4](https://github.com/bytedance/xgplayer/commit/9d7b5c488a235cc6ba465e7ca86361cfd55c602e))
* **xgplayer:** fix xgplayer destroy error ([d2ad3f9](https://github.com/bytedance/xgplayer/commit/d2ad3f9e1e71fc4a51bca67c15c04259cee68451))
* babel-node: command not found ([c7218a5](https://github.com/bytedance/xgplayer/commit/c7218a500c9d6ca7cfc6bc699128f87d42b3346c))
* **xgplayer:** fix xgplayer-poster style ([c0a6595](https://github.com/bytedance/xgplayer/commit/c0a6595b1d30e3d497983789f678af1eb024b6b2))
* **xgplayer:** recover some .scss code for solving commit conflict ([29a7981](https://github.com/bytedance/xgplayer/commit/29a798187b7edbf8ea3cbe5e5d805ab31d507858))
* **xgplayer:** remove keydown event in destroy method ([33eaac6](https://github.com/bytedance/xgplayer/commit/33eaac6c014a090e5af4310eb0d839370e2593d5))
* **xgplayer-hls.js:** play m3u8 with native video in mobile device ([b99a2ac](https://github.com/bytedance/xgplayer/commit/b99a2acf3a67a7b13b7cbc0325fcf83e4c92fb2b))
* **xgplayer-mp4:** fix xgplayer-mp4 errorHandle ([81c333e](https://github.com/bytedance/xgplayer/commit/81c333e02519d03685106938c8a31fc54041fd10))
* **xgplayer, xgplayer-dash:** change dash method ([bd4b741](https://github.com/bytedance/xgplayer/commit/bd4b741fdf04286cb05187dc8eb1bd1f1478b3a2))
* fix hls is-living judge ([adbba42](https://github.com/bytedance/xgplayer/commit/adbba42d5b245c2c16a8869a6d31f2b83edd267d))
* fix live judge ([332a8fd](https://github.com/bytedance/xgplayer/commit/332a8fd7f500a6698fa92ce8bdf9c670727c23c6))
* fix package.json ([6fbeb16](https://github.com/bytedance/xgplayer/commit/6fbeb1604aec42b02a37257207f034792dd85f25))
* fix package.json ([6f2eefa](https://github.com/bytedance/xgplayer/commit/6f2eefa63ae61911e8acdcb947320f81063d11c1))
* fix relative url download ([a03b6c4](https://github.com/bytedance/xgplayer/commit/a03b6c4ad39d05a01cd40f2701ce00475f847ee8))
* fix TEA tracker init many times ([59e4a75](https://github.com/bytedance/xgplayer/commit/59e4a757e433dd31acaecf7103c08fd2094853c0))
* fix time when computed now < 0 ([40af9ab](https://github.com/bytedance/xgplayer/commit/40af9aba81b543c07e1001ec524a744569d89a1d))
* fix video memory leak ([0d5ebfe](https://github.com/bytedance/xgplayer/commit/0d5ebfe8008f7dcdbdb59ce3bbcea1713b734982))
* fluid when player enter fullscreen ([5bb742c](https://github.com/bytedance/xgplayer/commit/5bb742c98d8754b8e4c39d5b3522591c1df0a76e))
* Multiple assets emit to the same filename ([6bea865](https://github.com/bytedance/xgplayer/commit/6bea8654d4ac85a860a401a0e4967eb0d5ebc706))
* player.js ([54d897f](https://github.com/bytedance/xgplayer/commit/54d897fade8c2a3c9980a7b3b9bbf39b0ce439b3))
* remove dowboad btn when destroy ([a699d1e](https://github.com/bytedance/xgplayer/commit/a699d1e1b11c6c3948a582bc00b7eacca9370f0c))
* remove node and listener ([8018f9a](https://github.com/bytedance/xgplayer/commit/8018f9af6f8bfb1eb38a0006c23238d5d1f253b4))
* remove style tag when destroy ([9fa38d8](https://github.com/bytedance/xgplayer/commit/9fa38d84c3a62fa494781111c8f34a2449d38995))
* **xgplayer, xgplayer-m4a:** fix volumn svg error in mobile; improve the compatibility of m4a parser ([4d566c6](https://github.com/bytedance/xgplayer/commit/4d566c69fb7b5e118b4ec738d799779cf64d37d0))
* save ([3171923](https://github.com/bytedance/xgplayer/commit/3171923039a6873ae60609716f3bc70bf14d3313))
* 修复当视频初始状态下高度大于宽度时 旋转后不符合预期的bug ([f8dd34b](https://github.com/bytedance/xgplayer/commit/f8dd34b99f256e434fb8dfdb04293dffeb44150f))
* **xgplayer, xgplayer-flv:** fix bullet animation method; build xgplayer-flv ([a7d3100](https://github.com/bytedance/xgplayer/commit/a7d31009ef91b34b995eb00498b0ef801c006922))
* **xgplayer, xgplayer-m4a:** fix xgplayer-m4a compatibility; add bufferedChange eventListener for ca ([559da3d](https://github.com/bytedance/xgplayer/commit/559da3d90c11a907e2a277c18c0c55647aa98790))
* **xgplayer, xgplayer-mp4:** change some logger params; fix some block questions in controls ([6bbe46e](https://github.com/bytedance/xgplayer/commit/6bbe46e1d82d42586deeeaab6d042567cc7a8a2f))
* **xgplayer, xgplayer-mp4:** fix logger pt, vt ([cc79fd1](https://github.com/bytedance/xgplayer/commit/cc79fd1c3db2b3eaa676636ec36fc83284d10b74))
* **xgplayer, xgplayer-mp4:** fix mobile whitelist function method ([13c244e](https://github.com/bytedance/xgplayer/commit/13c244e99e56937adf1650ba623c2baeffb08440))
* **xgplayer, xgplayer-mp4:** fix xgplayer pt, vt; fix xgplayer-mp4 replay ([c40446e](https://github.com/bytedance/xgplayer/commit/c40446edd7721635caceb9b0dee96f0f714e0510))
* **xgplayer, xgplayer-music:** add some logger params; show volume controls in music player; change ([21b9ca2](https://github.com/bytedance/xgplayer/commit/21b9ca2603e77bb090970e438354af6c0468be9b))
* **xgplayer, xgplayer-music:** fix xgplayer-music package.json; fix volume ignore error in mobile ([e24c67e](https://github.com/bytedance/xgplayer/commit/e24c67e0137285ec167af18eb66d627f0322ca39))
* **xgplayer, xgplayer-music, xgplayer-m4a:** tips hide in mobile; add single loop mode in music play ([abffd39](https://github.com/bytedance/xgplayer/commit/abffd396ed14973f6df3fd995652efb51a215516))


### Features

* **xgplayer:** add beforeDefinitionchange event; add logger function ([09a1874](https://github.com/bytedance/xgplayer/commit/09a187427c68a7f8a77bcbff8383fc34cbcada78))
* **xgplayer:** add centerBtn img config ([8f4883f](https://github.com/bytedance/xgplayer/commit/8f4883f1c2591e77f8ea9d4ddb8630c3b7a9203c))
* **xgplayer:** add controlStyle config ([e5565f0](https://github.com/bytedance/xgplayer/commit/e5565f0671ee59f47c106e65022d5d4d634b67b7))
* **xgplayer:** add danmu.js method ([12c54ae](https://github.com/bytedance/xgplayer/commit/12c54aeb667ed4369ed3f53069168c70d0f77536))
* **xgplayer:** add fluid layout config ([ec6c3c7](https://github.com/bytedance/xgplayer/commit/ec6c3c7f1d67957ccd436320bbdb40b5627b0419))
* **xgplayer:** add preview local file function; publish v1.1.3 version ([bbe167e](https://github.com/bytedance/xgplayer/commit/bbe167e5988ba2ca71606f3637411e732ab95fc0))
* **xgplayer:** add progress dot config; publish xgplayer@1.1.4-beta.24 ([8d0075f](https://github.com/bytedance/xgplayer/commit/8d0075f9564ce3c8316e399e519072729f595ff0))
* **xgplayer:** add ProgressDot add/remove/removeAll method ([1094f86](https://github.com/bytedance/xgplayer/commit/1094f865a707d65a83fa79243ed7534eb077d4c9))
* **xgplayer:** add video click config and bullet special style ([2de0474](https://github.com/bytedance/xgplayer/commit/2de04741da38ece3ddd9c560c22980af8012c4b4))
* add more rotate config ([37b6cee](https://github.com/bytedance/xgplayer/commit/37b6cee60d7a73724823739afef258064da3ebcd))
* split player.scss to some separate file ([cafff8a](https://github.com/bytedance/xgplayer/commit/cafff8ac79ffde5736f0f3db0aacc9f6d30e0368))
* **xgplayer:** logger test version: xgplayer@1.1.4-beta.1 ([4722c5b](https://github.com/bytedance/xgplayer/commit/4722c5be9f15010e7302bd56159461392c3c96ce))
* **xgplayer:** v1.1.4 ([0eb9e7a](https://github.com/bytedance/xgplayer/commit/0eb9e7ad8a9511b9df64e1626e2c604333bc2290))
* **xgplayer:** xgplayer publish 1.1.4-alpha.9 version ([b776421](https://github.com/bytedance/xgplayer/commit/b7764219938675cf6ba69588808f872aff968d87))
* **xgplayer-dash:** add xgplayer-dash package ([9637757](https://github.com/bytedance/xgplayer/commit/96377577454711599260fa62b3f47541d8024b15))
* **xgplayer, xgplayer-hls.js:** change progress btn; fix xgplayer-hls.js in chrome simulator ([16a96c9](https://github.com/bytedance/xgplayer/commit/16a96c9cb755b920d75e2e27378a0301b2041ccf))
* **xgplayer, xgplayer-music:** add img config for controls(play, pause, next, prev, forward, backwa ([4430c6d](https://github.com/bytedance/xgplayer/commit/4430c6d6887e6ba8804376b4302ee61933243057))



## [1.1.2](https://github.com/bytedance/xgplayer/compare/v1.1.1...v1.1.2) (2018-09-27)


### Bug Fixes

* **example:** update example ([6ebbb40](https://github.com/bytedance/xgplayer/commit/6ebbb404c008d24d794ea46a27b2f40a1ccad274))
* **flv.js:** fix flv abort while live ([ffd9894](https://github.com/bytedance/xgplayer/commit/ffd9894fc619be198ec4a8e28678ba2de18f25d0))
* **xgplayer:** fix enter-tips error in safari; add autoplayMuted config ([20b2386](https://github.com/bytedance/xgplayer/commit/20b2386a03b733d517983af5c8d2bd6bb9dd3004))
* **xgplayer:** fix error refresh ([f16ae60](https://github.com/bytedance/xgplayer/commit/f16ae60e223f4e42f9d95b2fe734846bea03879e))
* **xgplayer-mp4:** read width and height info from tkhd box ([e58060a](https://github.com/bytedance/xgplayer/commit/e58060a0bec6ab7a2cbb9035bf6b14685a98d707))
* **xgplayer-music:** fix xgplayer-music lyric inactive bug ([d0a13a1](https://github.com/bytedance/xgplayer/commit/d0a13a1170e64d173f9b761058262afa3c2ea608))


### Features

* **examples:** add xgplayer-m4a example ([64fe1c6](https://github.com/bytedance/xgplayer/commit/64fe1c69e58828ece3f72cc63d496b400dd789ed))
* **xgplayer:** add keyShortcut switch config ([4693427](https://github.com/bytedance/xgplayer/commit/4693427aa5745f29b6194dbef30568a0d7ed9834))
* **xgplayer-mp4:** add mp4 cut function ([6964988](https://github.com/bytedance/xgplayer/commit/6964988a5386a3427ea4d3ba03f82edfc7250f8b))
* template simplify ([44c3c49](https://github.com/bytedance/xgplayer/commit/44c3c49d0a47ba870ac2274f240e954dba4a5aea))
* **xgplayer, xgplayer-music:** add music theme(PGC Liang Yuyi); fix progress cache-bar logic ([b85c6bb](https://github.com/bytedance/xgplayer/commit/b85c6bb4ae7cbc3bf5167cc8898bc8f29a7bd7db))



## [1.1.1](https://github.com/bytedance/xgplayer/compare/v1.1.0...v1.1.1) (2018-09-14)


### Bug Fixes

* **flv.js/src/index:** flv.js destroy and abort net request when player.emit('') ([4037761](https://github.com/bytedance/xgplayer/commit/40377612d297fb7c71de9cc4f410d9c026464111))
* **xgplayer:** fix fullscreen attribute problem in ios safari ([04f1629](https://github.com/bytedance/xgplayer/commit/04f162906d215f24c91a63b9fdac10051682a2e7))


### Features

* **xgplayer:** add keyboard shortcuts ([d62ba86](https://github.com/bytedance/xgplayer/commit/d62ba86742f73ac62306e8a9248c7d2ff9027034)), closes [#78](https://github.com/bytedance/xgplayer/issues/78)
* **xgplayer-m4a:** add plugin for converting m4a to fmp4 ([9439d74](https://github.com/bytedance/xgplayer/commit/9439d74065099125c53fd39f3e76c1fd580ac30d))
* **xgplayer-m4a:** add reqTimeLength config ([508ce30](https://github.com/bytedance/xgplayer/commit/508ce308d2f37df2d851d8467c6491edd6dab96f))
* **xgplayer-m4a, xgplayer-music, xgplayer:** add the method for getting the music fragment with spe ([31a02b9](https://github.com/bytedance/xgplayer/commit/31a02b91572965e46c83ea072310f8ed42d7e8b8))
* **xgplayer-music, xgplayer:** lrc: i18n, sync; music: go forward or backward; fix progress bug ([4e261ec](https://github.com/bytedance/xgplayer/commit/4e261ec7cee88888d0320498f8621bed93948eab))
* **xgplayer, xgplayer-music, xgplayer-m4a:** add offline storage with IndexedDB; add next song prel ([d736ca2](https://github.com/bytedance/xgplayer/commit/d736ca252de0f5767dd2f07dd0948c83b5f530a4))



# [1.1.0](https://github.com/bytedance/xgplayer/compare/v1.1.0-beta...v1.1.0) (2018-08-24)


### Bug Fixes

* **xgplayer-flv/[src/index.js, src/utils/Observer.js]:** fix xgplayer-flv play/autoplay bug, in Obse ([359c8d9](https://github.com/bytedance/xgplayer/commit/359c8d959b6bae59cd99ae7e17e1de3806b44cfd))
* **xgplayer/[player.js, control/mobile.js && volume.js]:** fix volume problem in mobile; add mousemo ([22575cf](https://github.com/bytedance/xgplayer/commit/22575cf325a27fcfc92e1379a55095c5ffecbd24))


### Features

* **add music plugin & fix flv plugin:** add music plugin & fix flv plugin ([1f1d802](https://github.com/bytedance/xgplayer/commit/1f1d802f6992dd790ee3e37ceccf9e411103af7f))
* **examples:** update example ([cb98835](https://github.com/bytedance/xgplayer/commit/cb98835603e02b3a44a0bbf140d9f2de448ad8bc))



## [1.0.9](https://github.com/bytedance/xgplayer/compare/v1.0.7...v1.0.9) (2018-08-20)


### Bug Fixes

* fix destroy api ([bc3c4f2](https://github.com/bytedance/xgplayer/commit/bc3c4f2523681239f504a2a2444555b6f6de3e1c))
* **xgplayer-hls.js/package.json:** update hls.js@0.11.0 for hls.once(event, function(){}) ([dd99fe5](https://github.com/bytedance/xgplayer/commit/dd99fe59482c8790ce91b2a2ea2a18bdf36ec46f))
* **xgplayer/[control/error.js,style/player.scss]:** fix error info suitability problem when player w ([fe22152](https://github.com/bytedance/xgplayer/commit/fe22152a680ae4a86440014d6750221a8b7977ed))
* **xgplayer/[control/textTrack.js, proxy.js]:** suitability support for textTrack in firefox ([3afda8d](https://github.com/bytedance/xgplayer/commit/3afda8d9a7e7119bb04f787412a70ff7a23a6063))
* **xgplayer/[player.js && proxy.js, control/mobile.js && volume.js]:** fix muted autoplay ([a30892a](https://github.com/bytedance/xgplayer/commit/a30892a3caccf46acf717c5c5c892c8e77b97dc4))
* **xgplayer/control/replay.js:** fix replay button style bug in IE 11 ([7a8d4b7](https://github.com/bytedance/xgplayer/commit/7a8d4b74bd2d7896911560b015b7e67c79c70662))
* **xgplayer/player.js,proxy.js,control/progress.js:** check and fix before publish ([15ea12a](https://github.com/bytedance/xgplayer/commit/15ea12ac051a62a867af9f06b18a88a0c07baa6d))
* **xgplayer/proxy.js:** config video crossorigin='anonymous' for textTrack ([717e86d](https://github.com/bytedance/xgplayer/commit/717e86d320d6a66d85387acd3d9de5cc155cd4af))
* **xgplayer/proxy.js, README.md:** support crossorigin textTrack, rewrite the git clone method for s ([21aa3cc](https://github.com/bytedance/xgplayer/commit/21aa3cc4dfd8a682dc92e2988b6885bd4d4d2ebc))


### Features

* add music-plugin ([7a781bd](https://github.com/bytedance/xgplayer/commit/7a781bd2cfd23f2a9d86aa3b01aed9823d6b8e4c))
* **example:** update example ([557aca6](https://github.com/bytedance/xgplayer/commit/557aca6edbf224ee8e15d68d92a7dc0d94dba697))
* **flv/utils/Observer:** update Observer for compatibility ([f51d878](https://github.com/bytedance/xgplayer/commit/f51d878c3675ee8a1fd7d08bb8e78ecccad9bc5a))
* **logger/*:** add xgplayer-logger support CNZZ, Baidu and Gtag ([b930a5c](https://github.com/bytedance/xgplayer/commit/b930a5ca4ba74ffd1de7f6ada4554e21abc2b006))
* **xgplayer/[control/textTrack.js, style/player.scss, proxy.js]:** add control status: fullscreen, ([bb8079e](https://github.com/bytedance/xgplayer/commit/bb8079e2a49b7ffb1ae1f000c8a8d17d0952d434))
* **xgplayer/[package.json, control/pip.js, style/player.scss]:** add Picture-in-Picture function ([0e39cd8](https://github.com/bytedance/xgplayer/commit/0e39cd8561493255dd43845c8d2352565e470bbc))
* **xgplayer/[proxy.js, utils/util.js]:** add bufferedChange event ([00c74dc](https://github.com/bytedance/xgplayer/commit/00c74dc4d54dcdc8f04e603a6e3495e130e58753))
* **xgplayer/control/[pc.js, mobile.js, replay.js]:** add center button svg path config ([2b47a5a](https://github.com/bytedance/xgplayer/commit/2b47a5afd48e6a391e00c2dc9d077eff76abfe5d))


### Performance Improvements

* **xgplayer/control/pc.js:** change enterLogo config, add enterBg, enterTips config ([2b97761](https://github.com/bytedance/xgplayer/commit/2b97761f4b97d47032f90612125d17431d751870))



## [1.0.7](https://github.com/bytedance/xgplayer/compare/v1.0.6...v1.0.7) (2018-08-02)


### Bug Fixes

* **flv/index.js:** destroy flv when player distroyed ([e90380b](https://github.com/bytedance/xgplayer/commit/e90380ba588616461fb1d8ea9dcccd746b9195dd))
* **xgplayer/[control/mobile.js,pc.js,progress.js style/player.scss]:** fix playbackrate and definiti ([de26dbc](https://github.com/bytedance/xgplayer/commit/de26dbcf4b4efe2cfbf78350e4602a34584777c2))


### Features

* 1. dynamic src for plugin for hls\hls.js\mp4; 2. destroy api; 3. xgplayer mediaType support fo ([2677045](https://github.com/bytedance/xgplayer/commit/26770457b7163dde7e691dcfd5ad1248c2ae66cf))
* **flv/[Flv.js, index.js, parser/demux/Audio&Video]:** flv support change src at the middle of play ([d24432f](https://github.com/bytedance/xgplayer/commit/d24432f23e25d554f36f04f566359f60307039c3))
* **xgplayer/[control/definition.js,fullscreen.js,play.js,playbackRate.js style/player.scss]:** Chan ([5ad1322](https://github.com/bytedance/xgplayer/commit/5ad1322cb03593a48812d44aabf134af8b3bdb87))
* **xgplayer/[proxy.js,control/mobile.js&textTrack.js,style/player.scss]:** 1.support Android mobile ([68f55c4](https://github.com/bytedance/xgplayer/commit/68f55c41bcfea21f497dd3e534c2b7a48615f032))



## [1.0.6](https://github.com/bytedance/xgplayer/compare/v1.0.6-0...v1.0.6) (2018-07-26)



## [1.0.6-0](https://github.com/bytedance/xgplayer/compare/v1.0.5...v1.0.6-0) (2018-07-25)


### Bug Fixes

* **xgplayer/proxy.js:** add param 'type' for canPlayType function ([f934040](https://github.com/bytedance/xgplayer/commit/f934040cf69e369e00308e651e96ece1fd97354f))
* fix hls.js live stream fetch when player destroyed ([6760f78](https://github.com/bytedance/xgplayer/commit/6760f78545a06bb659e9577cc4d3bd1faea7f50c))



## [1.0.5](https://github.com/bytedance/xgplayer/compare/v1.0.4...v1.0.5) (2018-07-13)


### Bug Fixes

* **examples/flv flv/src/[FLV, parser/MainParser]:** 解决flv在seek之后，seek状态不能重置的问题，同时解决demo视频没有keframe信息 ([80aef1c](https://github.com/bytedance/xgplayer/commit/80aef1cbf782a28bcf4cdfe107473b55d002f160))
* **README.md, README.zh-CN.md:** fix npm logo ([322949b](https://github.com/bytedance/xgplayer/commit/322949b2c197e271838c40ba8291d54ee4f241fa))
* **xgplayer/[control/playbackRate.js,definition.js,style/player.scss,error.js,proxy.js]:** fix playb ([096316c](https://github.com/bytedance/xgplayer/commit/096316c293026ddea87b30f261cead68a7947904))
* **xgplayer/[control/progress.js]:** fix progress point position ([55aa619](https://github.com/bytedance/xgplayer/commit/55aa61990b1d23d282d2c6e3d2821decd398b2eb))


### Features

* fix browser filename to index.js ([42f334c](https://github.com/bytedance/xgplayer/commit/42f334c319982bc8afc21b913bdc718694184a97))
* **flv/[index.js, Flv.js, MainParser.js]:** flv support seamless definition switching, see configur ([d3c9d3e](https://github.com/bytedance/xgplayer/commit/d3c9d3e2c4bebc570cdf3bb9846536b63e71c4d1))



## [1.0.4](https://github.com/bytedance/xgplayer/compare/v1.0.3...v1.0.4) (2018-07-05)



## [1.0.3](https://github.com/bytedance/xgplayer/compare/83bc3a40ab78a1ba48e2e40f4352fd3de40a615f...v1.0.3) (2018-07-05)


### Bug Fixes

* **flv/MainParser:** 解决flv连续seek导致的视频播放错误 ([6f59410](https://github.com/bytedance/xgplayer/commit/6f594109efbdf28fa6595d9c0a4ddb23e953f70d)), closes [#10](https://github.com/bytedance/xgplayer/issues/10)
* **xgplayer/[control/makeBullet.js,style/player.scss]:** 修改弹幕对播放器交互影响 ([ec759bf](https://github.com/bytedance/xgplayer/commit/ec759bf5172c47b4eacc4ccaaed84bb6fe5d4eef))


### Features

* **flv/config:** 增加flv.js的配置项支持，增加cors选项 ([de17ec5](https://github.com/bytedance/xgplayer/commit/de17ec5773a39d6b6c7effec35d7ba8c0687fb91))
* **flv/src/[index.js, Flv.js]:** flv代码重构 ([1f3e48b](https://github.com/bytedance/xgplayer/commit/1f3e48b9eaec449a28d080c02ca33dd29c027af8))
* **gitignore:** remove .DS_Store ([83bc3a4](https://github.com/bytedance/xgplayer/commit/83bc3a40ab78a1ba48e2e40f4352fd3de40a615f))
* **xgplayer/control/[progress.js,makeBullet.js]:** 播放器增加预览和弹幕功能 ([09034dd](https://github.com/bytedance/xgplayer/commit/09034ddd34fc19c65cdb668b10b9010a3708972f)), closes [#11](https://github.com/bytedance/xgplayer/issues/11)


### BREAKING CHANGES

* **xgplayer/control/[progress.js,makeBullet.js]:** 播放器增加预览和弹幕功能
