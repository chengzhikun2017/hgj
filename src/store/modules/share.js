import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {
  HGJ_VUE
} from '../../main.js'
import helper from '../../utils/helper.js'
const share = {
  state: {
    showShare: false,
    sharePagePv:0,
    countReport: {},
    todayNumber: 0,
    totalagentLv1Number: 0,
    totalagentLv2Number: 0,
    totalagentLv3Number: 0,
    totalagentLv3plusNumber: 0,
    totalagentLv1Fee: 0,
    totalagentLv2Fee: 0,
    totalagentLv3Fee: 0,
    totalagentLv3plusFee: 0,
    accountActiveFee: 0,
    repaymentPlanFee: 0,
    levelUpFee: 0,
  },
  getters: {
    share_countReport(s) {
      return s.countReport
    },
    share_todayNumber(s) {
      return s.todayNumber
    },
    share_totalagentLv1Number(s) {
      return s.totalagentLv1Number
    },
    share_totalagentLv2Number(s) {
      return s.totalagentLv2Number
    },
    share_totalagentLv3Number(s) {
      return s.totalagentLv3Number
    },
    share_totalagentLv3plusNumber(s) {
      return s.totalagentLv3plusNumber
    },
    share_totalNumber(s) {
      return s.totalagentLv1Number + s.totalagentLv2Number + s.totalagentLv3Number + s.totalagentLv3plusNumber
    },
    share_accountActiveFee(s) {
      return s.accountActiveFee
    },
    share_repaymentPlanFee(s) {
      return s.repaymentPlanFee
    },
    share_levelUpFee(s) {
      return s.levelUpFee
    },
    share_totalFee(s) {
      return s.accountActiveFee + s.repaymentPlanFee + s.levelUpFee
    },
    share_totalagentLv1Fee(s) {
      return s.totalagentLv1Fee
    },
    share_totalagentLv2Fee(s) {
      return s.totalagentLv2Fee
    },
    share_totalagentLv3Fee(s) {
      return s.totalagentLv3Fee
    },
    share_totalagentLv3plusFee(s) {
      return s.totalagentLv3plusFee
    },
  },
  mutations: {
    share_show(s) {
      s.showShare = true
    },
    share_hide(s) {
      s.showShare = false
    },
    share_resetReport(s){

    }
  },
  actions: {
    share_getCount({state}, ) {
      fetch({
        url: 'report/count',
      }).then(res => {
        state.countReport = res
        // console.log(res)
        let today = res.today
        let total = res.total
        // console.log(today)
        // console.log(total)
        state.todayNumber = today.agentLv1Number + today.agentLv2Number + today.agentLv3Number + today.agentLv3plusNumber;
        state.totalagentLv1Number = total.agentLv1Number
        state.totalagentLv2Number = total.agentLv2Number
        state.totalagentLv3Number = total.agentLv3Number
        state.totalagentLv3plusNumber = total.agentLv3plusNumber
        state.accountActiveFee = total.accountActiveFee
        state.repaymentPlanFee = total.repaymentPlanFee
        state.levelUpFee = total.levelUpFee
        state.totalagentLv1Fee = total.agentLv1Fee
        state.totalagentLv2Fee = total.agentLv2Fee
        state.totalagentLv3Fee = total.agentLv3Fee
        state.totalagentLv3plusFee = total.agentLv3plusFee
      })
    },
    share_viewCount({state},){
      fetch({
        url:'report/countSharePagePv'
      }).then(res=>{
        state.sharePagePv=res.count
      })
    },
  },
}

export default share