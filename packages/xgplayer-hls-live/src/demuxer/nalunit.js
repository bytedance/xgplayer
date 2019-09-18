class Nalunit {
  static getNalunits (buffer) {
    let position = Nalunit.getHeaderPosition(buffer);
    let start = position.pos;
    let end = start;
    while (start < buffer.length - 4) {
      let header = buffer.buffer.slice(start, start + position.headerLength);
      if (position.pos === buffer.position) {
        buffer.skip(position.headerLength);
      }
      position = Nalunit.getHeaderPosition(buffer);
      end = position.pos;
      let body = buffer.buffer.slice(start + header.byteLength, end);
      let unit = {header, body};
      Nalunit.analyseNal(unit);
      buffer.skip(end - buffer.position);
      start = end;
    }
  }

  static analyseNal (unit) {
    let type = unit.body[0] && 0x1f;
    switch (type) {
      case 1:
        // NDR
        break;
      case 5:
        // IDR
        break;
      case 6:
        // SEI
        break;
      case 7:
        // SPS
        break;
      case 8:
        // PPS
        break;
      case 9:
        // AUD
        break;
      default:
        break;
    }
    console.log(unit);
  }

  static getHeaderPosition (buffer) {
    // seperate
    let pos = buffer.position;
    let headerLength = 0;
    while (headerLength !== 3 && headerLength !== 4 && pos < buffer.length - 4) {
      if (buffer.dataview.getInt16(pos) === 0) {
        if (buffer.dataview.getInt16(pos + 2) === 1) {
          // 0x000001
          headerLength = 4;
        } else if (buffer.dataview.getInt8(pos + 2) === 1) {
          headerLength = 3;
        } else {
          pos++;
        }
      } else {
        pos++;
      }
    }

    if (pos === buffer.length - 4) {
      if (buffer.dataview.getInt16(pos) === 0) {
        if (buffer.dataview.getInt16(pos + 2) === 1) {
          // 0x000001
          headerLength = 4;
        }
      } else {
        pos++;
        if (buffer.dataview.getInt16(pos) === 0 && buffer.dataview.getInt8(pos) === 1) {
          // 0x0000001
          headerLength = 3;
        } else {
          pos = buffer.length;
        }
      }
    }
    return {pos, headerLength};
  }
}

export default Nalunit;
