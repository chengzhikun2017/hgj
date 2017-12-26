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
import recordList from './components/views/record_list.vue'

import nav from './components/containers/nav.vue'
import protocol from './components/containers/protocol.vue'
import creditcard from './components/containers/creditcard.vue'
import bankcard from './components/containers/bankcard.vue'
import formitem from './components/containers/formitem.vue'
import formitem2 from './components/containers/formitem2.vue'
import formitem3 from './components/containers/formitem3.vue'
import record from './components/containers/record.vue'
import cricleicon from './components/containers/icon/cricleIcon.vue'
Vue.component('app-nav', nav)
Vue.component('app-protocol', protocol)
Vue.component('app-creditcard', creditcard)
Vue.component('app-bankcard', bankcard)
Vue.component('app-formitem', formitem)
Vue.component('app-formitem2', formitem2)
Vue.component('app-formitem3', formitem3)
Vue.component('app-record', record)
Vue.component('app-cricleicon', cricleicon)

Vue.config.productionTip = false
Vue.component('app-select', select)
Vue.component('bttn-choose', bttn_choose)
Vue.component('app-input', input)
Vue.component('app-alert', alert)
Vue.component('app-loading', loading)
Vue.component('app-toast', toast)
Vue.component('app-checkbox', checkbox)
Vue.component('app-check', check)
Vue.component('app-button', button)
Vue.component('app-record-list', recordList)

// Vue.prototype.$http = axios
Vue.config.productionTip = false



Vue.directive('scroll-load', {
  bind: function(el, binding, vnode) {
    // console.log('vnode', vnode)
    // var el = document.querySelector('.list-container-inner')
    var cfg = binding.value,
      sel = cfg.listSelector
    // console.log('scoll load config', cfg)
    var listContainer,
      btt,
      H = screen.height + 50 //trigger height
    // console.log('binding cfg', cfg.listSelector)
    // console.log('el', listContainer)
    el.addEventListener('scroll', () => {
      listContainer = document.querySelector(sel)
      btt = listContainer.getBoundingClientRect().bottom
      // console.log('btt scroll',btt)
      if (btt < H) {
        // cfg.getting = true
        // cfg.get(cfg.crrtPage)
        cfg.method()
        // console.log('load more')
        // console.dirxml(el)
      }
    }, false)
    // console.log('cfg', this)
  }
})
Vue.directive('pull-refresh', {
  bind: function(el, binding, vnode) {
    var cfg = binding.value,
      containerTop = 0
    // console.warn('config', cfg)
    // console.warn('config', binding)
    var touch = {
      start: null,
      end: null,
      last: null,
      crrt: null,
    }
    var scrollTop, outer
    el.addEventListener('touchstart', (e) => {
      // console.log('$e',e.touches[0].clientY)
      e.stopPropagation()
      // e.preventDefault()
      touch.start = e.touches[0].clientY
      touch.last = e.touches[0].clientY
      // console.log('touch', touch)
    }, false)
    el.addEventListener('touchmove', (e) => {
      // e.stopPropagation()
      e.preventDefault()
      touch.crrt = e.touches[0].clientY
      // console.log('touch', touch)
      outer = e.currentTarget.parentElement
      scrollTop = outer.scrollTop

      // console.log('scrollTop', scrollTop)
      // do sth to containerTop
      if (scrollTop > 0) {
        // console.log('touch', touch.crrt, touch.last)
        var step = touch.crrt - touch.last
        outer.scrollTop -= step
        touch.last = touch.crrt
        // console.log('step', step)
        return
      } else {
        // console.log('may drag down')
        // console.log('e.currentTarget.scrollTop',outer.scrollTop)
        // console.log('compare',t.last,t.crrt)
        if (touch.crrt <= touch.last) {
          if (containerTop === 0) {
            // console.log('touch', touch.crrt, touch.last)
            var step = touch.crrt - touch.last
            outer.scrollTop -= step
            touch.last = touch.crrt
            // console.log('step', step)

            return
          } else {
            // e.stopPropagation()
            // e.preventDefault()
            containerTop -= 0.025;
            el.style.paddingTop = containerTop + 'rem'

          }
        } else {
          // e.stopPropagation()
          // e.preventDefault()
          containerTop += 0.025
          el.style.paddingTop = containerTop + 'rem'

          // console.log('drag down')
        }
      }
      touch.last = touch.crrt
    }, false)
    el.addEventListener('touchend', (e) => {
      e.stopPropagation()
      // e.preventDefault()
      touch.end = e.changedTouches[0].clientY
      // console.log('touch', touch)  
      // console.log('cfg', cfg)
      // console.log('cfg', cfg.method)

      el.style.transition = '.5s cubic-bezier(0.23, 0.86, 0.39, 0.78)'
      // if(this.containerTop>0){
      //  console.log('refresh')
      //  this.getNew()
      // }
      if (containerTop > 0) { //可以设置其他值控制下拉的幅度

        if (cfg.method) {
          if (cfg.method instanceof Function) {
            cfg.method()
          } else {
            console.warn('method is not a function')
          }
        } else {
          console.warn('no method ')
        }
        // console.log('refresh')
      }
      containerTop = 0
      el.style.paddingTop = containerTop + 'px'
      setTimeout(() => {
        el.style.transition = '0s'
      }, 300);
    }, false)
    // console.log('binded pull-refresh')
  }
})
//如何记录下位置
Vue.directive('inner-scroll', {
  bind: function(el, binding, vnode) {
    var cfg = binding.value,
      containerTop = 0
    // console.warn('config', cfg)
    // console.warn('config', binding)
    var touch = {
      start: null,
      end: null,
      last: null,
      crrt: null,
    }
    var scrollTop, outer
    // console.log('bindded v-inner-scroll')
    el.addEventListener('touchstart', (e) => {
      e.stopPropagation()
      touch.start = e.touches[0].clientY
      touch.last = e.touches[0].clientY
    }, false)
    el.addEventListener('touchmove', (e) => {
      e.stopPropagation()
      e.preventDefault()
      // console.log('e',e)
      touch.crrt = e.touches[0].clientY
      outer = e.currentTarget.parentElement
      // console.log('outer',outer)
      scrollTop = outer.scrollTop
      // console.log('outer.scrollTop',outer.scrollTop)
      // HGJ_VUE.$store.commit('XXXXXrecord_list',outer.scrollTop)
      //////// bus.marketListScrollTop=outer.scrollTop
      if (scrollTop > 0) {
        var step = touch.crrt - touch.last
        outer.scrollTop -= step
        touch.last = touch.crrt
        return
      } else {
        if (touch.crrt <= touch.last) {
          if (containerTop === 0) {
            var step = touch.crrt - touch.last
            outer.scrollTop -= step
            touch.last = touch.crrt
            return
          } else {
            containerTop -= 0.025;
            el.style.paddingTop = containerTop + 'rem'

          }
        } else {
          // e.stopPropagation()
          // e.preventDefault()
          // containerTop += 0.025
          // el.style.paddingTop = containerTop + 'rem'
        }
      }
      touch.last = touch.crrt
    }, false)
    el.addEventListener('touchend', (e) => {
      e.stopPropagation()
      touch.end = e.changedTouches[0].clientY
    }, false)
  }
})



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

export {
  HGJ_VUE
}