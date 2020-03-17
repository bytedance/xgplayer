"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fixedFloat = function fixedFloat(num, fixed) {
  return Number.parseFloat(Number(num).toFixed(fixed));
};
exports.default = {
  fixedFloat: fixedFloat
};