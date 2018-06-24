import TS from './ts';
class Parser {
    constructor (ctx) {
        this.buffer = ctx;
        this.ts = [];
        let count = 0, length = this.buffer.byteLength;
        while (count < length) {
            this.ts.push(new TS(this.buffer.slice(count, count + 188), count / 188));
            count += 188;
        }
        delete this.buffer;
    }
    get pat () {
        return this.ts.filter((item) => item.header.pid === 0);
    }

    get pmt () {
        let pat = this.pat, list = [];
        pat.forEach(item=>{
            item.body.list.filter(sub=>{
                list.push(sub.pid);
            });
        });
        return this.ts.filter((item) => list.some(b=>b === item.header.pid));
    }

    get pes () {
        let pmt = this.pmt, pid = [], pes = [];
        pmt.forEach(item=>{
            pid = pid.concat(item.body.list.map(b=>{ return b.pid; }));
        });
        let ts = this.ts, length = ts.length, cur, videoGroup = [], audioGroup = [];
        for (var i = 0; i < length; i++) {
            cur = ts[i];
            if (pid.indexOf(cur.header.pid) > -1) {
                if (cur.body.type === 'video') {
                    if (cur.header.payload === 1) {
                        videoGroup = [];
                        videoGroup.push(cur);
                        pes.push(videoGroup);
                    } else if (videoGroup.length === 0) {
                        pes.push([cur]);
                    } else {
                        videoGroup.push(cur);
                    }

                } else if (cur.body.type === 'audio') {
                    if (cur.header.payload === 1) {
                        audioGroup = [];
                        audioGroup.push(cur);
                        pes.push(audioGroup);
                    } else if (audioGroup.length === 0) {
                        pes.push([cur]);
                    } else {
                        audioGroup.push(cur);
                    }
                }
            }
        }
        return pes;
    }
}
export default Parser;
