import fetch from '../../utils/fetch.js'
import {
  simpleFetch
} from '../../utils/fetch.js'
import {HGJ_VUE} from '../../main.js'
import helper from '../../utils/helper.js'
const app = {
  state: {
    isWX:false,
    wxConfiged:false,
  },
  getters: {},
  mutations: {
    app_checkIsWX(state) {
      var userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.match(/MicroMessenger/i) == 'micromessenger') {
        state.isWX = true;
      } else {
        state.isWX = false;
      }
    }
  },
  actions: {
    app_jsconfig({state}){
      if(!state.isWX){
        return
      }
      // console.log('location.href',location.href)
      // console.log('encodeURIComponent(location.href)',encodeURIComponent(location.href))
      // HGJ_VUE.hgjToast(encodeURIComponent(location.href))
      fetch({
        url:'wechat/jsconfig',
        params:{
          url:location.href,
          // url:encodeURIComponent(location.href),
          // url:encodeURIComponent('http://hgj.wd577.cn/promotion'),
        },
      }).then(res=>{
        console.log('%c wechat API','color:red',res)
          var data = res
          // alert(data.appId)
          // alert(data.timestamp)
          // alert(data.nonceStr)
          // alert(data.signature)
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function() {
            // console.warn('wx config success')
            state.wxConfiged = true
            // alert('已配置')
            console.log('%c 已配置','color:green',)
          });
          wx.error((res) => {
            // alert(res+'---')
            console.log('err',res)
            // var remind = vm.remind
            // HGJ_VUE.hgjAlert('分享操作无法完成')
          });
      })
    },
  }
}

export default app