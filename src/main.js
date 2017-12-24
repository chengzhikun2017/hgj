// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import select from './components/containers/select.vue'
import input from './components/containers/input.vue'
// import radio from './components/containers/radio.vue'
import checkbox from './components/containers/checkbox.vue'
import button from './components/containers/button.vue'
import bttn_choose from './components/containers/button/bttn_choose.vue'
import check from './components/containers/check.vue'
import alert from './components/views/reminder/alert.vue'
import loading from './components/views/reminder/loading.vue'
import toast from './components/views/reminder/toast.vue'

import nav from './components/containers/nav.vue'
import protocol from './components/containers/protocol.vue'
import creditcard from './components/containers/creditcard.vue'
import formitem from './components/containers/formitem.vue'
import formitem2 from './components/containers/formitem2.vue'
import formitem3 from './components/containers/formitem3.vue'
import record from './components/containers/record.vue'
import cricleicon from './components/containers/icon/cricleIcon.vue'
Vue.component('app-nav', nav)
Vue.component('app-protocol', protocol)
Vue.component('app-creditcard', creditcard)
Vue.component('app-formitem', formitem)
Vue.component('app-formitem2', formitem2)
Vue.component('app-formitem3', formitem3)
Vue.component('app-record', record)
Vue.component('app-cricleicon', cricleicon)

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('app-select', select)
Vue.component('bttn-choose', bttn_choose)
Vue.component('app-input', input)
Vue.component('app-alert', alert)
Vue.component('app-loading', loading)
Vue.component('app-toast', toast)
// Vue.component('app-radio', radio)
Vue.component('app-checkbox', checkbox)
Vue.component('app-check', check)
Vue.component('app-button', button)

Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
var HGJ_VUE = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',

  components: {
    App
  }
})
Vue.prototype.hgjAlert = (alert) => {
  HGJ_VUE.$store.commit('reminder_showAlert', alert)
}
Vue.prototype.hgjToast = (toast) => {
  // console.log('toast', toast)
  HGJ_VUE.$store.commit('reminder_showToast', toast)
}
Vue.prototype.hgjShowLoading = (loadingText) => {
  HGJ_VUE.$store.commit('reminder_showLoading', loadingText)
}
Vue.prototype.hgjHideLoading = () => {
  HGJ_VUE.$store.commit('reminder_hideLoading')
}
router.beforeEach((to, from, next) => {
  console.log('HGJ_VUE.$store.router.state', HGJ_VUE.$store.state)

  // next()
  // return
  let routerState = HGJ_VUE.$store.state.router
  let paths = routerState.newPaths,
    lenNewPaths = paths.length
  if (routerState.backToIndex) {
    if (routerState.navPaths.indexOf(to.path) >= 0) {
      let paths = routerState.newPaths,
        l = paths.length,
        i = 0
      HGJ_VUE.$store.commit('router_isBackToIndex')
      if (l > 0) {
        while (i < l) {
          router.push(paths[i])
          i++
        }
      } else {
        next()
      }
    } else {
      router.go(-1)
    }
  } else {
    next()
  }
})