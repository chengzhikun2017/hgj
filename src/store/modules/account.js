import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
const account = {
  state: {
    // phone: '13365225235',
    phone: null,
    captcha: '',
    verifyCode:'',
    userId:null,
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
      let promise=fetch({
        url: '/account/sendVerifyCode',
        params: {
          phone: context.state.phone,
          code:code
        },
      })
      promise.then(res => {
        HGJ_VUE.hgjToast('已发送')
      }, err => {})
      return promise
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
    },
    account_login({state},{phone,pwd}){
      var loginPromis=fetch({
        url: 'account/login',
        params:{
          phone:phone,
          password:pwd,
        }
      })
      loginPromis.then(res=>{
        console.log('res account login',res)
        state.userId=res.userId
      })
      return loginPromis
    }
  }
}

export default account