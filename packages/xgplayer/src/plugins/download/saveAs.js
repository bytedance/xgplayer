// Refactored from download.js，to support custom request headers, cookies, etc.
//
// download.js copyright:
// Copyright (c) 2013-2023 RNDme
// https://github.com/rndme/download
// MIT License
// https://github.com/rndme/download/blob/master/LICENSE

import Sniffer from '../../utils/sniffer'

/**
 * Enhanced saveAs function with authentication support
 * @typedef {Object} SaveAsOptions
 * @property {string} [fileName] - The name of the file to save
 * @property {string} [mimeType] - The MIME type of the file
 * @property {Object} [headers] - Custom headers for the request
 * @property {boolean} [withCredentials] - Whether to send cookies with the request
 * @property {number} [timeout] - Request timeout in milliseconds
 * @property {Function} [beforeRequest] - Function to call before the request is made
 */

/**
 * Default configuration for saveAs
 */
const DEFAULT_CONFIG = {
  mimeType: 'application/octet-stream', // this default mime also triggers iframe downloads
  fileName: 'download',
  timeout: 30000
}

/**
 * Browser detection utilities
 */
const BrowserUtils = {
  /**
   * Check if the browser supports Blob
   */
  supportsBlob () {
    return typeof Blob !== 'undefined'
  },

  /**
   * Check if the browser supports URL.createObjectURL
   */
  supportsObjectURL () {
    return typeof URL !== 'undefined' && URL.createObjectURL
  },

  /**
   * Check if the browser is Safari
   */
  isSafari () {
    return Sniffer.browser === 'safari'
  },

  /**
   * Check if the browser is IE and supports msSaveBlob
   */
  isIEWithMsSaveBlob () {
    return navigator.msSaveBlob
  },

  /**
   * Check if the browser supports HTML5 download attribute
   */
  supportsDownloadAttribute () {
    const anchor = document.createElement('a')
    return 'download' in anchor
  }
}

/**
 * Data URL utilities
 */
const DataURLUtils = {
  /**
   * Check if a string is a data URL
   */
  isDataURL (str) {
    return /^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(str)
  },

  /**
   * Convert data URL to Blob
   */
  dataURLToBlob (dataURL) {
    const parts = dataURL.split(/[:;,]/)
    const type = parts[1]
    const indexDecoder = dataURL.indexOf('charset') > 0 ? 3 : 2
    const decoder = parts[indexDecoder] === 'base64' ? atob : decodeURIComponent
    const binData = decoder(parts.pop())
    const uiArr = new Uint8Array(binData.length)

    for (let i = 0; i < binData.length; i++) {
      uiArr[i] = binData.charCodeAt(i)
    }

    // Use compatible Blob constructor
    const BlobConstructor = window.Blob || window.MozBlob || window.WebKitBlob || function (parts, opts) {
      return parts
    }
    return new BlobConstructor([uiArr], { type })
  },

  /**
   * Check if string contains non-ASCII characters
   */
  hasNonASCII (str) {
    return /([\x80-\xff])/.test(str)
  },

  /**
   * Convert string with non-ASCII characters to Uint8Array
   */
  stringToUint8Array (str) {
    const arr = new Uint8Array(str.length)
    for (let i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i)
    }
    return arr
  }
}

/**
 * File download utilities
 */
