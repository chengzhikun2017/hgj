import fetch from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
const cards = {
  state: {
    cardsListCC:[],
    cardsListDC:[],
  },
  getters: {
    cards_listCC(s){
      return s.cardsListCC
    },
    cards_listDC(s){
      return s.cardsListDC
    }
  },
  mutations: {
    cards_clearListCC(s){
      s.cardsListCC=[]
    },
    cards_clearListDC(s){
      s.cardsListDC=[]
    },
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
        state.cardsListCC=res
      })
    },
    cards_getListDC({state}){
       fetch({
        url:'card/dc',
      }).then(res=>{
        state.cardsListDC=res
      })
    },
  }
}

export default cards