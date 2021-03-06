import router from '../router'
import config from '../config.js'
import {
  HGJ_VUE
} from '../main.js'
import commonRemind from './commonRemind.js'
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
  static padStart0_2(v){
    if(v>=10){
      return v
    }else{
      return '0'+v
    }
  }
  static goPage(path, callback,stopGo) {
    if(stopGo){
      HGJ_VUE.hgjAlert('服务暂时关闭')
      return
    }
    if (typeof path === 'number') {
      // console.log('back unknown', 1)
      router.go(path)
    } else {
      router.push(config.routerRoot + path)
    }
    if (callback !== undefined && callback instanceof Function) {
      callback()
    }
  }
  static goPageLoged(path, callback,stopGo){
    if(stopGo){
      HGJ_VUE.hgjAlert('服务暂时关闭')
      return
    }
    if(!HGJ_VUE.$store.state.account.isLoged){
      commonRemind.unloginRemind()
      return
    }
    this.goPage(path,callback)
  }
  static getProductInfo(id){
    if(HGJ_VUE&&HGJ_VUE.$store){
      var products = HGJ_VUE.$store.state.order.products
      return products.find(item => {
        return item.productId == id
      })||{}
    }
    //todo: 
  }
  // 'upgrade','active'
  // free,pay
  static goBuyFree(type) {
    this.goPayPage('/pay_free', type)
  }

  static goBuy(type) {
    this.goPayPage('/pay', type)
  }
  static goNewPlanPage(card) {
      if (!HGJ_VUE.$store.state.account.isActive) {
        this.goPage('/activeaccount')
        return
      }
      this.goPage(this.urlConcat('/plan', {cardId:card.cardId}),undefined,1)
    }
    // '/pay'
    // '/pay_free'
  static goPayPage(src, type) {
    if (type === 'active') {
      let productId, products = HGJ_VUE.$store.state.order.products
      productId = products[0].productId;
      HGJ_VUE.$store.dispatch('order_createActive').then(res => {
        var orderId = res.orderId
        let url = helper.urlConcat(src, {
          orderId,
          productId,
        })
        helper.goPage(url)
      })
    } else if (type === 'upgrade') {
      var crrtLv = HGJ_VUE.$store.state.account.level
      let productId, products = HGJ_VUE.$store.state.order.products
      if(crrtLv===2){
        HGJ_VUE.hgjToast('已经是最高级别')
        return
      }
      switch(crrtLv){
        case 0:productId=20001 ;break;
        case 4:productId=20002 ;break;
        case 3:productId=20003 ;break;
        default: productId=-1;
      }
      HGJ_VUE.$store.dispatch('order_createUpgrade', productId).then(res => {
        var orderId = res.orderId
        let url = helper.urlConcat(src, {
          orderId,
          productId,
        })
        helper.goPage(url)
      })
    }
  }

  static replaceRouter(path) {
    router.replace(config.routerRoot + path)
  }

  static saveUserInfoToLocal(data) {
    console.log('data')
      //save user info to localstorage
      //后续单项的更新，也通过此方法更新
  }

  static updateOnOrderSucc(productId,params){
    let state=HGJ_VUE.$store.state
    let account=state.account
    console.log('%c loglog','color:red',state,account,productId)
    switch(productId){
      case 20000: account.isActive=true; break;
      case 20001: account.level=4; break;
      case 20002: account.level=3; break;
      case 20003: account.level=2; break;
      case 10000:handleNewPlan(); break;
    }
    function handleNewPlan(){
      setTimeout(()=> {
        HGJ_VUE.$store.dispatch('account_getUserInfo')
      }, 2000);
    }
  }

  static resetInitialInfo() {
    HGJ_VUE.$store.commit('cards_clearListCC')
    HGJ_VUE.$store.commit('cards_clearListDC')
    HGJ_VUE.$store.commit('account_reset')
    HGJ_VUE.$store.commit('share_resetReport')
      // HGJ_VUE.$store.commit('order_clearProductList')
  }

  static getInitialInfo() {
    HGJ_VUE.$store.dispatch('cards_getListCC')
    HGJ_VUE.$store.dispatch('cards_getListDC')
    HGJ_VUE.$store.dispatch('account_getUserInfo')
    HGJ_VUE.$store.dispatch('order_productsListGet')
    HGJ_VUE.$store.dispatch('share_getCount')
    HGJ_VUE.$store.dispatch('share_viewCount')
  }
}