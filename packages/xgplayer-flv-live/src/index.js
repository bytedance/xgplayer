
const Tag = 'FLVLiveController'

class FlvLiveController {
  constructor () {
    this.TAG = Tag
  }
}

export default (context) => {
  context.registry(Tag, FlvLiveController)
}
