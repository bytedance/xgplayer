export const usePreset = (player, Preset) => {
  let presetInst
  if (Preset.preset && Preset.options) {
    // eslint-disable-next-line new-cap
    presetInst = new (Preset.preset)(Preset.options, player.config)
  } else {
    presetInst = new Preset({}, player.config)
  }
  const { plugins = [], ignores = [], icons = {}, i18n = [] } = presetInst
  if (!player.config.plugins) {
    player.config.plugins = []
  }

  if (!player.config.ignores) {
    player.config.ignores = []
  }

  player.config.plugins.push(...plugins)
  player.config.ignores.push(...ignores)
  Object.keys(icons).map(key => {
    if (!player.config.icons[key]) {
      player.config.icons[key] = icons[key]
    }
  })
  const _ci18n = player.config.i18n || []
  i18n.push(..._ci18n)
  player.config.i18n = i18n
}
