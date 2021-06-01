import ScreenShot from '../controls/screenShot.js';
import S_screenShot from '../skin/controls/screenShot.js';

export default {
    name: 'screenShot',
    method: function () {
        ScreenShot.method.call(this)
        S_screenShot.method.call(this)
    }
}