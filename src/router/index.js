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

import login from '@/pages/login.vue'
import signIn from '@/pages/signIn.vue'
import plan from '@/pages/plan.vue'
import cardDetail from '@/pages/cardDetail.vue'
import addCard1 from '@/pages/addCard1.vue'
import addCard2 from '@/pages/addCard2.vue'
import planrecords from '@/pages/planrecords.vue'
import payresult from '@/pages/payresult.vue'
import activeAccount from '@/pages/activeAccount.vue'
import order from '@/pages/order.vue'
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
  newRoute('/signIn', 'signIn', signIn),
  newRoute('/plan', 'plan', plan),
  newRoute('/carddetail', 'cardDetail', cardDetail),
  newRoute('/addcard1', 'addCard1', addCard1),
  newRoute('/addcard2', 'addCard2', addCard2),
  newRoute('/planrecords', 'planrecords', planrecords),
  newRoute('/payresult', 'payresult', payresult),
  newRoute('/activeaccount', 'activeAccount', activeAccount),
  newRoute('/order', 'order', order)

)
route_test = route_test.concat(
  newRoute('/test', 'test', test),
  newRoute('/test1', 'test1', test1),
  newRoute('/test2', 'test2', test2),
  newRoute('/test3', 'test3', test3),
)
basicRoutes = [{
  path: '*',
  name: 'cards',
  redirect: '/cards',
  component: cards
}]
routes = routes.concat(index.concat(
  route_test,
), basicRoutes)
var router = new Router({
  mode: 'history',
  routes: routes
})

export default router
// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'HelloWorld',
//     component: HelloWorld
//   }]
// })