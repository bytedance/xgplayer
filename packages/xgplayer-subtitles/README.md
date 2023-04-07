### Introduction
   外挂字幕组件，目前支持vtt格式的解析

### Start

1. Install

    ```
    $ npm install xgplayer-subtitles
    ```

2. Usage

    Step 1:

    ```html
    <div id="vs"></div>
    ```
    Step 2:

    ```js
    import Player from 'xgplayer';

    const player = new Player({
        id: 'vs',
        url: ''
    })

    const options = {
       player: player, // 可选, 如果初始化的时候已经有播放器实例
       subTitles: [{              //必选 字幕信息
         label: '中文',
         language : '',          //必选
         id: 'cn',               //必选
         isDefault: false,       //必选 是否是默认字幕
         url: './subtitle/cn.vtt' //必选 字幕链接地址
        }, {
          label: '英文',
          url: './subtitle/en.vtt',
          id: 'en',
          isDefault: true,
          language: 'en'
        }],
        domRender: true, // 默认为true，会创建dom自行渲染，如果配置为false则只触发更新事件, 不做dom更新
        defaultOpen: false, // 是否默认开启字幕
        mode: 'bg', //可选 字幕显示模式，支持bg(背景）和 stroke(字体边框填充)，默认stroke
        line: 'double' // 可选 字幕最大显示行数 默认单行，single, 支持single/double/three,
      }
    const subTitle = new window.XgSubtitle(options)
    // 如果在初始化的时候播放器还没有播放器实例，也可以使用以下挂载播放器

    subTitle.attachPlayer(player)

    ```
### config
```javascript
{
    // 关联的播放器实例,可以为空,初始化完成之后调用 subTitle.attachPlayer(player)在做关联
    player: any,
    // 可使用的字幕列表，
    subTitles: [{
        label?: any,          // 可选，当前字幕显示的标签文案
        language: any,        //必选, 当前字幕对应的语言,language和id必选其一
        id: any,              //必选, 当前字幕对应的id,language和id必选其一
        isDefault: boolean,   //必选 是否是默认字幕
        url: string           //必选 字幕链接地址
      },
      ...
    ],

    // 默认为true,会创建dom进行字幕渲染，如果配置为false则只触发更新事件, 不做dom渲染
    domRender: boolean,

    // 是否默认开启字幕, 默认为false
    defaultOpen: boolean,

    //可选 字幕显示模式，支持bg(背景）和 stroke(字体边框填充)，默认stroke, 只在domRender为true的时候生效
    mode: string,

     // 可选 字幕最大显示行数 默认单行，single, 支持single/double/three,
    line: string
}

```
### API
#### atttchPlayer(player)
挂载播放器实例

#### detachPlayer(player)
卸载播放器实例

#### destroy
销毁组件

#### switch({id:'', language:''})
切换字幕. id和language只需有一个即可，用户从初始化的字幕列表中选择字幕
```javascript
subtitle.switch({id: 'cn'}).then(() => {
    console.log('切换成功')
}).catch(() => {
    console.log('切换失败')
})
```
切换信息返回说明
```javascript
{
    code: 0, // 切换成功
    msg: 'SUCCESS'
},{
    code: 1, // 下载错误
    msg: 'LOAD_ERROR'
}, {
    code: 2, // 解析错误
    msg: 'PARSER_ERROR'
}, {
    code: 3,  // 格式不支持
    msg: 'FORMAT_NOT_SUPPORTED'
},
{
    code: 4, // id或者语言不存在
    msg: 'ID_OR_LANGUAGE_NOT_EXIST'
}, {
    code: 5, // 参数错误
    msg: 'PARAMETERS_ERROR'
}, {
    code: 6, // 操作中断
    msg: 'ABORT'
}, {
    code: 7, // 未知错误
    msg: 'UNKNOWN'
}
```
#### switchExt({id:'', language:''})
开启附属字幕是，字幕时间戳和switch接口开启的字幕一致，只是文本不一致

#### switchOff()
关闭字幕更新

#### setSubTitles(subTitles, isOpen)
- @param subTitles要更新的字幕列表
- @isOpen boolean 是否默认开启字幕
### 事件
#### update
字幕更新事件

```javascript
subTitle.on('update', data => {
  if (data.length === 0) {
    // todo 清除当前显示的字幕
  } else {
    // todo 更新字幕文案
  }
})
```

