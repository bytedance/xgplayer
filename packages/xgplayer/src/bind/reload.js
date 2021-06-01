import Reload from '../controls/reload.js';
import S_reload from '../skin/controls/reload.js';

export default {
    name: 'reload',
    method: function () {
        Reload.method.call(this)
        S_reload.method.call(this)
    }
}