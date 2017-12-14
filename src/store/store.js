import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    backToIndex: false,
    //path:[{
    //  path:'/cards',
    //  index:0,
    //},{
    //  path:'/',
    //  index:0,
    //},{}],
    navPaths:['/cards','/promotion','/mine'],
    showFootNavPaths:['','/'],
    newPaths:[],
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
  actions:{

  },
  mutations: {
    willBackToIndex (state) {
      state.backToIndex=true
    },
    isBackToIndex (state) {
      state.backToIndex=false
    },
    setNewPath(state,){
     state.newPaths=['/mine','/test3','/test2',]
    },
  }
})

export default store