"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Source {
  constructor() {
    this.mimetype = '';
    this.init = null;
    this.data = [];
  }

}

class PreSource {
  constructor() {
    this.sources = {};
  }

  getSource(source) {
    return this.sources[source];
  }

  createSource(name) {
    this.sources[name] = new Source();
    return this.sources[name];
  }

  clear() {
    this.sources = {};
  }

  destroy() {
    this.sources = {};
  }

}

exports.default = PreSource;