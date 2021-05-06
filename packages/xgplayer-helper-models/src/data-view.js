class XGDataView {
  constructor (buffer) {
    if (buffer instanceof ArrayBuffer) {
      this.buffer = buffer;
      this.dataview = new DataView(buffer);
      this.dataview.position = 0;
    } else {
      throw new Error('data is invalid');
    }
  }

  /**
   * byffer length
   * @return {number}
   */
  get length () {
    return this.buffer.byteLength;
  }

  /**
   * set current read position of data-view
   * @param value
   */
  set position (value) {
    this.dataview.position = value;
  }

  /**
   * set current read position of data-view
   * @param value
   */
  get position () {
    return this.dataview.position;
  }

  /**
   * move read position backward
   * @param count
   */
  back (count) {
    this.position -= count;
  }

  /**
   * move read position forward
   * @param count
   */
  skip (count) {
    let loop = Math.floor(count / 4);
    let last = count % 4;
    for (let i = 0; i < loop; i++) {
      XGDataView.readByte(this.dataview, 4);
    }
    if (last > 0) {
      XGDataView.readByte(this.dataview, last);
    }
  }

  /**
   * [readByte 从DataView中读取数据]
   * @param  {DataView} buffer [DataView实例]
   * @param  {Number} size   [读取字节数]
   * @return {Number}        [整数]
   */
  static readByte (buffer, size, sign) {
    let res;
    switch (size) {
      case 1:
        if (sign) {
          res = buffer.getInt8(buffer.position);
        } else {
          res = buffer.getUint8(buffer.position);
        }
        break;
      case 2:
        if (sign) {
          res = buffer.getInt16(buffer.position);
        } else {
          res = buffer.getUint16(buffer.position);
        }
        break;
      case 3:
        if (sign) {
          throw new Error('not supported for readByte 3');
        } else {
          res = buffer.getUint8(buffer.position) << 16;
          res |= buffer.getUint8(buffer.position + 1) << 8;
          res |= buffer.getUint8(buffer.position + 2);
        }
        break;
      case 4:
        if (sign) {
          res = buffer.getInt32(buffer.position);
        } else {
          res = buffer.getUint32(buffer.position);
        }
        break;
      case 8:
        if (sign) {
          throw new Error('not supported for readBody 8');
        } else {
          res = buffer.getUint32(buffer.position) << 32;
          res |= buffer.getUint32(buffer.position + 4);
        }
        break;
      default:
        res = '';
    }
    buffer.position += size;
    return res;
  }

  /**
   * @return {Number}
   */
  readUint8 () {
    return XGDataView.readByte(this.dataview, 1);
  }

  /**
   * @return {Number}
   */
  readUint16 () {
    return XGDataView.readByte(this.dataview, 2);
  }

  /**
   * @return {Number}
   */
  readUint24 () {
    return XGDataView.readByte(this.dataview, 3);
  }

  /**
   * @return {Number}
   */
  readUint32 () {
    return XGDataView.readByte(this.dataview, 4);
  }

  /**
   * @return {Number}
   */
  readUint64 () {
    return XGDataView.readByte(this.dataview, 8);
  }

  /**
   * @return {Number}
   */
  readInt8 () {
    return XGDataView.readByte(this.dataview, 1, true);
  }

  /**
   * @return {Number}
   */
  readInt16 () {
    return XGDataView.readByte(this.dataview, 2, true);
  }

  /**
   * @return {Number}
   */
  readInt32 () {
    return XGDataView.readByte(this.dataview, 4, true);
  }

  /**
   * @return {Uint8Array}
   */
  writeUint32 (value) {
    return new Uint8Array([
      value >>> 24 & 0xff,
      value >>> 16 & 0xff,
      value >>> 8 & 0xff,
      value & 0xff
    ]);
  }
}

export default XGDataView;
