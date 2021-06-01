import PlayNext from '../controls/playNext.js';
import S_playNext from '../skin/controls/playNext.js';

export default {
    name: 'playNext',
    method: function () {
        PlayNext.method.call(this)
        S_playNext.method.call(this)
    }
}