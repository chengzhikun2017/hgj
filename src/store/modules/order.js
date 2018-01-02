import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
const order = {
  state: {
    
  },
  getters: {},
  mutations: {},
  actions: {
    order_unspayGetCode({},{orderId,cardId}){
      var promise=fetch({
        url:'order/unspay/sendValidateCode',
        params:{
          orderId,
          cardId,
        },
      })
      return promise
    },
    order_unspayPay({},){
      var promise=fetch({
        url:'order/unspay/preparePay',
        params:{
          orderId,
          cardId,
          name,
          idCardNo,
          cardNo,
          phone,
        },
      })
      return promise
    },
    order_createActive({},){
      var promise=fetch({
        url:'order/createAccountActiveOrder',
      })
      return promise
    }
  }
}

export default order