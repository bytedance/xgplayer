import CssFullscreen from '../controls/cssFullscreen.js';
import S_cssFullscreen from '../skin/controls/cssFullscreen.js';

export default {
    name: 'cssFullscreen',
    method: function () {
        CssFullscreen.method.call(this)
        S_cssFullscreen.method.call(this)
    }
}