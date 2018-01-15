import fetch from '../../utils/fetch.js'
import {
  HGJ_VUE
} from '../../main.js'
const cards = {
  state: {
    cardsListCC: [],
    cardsListDC: [],
    cardIdSC:null,
    cardsDict: {
      'ICBC': '工商银行',
      'ABC': '农业银行',
      'BOC': '中国银行',
      'CCB': '建设银行',
      'CMB': '招商银行',
      'PSBC': '邮政储蓄',
      'CITIC': '中信银行',
      'CEB': '光大银行',
      'COMM': '交通银行',
      'CIB': '兴业银行',
      'CMBC': '民生银行',
      'SPABANK': '平安银行',
      'GDB': '广发银行',
      'BJBANK': '北京银行',
      'HXBANK': '华夏银行',
      'SPDB': '浦发银行',
      'SHBANK': '上海银行',
      'BOHAIB': '渤海银行',
      'JSBANK': '江苏银行'
    }
  },
  getters: {
    cards_listCC(s) {
      return s.cardsListCC
    },
    cards_listDC(s) {
      return s.cardsListDC
    },
    cards_dict(s) {
      return s.cardsDict
    }
  },
  mutations: {
    cards_clearListCC(s) {
      s.cardsListCC = []
    },
    cards_clearListDC(s) {
      s.cardsListDC = []
    },
    cards_updatePlanStatus(s, {
      cardId,
      status
    }) {
      var card = s.cardsListCC.find(item => {
        return cardId == item.cardId
      })
      card.planStatus = status
    },
  },
  actions: {
    cards_getInfo({}, cardNo) {
      return fetch({
        url: 'card/info',
        params: {
          cardNo,
        },
      })
    },
    cards_getListCC({state}) {
      fetch({
        url: 'card/cc',
      }).then(res => {
        state.cardsListCC = res
      })
    },
    cards_getListDC({state}) {
      fetch({
        url: 'card/dc',
      }).then(res => {
        state.cardsListDC = res
        for(let i=0;i<res.length;i++){
          if(res[i].settlementStatus==='SUCCESS'){
            state.cardIdSC=res[i].cardId
            break;
          }
        }
      })
    },
  }
}

export default cards