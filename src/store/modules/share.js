import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
const share = {
  state: {
    showShare:false,
  },
  getters: {},
  mutations: {
    share_show(s){
      s.showShare=true
    },
    share_hide(s){
      s.showShare=false
    },
  },
  actions: {
  }
}

export default share