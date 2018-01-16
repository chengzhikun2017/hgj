import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import reminder from './modules/reminder'
import router from './modules/router'
import account from './modules/account'
import addCardCC from './modules/addCardCC'
import addCardDC from './modules/addCardDC'
import order from './modules/order'
import plan from './modules/plan'
import cards from './modules/cards'
import balance from './modules/balance'
import share from './modules/share'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    router,
    reminder,
    account,
    addCardCC,
    addCardDC,
    cards,
    order,
    plan,
    balance,
    share,
  }
})

export default store