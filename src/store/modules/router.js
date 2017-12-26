const router={
  state: {
    backToIndex: false,

    navPaths:['/cards','/promotion','/mine'],
    showFootNavPaths:['','/'],
    newPaths:[],
  },
  getters: { // 约等于 computed
    router_backToIndex(s,g){
      // console.log('state,getter',s,g)
      return s.backToIndex
    }
  },
  actions:{
  },
  mutations: {
    router_willBackToIndex (state) {//todo 需判断是否已经是index
      state.backToIndex=true
    },
    router_isBackToIndex (state) {
      state.backToIndex=false
    },
    router_setNewPath(state,){//test
     state.newPaths=['/mine','/test3','/test2',]
    },
  }
} 
export default router