import Definition from '../controls/definition.js';
import S_definition from '../skin/controls/definition.js';

export default {
    name: 'definition',
    method: function () {
        Definition.method.call(this)
        S_definition.method.call(this)
    }
}