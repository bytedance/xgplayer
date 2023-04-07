
export function durationConvert (value) {
  let Hours = 0
  let Minutes = 0
  let Seconds = 0
  value = value.slice(value.indexOf('PT') + 2)
  if (value.indexOf('H') > -1 && value.indexOf('M') > -1 && value.indexOf('S') > -1) {
    Hours = parseFloat(value.slice(0, value.indexOf('H')))
    Minutes = parseFloat(value.slice(value.indexOf('H') + 1, value.indexOf('M')))
    Seconds = parseFloat(value.slice(value.indexOf('M') + 1, value.indexOf('S')))
  } else if (value.indexOf('H') < 0 && value.indexOf('M') > 0 && value.indexOf('S') > -1) {
    Minutes = parseFloat(value.slice(0, value.indexOf('M')))
    Seconds = parseFloat(value.slice(value.indexOf('M') + 1, value.indexOf('S')))
  } else if (value.indexOf('H') < 0 && value.indexOf('M') < 0 && value.indexOf('S') > -1) {
    Seconds = parseFloat(value.slice(0, value.indexOf('S')))
  }
  return Hours * 3600 + Minutes * 60 + Seconds
}

export function timeToSecond (str) {
  return new Date(str).valueOf()
}

export function isAudio (type) {
  return type.indexOf('audio') > -1
}

export function isVideo (type) {
  return type.indexOf('video') > -1
}
