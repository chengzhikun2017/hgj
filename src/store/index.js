import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import reminder from './modules/reminder'
import router from './modules/router'
import account from './modules/account'
import addCardCC from './modules/addCardCC'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    router,
    reminder,
    account,
    addCardCC,
  }
})

export default store