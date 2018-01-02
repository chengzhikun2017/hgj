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
    isRealNamed:false,
    name:null,
    idCardNo:null,
    // isPhoneRegisted:false,
  },
  getters: {
    account_userInfo(state){
      return state
    },
  },
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
      var promise= fetch({
        url: 'account/register',
        params:{
          phone:state.phone,
          code:code,// 存不存store?
          password:password,
          ancestor:0,
          qudao:'',
        }
      })
      // promise.then(res=>{

      // })
      return promise
    },
    account_login({state,dispatch},{phone,pwd}){
      var loginPromise=fetch({
        url: 'account/login',
        params:{
          phone:phone,
          password:pwd,
        }
      })
      loginPromise.then(res=>{
        console.log('res account login',res)
        state.userId=res.userId
        state.phone=phone
        dispatch('account_getUserInfo')
      })
      return loginPromise
    },
    account_logout(){
      simpleFetch({
        url:'account/logout',
      }).then(res=>{
        console.log('res log out',res)
        if(res.data.error===0){
          HGJ_VUE.hgjToast('已登出')
        }
      })
    },
    account_checkSession({commit,dispatch}){
      var promise= simpleFetch({
        url:'account/checkSession',
      })
      promise.then(res=>{
        if(res.data.data&&res.data.data.userId){
          dispatch('account_getUserInfo')
        }else if(res.data.message==='请登录'){
          console.log('未登录')
        }
      })
      return promise
    },
    account_getUserInfo({state}){
      fetch({
        url:'profile/info',
      }).then(res=>{
        if(res.name&&res.idCardNo){
          state.isRealNamed = true
          state.name = res.name
          state.idCardNo = res.idCardNo
        }
      })
    },
    account_realNameVerify({state},{name,idCardNo}){
      console.log('name,idCardNo%c','color:red',name,idCardNo)
      var promise=fetch({
        url:'profile/realName',
        params:{
          name,
          idCardNo,
        },
      })
      promise.then(res=>{
        console.log('real name verify ',res)
        state.name=name
        state.idCardNo=idCardNo
      })
    },
    account_modifyPwd(){
      fetch({
        url:'profile/modifyPwd',
        params:{
          password:null,
          newPassword:null,
        },
      })
    },
    account_findPwd(){
      fetch({
        url:'account/findPwd',
        params:{
          phone:null,
          code:null,
          password:null,
        },
      })
    },
  }
}

export default account