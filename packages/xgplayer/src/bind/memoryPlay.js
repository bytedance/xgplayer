import MemoryPlay from '../controls/memoryPlay.js';
import S_memoryPlay from '../skin/controls/memoryPlay.js';

export default {
    name: 'memoryPlay',
    method: function () {
        MemoryPlay.method.call(this)
        S_memoryPlay.method.call(this)
    }
}