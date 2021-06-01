import Replay from '../controls/replay.js';
import S_replay from '../skin/controls/replay.js';

export default {
    name: 'replay',
    method: function () {
        Replay.method.call(this)
        S_replay.method.call(this)
    }
}