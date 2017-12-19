const alert = {
  state: {
    backToIndex: false,
    alert: {
      isShow: false,
      title: 'remind',
      // self_: this,
      options: [{
        text: '确定',
      }, ],
    },
    toast:{
      isShow:false,
      content:'test from vuex store',
      cbLeave:()=>{},
      cbEnter:()=>{},
    },
    isLoading:false,
    loadingText:'请稍后',
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
        s.alert.content = alert.content
      }
    },
    alert_hideLoading(s){
      s.isLoading=false
    },
    alert_showLoading(s,loadingText){
      s.isLoading=true
      if(!loadingText){
        loadingText='请稍后'
      }
      s.loadingText=loadingText
    },

    alert_hideToast(s){
      console.log('hide toast')
      s.toast.isShow=false
    },
    alert_showToast(s,toast){
      // console.log('toast',toast,toast instanceof String)
      // s.toast.content=toast
      if( typeof toast=='string'){
        s.toast.content=toast
      }else if(toast instanceof Object){
        if(toast.content){
          s.toast.content=toast.content
        }else{
          s.toast.content='no toast content'
          console.warn('need toast content')
        }
        s.toast.cbLeave=toast.cbLeave
        s.toast.cbEnter=toast.cbEnter
      }else if(toast==undefined){
        console.warn('need toast content')
      }
      s.toast.isShow=true
    },
  }
}

export default alert