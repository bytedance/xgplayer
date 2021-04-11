import Fullscreen from '../controls/fullscreen.js';
import S_fullscreen from '../skin/controls/fullscreen.js';

export default {
    name: 'fullscreen',
    method: function () {
        Fullscreen.method.call(this)
        S_fullscreen.method.call(this)
    }
}