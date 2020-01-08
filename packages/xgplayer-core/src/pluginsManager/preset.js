import Player from '../player';

const getPreset = (plugins, ignores) => {
  return class Preset extends Player {
    static defaultPlugins = plugins || [];
    static defaultIgnores = ignores || [];

    static setDefaultPlugins (...plugins) {
      Preset.defaultPlugins = plugins
    }

    static setIgnorePlugins (...ignores) {
      Preset.defaultIgnores = ignores
    }

    _registerPlugins () {
      this.config.ignores.push(...Preset.defaultIgnores);
      this.config.plugins.push(...Preset.defaultPlugins);
      super._registerPlugins();
    }
  }
}

export default getPreset;
