import Player from '../player'

let i18n = function () {
  let player = this; let lang = {}; let util = player.constructor.util
  lang.en = {
    HAVE_NOTHING: 'There is no information on whether audio/video is ready',
    HAVE_METADATA: 'Audio/video metadata is ready ',
    HAVE_CURRENT_DATA: 'Data about the current play location is available, but there is not enough data to play the next frame/millisecond',
    HAVE_FUTURE_DATA: 'Current and at least one frame of data is available',
    HAVE_ENOUGH_DATA: 'The available data is sufficient to start playing',
    NETWORK_EMPTY: 'Audio/video has not been initialized',
    NETWORK_IDLE: 'Audio/video is active and has been selected for resources, but no network is used',
    NETWORK_LOADING: 'The browser is downloading the data',
    NETWORK_NO_SOURCE: 'No audio/video source was found',
    MEDIA_ERR_ABORTED: 'The fetch process is aborted by the user',
    MEDIA_ERR_NETWORK: 'An error occurred while downloading',
    MEDIA_ERR_DECODE: 'An error occurred while decoding',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Audio/video is not supported',
    REPLAY: 'Replay',
    ERROR: 'Network is offline',
    PLAY_TIPS: 'Play',
    PAUSE_TIPS: 'Pause',
    PLAYNEXT_TIPS: 'Play next',
    DOWNLOAD_TIPS: 'Download',
    ROTATE_TIPS: 'Rotate',
    RELOAD_TIPS: 'Reload',
    FULLSCREEN_TIPS: "Fullscreen",
    EXITFULLSCREEN_TIPS: 'Exit fullscreen',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'Exit cssfullscreen',
    TEXTTRACK: 'Caption',
    PIP: 'Pip',
    SCREENSHOT: 'Screenshot'
  }
  lang['zh-cn'] = {
    HAVE_NOTHING: '没有关于音频/视频是否就绪的信息',
    HAVE_METADATA: '音频/视频的元数据已就绪',
    HAVE_CURRENT_DATA: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒',
    HAVE_FUTURE_DATA: '当前及至少下一帧的数据是可用的',
    HAVE_ENOUGH_DATA: '可用数据足以开始播放',
    NETWORK_EMPTY: '音频/视频尚未初始化',
    NETWORK_IDLE: '音频/视频是活动的且已选取资源，但并未使用网络',
    NETWORK_LOADING: '浏览器正在下载数据',
    NETWORK_NO_SOURCE: '未找到音频/视频来源',
    MEDIA_ERR_ABORTED: '取回过程被用户中止',
    MEDIA_ERR_NETWORK: '当下载时发生错误',
    MEDIA_ERR_DECODE: '当解码时发生错误',
    MEDIA_ERR_SRC_NOT_SUPPORTED: '不支持的音频/视频格式',
    REPLAY: '重播',
    ERROR: '网络连接似乎出现了问题',
    PLAY_TIPS: '播放',
    PAUSE_TIPS: '暂停',
    PLAYNEXT_TIPS: '下一集',
    DOWNLOAD_TIPS: '下载',
    ROTATE_TIPS: '旋转',
    RELOAD_TIPS: '重新载入',
    FULLSCREEN_TIPS: "进入全屏",
    EXITFULLSCREEN_TIPS: '退出全屏',
    CSSFULLSCREEN_TIPS: '进入样式全屏',
    EXITCSSFULLSCREEN_TIPS: '退出样式全屏',
    TEXTTRACK: '字幕',
    PIP: '画中画',
    SCREENSHOT: '截图'
  }
  lang['jp'] = {
    HAVE_NOTHING: 'オーディオ/ビデオが準備できているか情報がありません',
    HAVE_METADATA: 'オーディオ/ビデオのメタデータは準備できています',
    HAVE_CURRENT_DATA: '現在の再生位置に関するデータは利用可能ですが、次のフレーム/ミリ秒を再生するのに十分なデータがありません',
    HAVE_FUTURE_DATA: '現在、少なくとも次のフレームのデータが利用可能です',
    HAVE_ENOUGH_DATA: '利用可能なデータは再生を開始するのに十分です',
    NETWORK_EMPTY: 'オーディオ/ビデオが初期化されていません',
    NETWORK_IDLE: 'オーディオ/ビデオはアクティブでリソースが選択されていますが、ネットワークが使用されていません',
    NETWORK_LOADING: 'ブラウザーはデータをダウンロードしています',
    NETWORK_NO_SOURCE: 'オーディオ/ビデオ のソースが見つかりません',
    MEDIA_ERR_ABORTED: 'ユーザーによってフェッチプロセスが中止されました',
    MEDIA_ERR_NETWORK: 'ダウンロード中にエラーが発生しました',
    MEDIA_ERR_DECODE: 'デコード中にエラーが発生しました',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'オーディオ/ビデオ の形式がサポートされていません',
    REPLAY: 'リプレイ',
    ERROR: 'ネットワークの接続に問題が発生しました',
    PLAY_TIPS: 'プレイ',
    PAUSE_TIPS: '一時停止',
    PLAYNEXT_TIPS: '次をプレイ',
    DOWNLOAD_TIPS: 'ダウンロード',
    ROTATE_TIPS: '回転',
    RELOAD_TIPS: '再読み込み',
    FULLSCREEN_TIPS: "フルスクリーン",
    EXITFULLSCREEN_TIPS: 'フルスクリーンを終了',
    CSSFULLSCREEN_TIPS: 'シアターモード',
    EXITCSSFULLSCREEN_TIPS: 'シアターモードを終了',
    TEXTTRACK: '字幕',
    PIP: 'ミニプレーヤー',
    SCREENSHOT: 'スクリーンショット'
  }

  Object.defineProperty(player, 'lang', {
    get: function () {
      if (player.config) {
        return lang[player.config.lang] || lang['en']
      } else {
        return lang['en']
      }
    },
    set: function (value) {
      if (util.typeOf(value) === 'Object') {
        Object.keys(value).forEach(key => {
          lang[key] = value[key]
        })
      }
    }
  })

}

Player.install('i18n', i18n)
