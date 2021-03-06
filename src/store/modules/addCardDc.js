import fetch from '../../utils/fetch.js'
import {simpleFetch} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
class defaultInfo{
  constructor(props) {
    this.name=null
    // this.idCardNo=null
    this.idCardNo=null
    this.phone=null
    // this.cardNo='6214852109847213'
    this.cardNo=null
    // '6217850800002045332'
  }
}
const addCardDC = {
  state: {
    info:new defaultInfo(),
    // info:{
    //   name:null,
    //   idCardNo:null,
    //   phone:null,
    //   cardNo:null,
    // },
  },
  getters: {},
  mutations: {
    addCardDC_setValue(s,cardInfoObj){
      for(let key in s.info){
        if(cardInfoObj.hasOwnProperty(key)){
          s.info[key]=cardInfoObj[key]
        }
      }
    },
    addCardDC_resetValue(s,){
      console.log('%c addCardDC_resetValue', 'color:red')
      s.info=new defaultInfo()
      // for(let key in info){
      //   console.log('key info',info[key],key)
      //   s.info[key]=info[key]
      // }
      // s.info.name=null
      // s.info.idCardNo=null
      // s.info.phone=null
      // s.info.cardNo=null
    },
  },
  actions: {
    addCardDC_delete({state,dispatch},cardId){
      var promise=simpleFetch({
        url:'card/delCardDC',
        // method:'post',
        params:{
          cardId,
        },
      })
      promise.then(res=>{
        if(res.data&&res.data.message==='success'){
          HGJ_VUE.hgjToast('已删除')
          dispatch('cards_getListDC')
        }
      })
      return promise
    },
    addCardDC_submit({state,getters,dispatch,commit}){
      var promise= fetch({
        url:'card/bindDC',
        // method:'post',
        params:state.info,
      })
      promise.then(res=>{
        commit('addCardDC_resetValue')
        dispatch('cards_getListDC')
      })
      return promise
    },
    addCardDC_bindSC({dispatch},cardId){
      var promise= fetch({
        url:'card/bindSC',
        // method:'post',
        params:{
          cardId,
        }
      })
      //todo: 本地维护数据
      promise.then(res=>{
        dispatch('cards_getListDC')
      })
      return promise
    },
  }
}

export default addCardDC