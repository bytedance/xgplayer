export class TransferCost {
  _ttfb = 0

  _demuxStart = 0
  _demuxEnd = 0
  _demuxCost = 0

  _remuxStart = 0
  _remuxEnd = 0
  _remuxCost = 0

  _appendStart = 0
  _appendEnd = 0
  _appendCost = 0

  set (event, value) {
    this[`_${event}`] = value
  }

  start (event){
    this[`_${event}Start`] = Date.now()
  }

  end (event){
    this[`_${event}End`] = Date.now()
    this[`_${event}Cost`] = this[`_${event}Cost`] + (this[`_${event}End`] - this[`_${event}Start`])
  }

  get transferCost (){
    return {
      ttfbCost: this._ttfb,
      demuxCost: this._demuxCost,
      remuxCost: this._remuxCost,
      appendCost: this._appendCost
    }
  }
}

export const TRANSFER_EVENT = {
  TTFB: 'ttfb',
  DEMUX: 'demux',
  REMUX: 'remux',
  APPEND: 'append'
}
