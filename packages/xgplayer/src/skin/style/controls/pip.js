module.exports = {
  '@global': {
    '.lang-is-jp': {
      '& .xgplayer-pip': {
        '& .name': {
          '& span': {
            width: 70,
            height: 20
          }
        }
      }
    },
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
      top: 8,
      '& .name': {
        textAlign: 'center',
        fontFamily: 'PingFangSC-Regular',
        fontSize: 13,
        lineHeight: 20,
        height: 20,
        color: 'rgba(255, 255, 255, 0.80)',
        '& span': {
          width: 60,
          height: 20,
          lineHeight: '20px',
          background: 'rgba(0, 0, 0, 0.38)',
          borderRadius: 10,
          display: 'inline-block',
          verticalAlign: 'middle'
        }
}
    },
    '.xgplayer-pip-lay': {
      position: 'absolute',
      top: 26,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 130,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      display: 'none',
      div: {
        width: '100%',
        height: '100%'
      }
    },
    '.xgplayer-pip-drag': {
      cursor: 'move',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 26,
      lineHeight: '26px',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))',
      zIndex: 130,
      display: 'none'
    },
    '.xgplayer-pip-active': {
      position: 'fixed',
      right: 0,
      bottom: 200,
      width: '320px !important',
      height: '180px !important',
      zIndex: '110 !important',
      '& .xgplayer-controls': {
        display: 'none'
      },
      '& .xgplayer-danmu': {
        display: 'none'
      },
      '& .xgplayer-pip-lay': {
        display: 'block'
      },
      '& .xgplayer-pip-drag': {
        display: 'flex'
      }
    },
    '.xgplayer-inactive': {
      '& .xgplayer-pip-drag': {
        display: 'none'
      }
    }
  }
}
