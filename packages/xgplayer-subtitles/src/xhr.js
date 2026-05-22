class XHR {
  constructor ({ url, method = 'GET', type = 'arraybuffer', timeout = 10000, data = {} } = {}, context = {}) {
    return new Promise((resolve, reject) => {
      const R = new window.XMLHttpRequest()
      const _method = method.toUpperCase()
      const _data = []
      if (type) {
        R.responseType = type
      }
      if (timeout) {
        R.timeout = timeout
      }
      Object.keys(data).forEach(k => {
        _data.push(`k=${data[k]}`)
      })
      R.onload = () => {
        if (R.status === 200 || R.status === 206) {
          resolve({ context, res: R })
        } else {
          reject(new Error({ context, res: R, type: 'error' }))
        }
      }
      R.onerror = e => {
        reject(new Error({ context, res: R, type: 'error' }))
      }
      R.ontimeout = e => {
        reject(new Error({ context, res: R, type: 'error' }))
      }
      R.onabort = () => {
        reject(new Error({ context, res: R, type: 'error' }))
      }

      if (_method === 'GET') {
        // R.withCredentials = true;
        R.open(_method, `${url}`)
        R.send()
      } else if (_method === 'post') {
        R.open(_method, url)
        R.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        R.send(_data.join('&'))
      } else {
        throw new Error(`xhr ${_method} is not supported`)
      }
    })
  }
}

export default XHR
