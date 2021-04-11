import LocalPreview from '../controls/localPreview.js';
import S_localPreview from '../skin/controls/localPreview.js';

export default {
    name: 'localPreview',
    method: function () {
        LocalPreview.method.call(this)
        S_localPreview.method.call(this)
    }
}