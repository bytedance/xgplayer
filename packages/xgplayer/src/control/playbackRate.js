import Player from '../player';

let playbackRate = function () {
    let player = this, util = Player.util;
    let selected = 0;
    let rateTpl = [];
    if (player.config.playbackRate) {
        player.config.playbackRate.sort((a, b)=> a - b);
        player.config.playbackRate.forEach((item, index)=>{
            if (item === 1 || item === '1') {
                selected = index;
            }
            rateTpl.push(`${item}x`);
        });
    } else {
        return false;
    }
    let ul = util.createDom('xg-playback', '<p class="name"><span>1x</span></p>', {}, 'xgplayer-playback'), root = player.controls;
    let tips = util.createDom('xg-tips', '倍速', {}, 'xgplayer-tips')
    ul.appendChild(tips)
    root.appendChild(ul);
    ['touchstart', 'click'].forEach(item=>{
        ul.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            let p = e.target || e.srcElement;
            if (p && p.tagName.toLocaleLowerCase() === 'p' || p.tagName.toLocaleLowerCase() === 'span') {
                selected = selected + 1 === rateTpl.length ? 0 : selected + 1;
                ul.querySelector('p').innerHTML = `<span>${rateTpl[selected]}</span>`;
                player.video.playbackRate = rateTpl[selected].replace(/x$/g, '') * 1;
            }
        }, false);
    });

    player.once('destroy', ()=>{
        ul = null;
    });

};

Player.install('playbackRate', playbackRate);
