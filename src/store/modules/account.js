import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
const account = {
  state: {
    phone: 13816938525,
    captcha: '',
    verifyCode:'',
    // isPhoneRegisted:false,
  },
  getters: {},
  mutations: {
    account_setPhone(s, phone) {
      s.phone = phone
    },
    account_setCaptcha(s, captcha) {
      s.captcha = captcha
    },
    account_setVerifyCode(s,code){
      s.verifyCode=code
    },
  },
  actions: {
    account_isPhoneRegister(context, phone) {
      console.log('context', context)
      var promise = fetch({
        // method:'get',
        url: '/account/isPhoneRegister',
        params: {
          phone: phone
        },
      })
      return promise
    },
    account_getVerifyCode(context,code) {
      console.log('code',code)
      // return
      fetch({
        url: '/account/sendVerifyCode',
        params: {
          phone: context.state.phone,
          code:code
        },
      }).then(res => {
        this.hgjToast('已发送')
      }, err => {})
    },
    account_signUp({state},{password,code}) {
      return fetch({
        url: 'account/register',
        params:{
          phone:state.phone,
          code:code,// 存不存store?
          password:password,
          ancestor:0,
          qudao:'',
        }
      })
    }
  }
}

export default account