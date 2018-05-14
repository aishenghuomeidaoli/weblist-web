import axios from 'axios'
import store from '@/store'

export default {
  baseUrl: "",
  request: function(_method, _url, _reqdata){
    _reqdata = _reqdata || {};

    var config = {
      method: _method,
      url: _url,
      baseURL:this.baseUrl,
      withCredentials: true,
      timeout: 30000,
    };

    if(/^http[s]?:\/\//.test(_url)){
      config.baseURL = '';
    }

    switch(_method.toLowerCase()){
      case 'get':
        config.params = _reqdata;
        break;
      case 'post':
      case 'put':
      case 'patch':
        config.data = _reqdata;
        break;
      default:
        console.log("http.request没有匹配到合适的方法。")
        break;
    }

    store.commit("setLoadingNum", 1);

    let set_time_out = setTimeout(function(){
      store.commit("setLoadingShowOrHide", true);
    }, 200);

    return new Promise(function(resolve, reject){
      axios(config).then(function(resData){
        clearTimeout(set_time_out);
        store.commit("setLoadingNum", -1);
        if(store.state.loading.num < 1){
          store.commit("setLoadingShowOrHide", false);
        }
        let result = resData.data;
        let MESSAGE = null;
        switch (result.code) {
          case "200":
            MESSAGE = null;
            break;
          case "405":
            MESSAGE = "请求方式错误";
            break;
          default:
            break;
        }

        if(MESSAGE){
          wv.Toast({duration: 2000, message: MESSAGE, icon: 'warn'})
        }

        if(result.code == 200){
          resolve(result);
        }
      }).catch(function(error){
        clearTimeout(set_time_out);
        store.commit("setLoadingNum", -1);
        if(store.state.loading.num < 1){
          store.commit("setLoadingShowOrHide", false);
        }
        wv.Toast({duration: 2000, message: "服务器发生了未知异常。", icon: 'warn'})
        reject(error);
      });
    });
  },
  get: function(_url, _reqdata){
    return this.request("get", _url, _reqdata);
  },
  post: function(_url, _reqdata){
    return this.request("post", _url, _reqdata);
  }
}
