export default (function (fn, wait) {
  var lastTime = Date.now();
  var timer = null;
  var isFirstTime = true;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var now = Date.now();
    if (isFirstTime) {
      lastTime = Date.now();
      isFirstTime = false;
      fn.apply(undefined, args);
    }
    if (now - lastTime > wait) {
      lastTime = now;
      fn.apply(undefined, args);
    } else {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = setTimeout(function () {
        fn.apply(undefined, args);
      }, wait);
    }
  };
});