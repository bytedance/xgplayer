"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var usePreset = exports.usePreset = function usePreset(player, Preset) {
  var _player$config$plugin, _player$config$ignore;

  var presetInst = void 0;
  if (Preset.preset && Preset.options) {
    // eslint-disable-next-line new-cap
    presetInst = new Preset.preset(Preset.options, player.config);
  } else {
    presetInst = new Preset({}, player.config);
  }
  var _presetInst = presetInst,
      plugins = _presetInst.plugins,
      ignores = _presetInst.ignores,
      icons = _presetInst.icons;

  if (!player.config.plugins) {
    player.config.plugins = [];
  }

  if (!player.config.ignores) {
    player.config.ignores = [];
  }

  (_player$config$plugin = player.config.plugins).push.apply(_player$config$plugin, _toConsumableArray(plugins));
  (_player$config$ignore = player.config.ignores).push.apply(_player$config$ignore, _toConsumableArray(ignores));
  player.config.icons = icons;
};