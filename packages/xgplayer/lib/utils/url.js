'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAbsoluteURL = exports.getAbsoluteURL = function getAbsoluteURL(url) {
  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    var div = document.createElement('div');
    div.innerHTML = '<a href="' + url + '">x</a>';
    url = div.firstChild.href;
  }
  return url;
};