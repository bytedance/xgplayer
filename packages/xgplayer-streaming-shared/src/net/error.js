import { LoaderType } from './types'

export class NetError extends Error {
  retryCount = 0
  isTimeout = false
  loaderType = LoaderType.FETCH
  startTime = 0
  endTime = 0
  options = {}

  constructor (url, request, response, msg) {
    super(msg)
    this.url = url
    this.request = request
    this.response = response
  }
}
