import fetch from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
const cards = {
  state: {
    cardsListCC:[],
    cardsListDC:[],
  },
  getters: {
    cards_listCC(s){
      console.log('s',s)
      return s.cardsListCC
    },
    cards_listDC(s){
      console.log('s',s)
      return s.cardsListDC
    }
  },
  mutations: {
  },
  actions: {
    cards_getInfo({},cardNo){
      return fetch({
        url:'card/info',
        params:{
          cardNo,
        },
      })
    },
    cards_getListCC({state}){
       fetch({
        url:'card/cc',
      }).then(res=>{
        console.log('res',res)
        state.cardsListCC=res
      })
    }
  }
}

export default cards