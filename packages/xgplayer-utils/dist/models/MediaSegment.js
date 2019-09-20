"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class MediaSegment {
  constructor() {
    this.startDts = -1;
    this.endDts = -1;
    this.startPts = -1;
    this.endPts = -1;
    this.originStartDts = -1;
    this.originEndDts = -1;
    this.randomAccessPoints = [];
    this.firstSample = null;
    this.lastSample = null;
  }

  addRAP(sample) {
    sample.isRAP = true;
    this.randomAccessPoints.push(sample);
  }

}

exports.default = MediaSegment;