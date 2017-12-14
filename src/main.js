// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store.js'
import select from './components/views/select.vue'
import input from './components/views/input.vue'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('app-select',select)
Vue.component('app-input',input)

/* eslint-disable no-new */
var HGJ_VUE=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  // console.log('from', from)
  // console.log('to', to)
  let paths=HGJ_VUE.$store.state.newPaths,lenNewPaths=paths.length
  if(HGJ_VUE.$store.state.backToIndex){
    // console.log('need backToIndex')
    if(HGJ_VUE.$store.state.navPaths.indexOf(to.path)>=0){
      // console.log('isBackToIndex')
      let paths=HGJ_VUE.$store.state.newPaths,l=paths.length,i=0
      HGJ_VUE.$store.commit('isBackToIndex')
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
