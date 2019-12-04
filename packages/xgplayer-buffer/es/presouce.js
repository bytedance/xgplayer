var Source = function Source() {
  babelHelpers.classCallCheck(this, Source);

  this.mimetype = '';
  this.init = null;
  this.data = [];
};

var PreSource = function () {
  function PreSource() {
    babelHelpers.classCallCheck(this, PreSource);

    this.sources = {};
  }

  babelHelpers.createClass(PreSource, [{
    key: 'getSource',
    value: function getSource(source) {
      return this.sources[source];
    }
  }, {
    key: 'createSource',
    value: function createSource(name) {
      this.sources[name] = new Source();
      return this.sources[name];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.sources = {};
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.sources = {};
    }
  }]);
  return PreSource;
}();

export default PreSource;