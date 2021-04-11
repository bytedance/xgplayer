import Download from '../controls/download.js';
import S_download from '../skin/controls/download.js';

export default {
    name: 'download',
    method: function () {
        Download.method.call(this)
        S_download.method.call(this)
    }
}