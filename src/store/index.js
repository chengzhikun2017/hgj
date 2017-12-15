import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import alert from './modules/alert'
import router from './modules/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    router,
    alert,
  }
})

export default store