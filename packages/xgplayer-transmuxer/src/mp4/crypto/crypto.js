import { WordArray, Hex } from 'crypto-es/lib/core'
import { CipherParams } from 'crypto-es/lib/cipher-core'
import { AES } from 'crypto-es/lib/aes'
import { CTR } from 'crypto-es/lib/mode-ctr'
import { NoPadding } from 'crypto-es/lib/pad-nopadding'
import { formatIV } from '../../utils'
import Buffer from '../buffer'

const Crypto = {

  decryptWordArray: function (raw, key, iv) {
    const realKey = Hex.parse(key)

    const realIV = Hex.parse(formatIV(iv))
    const message = WordArray.create(new Uint8Array(raw))
    const decryptWord = AES.decrypt(
      CipherParams.create({
        ciphertext: message
      }),
      realKey,
      {
        iv: realIV,
        mode: CTR,
        padding: NoPadding
      }
    )
    return Crypto.wordArrayToUint8Array(decryptWord)
  },
  wordArrayToUint8Array: function (wordArray) {
    const l = wordArray.sigBytes
    const words = wordArray.words
    const result = new Uint8Array(l)
    let i = 0
    let j = 0
    while (true) {
      if (i === l) { break }
      const w = words[j++]
      result[i++] = (w & 0xff000000) >>> 24
      if (i === l) { break }
      result[i++] = (w & 0x00ff0000) >>> 16
      if (i === l) { break }
      result[i++] = (w & 0x0000ff00) >>> 8
      if (i === l) { break }
      result[i++] = (w & 0x000000ff)
    }
    return result
  },

  decoderAESCTRData (videoTrack, audioTrack, customDescryptHandler) {
    if (videoTrack.videoSenc) {
      const key = videoTrack.kidValue
      const senc = videoTrack.videoSenc
      videoTrack.samples.forEach((item, index) => {
        const sencBox = senc[index]
        let encodeWord = item.data
        const encodeBuffers = []
        const decodeBuffers = []
        const iv = sencBox.InitializationVector
        if (sencBox.subsamples && sencBox.subsamples.length) {
          sencBox.subsamples.forEach(function (value) {
            const len = value.BytesOfClearData + value.BytesOfProtectedData
            const sampleData = encodeWord.slice(0, len)
            encodeBuffers.push(sampleData.slice(0, value.BytesOfClearData))
            decodeBuffers.push(sampleData.slice(value.BytesOfClearData))
            encodeWord = encodeWord.slice(len)
          })
        } else {
          const len = item.size
          encodeBuffers.push(encodeWord.slice(0, 0))
          decodeBuffers.push(encodeWord.slice(0, len))
          encodeWord = encodeWord.slice(len)
        }
        const tempBuffer = new Buffer()
        tempBuffer.write(...decodeBuffers)
        let decrypted = customDescryptHandler ? customDescryptHandler(tempBuffer.buffer, key, iv) : Crypto.decryptWordArray(tempBuffer.buffer, key, iv)
        const buffer = new Buffer()
        encodeBuffers.forEach((clearDataBuf, i) => {
          const protectedDataLen = decodeBuffers[i].length
          const decodeProtectedData = decrypted.slice(0, protectedDataLen)
          buffer.write(clearDataBuf)
          buffer.write(decodeProtectedData)
          decrypted = decrypted.slice(protectedDataLen)
        })
        videoTrack.samples[index].data = buffer.buffer
      })
    }

    if (audioTrack.audioSenc) {
      const key = audioTrack.kidValue
      const senc = audioTrack.audioSenc
      audioTrack.samples.forEach((item, index) => {
        const sencBox = senc[index]
        const dec = customDescryptHandler ? customDescryptHandler(item.data, key, sencBox.InitializationVector) : Crypto.decryptWordArray(item.data, key, sencBox.InitializationVector)
        audioTrack.samples[index].data = dec
      })
    }
  }
}

export default Crypto
