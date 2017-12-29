import fetch from '../../utils/fetch.js'
import {simpleFetch} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
class defaultInfo{
  constructor(props) {
    this.name=null
    this.phone=null
    this.idCardNo=null
    this.cardNo=null
    this.year=null
    this.month=null
    this.fullYear=null
    this.fullMonth=null
    this.cvv2=null
    this.billDate=null
    this.repaymentDate=null
    this.validateCode=null
  }
}
const addCardCC = {
  state: {
    info:new defaultInfo(),
    // info:{
      // name:'黄哈哈',//：名字
      // phone:'13816938525',//：手机号
      // idCardNo:'321282199201264216',//：身份证
      // // cardNo:'4514617650886304',//：卡号 visa
      // cardNo:'6259960047813225',//：卡号 ABC
      // year:null,//：卡片有效期年
      // month:null,//：卡片有效期月
      // fullYear:2019,
      // fullMonth:11,
      // cvv2:231,//：安全码
      // billDate:7,//：账单日期
      // repaymentDate:25,//：还卡日期
      // validateCode:null,//：绑卡验证码（调用“获取绑卡验证码（合利宝）”接口获取）
    // },
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
      s.info=new defaultInfo()
    },
  },
  actions: {
    addCardCC_delete({state,dispatch},cardId){
      var promise=simpleFetch({
        url:'card/delCardCC',
        // method:'post',
        params:{
          cardId,
        },
      })
      promise.then(res=>{
        if(res.data&&res.data.message==='success'){
          HGJ_VUE.hgjToast('已删除')
          dispatch('cards_getListCC')
        }
      })
      return promise
    },
    addCardCC_submit({state,dispatch,getters,commit}){
      state.info.month=(state.info.fullMonth).toString().padStart(2,0)
      state.info.year=(state.info.fullYear).toString().slice(2,4)
      var promise= fetch({
        url:'card/bindCC',
        // method:'post',
        params:state.info,
      })
      promise.then(res=>{
        let {name,idCardNo}=state.info
        let isRealNameValidated=getters.account_userInfo.name
        dispatch('cards_getListCC')
        commit('addCardCC_resetValue')
        if(!isRealNameValidated){
          dispatch('account_realNameVerify',{name,idCardNo})
        }
      })
      return promise
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
    },
    addCardCC_modifyCC({},params){
      return simpleFetch({
        url:'card/modifyCC',
        params,
      })
    }

  }
}

export default addCardCC