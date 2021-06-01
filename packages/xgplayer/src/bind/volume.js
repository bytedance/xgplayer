import Volume from '../controls/volume.js';
import S_volume from '../skin/controls/volume.js';

export default {
    name: 'volume',
    method: function () {
        Volume.method.call(this)
        S_volume.method.call(this)
    }
}