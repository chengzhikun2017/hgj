import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
const balance = {
  state: {

  },
  getters: {},
  mutations: {

  },
  actions: {
    balance_cashApply({},{fee,cardId,moneyType}){
      // moneyType=moneyType||'UNFREEZE_MONEY'
      var promise=fetch({
        url:'cash/apply',
        params:{
          moneyType:moneyType,
          // moneyType:'UNFREEZE_MONEY',
          fee,
          cardId,
        },
      })
      return promise
    },
    balance_applyRecord({},{moneyType}){
      moneyType=moneyType||null
      var promise=fetch({
        url:'cash/records',
        params:{
          moneyType:moneyType,
          page:1,
          limit:9999,
        },
      })
      return promise
    },
  }
}

export default balance