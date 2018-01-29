import config from '../../config.js'
const rootPath=config.routerRoot

const router={
  state: {
    backToIndex: false,

    navPaths: [rootPath + '/cards', rootPath + '/promotion', rootPath + '/mine', rootPath + '/applycredit_list', ],
    showFootNavPaths: ['', '/'],
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
    router_setNewPath(state,newPaths){//test
     state.newPaths=newPaths
    },
  }
} 
export default router