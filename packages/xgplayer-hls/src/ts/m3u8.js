import EventEmitter from 'event-emitter';
import XHR from '../util/xhr';

class M3U8 {
    constructor (url) {
        this.url = url;
        this.segments = [];
        this.retryMax = 10;
        this.retry = 0;
        this.type = 'live';
        this.isEnd = false;
        this.timer = null;
        this.rangeDuration = 2000;
        this.duration = 0;
        this.init(url);
        EventEmitter(this);
    }
    fetch (url) {
        let meta = {TYPE: 'LIVE', ENDLIST: ''}, segments = [];
        return new Promise((resolve, reject)=>{
            new XHR({type: '', url}).then((res) => {
                let ctx = res.responseText;
                if (ctx) {
                    const metaCtx = ctx.substring(0, ctx.indexOf('#EXTINF'));
                    const endList = ctx.substring(ctx.lastIndexOf('#EXTINF'));
                    const Tag = M3U8.Tag;
                    const EXTINFItem = new RegExp(Tag.EXTINF.source);
                    Object.keys(Tag).forEach((key) => {
                        if (key !== 'EXTINF' && (Tag[key].test(metaCtx) || Tag[key].test(endList))) {
                            meta[key] = RegExp.$2 ? [RegExp.$1, RegExp.$2] : RegExp.$1 || true;
                        }
                    });
                    ctx.match(Tag.EXTINF).forEach((item, idx) => {
                        if (EXTINFItem.test(item)) {
                            let time = RegExp.$1 * 1, title = RegExp.$2, _url = M3U8.resolve(url, title);
                            segments.push({
                                idx,
                                duration: time,
                                title: title,
                                downloaded: false,
                                url: _url,
                            });
                        }
                    });
                    if (meta['SEQUENCE'] * 1 === 0 && meta['ENDLIST']) {
                        meta.TYPE = 'VOD';
                    }
                    resolve({meta, segments});
                } else {
                    reject();
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
    init (url) {
        let self = this, segments = self.segments;
        this.fetch(url).then((res)=>{
            self.type = res.meta.TYPE.toLocaleLowerCase();
            self.isEnd = res.meta.ENDLIST;
            res.segments.forEach(item=>{
                segments.push(item);
            });
            self.emit('ready');
        }, err=>{
            segments.length = 0;
            self.retry++;
            if (self.retry < self.retryMax) {
                self.init(url);
            }
        });
    }
    seek (time) {
        let segments = this.segments,
            r;
        if (this.type === 'vod' && time !== undefined) {
            if (segments[0].start === undefined) {
                let start = 0;
                for (let i = 0, len = segments.length, segment; i < len; i++) {
                    segment = segments[i];
                    segment.start = start;
                    start += segment.duration;
                    segment.end = start;
                }
            }
            r = segments.filter((item) => {
                return item.start <= time && time < item.end && !item.downloaded;
            });
        } else {
            r = segments.filter(item => !item.downloaded);
            if (this.type === 'live' && segments.filter(item => !item.downloaded).length < 3) {
                this.update(1);
            }
        }
        return r;
    }
    reset () {
        this.segments.length = 0;
        this.isEnd = false;
        this.type = 'live';
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.init(this.url);
    }
    update (rightnow) {
        let self = this;
        let url = self.url;
        let segments = self.segments;
        if (self.timer) {
            clearTimeout(self.timer);
        }
        self.timer = setTimeout(function () {
            let count = 0;
            self.fetch(url).then(res => {
                res.segments.forEach(item=>{
                    if (!segments.some(url=>item.url === url.url)) {
                        count++;
                        segments.push(item);
                    }
                });
                if (count <= 0) {
                    self.update();
                }
            }, err=>{
                self.retry++;
                if (self.retry < self.retryMax) {
                    self.update();
                } else {
                    self.emit('end');
                }
            });
        }, rightnow ? 0 : self.rangeDuration);
    }
    static resolve (base, url) {
        let result = [];
        let a = document.createElement('a');
        a.href = base;
        let b = url;
        let a_arr = a.pathname.replace(/^\/+/, '').split('/');
        let b_arr = b.split('/');
        a_arr.pop();
        let find = () => {
            switch (b_arr[0]) {
                case '':
                    result = b_arr.slice(1);
                    break;
                case '.':
                    result = a_arr.concat(b_arr.slice(1));
                    break;
                case '..':
                    b_arr.shift();
                    if (a_arr.length) {
                        a_arr.pop();
                        find();
                    } else {
                        throw 'path in invalid';
                    }
                    break;
                default:
                    result = a_arr.concat(b_arr);
            }
        };
        find();
        if (result.length) {
            result = a.protocol + '//' + a.host + '/' + result.join('/');
        } else {
            result = b.href;
        }
        return result;
    }
}

M3U8.Tag = {
    EXTM3U: /^#EXTM3U/,
    TYPE: /#EXT-X-PLAYLIST-TYPE:(\w+)/,
    EXTINF: /#EXTINF:(\d+\.?\d*)(?:,(?:[^\r|\n]*)(?:\r|\n)*)(.*(?!#))/g,
    DURATION: /#EXT-X-TARGETDURATION:(\d+\.?\d*)/,
    SEQUENCE: /#EXT-X-MEDIA-SEQUENCE:(\d+)/,
    ENDLIST: /#EXT-X-ENDLIST/,
    VERSION: /#EXT-X-VERSION:(\d+)/,
    STREAM: /#EXT-X-STREAM-INF:(\w+=\w+)+/,
};

export default M3U8;
