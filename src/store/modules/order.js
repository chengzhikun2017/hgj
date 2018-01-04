import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
const order = {
  state: {
    products:[],
  },
  getters: {},
  mutations: {
    order_clearProductList(s){
      s.products=[]
    }
  },
  actions: {
    order_pay({},{payType,orderId,cardId,verCode,}){
      var promise=fetch({
        url:'order/pay',
        params:{
          payType,
          orderId,
          cardId,
          verCode,
        },
      })
      return promise
    },
    order_productsListGet({state},){
      console.log('----')
      fetch({
        url:'/product/list'
      }).then(res=>{
        console.log('product list res',res)
        state.products=res
      })
    },
    order_createUpgrade({},productId){
      var promise=fetch({
        url:'order/createLevelUpgradeOrder',
        params:{
          productId,
          
        },
      })
      return promise
    },
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
    order_unspayPay({},{orderId,cardId,name,idCardNo,cardNo,phone,}){
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