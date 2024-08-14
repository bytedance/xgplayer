const VTT_CHECK = /^WEBVTT/
const VTT_STYLE = /^STYLE+$/
// eslint-disable-next-line no-useless-escape
const VTT_CUE = /^\:\:cue/
const VTT_CUEND = /^}+$/
const ASS_CHECK = /^\[Script Info\].*/

// const HTML_REGEX = /<[a-zA-Z]+.*?>([\s\S]*?)<\/[a-zA-Z]*?>/  匹配html标签

// String a1 = "[0-9]{4}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}";//yyyyMMddHHmmss
// String a2 = "[0-9]{4}[0-9]{2}[0-9]{2}";//yyyyMMdd
// String a3 = "[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}";//yyyy-MM-dd HH:mm:ss
// String a4 = "[0-9]{4}-[0-9]{2}-[0-9]{2}";//yyyy-MM-dd
// String a5= "[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}";
// const TIME_REGEX = /[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}-->[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}/

const TIME_REGEX_LIST = [
  /[0-9]{1,3}:[0-9]{2}:[0-9]{2}\.[0-9]{1,3}-->[0-9]{1,3}:[0-9]{2}:[0-9]{2}\.[0-9]{1,3}/,
  /[0-9]{1,3}:[0-9]{2}\.[0-9]{1,3}-->[0-9]{1,3}:[0-9]{2}\.[0-9]{1,3}/,
  /[0-9]{1,2}\.[0-9]{1,3}-->[0-9]{1,2}\.[0-9]{1,3}/
]
// const LANG_REGEX = /^(<?.+?>(([\s\S])*?)<\/?.+?>)$/

const MAX_COUNT = 50

const ASS_FORMAT = /^Format:\s/
const ASS_STYLE = /^Style:\s/
const ASS_DIALOGUE = /^Dialogue:\s/
// const ASS_EVENTS = /^\[Events\]:\s/

function getSecond (arr) {
  const len = arr.length
  if (len === 3) {
    return ((Number(arr[0]) * 60 + Number(arr[1])) * 60 * 1000 + Number(arr[2]) * 1000) / 1000
  } else if (len === 2) {
    return (Number(arr[0]) * 60 * 1000 + Number(arr[1]) * 1000) / 1000
  } else {
    return Number(arr[0])
  }
}

/**
 * 校验是否是数字
 * @param {String} str
 */
function isNumber (str) {
  // eslint-disable-next-line no-useless-escape
  return /^(\-|\+)?\d+(\.\d+)?$/.test(str)
}

