const alert = {
  state: {
    backToIndex: false,
    alert: {
      isShow: true,
      title: 'remind',
      // self_: this,
      options: [{
        text: '确定',
      }, ],
    },
    // navPaths:['/cards','/promotion','/mine'],
    // showFootNavPaths:['','/'],
    // newPaths:[],
  },
  getters: { // 约等于 computed
    // router_backToIndex(s,g){
    //   console.log('state,getter',s,g)
    //   return s.backToIndex
    // }
  },
  actions: {},
  mutations: {
    alert_closeAlert(s) {
      s.alert.isShow = false
    },
    alert_showAlert(s, alert) {
      if (alert === undefined) {
        alert = {
          title: 'alert',
          options: [{
            text: '确定',
          }, ],
        }
      }
      if (alert.options === undefined) {
        alert.options = [{
          text: '确定',
        }, ]
      }
      console.log('alert_showAlert', alert)
      s.alert.isShow = true
      s.alert.title = alert.title
      s.alert.options = alert.options
      if (alert.content) {
        s.alert.options = alert.options
      }

    },
  }
}

export default alert