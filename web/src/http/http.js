import axios from 'axios'
import store from '@/store'

export default {
  baseUrl: "",
  request: function (_method, _url, _reqdata) {
    _reqdata = _reqdata || {};

    var config = {
      method: _method,
      url: _url,
      baseURL: this.baseUrl,
      withCredentials: true,
      timeout: 30000,
    };

    if (/^http[s]?:\/\//.test(_url)) {
      config.baseURL = '';
    }

    switch (_method.toLowerCase()) {
      case 'get':
        config.params = _reqdata;
        break;
      case 'post':
      case 'put':
      case 'patch':
        config.data = _reqdata;
        break;
      default:
        break;
    }

    return new Promise(function (resolve, reject) {
      axios(config).then(function (resData) {
        let result = resData.data;
        let MESSAGE = result.msg;
        if (result.code == '200') {
          let MESSAGE = null;
          resolve(result);
        }
        else{
          // alert(MESSAGE);
          store.commit('msg', MESSAGE)
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  get: function (_url, _reqdata) {
    return this.request("get", _url, _reqdata);
  },
  post: function (_url, _reqdata) {
    return this.request("post", _url, _reqdata);
  }
}
