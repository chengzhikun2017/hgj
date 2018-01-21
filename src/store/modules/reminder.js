class defaultAlert{
  constructor() {
    this.isShow= false
    this.title= 'remind'
    this.options= [{
      text: '确定',
    }, ]
  }
}
class defaultToast{
  constructor(){
    this.isShow=false
    this.content=''
    this.cbLeaved=()=>{}
    this.cbEntered=()=>{}
    this.type='normal'
  }
}
const reminder = {
  state: {
    backToIndex: false,
    alert: new defaultAlert(),
    // {
    //   isShow: false,
    //   title: 'remind',
    //   options: [{
    //     text: '确定',
    //   }, ],
    // },
    toast:new defaultToast(),
    // {
    //   isShow:false,
    //   content:'',
    //   cbLeaved:()=>{},
    //   cbEntered:()=>{},
    //   type:'normal',
    // },
    isLoading:false,
    loadingText:'请稍后',
  },
  getters: {
  },
  actions: {},
  mutations: {
    // reminder_resetAlert(s){
    //   let alert=new defaultAlert()
    //   // s.alert.isShow=false
    //   s.alert.content=''
    //   s.alert.cbLeaved=()=>{}
    //   s.alert.cbEntered=()=>{}
    //   s.alert.type='normal'
    // },
    // reminder_resetToast(s){
    //   let toast=new defaultToast()
    //   s.toast.isShow=false
    //   s.toast.content=''
    //   s.toast.cbLeaved=()=>{}
    //   s.toast.cbEntered=()=>{}
    //   s.toast.type='normal'
    // },
    reminder_closeAlert(s) {
      s.alert.content=null
      s.alert.title=null
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
      if(typeof alert==='string'){
        alert = {
          title: alert,
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
      if(s.isLoading>0){
       s.isLoading--
      }
    },
    reminder_showLoading(s,loadingText){
      s.isLoading++
      if(!loadingText){
        loadingText='请稍后'
      }
      s.loadingText=loadingText
    },

    reminder_hideToast(s){
      console.log('hide toast')
      s.toast.isShow=false
    },
    reminder_showToast(s,toast){
      // console.log('toast',toast,toast instanceof String)
      // s.toast.content=toast
      if( typeof toast=='string'){
        toast={content:toast}
      }
      if(toast instanceof Object){
        if(toast.content){
          s.toast.content=toast.content
        }else{
          s.toast.content='no toast content'
          console.warn('need toast content')
        }
        s.toast.type=toast.type||0
        //'normal' 'error' 'warning'
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