export class MediaError {
  constructor (msg, data) {
    this.type = 'file'
    this.message = msg
    this.data = data
  }
}
