export default class MediaSegmentList {
  constructor(type) {
    this._type = type;
    this._list = [];
    this._lastAppendLocation = -1; // cached last insert location
  }

  get type() {
    return this._type;
  }

  get length() {
    return this._list.length;
  }

  isEmpty() {
    return this._list.length === 0;
  }

  clear() {
    this._list = [];
    this._lastAppendLocation = -1;
  }

  _searchNearestSegmentBefore(beginDts) {
    let list = this._list;

    if (list.length === 0) {
      return -2;
    }

    let last = list.length - 1;
    let mid = 0;
    let lbound = 0;
    let ubound = last;
    let idx = 0;

    if (beginDts < list[0].originDts) {
      idx = -1;
      return idx;
    }

    while (lbound <= ubound) {
      mid = lbound + Math.floor((ubound - lbound) / 2);

      if (mid === last || beginDts > list[mid].lastSample.originDts && beginDts < list[mid + 1].originDts) {
        idx = mid;
        break;
      } else if (list[mid].originDts < beginDts) {
        lbound = mid + 1;
      } else {
        ubound = mid - 1;
      }
    }

    return idx;
  }

  _searchNearestSegmentAfter(beginDts) {
    return this._searchNearestSegmentBefore(beginDts) + 1;
  }

  append(segment) {
    let list = this._list;
    let lastAppendIdx = this._lastAppendLocation;
    let insertIdx = 0;

    if (lastAppendIdx !== -1 && lastAppendIdx < list.length && segment.originStartDts >= list[lastAppendIdx].lastSample.originDts && (lastAppendIdx === list.length - 1 || lastAppendIdx < list.length - 1 && segment.originStartDts < list[lastAppendIdx + 1].originStartDts)) {
      insertIdx = lastAppendIdx + 1; // use cached location idx
    } else {
      if (list.length > 0) {
        insertIdx = this._searchNearestSegmentBefore(segment.originStartDts) + 1;
      }
    }

    this._lastAppendLocation = insertIdx;

    this._list.splice(insertIdx, 0, segment);
  }

  getLastSegmentBefore(beginDts) {
    let idx = this._searchNearestSegmentBefore(beginDts);

    if (idx >= 0) {
      return this._list[idx];
    } else {
      // -1
      return null;
    }
  }

  getLastSampleBefore(beginDts) {
    let segment = this.getLastSegmentBefore(beginDts);

    if (segment !== null) {
      return segment.lastSample;
    } else {
      return null;
    }
  }

  getLastRAPBefore(beginDts) {
    let segmentIdx = this._searchNearestSegmentBefore(beginDts);

    let randomAccessPoints = this._list[segmentIdx].randomAccessPoints;

    while (randomAccessPoints.length === 0 && segmentIdx > 0) {
      segmentIdx--;
      randomAccessPoints = this._list[segmentIdx].randomAccessPoints;
    }

    if (randomAccessPoints.length > 0) {
      return randomAccessPoints[randomAccessPoints.length - 1];
    } else {
      return null;
    }
  }

}