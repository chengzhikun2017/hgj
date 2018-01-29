import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {
  HGJ_VUE
} from '../../main.js'
import helper from '../../utils/helper.js'
const balance = {
  state: {
    list: []
  },
  getters: {
    cc_list: state => state.list
  },
  mutations: {

  },
  actions: {
    cc_cardList({
      state
    }, {
      page,
      limit
    }) {
      var promise = fetch({
        url: 'bank/list',
        params: {
          page: page,
          limit: limit
        },
      })
      promise.then(res => {
        state.list = res
      })
      return promise
    }
  }
}

export default balance