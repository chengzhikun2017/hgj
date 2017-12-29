import router from '../router'
import config from '../config.js'
export default class helper {
  static urlConcat(url, obj) {
    var str = '',
      queryArr = []
    for (var key in obj) {
      // str = str + key + '=' + obj[key] + '&'
      queryArr.push(key + '=' + obj[key])
    }
    str = queryArr.join('&')
    str = url + '?' + str
    return str
  }
  static goPage(path,callback){
    if (typeof path === 'number') {
      // console.log('back unknown', 1)
      router.go(path)
    } else {
      router.push(config.routerRoot+path)
    }
    if (callback !== undefined && callback instanceof Function) {
      callback()
    }
  }
  static replaceRouter(path){
    router.replace(path)
  }
  static saveUserInfoToLocal(data){
    console.log('data')
    //save user info to localstorage
    //后续单项的更新，也通过此方法更新
  }
}