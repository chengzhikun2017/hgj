import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import reminder from './modules/reminder'
import router from './modules/router'
import account from './modules/account'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    router,
    reminder,
    account,
  }
})

export default store