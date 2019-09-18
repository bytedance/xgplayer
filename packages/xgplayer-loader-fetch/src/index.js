import Context from "../../xgplayer-utils/src/Context";
const READ_STREAM = 0;
const READ_TEXT = 1;
const READ_JSON = 2;
class FetchLoader {
  /**
   * The constructior of FetchLoader.
   * @param {*} configs 
   */

  constructor (configs) {
    this.configs = Object.assign({},configs);
    this.url = null;
    this.status = 0;
    this.errir = null;
    
    this.buffer = this.configs.buffer;
    this.readtype = this.configs.readtype || READ_STREAM;
    this._reader = null;
  }

  static get type () {
    return 'loader';
  }

  load(url, opts) {
    let _this = this;
    this.url = url;

    //TODO: Add Ranges
    let params = this.getParams(opts);

    return self.fetch(this.url, params).then(function(response){
      _this.status = response.status;
      _this.loading = true;
      return _this._onFetchResponse.call(_this, response);
    })
  }

  _onFetchResponse(response) {
    let _this = this;
    let buffer = this._context.getInstance(this.buffer);
    if (response.ok === true) {
      switch(this.readtype) {
        case READ_JSON:
          response.json().then((data)=>{
            if(buffer) {
              buffer.push(data);
              _this.emit(_this.tag, "LOADER_COMPLETE", buffer);
            } else {
              _this.emit(_this.tag, "LOADER_COMPLETE", data);
            }
          });
          break;
        case READ_TEXT:
          response.text().then((data)=>{
            if(buffer) {
              buffer.push(data);
              _this.emit(_this.tag, "LOADER_COMPLETE", buffer);
            } else {
              _this.emit(_this.tag, "LOADER_COMPLETE", data);
            }
          });
          break;
        case READ_STREAM:
        default:
          return this._onReader.call(this, response.body.getReader());
      }
    }
  }

  _onReader(reader) {
    let buffer = this._context.getInstance(this.buffer);

    if(!buffer) {
      this._reader.cancel();
    }

    this._reader = reader;
    if (this.loading === false) {
      return;
    }

    let _this = this;
    // reader read function returns a Promise. get data when callback and has value.done when disconnected.
    // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
    this._reader && this._reader.read().then(function(val) {
      if(val.done) {
        //TODO: 完成处理
        _this.loading = false;
        _this.status = 0;
        _this.emit(_this.tag, "LOADER_COMPLETE", buffer);
        return;
      }

      buffer.push(val.value);

      // TODO: 需要统一事件！梳理一哈子哈？！
      _this.emit(_this.tag, "LOADER_DATALOADED", buffer);
      return _this._onReader(reader);
    }).catch(function(error) {
      console.log(error);
    });
  }


  getParams(opts) {
    let options = Object.assign({}, opts);
    let headers = new self.Headers();

    let params = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };

    // add custmor headers
    // 添加自定义头
    if (typeof this.configs.headers === 'object') {
      let configHeaders = this.configs.headers;
      for (let key in configHeaders) {
        if (configHeaders.hasOwnProperty(key)) {
          headers.append(key, configHeaders[key]);
        }
      }
    }

    if (options.cors === false) {
      params.mode = 'same-origin';
    }

    // withCredentials is disabled by default
    // withCredentials 在默认情况下不被使用。
    if (options.withCredentials) {
      params.credentials = 'include';
    }

    //TODO: Add ranges;
    return params;
  }

  cancel () {
    if (this._reader) {
      this._reader.cancel()
      this._reader = null
    }
  }
}

// 用于调试

window.Context = Context;

export default FetchLoader;
