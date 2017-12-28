import Vue from 'vue'
import Router from 'vue-router'
import cards from '../pages/cards.vue'
import mine from '../pages/mine.vue'
import pay from '../pages/pay.vue'
import promotion from '../pages/promotion.vue'
import test from '../pages/testPage/test.vue'
import test1 from '../pages/testPage/test1.vue'
import test2 from '../pages/testPage/test2.vue'
import test3 from '../pages/testPage/test3.vue'
import error_page from '../pages/testPage/error.vue'

import login from '@/pages/login.vue'
import signUp from '@/pages/signUp.vue'
import plan from '@/pages/plan.vue'
import cardDetail from '@/pages/cardDetail.vue'
import addCreditCard1 from '@/pages/addCreditCard1.vue'
import addCreditCard2 from '@/pages/addCreditCard2.vue'
import addBankCard from '@/pages/addBankCard.vue'
import planrecords from '@/pages/planrecords.vue'
import payresult from '@/pages/payresult.vue'
import activeAccount from '@/pages/activeAccount.vue'
import order from '@/pages/order.vue'
import orderEdit from '@/pages/orderEdit.vue'
import balance from '@/pages/balance.vue'
import register from '@/pages/register.vue'
import paybankcard from '@/pages/paybankcard.vue'
import populizeScore from '@/pages/populizeScore.vue'
import populizeShare from '@/pages/populizeShare.vue'
Vue.use(Router)
/**
 * 针对某一个组件创建路由数组（多个路由）
 * @param  {string || array} paths     路由字符串或者路由数组
 * @param  {string} name      路由名称
 * @param  {Vue component} component 指定的组件/模块
 * @param  {[配置]} options   路由的配置，e.g. meta:{ keepAlive:true}
 * @return {[type]}           [description]
 */
var rootPath = ''
var newRoute = function(paths, name, component, options) {
  // console.log('typeof paths', typeof paths)
  if (typeof paths === 'string') {
    paths = [paths]
  }
  if (options === undefined) {
    options = {}
  }
  var l = paths.length,
    routes = [],
    newRoute, i
  for (i = 0; i < l; i++) {
    newRoute = new Object({
      path: rootPath + paths[i],
      name: name + '_' + i,
      component: component,
    })
    Object.assign(newRoute, options)
    routes.push(newRoute)
  }
  return routes
}
var routes = [],
  basicRoutes = [],
  route_test = [],
  index = []
index = index.concat(
  newRoute('/cards', 'cards', cards),
  newRoute('/mine', 'mine', mine),
  newRoute('/promotion', 'promotion', promotion),
  newRoute('/pay', 'pay', pay),
  newRoute('/login', 'login', login),
  newRoute('/signUp', 'signUp', signUp),
  newRoute('/plan', 'plan', plan),
  newRoute('/carddetail', 'cardDetail', cardDetail),
  newRoute('/addCreditcard1', 'addCreditCard1', addCreditCard1),
  newRoute('/addCreditcard2', 'addCreditCard2', addCreditCard2),
  newRoute('/addBankCard', 'addBankCard', addBankCard),
  newRoute('/planrecords', 'planrecords', planrecords),
  newRoute('/payresult', 'payresult', payresult),
  newRoute('/activeaccount', 'activeAccount', activeAccount),
  newRoute('/order', 'order', order),
  newRoute('/orderedit', 'orderEdit', orderEdit),
  newRoute('/balance', 'balance', balance),
  newRoute('/register', 'register', register),
  newRoute('/paybankcard', 'paybankcard', paybankcard),
  newRoute('/populizeScore', 'populizeScore', populizeScore),
  newRoute('/populizeShare', 'populizeShare', populizeShare),
)
route_test = route_test.concat(
  newRoute('/test', 'test', test),
  newRoute('/test1', 'test1', test1),
  newRoute('/test2', 'test2', test2),
  newRoute('/test3', 'test3', test3),
)
basicRoutes = [{
  path: '/*',
  name: 'error_page',
  // redirect: '/cards',
  component: error_page
}, {
  path: '*',
  name: 'cards',
  redirect: '/cards',
  component: cards
}]
routes = routes.concat(index.concat(
  route_test,
), basicRoutes)
var router = new Router({
  // mode: 'history',
  routes: routes
})
// console.log('router',router)
// router.prototype.firstEnter=1
router.beforeEach((to, from, next) => {
  // console.log('router',to,from)
  // console.log('first enter app',router.firstEnter,router)
  // &&firstEnter===1
  if (!from.name && to.path !== '/cards') {
    router.push('/cards')
    router.push(to.path)
    // router.prototype.firstEnter=0
    return
  }
  next()
})
export default router
// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'HelloWorld',
//     component: HelloWorld
//   }]
// })