const DownloadUtils = {
  /**
   * Create and trigger download using HTML5 download attribute
   */
  downloadWithAnchor (url, fileName) {
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.setAttribute('download', fileName)
    anchor.className = 'download-js-link'
    anchor.innerHTML = 'downloading...'
    anchor.style.display = 'none'

    // Add click event listener to prevent event bubbling
    const clickHandler = function (e) {
      e.stopPropagation()
      this.removeEventListener('click', clickHandler)
    }
    anchor.addEventListener('click', clickHandler)

    document.body.appendChild(anchor)

    setTimeout(() => {
      anchor.click()
      document.body.removeChild(anchor)
      // Clean up object URL after a short delay
      if (url.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(url), 250)
      }
    }, 66)

    return true
  },

  /**
   * Handle Safari download (fallback method)
   */
  downloadWithSafari (url, fileName) {
    // Convert Blob to data URL if needed
    if (url instanceof Blob) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataURL = e.target.result
        DownloadUtils.downloadWithSafari(dataURL, fileName)
      }
      reader.readAsDataURL(url)
      return true
    }

    if (DataURLUtils.isDataURL(url)) {
      url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, DEFAULT_CONFIG.mimeType)
    }

    if (!window.open(url)) {
      const confirmed = confirm(
        'Displaying New Document\n\nUse Save As... to download, then click back to return to this page.'
      )
      if (confirmed) {
        location.href = url
      }
    }

    return true
  },

  /**
   * Download using iframe (legacy browsers)
   */
  downloadWithIframe (url, fileName) {
    // Convert Blob to data URL if needed
    if (url instanceof Blob) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataURL = e.target.result
        DownloadUtils.downloadWithIframe(dataURL, fileName)
      }
      reader.readAsDataURL(url)
      return true
    }

    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)

    if (DataURLUtils.isDataURL(url)) {
      url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, DEFAULT_CONFIG.mimeType)
    }

    iframe.src = url
    setTimeout(() => document.body.removeChild(iframe), 333)

    return true
  }
}

/**
 * HTTP request utilities
 */
const RequestUtils = {
  /**
   * Create XMLHttpRequest with authentication support
   */
  createRequest (url, options = {}) {
    const xhr = new XMLHttpRequest()

    // Set timeout
    if (options.timeout) {
      xhr.timeout = options.timeout
    }

    // Set credentials
    if (typeof options.withCredentials === 'boolean') {
      xhr.withCredentials = options.withCredentials
    }

    return xhr
  },

  /**
   * Set custom headers on XMLHttpRequest
   */
  setHeaders (xhr, headers = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value)
    })
  },

  /**
   * Download file from URL with authentication
   */
  downloadFromURL (url, fileName, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = RequestUtils.createRequest(url, options)

      xhr.open('GET', url, true)
      xhr.responseType = 'blob'

      // Set custom headers
      if (options.headers) {
        RequestUtils.setHeaders(xhr, options.headers)
      }

      if (options.withCredentials) {
        xhr.withCredentials = true
      }

      xhr.onload = function (e) {
        if (e.target.status === 200) {
          saveAs(e.target.response, fileName, options.mimeType || DEFAULT_CONFIG.mimeType)
          resolve(e.target.response)
        } else {
          reject(new Error(`HTTP ${e.target.status}: ${e.target.statusText}`))
        }
      }

      xhr.onerror = function () {
        reject(new Error('Network error occurred'))
      }

      xhr.ontimeout = function () {
        reject(new Error('Request timeout'))
      }

      if (options.beforeRequest) {
        options.beforeRequest(xhr)
      }

      // Use setTimeout to allow setting custom headers
      setTimeout(() => xhr.send(), 0)
    })
  }
}

/**
 * Main saveAs function
 * @param {string|Blob|ArrayBuffer} data - The data to save or URL to download
 * @param {string|SaveAsOptions} [fileNameOrOptions] - File name or options object
 * @param {string} [mimeType] - MIME type (used when fileNameOrOptions is string)
 * @returns {boolean|Promise} - Returns true for immediate downloads, Promise for async downloads
 */
