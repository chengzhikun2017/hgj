import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cards from '../pages/cards.vue'
import mine from '../pages/mine.vue'
import pay from '../pages/pay.vue'
import promotion from '../pages/promotion.vue'
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
  route_test2 = [],
  index = []
index = index.concat(
    newRoute('/cards', 'cards', cards),
    newRoute('/mine', 'mine', mine),
    newRoute('/promotion', 'promotion', promotion),
    newRoute('/pay', 'pay', pay),
  )
  // route_test=route_test.concat(
  //   newRoute('',)
  //   )
basicRoutes = [{
  path: '/*',
  name: 'HelloWorld',
  component: HelloWorld
}]
routes = routes.concat(route_test.concat(
  route_test2,
  index,
), basicRoutes)
var router = new Router({
  mode: 'history',
  routes: routes
})
// var count=2
// router.beforeEach((to, from, next) => {
//   console.log('from', from)
//   console.log('to', to)
//   console.log('/promotion/.test(to.name)', /promotion/.test(to.name))
//   if(/promotion/.test(to.name)||count===0){
//     next()
//   }else{
//     count--
//     // history.pushState({}, '', 'localhost:1314'+to.fullPath);
//     next()
//     router.push('/promotion')
//   }
//   // router.push('/cards')
// })
export default router
// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'HelloWorld',
//     component: HelloWorld
//   }]
// })