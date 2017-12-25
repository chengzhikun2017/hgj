import fetch from '../utils/fetch.js'

class test {
  static isPhoneRegister(phone){
    return fetch({
      url:'/account/isPhoneRegister',
      params:{
        phone:phone
      },
    })
  }
  static testPost(){
    return fetch({
      url:'/card/bindCC',
      method:'post'
    })
  }
  static isPhoneRegister(phone){
    return fetch({
      url:'/account/isPhoneRegister',
      params:{
        phone:phone
      },
    })
  }
}
export default test