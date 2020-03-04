export const usePreset = (player, Preset) => {
  let presetInst;
  if (Preset.preset && Preset.options) {
    // eslint-disable-next-line new-cap
    presetInst = new (Preset.preset)(Preset.options);
  } else {
    presetInst = new Preset()
  }
  const { plugins, ignores } = presetInst;
  if (!player.config.plugins) {
    player.config.plugins = []
  }

  if (!player.config.ignores) {
    player.config.ignores = []
  }

  player.config.plugins.push(...plugins);
  player.config.ignores.push(...ignores);
}
