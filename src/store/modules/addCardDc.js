import fetch from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
class defaultInfo{
  constructor(props) {
    this.name=null
    this.idCardNo=null
    //6214852109847213
    this.phone=null
    this.cardNo=null
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
        HGJ_VUE.hgjToast('绑定成功')
        helper.goPage(-1)
      })
      return promise
    },
  }
}

export default addCardDC