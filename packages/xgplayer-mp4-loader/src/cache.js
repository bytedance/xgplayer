export class Cache {
  _data = Object.create(null)

  set (id, data) {
    this._data[id] = data
  }

  get (id) {
    return this._data[id]
  }

  clear () {
    this._data = Object.create(null)
  }
}
