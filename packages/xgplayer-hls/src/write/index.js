import Box from './box';
import Buffer from './buffer';


// 引入整个目录
var context = require.context('./box', true, /\.js$/);
context.keys().forEach(function (key) {
    context(key);
});

class Write {

    writeMeta (boxes) {
        let out = new Buffer();
        boxes.forEach(item=>{
            let box = new Box(item, out);
            box.writeBody();
        });
        return out.buffer;
    }

    writeFragment (...args) {
        let out = new Buffer();
        args.forEach(item=>{
            if (!item) {
                return false;
            }
            let box = new Box(item, out);
            box.writeBody();
        });
        return out.buffer;
    }
}

export default Write;
