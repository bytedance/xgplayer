class SEIResult {
  constructor (type, uuid, payload) {
    return {
      type,
      uuid,
      payload
    }
  }

}
class SEIParser {
  static parse(seiArr) {
    if (!seiArr.length) {
      return;
    }
    let payloadType = 0;
    let payloadSize = 0;
    let i = 0;
    while (seiArr.slice(i, i + 8) === 0xff) {
      payloadType += 255;
      i += 8;
    }
    payloadType += seiArr.slice(i, i + 8);
    i += 8;

    while (seiArr.slice(i, i + 8) === 0xff) {
      payloadSize += 255;
      i += 8;
    }

    payloadSize += seiArr.slice(i, i + 8);
    i += 8;

    switch (payloadType) {
      case 5:
        return Object.assign({}, SEIParser.user_data_unregistered(seiArr.slice(i, i + payloadSize)), {
          size: payloadSize,
          type: payloadType
        })
    }
  }

  static user_data_unregistered (buffer, payloadSize) {
    const uuid = buffer.slice(0, 16)
    const content = buffer.slice(16, payloadSize - 1);
    return {
      uuid,
      content
    }
  }
}
