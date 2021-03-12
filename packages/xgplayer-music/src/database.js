class INDEXDB {
  constructor (mydb = {name: 'xgplayer', version: 1, db: null, ojstore: {name: 'xg-m4a', keypath: 'vid'}}) {
    this.indexedDB = window.indexedDB || window.webkitindexedDB
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange // 键范围
    this.myDB = mydb
  }

  openDB (callback) {
    // 建立或打开数据库，建立对象存储空间(ObjectStore)
    let self = this
    let version = this.myDB.version || 1
    let request = self.indexedDB.open(self.myDB.name, version)
    request.onerror = function (e) {
      // console.log('e.currentTarget.error.message')
    }
    request.onsuccess = e => {
      this.myDB.db = e.target.result
      // console.log('成功建立并打开数据库:' + this.myDB.name + ' version' + this.myDB.version)
      callback.call(self)
    }
    request.onupgradeneeded = e => {
      let db = e.target.result
      let transaction = e.target.transaction
      let store
      if (!db.objectStoreNames.contains(self.myDB.ojstore.name)) {
        // 没有该对象空间时创建该对象空间
        store = db.createObjectStore(self.myDB.ojstore.name, {keyPath: self.myDB.ojstore.keypath})
        // console.log('成功建立对象存储空间：' + this.myDB.ojstore.name)
      }
    }
  }

  deletedb () {
    // 删除数据库
    let self = this
    self.indexedDB.deleteDatabase(this.myDB.name)
    // console.log(this.myDB.name + '数据库已删除')
  }

  closeDB () {
    // 关闭数据库
    this.myDB.db.close()
    // console.log('数据库已关闭')
  }

  addData (storename, data) {
    // 添加数据，重复添加会报错
    let store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    let request
    for (let i = 0; i < data.length; i++) {
      request = store.add(data[i])
      request.onerror = function () {
        // console.error('add添加数据库中已有该数据')
      }
      request.onsuccess = function () {
        // console.log('add添加数据已存入数据库')
      }
    }
  }

  putData (storename, data) {
    // 添加数据，重复添加会更新原有数据
    let store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    let request
    for (let i = 0; i < data.length; i++) {
      request = store.put(data[i])
      request.onerror = function () {
        // console.error('put添加数据库中已有该数据')
      }
      request.onsuccess = function () {
        // console.log('put添加数据已存入数据库')
      }
    }
  }

  getDataByKey (storename, key, callback) {
    let self = this
    // 根据存储空间的键找到对应数据
    let store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    let request = store.get(key)
    request.onerror = function () {
      // console.error('getDataByKey error')
      callback.call(self, null)
    }
    request.onsuccess = function (e) {
      let result = e.target.result
      // console.log('查找数据成功')
      callback.call(self, result)
    }
  }

  deleteData (storename, key) {
    // 删除某一条记录
    let store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    store.delete(key)
    // console.log('已删除存储空间' + storename + '中' + key + '记录')
  }

  clearData (storename) {
    // 删除存储空间全部记录
    let store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    store.clear()
    // console.log('已删除存储空间' + storename + '全部记录')
  }
}

export default INDEXDB
