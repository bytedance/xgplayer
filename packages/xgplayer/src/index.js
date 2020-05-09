
import Player from '../es/player'
import defaultPreset from '../es/presets/mobile'
// import defaultPreset from '../es/presets/mobile';
Player.defaultPreset = defaultPreset;
const player = new Player({
  id: 'vs',
  url: './hjh1.mp4',
  height: '100%',
  width: '100%'
  // presets: [defaultPreset]
})
window.player = player
