import util from './index'
const isSupport = _isLocalStorageUsable()
export const openLog = checkOpenLog()
export const openTestLog = checkTestOpenLog()
function probeSupport () {
  try {
    return (
      typeof localStorage !== 'undefined' &&
            'setItem' in window.localStorage &&
            !!window.localStorage.setItem
    )
  } catch (e) {
    return false
  }
}

function checkIfLocalStorageThrows () {
  const localStorageTestKey = '_localstorage_support_test'

  try {
    window.localStorage.setItem(localStorageTestKey, true)
    window.localStorage.removeItem(localStorageTestKey)
    return false
  } catch (e) {
    return true
  }
}

export function checkOpenLog () {
  if (isSupport) {
    try {
      return !!window.localStorage.getItem('playerlog')
    } catch (e) {
      return false
    }
  }
  return false
}

function _isLocalStorageUsable () {
  return probeSupport() && !checkIfLocalStorageThrows()
}

export function log ( message, ...optionalParams) {
  openLog && console.log && console.log('[logger]', util.nowTime(), message, ...optionalParams)
}

export function checkTestOpenLog () {
  if (isSupport) {
    try {
      return !!window.localStorage.getItem('playertestlog')
    } catch (e) {
      return false
    }
  }
  return false
}


