import { concatUint8Array } from 'xgplayer-streaming-shared'

/**
 * @interface
 */
export class IExternalDecryptor {
  /**
   * @param {Uint8Array} data
   * @param {BufferSource} key
   * @param {BufferSource} iv
   * @returns {Promise.<Uint8Array>}
   */
  async decrypt (data, key, iv) {}
}

export class Decryptor {
  constructor () {
    const crypto = window.crypto || window.msCrypto
    this.subtle = crypto && (crypto.subtle || crypto.webkitSubtle)

    /**
     * @type {IExternalDecryptor}
     */
    this.externalDecryptor = null
  }

  decrypt (video, audio) {
    if (!video && !audio) return
    const ret = []
    if (video) {
      ret[0] = this._decryptSegment(video)
    }
    if (audio) {
      ret[1] = this._decryptSegment(audio)
    }
    return Promise.all(ret)
  }

  async _decryptSegment (seg) {
    let data = seg.data
    if (seg.key) {
      data = await this._decryptData(seg.data, seg.key, seg.keyIv)
    }
    if (!seg.map) return data
    return concatUint8Array(seg.map, data)
  }

  async _decryptData (data, key, iv) {
    if (this.externalDecryptor) {
      return await this.externalDecryptor.decrypt(data, key, iv)
    } else {
      if (!this.subtle) throw new Error('crypto is not defined')
      const aesKey = await this.subtle.importKey('raw', key, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt'])
      return new Uint8Array(
        await this.subtle.decrypt({ name: 'AES-CBC', iv }, aesKey, data)
      )
    }
  }
}
