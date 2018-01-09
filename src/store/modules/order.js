import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
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
    order_getStatusAfterPay({commit,dispatch},orderId,onSucc){
      var i=0
      var timer=setInterval(()=>{
        dispatch('order_status',orderId).then(res=>{
          console.log('res order_getStatusAfterPay',res)
          i++
          let status=res.status
          if(status!=='DOING'&&status!=='NOTPAY'&&status!=='REFUND_DOING'){
            clearInterval(timer)
            if(status==='SUCCESS'||status==='REFUND'){
              HGJ_VUE.hgjAlert({
                title:res.statusRemark,
                options:[{
                  text:'确定',callback:()=>{
                    commit('router_backToIndex')
                    helper.goPage(-1)
                  },
                }]
              })
              return
            }
            if(status==='FAILED'){
              HGJ_VUE.hgjAlert({
                title:res.statusRemark,
                options:[{
                  text:'确定',callback:()=>{},
                }]
              })
              return
            }
            
          }
        })
      },300)
      // NOTPAY:      未支付
      // SUCCESS:     支付成功
      // DOING:       正在处理中
      // FAILED:      支付失败
      // REFUND:      已退款
      // REFUND_DOING:正在退款
    },
    order_status({},orderId){
      if(orderId==undefined){
        console.error('need orderId to find order status')
      }
      var promise=fetch({
        url:'order/status',
        params:{
          orderId,
        },
      })
      return promise
    },
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
      fetch({
        url:'/product/list'
      }).then(res=>{
        // console.log('product list res',res)
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
    order_createActive({}){
      var promise=fetch({
        url:'order/createAccountActiveOrder',
      })
      return promise
    },
    order_createPlan({},{cardId,fee,period,startDate,endDate,percent,}){
      var promise=fetch({
        url:'order/createRepaymentPlanOrder',
        params:{
          cardId,
          fee,
          period,
          startDate,
          endDate,
          percent,
        },
      })
      
      return promise
    },
  }
}

export default order