import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
const share = {
  state: {
    showShare:false,
    countReport:{},
  },
  getters: {
    share_countReport(s){
      return s.countReport
    },
  },
  mutations: {
    share_show(s){
      s.showShare=true
    },
    share_hide(s){
      s.showShare=false
    },
  },
  actions: {
    share_getCount({state},){
      fetch({
        url:'report/count',
      }).then(res=>{
        state.countReport=res
      })
    },
  },
}

export default share