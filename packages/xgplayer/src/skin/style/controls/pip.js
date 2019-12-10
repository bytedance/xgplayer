module.exports = {
  '@global': {
    '.xgplayer-pip': {
      order: 9,
      position: 'relative',
      outline: 'none',
      display: 'block',
      cursor: function (data) {
        return data.cursor || 'pointer'
      },
      // margin-left: 10px,
      // margin-top: 9px,
      // margin-bottom: 11px,
      height: 20,
      top: 8
    }
  }
}
