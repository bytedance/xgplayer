import Miniplayer from '../controls/miniplayer.js';
import S_miniplayer from '../skin/controls/miniplayer.js';

export default {
    name: 'miniplayer',
    method: function () {
        Miniplayer.method.call(this)
        S_miniplayer.method.call(this)
    }
}