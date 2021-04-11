import Start from '../controls/start.js';
import S_start from '../skin/controls/start.js';

export default {
    name: 'start',
    method: function () {
        Start.method.call(this)
        S_start.method.call(this)
    }
}