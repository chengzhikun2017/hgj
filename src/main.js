// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import select from './components/containers/select.vue'
import input from './components/containers/input.vue'
import alert from './components/views/alerts/alert.vue'
import loading from './components/views/alerts/loading.vue'
import toast from './components/views/alerts/toast.vue'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('app-select',select)
Vue.component('app-input',input)
Vue.component('app-alert',alert)
Vue.component('app-loading',loading)
Vue.component('app-toast',toast)

/* eslint-disable no-new */
var HGJ_VUE=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',

  components: { App }
})
Vue.prototype.hzgAlert=(alert)=>{
  
  HGJ_VUE.$store.commit('alert_showAlert',alert)
}
router.beforeEach((to, from, next) => {
  console.log('HGJ_VUE.$store.router.state',HGJ_VUE.$store.state)

  // next()
  // return
  let routerState=HGJ_VUE.$store.state.router
  let paths=routerState.newPaths,lenNewPaths=paths.length
  if(routerState.backToIndex){
    if(routerState.navPaths.indexOf(to.path)>=0){
      let paths=routerState.newPaths,l=paths.length,i=0
      HGJ_VUE.$store.commit('router_isBackToIndex')
      if(l>0){
        while(i<l){
          router.push(paths[i])
          i++
        }
      }else{
        next()
      }
    }else{
      router.go(-1)
    }
  }else{
    next()
  }
})

