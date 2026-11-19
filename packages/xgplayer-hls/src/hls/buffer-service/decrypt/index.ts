import { concatUint8Array } from 'xgplayer-streaming-shared'

interface LegacyCrypto extends Crypto {
  webkitSubtle?: SubtleCrypto
}

interface LegacyWindow extends Window {
  msCrypto?: LegacyCrypto
}

interface SegmentData {
  data: Uint8Array
  map?: Uint8Array
}

type EncryptedSegment = SegmentData &
  ({ key: BufferSource; keyIv: BufferSource } | { key?: undefined; keyIv?: undefined })

function toBufferSource(data: Uint8Array): Uint8Array<ArrayBuffer> {
  if (data.buffer instanceof ArrayBuffer) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
  }
  return new Uint8Array(data)
}

export interface IExternalDecryptor {
  decrypt(data: Uint8Array, key: BufferSource, iv: BufferSource): Promise<Uint8Array>
  destroy?(): void
}

export class Decryptor {
  subtle: SubtleCrypto | undefined
  externalDecryptor: IExternalDecryptor | null = null

  constructor() {
    const crypto =
      (window.crypto as LegacyCrypto | undefined) || (window as LegacyWindow).msCrypto
    this.subtle = crypto && (crypto.subtle || crypto.webkitSubtle)
  }

  destroy() {
    if (this.externalDecryptor?.destroy) {
      this.externalDecryptor.destroy()
    }
  }

  decrypt(
    video?: EncryptedSegment,
    audio?: EncryptedSegment
  ): Promise<Array<Uint8Array | undefined>> | undefined {
    if (!video && !audio) return
    const ret: Array<Promise<Uint8Array> | undefined> = []
    if (video) {
      ret[0] = this._decryptSegment(video)
    }
    if (audio) {
      ret[1] = this._decryptSegment(audio)
    }
    return Promise.all(ret)
  }

  async _decryptSegment(seg: EncryptedSegment): Promise<Uint8Array> {
    let data = seg.data
    if (seg.key) {
      data = await this._decryptData(seg.data, seg.key, seg.keyIv)
    }
    if (!seg.map) return data
    const result = concatUint8Array(seg.map, data)
    if (!result) throw new Error('failed to concatenate decrypted segment')
    return result
  }

  async _decryptData(
    data: Uint8Array,
    key: BufferSource,
    iv: BufferSource
  ): Promise<Uint8Array> {
    if (this.externalDecryptor) {
      return await this.externalDecryptor.decrypt(data, key, iv)
    } else {
      if (!this.subtle) throw new Error('crypto is not defined')
      const aesKey = await this.subtle.importKey('raw', key, { name: 'AES-CBC' }, false, [
        'encrypt',
        'decrypt'
      ])
      return new Uint8Array(
        await this.subtle.decrypt({ name: 'AES-CBC', iv }, aesKey, toBufferSource(data))
      )
    }
  }
}