/**
 * 对html内容进行转义，避免使用innerHTML的时候出现DOM XSS漏洞
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function htmlEncodeAll (e) {
  return e
  // return null === e ? '' : e.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function getByIndex (i, arr) {
  if (i >= 0 && i < arr.length) {
    return arr[i]
  }
  return ''
}
export default class SubTitleParser {
  /**
   * 解析json数据进行分组
   * @param {Array<{
   *    start: number,
   *    end: number,
   *    text: Array<string>
   * }>} list
   * @returns
   */
  static parseJson (list) {
    const ret = []
    let count = 0
    for (let i = 0; i < list.length; i++) {
      if (count >= MAX_COUNT) {
        count = 0
      }
      if (count === 0) {
        const item = {
          start: list[i].start,
          list: [list[i]],
          end: list[i].end
        }
        ret.push(item)
      } else {
        ret[ret.length - 1].list.push(list[i])
        ret[ret.length - 1].end = list[i].end
      }
      count++
    }
    return ret
  }

  static parse (str, fun) {
    const format = SubTitleParser.checkFormat(str)
    if (!format) {
      fun({ format })
    }
    try {
      let ret = []
      if (format === 'ass') {
        ret = SubTitleParser.parseASS(str)
      } else if (format === 'vtt') {
        ret = SubTitleParser.parseVTT(str)
      }
      fun({ format, list: ret.list, styles: ret.styles })
    } catch (error) {
      console.error(error)
      fun({ format }, error)
    }
  }

  static parseASSItem (str = '', mode = []) {
    const values = str.split(',')
    const item = {}
    let text = ''
    try {
      const len = values.length - mode.length
      if (len > 0) {
        text = values.splice(mode.length - 1, len + 1).join(',') + ''
      } else {
        text = values[values.length - 1] + ''
      }
      text = text.replace(/\\n+/g, '')
      text = htmlEncodeAll(text)
      values[mode.length - 1] = text
      mode.map((key, index) => {
        if (key === 'end' || key === 'start') {
          item[key] = getSecond(values[index].split(':'))
        } else if (key === 'text') {
          item[key] = [values[index]]
        } else if (key === 'layer') {
          item[key] = [values[index]]
          item.textTag = [values[index]]
        } else if (key === 'style') {
          item[key] = [values[index]]
        } else {
          item[key] = Number(values[index]) ? Number(values[index]) : values[index]
        }
      })
      return item
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  static parseASS (str) {
    const arr = str.split('\n')
    const retData = []
    let i = 0; let groupCount = 0
    const styles = []
    let mode = []
    let lastSubTitle = null
    while (i < arr.length) {
      if (ASS_FORMAT.test(arr[i])) {
        mode = arr[i].replace(ASS_FORMAT, '').replace(/\s+/g, '').split(',')
        mode = mode.map(item => {
          return item.toLocaleLowerCase()
        })
      } else if (ASS_STYLE.test(arr[i])) {
        styles.push(arr[i].replace(ASS_STYLE, '').replace(/\s+/g, ''))
      } else if (ASS_DIALOGUE.test(arr[i])) {
        const subTitle = SubTitleParser.parseASSItem(arr[i].replace(ASS_DIALOGUE, ''), mode)
        if (!lastSubTitle || !(subTitle.start === lastSubTitle.start && subTitle.end === lastSubTitle.end)) {
          lastSubTitle = subTitle
          let group = null
          if (groupCount % MAX_COUNT === 0) {
            group = {
              start: lastSubTitle.start,
              end: lastSubTitle.end,
              list: []
            }
            group.list.push(lastSubTitle)
            retData.push(group)
          } else {
            group = retData[retData.length - 1]
            group.end = lastSubTitle.end
            group.list.push(lastSubTitle)
          }
          groupCount++
        } else {
          try {
            const { text, textTag, style } = lastSubTitle
            text.push(subTitle.text[0])
            textTag.push(subTitle.textTag[0])
            style.push(subTitle.style[0])
          } catch (error) {
            console.error(error)
          }
        }
      }
      i++
    }
    return {
      list: retData,
      style: {}
    }
  }

  static parseVTTStyle (str, style) {
    const arr = str.split(':')
    if (arr.length > 1) {
      const keyArr = arr[0].trim().split('-')
      let key = ''
      if (keyArr.length > 1) {
        keyArr.map((item, index) => {
          key += index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1)
        })
      } else {
        key = keyArr[0]
      }
      style[key] = arr[1].trim().replace(/;$/, '')
    }
    return style
  }

  static parseVTT (str) {
    str = str.replace(VTT_CHECK, '')
    const arr = str.split('\n')
    const retData = []
    let i = 0
    let groupCount = 0
    let lastSubTitle = null
    // let lastTime = null
    let isLastSpace = false
    let isCueStart = false
    let styleInfo = null
    let styleHeader = null
    const styles = []
    while (i < arr.length) {
      const str = getByIndex(i, arr).trim()
      if (!str || (isLastSpace && isNumber(str))) {
        isLastSpace = !str
      } else if (VTT_CUE.test(str) && VTT_STYLE.test(getByIndex(i - 1, arr).trim())) {
        isCueStart = true
        const cueMatch = /\((.+?)\)/g.exec(str)
        if (!cueMatch) {
          styleHeader = ''
        } else {
          styleHeader = cueMatch[1]
        }
        styleInfo = ''
      } else if (isCueStart) {
        if (VTT_CUEND.test(str)) {
          styles.push({
            key: styleHeader,
            style: styleInfo
          })
          styleInfo = null
          styleHeader = null
          isCueStart = false
        } else {
          // console.log('parseVTTStyle', str)
          // this.parseVTTStyle(str, styles)
          styleInfo += str
        }
      } else if (str) {
        isLastSpace = false
        const time = this.checkIsTime(arr[i])
        if (time) {
          const subTitle = this.parseVttTime(time)
          if (!lastSubTitle || !(subTitle.start === lastSubTitle.start && subTitle.end === lastSubTitle.end)) {
            lastSubTitle = subTitle
            lastSubTitle.text = []
            lastSubTitle.textTag = []
            let group = null
            if (groupCount % MAX_COUNT === 0) {
              group = {
                start: lastSubTitle.start,
                end: lastSubTitle.end,
                list: []
              }
              group.list.push(lastSubTitle)
              retData.push(group)
            } else {
              group = retData[retData.length - 1]
              group.end = lastSubTitle.end
              group.list.push(lastSubTitle)
            }
            groupCount++
          }
        } else {
          if (lastSubTitle) {
            const { text, textTag } = lastSubTitle
            const ret = this.parseVttText(arr[i])
            /**
                         * 兼容多种方式的多语言字幕
                         * demo1 每个语言独立时间标记
                         * =============================
                         * 00:00:06.470 --> 00:00:06.890
                         * Hello,
                         * 00:00:06.470 --> 00:00:06.890
                         * 你好，
                         * =============================
                         *
                         * demo2 多个语言公用一个时间标记，由尖括号组成的tag包裹
                         * =============================
                         * <cmn-Hans-CN>你好，</cmn-Hans-CN>
                         * <eng-US>hello,</eng-US>
                         * =============================
                         */
            // if (textTag.length === 0 || lastTime || (ret.tag && ret.tag !== textTag[textTag.length - 1])) {
            //   text.push(ret.text)
            //   textTag.push(ret.tag)
            // } else {
            //   text[textTag.length - 1] += ret.text
            // }
            text.push(ret.text)
            textTag.push(ret.tag)
          }
        }
        // lastTime = time
        isLastSpace = false
      }
      i++
      continue
    }
    return {
      list: retData,
      styles: styles
    }
  }

  static checkIsTime (str) {
    str = str.replace(/\s+/g, '')
    let i = 0
    let match = null
    while (i < TIME_REGEX_LIST.length) {
      match = TIME_REGEX_LIST[i].exec(str)
      if (match) {
        break
      }
      i++
    }
    return match ? match[0] : null
  }

  static parseVttText (text) {
    // 检测是否有语言标记包裹
    const langMatch = /^(<?.+?>)/g.exec(text)
    let retText = ''; let tag = 'default'
    if (langMatch) {
      // eslint-disable-next-line no-useless-escape
      tag = langMatch[0].replace(/\<|\>|\&/g, '').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
      // 动态构造语言匹配规则
      // eslint-disable-next-line no-useless-escape
      const newReg = RegExp(`^<${tag}>(([\\s\\S])*?)<\/${tag}>$`)
      const textMatch = newReg.exec(text)
      if (textMatch) {
        retText = textMatch[1]
      } else {
        retText = text
        tag = ''
      }
    } else {
      retText = text
    }
    const tagsReg = /<(\w+).(\w+)>/g
    let re = tagsReg.exec(retText)
    // console.log(' re[0]', re)
    while (re && re.length > 2) {
      // const tags = re[0].split('.')
      retText = retText.replace(re[0], `<${re[1]} class="${re[2]}">`)
      re = tagsReg.exec(retText)
    }
    return {
      tag: tag,
      text: htmlEncodeAll(retText.replace(/\\n+/g, '<br/>'))
    }
  }

  static parseVttTime (str) {
    const arr = str.split('-->')
    let start; let end = 0
    if (arr.length === 2) {
      const aArr = arr[0].split(':')
      const bArr = arr[1].split(':')
      start = getSecond(aArr)
      end = getSecond(bArr)
    }
    return {
      start,
      end,
      time: str
    }
  }

  static isVTT (str) {
    return VTT_CHECK.test(str)
  }

  static isASS (str) {
    return ASS_CHECK.test(str)
  }

  static checkFormat (str) {
    if (!str) {
      return null
    }
    if (VTT_CHECK.test(str)) {
      return 'vtt'
    } else if (ASS_CHECK.test(str)) {
      return 'ass'
    }
    return null
  }
}
