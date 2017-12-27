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
      phone:13816938525,//：手机号
      idCardNo:123456789009876,//：身份证
      cardNo:4392261123942392,//：卡号
      year:2019,//：卡片有效期年
      month:11,//：卡片有效期月
      cvv2:231,//：安全码
      billDate:7,//：账单日期
      repaymentDate:25,//：还卡日期
      validateCode:123123,//：绑卡验证码（调用“获取绑卡验证码（合利宝）”接口获取）
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
        month:null,
        cvv2:null,
        billDate:null,
        repaymentDate:null,
        validateCode:null,
      }
    },
  },
  actions: {
    addCardCC_submit({state}){
      return fetch({
        url:'card/bindCC',
        method:'post',
        params:state.info,
      })
    }

  }
}

export default addCardCC