import Airplay from '../controls/airplay.js';
import S_airplay from '../skin/controls/airplay.js';

export default {
    name: 'airplay',
    method: function () {
        Airplay.method.call(this)
        S_airplay.method.call(this)
    }
}
