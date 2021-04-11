import Pip from '../controls/pip.js';
import S_pip from '../skin/controls/pip.js';

export default {
    name: 'pip',
    method: function () {
        Pip.method.call(this)
        S_pip.method.call(this)
    }
}