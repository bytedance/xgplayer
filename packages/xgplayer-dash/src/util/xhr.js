class XHR {
  constructor ({ url, method = 'GET', type = 'arraybuffer', data = {} } = {}) {
    return new Promise((resolve, reject) => {
      const R = new window.XMLHttpRequest()
      const _method = method.toUpperCase()
      const _data = []
      if (type) {
        R.responseType = type
      }
      for (const k in data) {
        _data.push(`k=${data[k]}`)
      }
      if (_method === 'GET') {
        R.open(_method, `${url}?${_data.join('&')}`)
        R.send()
      } else if (_method === 'post') {
        if (url.indexOf('data:application/json;base64') === 0) {
          R.open(_method, url, true)
          R.timeout = 0
          R.withCredentials = false
          R.send(_data)
        } else {
          R.open(_method, url)
          R.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
          R.send(_data.join('&'))
        }
      } else {
        throw new Error(`xhr ${_method} is not supported`)
      }
      R.onload = () => {
        if (R.status === 200 || R.status === 206) {
          resolve(R)
        } else {
          reject(R)
        }
      }
      R.onerror = () => {
        reject(R)
      }
    })
  }
}

export default XHR
