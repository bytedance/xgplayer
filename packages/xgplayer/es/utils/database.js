var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INDEXDB = function () {
  function INDEXDB() {
    var mydb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { name: 'xgplayer', version: 1, db: null, ojstore: { name: 'xg-m4a', keypath: 'vid' } };

    _classCallCheck(this, INDEXDB);

    this.indexedDB = window.indexedDB || window.webkitindexedDB;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange; // 键范围
    this.myDB = mydb;
  }

  _createClass(INDEXDB, [{
    key: 'openDB',
    value: function openDB(callback) {
      var _this = this;

      // 建立或打开数据库，建立对象存储空间(ObjectStore)
      var self = this;
      var version = this.myDB.version || 1;
      var request = self.indexedDB.open(self.myDB.name, version);
      request.onerror = function (e) {
        // console.log('e.currentTarget.error.message')
      };
      request.onsuccess = function (e) {
        _this.myDB.db = e.target.result;
        // console.log('成功建立并打开数据库:' + this.myDB.name + ' version' + this.myDB.version)
        callback.call(self);
      };
      request.onupgradeneeded = function (e) {
        var db = e.target.result;
        var transaction = e.target.transaction;
        var store = void 0;
        if (!db.objectStoreNames.contains(self.myDB.ojstore.name)) {
          // 没有该对象空间时创建该对象空间
          store = db.createObjectStore(self.myDB.ojstore.name, { keyPath: self.myDB.ojstore.keypath });
          // console.log('成功建立对象存储空间：' + this.myDB.ojstore.name)
        }
      };
    }
  }, {
    key: 'deletedb',
    value: function deletedb() {
      // 删除数据库
      var self = this;
      self.indexedDB.deleteDatabase(this.myDB.name);
      // console.log(this.myDB.name + '数据库已删除')
    }
  }, {
    key: 'closeDB',
    value: function closeDB() {
      // 关闭数据库
      this.myDB.db.close();
      // console.log('数据库已关闭')
    }
  }, {
    key: 'addData',
    value: function addData(storename, data) {
      // 添加数据，重复添加会报错
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      var request = void 0;
      for (var i = 0; i < data.length; i++) {
        request = store.add(data[i]);
        request.onerror = function () {
          // console.error('add添加数据库中已有该数据')
        };
        request.onsuccess = function () {
          // console.log('add添加数据已存入数据库')
        };
      }
    }
  }, {
    key: 'putData',
    value: function putData(storename, data) {
      // 添加数据，重复添加会更新原有数据
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      var request = void 0;
      for (var i = 0; i < data.length; i++) {
        request = store.put(data[i]);
        request.onerror = function () {
          // console.error('put添加数据库中已有该数据')
        };
        request.onsuccess = function () {
          // console.log('put添加数据已存入数据库')
        };
      }
    }
  }, {
    key: 'getDataByKey',
    value: function getDataByKey(storename, key, callback) {
      var self = this;
      // 根据存储空间的键找到对应数据
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      var request = store.get(key);
      request.onerror = function () {
        // console.error('getDataByKey error')
        callback.call(self, null);
      };
      request.onsuccess = function (e) {
        var result = e.target.result;
        // console.log('查找数据成功')
        callback.call(self, result);
      };
    }
  }, {
    key: 'deleteData',
    value: function deleteData(storename, key) {
      // 删除某一条记录
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      store.delete(key);
      // console.log('已删除存储空间' + storename + '中' + key + '记录')
    }
  }, {
    key: 'clearData',
    value: function clearData(storename) {
      // 删除存储空间全部记录
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      store.clear();
      // console.log('已删除存储空间' + storename + '全部记录')
    }
  }]);

  return INDEXDB;
}();

export default INDEXDB;