import Play from '../controls/play.js';
import S_play from '../skin/controls/play.js';

export default {
    name: 'play',
    method: function () {
        Play.method.call(this)
        S_play.method.call(this)
    }
}