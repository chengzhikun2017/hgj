import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    backToIndex: false,
    navPaths:['/cards','/promotion','/mine'],
  },
  getters: { // 约等于 computed
    doneTodos: state => {
      // return 'from getters'
    },
    doneTodosCount: (s, g) => {
      // return g.doneTodos.length
    },
    // sum: s => s.a + s.b,
    backToIndex:s=>s.backToIndex
  },
  mutations: {
    willBackToIndex (state) {
      state.backToIndex=true
    },
    isBackToIndex (state) {
      state.backToIndex=true
    },
  }
})

export default store