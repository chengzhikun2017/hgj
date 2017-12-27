import router from '../router'
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
      router.push(path)
    }
    if (callback !== undefined && callback instanceof Function) {
      callback()
    }
  }
}