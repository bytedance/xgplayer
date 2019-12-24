import sniffer from 'xgplayer-utils-sniffer';
import UTF8 from 'xgplayer-utils-utf8';

var isLe = sniffer.isLe;

var DATA_TYPES = {
  NUMBER: 0,
  BOOLEAN: 1,
  STRING: 2,
  OBJECT: 3,
  MIX_ARRAY: 8,
  OBJECT_END: 9,
  STRICT_ARRAY: 10,
  DATE: 11,
  LONE_STRING: 12

  /**
   * meta信息解析
   */
};
var AMFParser = function () {
  function AMFParser() {
    babelHelpers.classCallCheck(this, AMFParser);

    this.offset = 0;
    this.readOffset = this.offset;
  }

  babelHelpers.createClass(AMFParser, [{
    key: 'resolve',
    value: function resolve(meta, size) {
      if (size < 3) {
        throw new Error('not enough data for metainfo');
      }
      var metaData = {};
      var name = this.parseValue(meta);
      var value = this.parseValue(meta, size - name.bodySize);
      metaData[name.data] = value.data;

      this.resetStatus();
      return metaData;
    }
  }, {
    key: 'resetStatus',
    value: function resetStatus() {
      this.offset = 0;
      this.readOffset = this.offset;
    }
  }, {
    key: 'parseString',
    value: function parseString(buffer) {
      var dv = new DataView(buffer, this.readOffset);
      var strLen = dv.getUint16(0, !isLe);
      var str = '';
      if (strLen > 0) {
        str = UTF8.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
      } else {
        str = '';
      }
      var size = strLen + 2;
      this.readOffset += size;
      return {
        data: str,
        bodySize: strLen + 2
      };
    }
  }, {
    key: 'parseDate',
    value: function parseDate(buffer, size) {
      var dv = new DataView(buffer, this.readOffset, size);
      var ts = dv.getFloat64(0, !isLe);
      var timeOffset = dv.getInt16(8, !isLe);
      ts += timeOffset * 60 * 1000;

      this.readOffset += 10;
      return {
        data: new Date(ts),
        bodySize: 10
      };
    }
  }, {
    key: 'parseObject',
    value: function parseObject(buffer, size) {
      var name = this.parseString(buffer, size);
      var value = this.parseValue(buffer, size - name.bodySize);
      return {
        data: {
          name: name.data,
          value: value.data
        },
        bodySize: name.bodySize + value.bodySize,
        isObjEnd: value.isObjEnd
      };
    }
  }, {
    key: 'parseLongString',
    value: function parseLongString(buffer) {
      var dv = new DataView(buffer, this.readOffset);
      var strLen = dv.getUint32(0, !isLe);
      var str = '';
      if (strLen > 0) {
        str = UTF8.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
      } else {
        str = '';
      }
      // const size = strLen + 4;
      this.readOffset += strLen + 4;
      return {
        data: str,
        bodySize: strLen + 4
      };
    }

    /**
     * 解析meta中的变量
     */

  }, {
    key: 'parseValue',
    value: function parseValue(data, size) {
      var buffer = new ArrayBuffer();
      if (data instanceof ArrayBuffer) {
        buffer = data;
      } else {
        buffer = data.buffer;
      }
      var NUMBER = DATA_TYPES.NUMBER,
          BOOLEAN = DATA_TYPES.BOOLEAN,
          STRING = DATA_TYPES.STRING,
          OBJECT = DATA_TYPES.OBJECT,
          MIX_ARRAY = DATA_TYPES.MIX_ARRAY,
          OBJECT_END = DATA_TYPES.OBJECT_END,
          STRICT_ARRAY = DATA_TYPES.STRICT_ARRAY,
          DATE = DATA_TYPES.DATE,
          LONE_STRING = DATA_TYPES.LONE_STRING;

      var dataView = new DataView(buffer, this.readOffset, size);
      var isObjEnd = false;
      var type = dataView.getUint8(0);
      var offset = 1;
      this.readOffset += 1;
      var value = null;

      switch (type) {
        case NUMBER:
          {
            value = dataView.getFloat64(1, !isLe);
            this.readOffset += 8;
            offset += 8;
            break;
          }
        case BOOLEAN:
          {
            var boolNum = dataView.getUint8(1);
            value = !!boolNum;
            this.readOffset += 1;
            offset += 1;
            break;
          }
        case STRING:
          {
            var str = this.parseString(buffer);
            value = str.data;
            offset += str.bodySize;
            break;
          }
        case OBJECT:
          {
            value = {};
            var objEndSize = 0;
            if (dataView.getUint32(size - 4, !isLe) & 0x00FFFFFF) {
              objEndSize = 3;
            }
            // this.readOffset += offset - 1;
            while (offset < size - 4) {
              var amfObj = this.parseObject(buffer, size - offset - objEndSize);
              if (amfObj.isObjectEnd) {
                break;
              }
              value[amfObj.data.name] = amfObj.data.value;
              offset += amfObj.bodySize;
            }
            if (offset <= size - 3) {
              var mark = dataView.getUint32(offset - 1, !isLe) & 0x00FFFFFF;
              if (mark === 9) {
                this.readOffset += 3;
                offset += 3;
              }
            }
            break;
          }
        case MIX_ARRAY:
          {
            value = {};
            offset += 4;
            this.readOffset += 4;
            var _objEndSize = 0;
            if ((dataView.getUint32(size - 4, !isLe) & 0x00FFFFFF) === 9) {
              _objEndSize = 3;
            }

            while (offset < size - 8) {
              var amfVar = this.parseObject(buffer, size - offset - _objEndSize);
              if (amfVar.isObjectEnd) {
                break;
              }
              value[amfVar.data.name] = amfVar.data.value;
              offset += amfVar.bodySize;
            }
            if (offset <= size - 3) {
              var marker = dataView.getUint32(offset - 1, !isLe) & 0x00FFFFFF;
              if (marker === 9) {
                offset += 3;
                this.readOffset += 3;
              }
            }
            break;
          }

        case OBJECT_END:
          {
            value = null;
            isObjEnd = true;
            break;
          }

        case STRICT_ARRAY:
          {
            value = [];
            var arrLength = dataView.getUint32(1, !isLe);
            offset += 4;
            this.readOffset += 4;
            for (var i = 0; i < arrLength; i++) {
              var script = this.parseValue(buffer, size - offset);
              value.push(script.data);
              offset += script.bodySize;
            }
            break;
          }

        case DATE:
          {
            var date = this.parseDate(buffer, size - 1);
            value = date.data;
            offset += date.bodySize;
            break;
          }

        case LONE_STRING:
          {
            var longStr = this.parseLongString(buffer, size - 1);
            value = longStr.data;
            offset += longStr.bodySize;
            break;
          }

        default:
          {
            offset = size;
          }
      }

      return {
        data: value,
        bodySize: offset,
        isObjEnd: isObjEnd
      };
    }
  }]);
  return AMFParser;
}();

export default AMFParser;