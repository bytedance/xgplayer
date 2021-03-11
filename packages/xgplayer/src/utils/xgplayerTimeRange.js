export default class XgplayerTimeRange {
    constructor(bufferedList) {
        this.bufferedList = bufferedList
    }

    start (index) {
      return this.bufferedList[index].start
    }

    end (index) {
        return this.bufferedList[index].end
    }

    get length () {
        return this.bufferedList.length
    }
}
