import Danmu from '../controls/danmu.js';
import S_danmu from '../skin/controls/danmu.js';

export default {
    name: 'danmu',
    method: function () {
        Danmu.method.call(this)
        S_danmu.method.call(this)
    }
}