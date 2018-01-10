import router from '../router'
import config from '../config.js'
import {HGJ_VUE} from '../main.js' 
export default class helper {
  static urlConcat(url, obj) {
    var str = '',
      queryArr = []
    for (var key in obj) {
      // str = str + key + '=' + obj[key] + '&'
      queryArr.push(key + '=' + obj[key])
    }
    str = queryArr.join('&')
    str = url + '?' + str
    return str
  }

  static goPage(path,callback){
    if (typeof path === 'number') {
      // console.log('back unknown', 1)
      router.go(path)
    } else {
      router.push(config.routerRoot+path)
    }
    if (callback !== undefined && callback instanceof Function) {
      callback()
    }
  }
  
  // 'upgrade','active'
  // free,pay
  static goBuyFree(type){
    this.goPayPage('/pay_free',type)
  }

  static goBuy(type){
    this.goPayPage('/pay',type)
  }
  static goNewPlanPage(card){
    if(!HGJ_VUE.$store.state.account.isActive){
      this.goPage('/activeaccount')
      return
    }
    this.goPage(this.urlConcat('/plan',card))
  }
  // '/pay'
  // '/pay_free'
  static goPayPage(src,type){
    var crrtLv=HGJ_VUE.$store.state.account.level
    if(type==='active'){
      let productId,products=HGJ_VUE.$store.state.order.products
      productId=products[0].productId;
      HGJ_VUE.$store.dispatch('order_createActive').then(res=>{
        var orderId=res.orderId
        let url =helper.urlConcat(src,{
          orderId,
          productId,
        })
        helper.goPage(url)
      })
    }else if(type==='upgrade'){
      let productId,products=HGJ_VUE.$store.state.order.products
      productId=products[crrtLv+1].productId;
      HGJ_VUE.$store.dispatch('order_createUpgrade',productId).then(res=>{
        var orderId=res.orderId
        let url =helper.urlConcat(src,{
          orderId,
          productId,
        })
        helper.goPage(url)
      })
    }

  }

  static replaceRouter(path){
    router.replace(config.routerRoot+path)
  }

  static saveUserInfoToLocal(data){
    console.log('data')
    //save user info to localstorage
    //后续单项的更新，也通过此方法更新
  }

  static resetInitialInfo(){
    HGJ_VUE.$store.commit('cards_clearListCC')
    HGJ_VUE.$store.commit('cards_clearListDC')
    HGJ_VUE.$store.commit('account_reset')
    // HGJ_VUE.$store.commit('order_clearProductList')

  }

  static getInitialInfo(){
    HGJ_VUE.$store.dispatch('cards_getListCC')
    HGJ_VUE.$store.dispatch('cards_getListDC')
    HGJ_VUE.$store.dispatch('account_getUserInfo')
    HGJ_VUE.$store.dispatch('order_productsListGet')
  }
}