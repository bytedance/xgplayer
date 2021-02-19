import * as Controls from './controls/*.js'
import * as Skin from './skin/controls/*.js';

let keyList = []
for (let k in Controls.controls) {
    keyList.push(k)
}
for (let k in Skin.skin.controls) {
    if(keyList.indexOf(k) < 0) {
        keyList.push(k)
    }
}
let controls = {}
keyList.forEach(item => {
    controls[item] = {
        name: item
    }
    if(Controls.controls[item]) {
        if(Skin.skin.controls[item]) {
            controls[item].method = function () {
                Controls.controls[item].method.call(this)
                Skin.skin.controls[item].method.call(this)
            }
        } else {
            controls[item].method = function () {
                Controls.controls[item].method.call(this)
            }
        }
    } else {
        controls[item].method = function () {
            Skin.skin.controls[item].method.call(this)
        }
    }
})

export default controls
