import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
const plan = {
  state: {
    products:[],
  },
  getters: {},
  mutations: {
    
  },
  actions: {
    plan_calc({}, {fee,startDate,endDate}) {
      var promise = fetch({
        url: 'plan/calculation',
        params: {
          fee,
          startDate,
          endDate,
        },
      }, false)
      return promise
    },
    plan_review({}, cardId) {
      var promise = fetch({
        url: 'plan/review',
        params: {
          cardId,
          page:1,
          limit:24,//最多显示两年内的记录？不行 存在终止的。
        },
      }, false)
      return promise
    },
    plan_viewLatest({}, cardId){
      var promise = fetch({
        url: 'plan/review',
        params: {
          cardId,
          page:1,
          limit:1,
        },
      }, false)
      return promise
    },
    plan_process({}, planId) {
      var promise = fetch({
        url: 'plan/processList',
        params: {
          planId,
          limit:50,
        },
      },)
      return promise
    },
    plan_end({dispatch},planId){
      var promise = fetch({
        url: 'plan/end',
        params: {
          planId,
        },
      })
      promise.then(res=>{
        dispatch('account_getUserInfo')
      })
      return promise
    },
    plan_endStatus({},actionId){
      var promise = fetch({
        url: 'plan/queryActionStatus',
        params: {
          actionId,
        },
      }, false)
      return promise
    },
  }
}

export default plan