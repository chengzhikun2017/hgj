// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store.js'
Vue.prototype.$http = axios


Vue.config.productionTip = false


/* eslint-disable no-new */
var HGJ_VUE=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('to', to)
  console.log('/promotion/.test(to.name)', /promotion/.test(to.name))
  if(HGJ_VUE.$store.state.backToIndex){
    console.log('need backToIndex')
    if(HGJ_VUE.$store.state.navPaths.indexOf(HGJ_VUE.$route.path)>=0){
      console.log('isBackToIndex')
      HGJ_VUE.$store.commit('isBackToIndex')
      next()
    }else{
      next()
      router.go(-1)
    }
  }
  next()
})
