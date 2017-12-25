const reminder = {
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
      cbLeaved:()=>{},
      cbEntered:()=>{},
      type:'normal',
    },
    isLoading:false,
    loadingText:'请稍后',
  },
  getters: {
  },
  actions: {},
  mutations: {
    reminder_closeAlert(s) {
      s.alert.isShow = false
    },
    reminder_showAlert(s, alert) {
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
      // console.log('reminder_showAlert', alert)
      s.alert.isShow = true
      s.alert.title = alert.title
      s.alert.options = alert.options
      if (alert.content) {
        s.alert.content = alert.content
      }
    },
    reminder_hideLoading(s){
      s.isLoading=false
    },
    reminder_showLoading(s,loadingText){
      s.isLoading=true
      if(!loadingText){
        loadingText='请稍后'
      }
      s.loadingText=loadingText
    },

    reminder_hideToast(s){
      // console.log('hide toast')
      s.toast.isShow=false
    },
    reminder_showToast(s,toast){
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
        s.toast.type=toast.type||'normal'
        s.toast.cbLeaved=toast.cbLeaved
        s.toast.cbEntered=toast.cbEntered
      }else if(toast==undefined){
        console.warn('need toast content')
      }
      s.toast.isShow=true
    },
  }
}

export default reminder