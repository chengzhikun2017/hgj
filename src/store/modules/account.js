import fetch from '../../utils/fetch.js'
import {simpleFetch} from '../../utils/fetch.js'
const account = {
  state: {
    phone:'13816938525',
    // isPhoneRegisted:false,
  },
  getters: {},
  mutations: {
    account_setPhone(s,phone){
      s.phone=phone
    },
  },
  actions: {
    account_isPhoneRegister(context,phone){
      console.log('context',context)
      var promise=fetch({
        // method:'get',
        url:'/account/isPhoneRegister',
        params:{
          phone:phone
        },
      })
      // .then(res=>{
      //   console.log('res',res)
      //   context.state.isPhoneRegisted=true
      //   // context.state.account.isPhoneRegisted=!!res.status?true:false
      //   // context.state.account.phone=phone
      // },err=>{})
      return promise
    },
    account_getVerifyCode(context){
      return fetch({
        url:'/account/sendVerifyCode',
        params:{
          phone:context.state.phone,
        },
      })
    },
  }
}

export default account
