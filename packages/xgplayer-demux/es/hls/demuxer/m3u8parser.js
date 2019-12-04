/**
 * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
 */
var M3U8Parser = function () {
  function M3U8Parser() {
    babelHelpers.classCallCheck(this, M3U8Parser);
  }

  babelHelpers.createClass(M3U8Parser, null, [{
    key: 'parse',
    value: function parse(text) {
      var baseurl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var ret = {
        duration: 0
      };
      if (!text || !text.split) {
        return;
      }
      var refs = text.split(/\r|\n/);
      refs = refs.filter(function (ref) {
        return ref;
      });
      var ref = refs.shift();
      if (!ref.match('#EXTM3U')) {
        throw new Error('Invalid m3u8 file: not "#EXTM3U"');
        return null;
      }
      ref = refs.shift();
      var nextDiscontinue = false;
      while (ref) {
        var refm = ref.match(/#(.[A-Z|-]*):(.*)/);
        var refd = ref.match(/#(.[A-Z|-]*)/);
        if (refd && refm && refm.length > 2) {
          switch (refm[1]) {
            case 'EXT-X-VERSION':
              ret.version = parseInt(refm[2]);
              break;
            case 'EXT-X-MEDIA-SEQUENCE':
              ret.sequence = parseInt(refm[2]);
              break;
            case 'EXT-X-TARGETDURATION':
              ret.targetduration = parseFloat(refm[2]);
              break;
            case 'EXTINF':
              M3U8Parser.parseFrag(refm, refs, ret, baseurl, nextDiscontinue);
              nextDiscontinue = false;
              break;
            case 'EXT-X-KEY':
              M3U8Parser.parseDecrypt(refm[2], ret);
              break;
            default:
              break;
          }
        }if (refd && refd.length > 1) {
          switch (refd[1]) {
            case 'EXT-X-DISCONTINUITY':
              nextDiscontinue = true;
              break;
            default:
              break;
          }
        }
        ref = refs.shift();
      }
      return ret;
    }
  }, {
    key: 'parseFrag',
    value: function parseFrag(refm, refs, ret, baseurl, discontinue) {
      if (!ret.frags) {
        ret.frags = [];
      }

      var freg = {
        start: ret.duration,
        duration: parseFloat(refm[2]) * 1000
      };

      ret.duration += freg.duration;
      var nextline = refs.shift();
      if (nextline.match(/#(.*):(.*)/)) {
        nextline = refs.shift();
      }
      if (nextline.length > 0 && nextline.charAt(0) === '/' && baseurl.match(/.*\/\/.*\.\w+/g)) {
        baseurl = baseurl.match(/.*\/\/.*\.\w+/g)[0];
      }
      if (nextline.match(/.*:\/\/.*/)) {
        freg.url = nextline;
      } else {
        freg.url = baseurl + nextline;
      }
      freg.discontinue = discontinue;
      ret.frags.push(freg);
    }
  }, {
    key: 'parseURL',
    value: function parseURL(url) {
      var baseurl = '';
      var urls = url.match(/(.*\/).*\.m3u8/);
      if (urls && urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
          if (urls[i].match(/.*\/$/g) && urls[i].length > baseurl.length) {
            baseurl = urls[i];
          }
        }
      }
      return baseurl;
    }
  }, {
    key: 'parseDecrypt',
    value: function parseDecrypt(refm, ret) {
      ret.encrypt = {};
      var refs = refm.split(',');
      for (var i in refs) {
        var cmd = refs[i];
        if (cmd.match(/METHOD=(.*)/)) {
          ret.encrypt.method = cmd.match(/METHOD=(.*)/)[1];
        }
        if (cmd.match(/URI="(.*)"/)) {
          ret.encrypt.uri = cmd.match(/URI="(.*)"/)[1];
        }

        if (cmd.match(/IV=0x(.*)/)) {
          var iv = cmd.match(/IV=0x(.*)/)[1];
          var length = Math.ceil(iv.length / 2);
          ret.encrypt.ivb = new Uint8Array(length);
          for (var _i = length - 1; _i >= 0; _i--) {
            var im = parseInt(iv.substr(_i * 2, 2), 16);
            ret.encrypt.ivb[_i] = im;
          }
          ret.encrypt.iv = iv;
        }
      };
    }
  }]);
  return M3U8Parser;
}();

export default M3U8Parser;