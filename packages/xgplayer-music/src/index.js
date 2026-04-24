import Analyze from './analyze'
import Lyric from './lyric'
import Music from './music'
import MusicPreset from './preset'

export * from './plugins'

/**
 * @typedef { import ('./analyze/').IAnalyzeOptions } IAnalyzeOptions
 */

/**
 * @typedef { import ('./music/').IMusicConfig } IMusicConfig
 */

/**
 * @typedef { import ('./music/').IMusicConfig } IMusicConfig
 * @typedef { import ('./music/').IMusicListItem } IMusicListItem
 */

export { MusicPreset as default, Music, Lyric, Analyze }
