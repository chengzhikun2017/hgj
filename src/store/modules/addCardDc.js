import fetch from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
class defaultInfo{
  constructor(props) {
    this.name=null
    // this.idCardNo=null
    this.idCardNo=null
    this.phone=null
    this.cardNo='6214852109847213'
  }
}
const addCardDC = {
  state: {
    info:new defaultInfo(),
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
      s.info=new defaultInfo()
    },
  },
  actions: {
    addCardCC_delete({state,dispatch},cardId){
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
    addCardDC_submit({state,getters,dispatch}){
      var promise= fetch({
        url:'card/bindDC',
        // method:'post',
        params:state.info,
      })
      promise.then(res=>{
        dispatch('cards_getListDC')
      })
      return promise
    },
    addCardDC_bindSC({},cardId){
      var promise= simpleFetch({
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