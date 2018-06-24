export default class DataView4Read {
    constructor (buffer, context) {
        this._dv = new DataView(buffer);
        this._context = context;
        this.initProxy();
    }

    initProxy () {
        const sizeArr = [8, 16, 32];
        const self = this;
        const { _store } = this._context;
        sizeArr.forEach(size => {
            this[`getUint${size}`] = function (offset) {
                if (!offset) { offset = self._context.readOffset; }
                if (offset === self._context.readOffset) {
                    self._context.readOffset += size / 8;
                }
                return self._dv[`getUint${size}`](offset, !_store.isLe);
            };

        });

        /**
         * 显式声明一个比其它位数更常用读取24位整数方法
         * @param offset
         * @param isHigh
         */
        this.getUint24 = function (offset) {
            const result = this.getUint(24, offset, false); // 会读取Uint32,做 and 操作之后回退一位。
            self._context.readOffset -= 1;
            return result;
        };

        this.getUint = function (size, offset, isHigh = true) {
            if (size > 32) {
                throw 'not supported read size';
            }
            let readSize = 32;
            if (!this[`getUint${size}`]) {
                for (let i = 0, len = sizeArr.length; i < len; i++) {
                    if (size < sizeArr[i]) {
                        readSize = sizeArr[i];
                        break;
                    }

                }

                const numToAnd = isHigh ? DataView4Read.getAndNum(0, size - 1, readSize) : DataView4Read.getAndNum(readSize - size, readSize - 1, readSize);
                return self[`getUint${readSize}`](offset, !_store.isLe) & numToAnd;

            } else {
                return self[`getUint${readSize}`](offset, !_store.isLe);
            }
        };
    }

    static getAndNum (begin, end, size = 8) {
        let result = 0;
        let index = --size;
        while (index > 0) {
            if (index > end || index < begin) {
                index--;
                continue;
            } else {
                result += Math.pow(2, size - index);
                index--;
            }
        }

        return result;
    }
}