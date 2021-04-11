import Rotate from '../controls/rotate.js';
import S_rotate from '../skin/controls/rotate.js';

export default {
    name: 'rotate',
    method: function () {
        Rotate.method.call(this)
        S_rotate.method.call(this)
    }
}