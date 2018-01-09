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
    balance_cashApply({},{fee,cardId}){
      var promise=fetch({
        url:'cash/apply',
        params:{
          moneyType:'UNFREEZE_MONEY',
          fee,
          cardId,
        },
      })
      return promise
    },
    balance_applyRecord({},{}){
      var promise=fetch({
        url:'cash/records',
        params:{
          moneyType:'MONEY',
          page:1,
          limit:9999,
        },
      })
      return promise
    },
  }
}

export default balance