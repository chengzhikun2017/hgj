import fetch from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
const addCardCC = {
  state: {
    // info:{
    //   name:null,//：名字
    //   phone:null,//：手机号
    //   idCardNo:null,//：身份证
    //   cardNo:null,//：卡号
    //   year:null,//：卡片有效期年
    //   month:null,//：卡片有效期月
    //   cvv2:null,//：安全码
    //   billDate:null,//：账单日期
    //   repaymentDate:null,//：还卡日期
    //   validateCode:null,//：绑卡验证码（调用“获取绑卡验证码（合利宝）”接口获取）
    // },
    info:{
      name:'黄哈哈',//：名字
      phone:'13816938525',//：手机号
      idCardNo:'321282199201264216',//：身份证
      cardNo:'6225757525926177',//：卡号
      year:null,//：卡片有效期年
      month:null,//：卡片有效期月
      fullYear:2019,
      fullMonth:11,
      cvv2:231,//：安全码
      billDate:7,//：账单日期
      repaymentDate:25,//：还卡日期
      validateCode:null,//：绑卡验证码（调用“获取绑卡验证码（合利宝）”接口获取）
    },
  },
  getters: {},
  mutations: {
    addCardCC_setValue(s,cardInfoObj){
      for(let key in s.info){
        if(cardInfoObj.hasOwnProperty(key)){
          s.info[key]=cardInfoObj[key]
        }
      }
    },
    addCardCC_resetValue(s,){
      s.info={
        name:null,
        phone:null,
        idCardNo:null,
        cardNo:null,
        year:null,
        fullYear:null,
        month:null,
        fullMonth:null,
        cvv2:null,
        billDate:null,
        repaymentDate:null,
        validateCode:null,
      }
    },
  },
  actions: {
    addCardCC_submit({state}){
      state.info.month=(state.info.fullMonth).toString().padStart(2,0)
      state.info.year=(state.info.fullYear).toString().slice(2,4)
      return fetch({
        url:'card/bindCC',
        method:'post',
        params:state.info,
      })
    },
    addCardCC_getCode({state}){
      let promise= fetch({
        url:'card/bindCardValidateCode',
        params:{
          phone:state.info.phone,
          cardNo:state.info.cardNo,
        }
      })
      promise.then(res=>{
        HGJ_VUE.hgjToast('已发送')
      })
      return promise
    }

  }
}

export default addCardCC