export function saveAs (data, fileNameOrOptions, mimeType) {
  // Handle different parameter patterns
  let options = {}
  let fileName = DEFAULT_CONFIG.fileName
  let actualMimeType = DEFAULT_CONFIG.mimeType

  if (typeof fileNameOrOptions === 'string') {
    // Legacy API: saveAs(data, fileName, mimeType)
    fileName = fileNameOrOptions || DEFAULT_CONFIG.fileName
    actualMimeType = mimeType || DEFAULT_CONFIG.mimeType
  } else if (typeof fileNameOrOptions === 'object' && fileNameOrOptions !== null) {
    // New API: saveAs(data, options)
    options = { ...DEFAULT_CONFIG, ...fileNameOrOptions }
    fileName = options.fileName || DEFAULT_CONFIG.fileName
    actualMimeType = options.mimeType || DEFAULT_CONFIG.mimeType
  }

  // Handle reverse arguments pattern (legacy support)
  if (String(this) === 'true') {
    const temp = data
    data = fileNameOrOptions
    fileNameOrOptions = temp
    actualMimeType = mimeType || DEFAULT_CONFIG.mimeType
  }

  // Handle URL downloads
  if (typeof data === 'string' && !fileNameOrOptions && !mimeType && data.length < 2048) {
    const url = data
    const extractedFileName = url.split('/').pop().split('?')[0]
    fileName = extractedFileName || DEFAULT_CONFIG.fileName

    // Check if it's a valid URL
    const anchor = document.createElement('a')
    anchor.href = url
    if (anchor.href.indexOf(url) !== -1) {
      return RequestUtils.downloadFromURL(url, fileName, options)
    }
  }

  // Handle data URLs
  if (DataURLUtils.isDataURL(data)) {
    if (data.length > 1024 * 1024 * 1.999 && BrowserUtils.supportsBlob()) {
      const blob = DataURLUtils.dataURLToBlob(data)
      actualMimeType = blob.type || actualMimeType
      return saveAs(blob, fileName, actualMimeType)
    } else {
      return BrowserUtils.isIEWithMsSaveBlob()
        ? navigator.msSaveBlob(DataURLUtils.dataURLToBlob(data), fileName)
        : DownloadUtils.downloadWithAnchor(data, fileName)
    }
  }

  // Handle string data with non-ASCII characters
  if (typeof data === 'string' && DataURLUtils.hasNonASCII(data)) {
    const uint8Array = DataURLUtils.stringToUint8Array(data)
    const BlobConstructor = window.Blob || window.MozBlob || window.WebKitBlob || function (parts, opts) {
      return parts
    }
    data = new BlobConstructor([uint8Array], { type: actualMimeType })
  }

  // Ensure data is a Blob with proper constructor fallback
  let blob
  if (data instanceof Blob) {
    blob = data
  } else {
    // Handle different Blob constructors for compatibility
    const BlobConstructor = window.Blob || window.MozBlob || window.WebKitBlob || function (parts, opts) {
      return parts
    }
    blob = new BlobConstructor([data], { type: actualMimeType })
  }

  // Handle IE with msSaveBlob
  if (BrowserUtils.isIEWithMsSaveBlob()) {
    return navigator.msSaveBlob(blob, fileName)
  }

  // Handle modern browsers with URL.createObjectURL
  if (BrowserUtils.supportsObjectURL()) {
    const objectURL = URL.createObjectURL(blob)
    return DownloadUtils.downloadWithAnchor(objectURL, fileName)
  }

  // Handle Safari fallback
  if (BrowserUtils.isSafari()) {
    return DownloadUtils.downloadWithSafari(blob, fileName)
  }

  // Handle browsers without URL support
  if (typeof blob === 'string' || blob.constructor === String) {
    try {
      const dataURL = 'data:' + actualMimeType + ';base64,' + btoa(blob)
      return DownloadUtils.downloadWithAnchor(dataURL, fileName)
    } catch (e) {
      const dataURL = 'data:' + actualMimeType + ',' + encodeURIComponent(blob)
      return DownloadUtils.downloadWithAnchor(dataURL, fileName)
    }
  }

  // Handle Blob without URL support using FileReader
  const reader = new FileReader()
  reader.onload = function (e) {
    DownloadUtils.downloadWithAnchor(e.target.result, fileName)
  }
  reader.readAsDataURL(blob)

  // Fallback to iframe for legacy browsers
  return DownloadUtils.downloadWithIframe(blob, fileName)
}

/**
 * Enhanced saveAs with authentication support
 * @param {string} url - URL to download from
 * @param {SaveAsOptions} options - Download options including authentication
 * @returns {Promise<Blob>} - Promise that resolves with the downloaded blob
 */
export function saveAsWithAuth (url, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options }
  const fileName = config.fileName || url.split('/').pop().split('?')[0] || 'download'

  return RequestUtils.downloadFromURL(url, fileName, config)
}
