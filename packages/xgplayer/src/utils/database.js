class INDEXDB {
  constructor(
    mydb = {
      name: 'xgplayer',
      version: 1,
      db: null,
      ojstore: { name: 'xg-m4a', keypath: 'vid' }
    }
  ) {
    this.indexedDB = window.indexedDB || window.webkitindexedDB
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange // 键范围
    this.myDB = mydb
  }

  openDB(callback) {
    const version = this.myDB.version || 1
    const request = this.indexedDB.open(this.myDB.name, version)
    request.onerror = _e => {
      // console.log('e.currentTarget.error.message')
    }
    request.onsuccess = e => {
      this.myDB.db = e.target.result
      // console.log('成功建立并打开数据库:' + this.myDB.name + ' version' + this.myDB.version)
      callback.call(this)
    }
    request.onupgradeneeded = e => {
      const db = e.target.result
      // eslint-disable-next-line no-unused-vars
      const _transaction = e.target.transaction
      // eslint-disable-next-line no-unused-vars
      let _store
      if (!db.objectStoreNames.contains(this.myDB.ojstore.name)) {
        // 没有该对象空间时创建该对象空间
        // eslint-disable-next-line no-unused-vars
        _store = db.createObjectStore(this.myDB.ojstore.name, {
          keyPath: this.myDB.ojstore.keypath
        })
        // console.log('成功建立对象存储空间：' + this.myDB.ojstore.name)
      }
    }
  }

  deletedb() {
    this.indexedDB.deleteDatabase(this.myDB.name)
    // console.log(this.myDB.name + '数据库已删除')
  }

  closeDB() {
    // 关闭数据库
    this.myDB.db.close()
    // console.log('数据库已关闭')
  }

  addData(storename, data) {
    // 添加数据，重复添加会报错
    const store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    let request
    for (let i = 0; i < data.length; i++) {
      request = store.add(data[i])
      request.onerror = () => {
        // console.error('add添加数据库中已有该数据')
      }
      request.onsuccess = () => {
        // console.log('add添加数据已存入数据库')
      }
    }
  }

  putData(storename, data) {
    // 添加数据，重复添加会更新原有数据
    const store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    let request
    for (let i = 0; i < data.length; i++) {
      request = store.put(data[i])
      request.onerror = () => {
        // console.error('put添加数据库中已有该数据')
      }
      request.onsuccess = () => {
        // console.log('put添加数据已存入数据库')
      }
    }
  }

  getDataByKey(storename, key, callback) {
    // 根据存储空间的键找到对应数据
    const store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    const request = store.get(key)
    request.onerror = () => {
      // console.error('getDataByKey error')
      callback.call(this, null)
    }
    request.onsuccess = e => {
      const result = e.target.result
      // console.log('查找数据成功')
      callback.call(this, result)
    }
  }

  deleteData(storename, key) {
    // 删除某一条记录
    const store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    store.delete(key)
    // console.log('已删除存储空间' + storename + '中' + key + '记录')
  }

  clearData(storename) {
    // 删除存储空间全部记录
    const store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename)
    store.clear()
    // console.log('已删除存储空间' + storename + '全部记录')
  }
}

export default INDEXDB
