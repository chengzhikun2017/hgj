<template>
  <div class="popView" v-show="value" @click='close'>
    <qr-code v-model='isQrShow'></qr-code>
    <div class="popcontent" @click.stop=''>
      <div class="planbox">
        <header flex="cross:center">
          <div class="myicon">
            <app-cricleicon icon="icon-share" bgcolor="bg-red" size="0.25rem"></app-cricleicon>
          </div>
          <div class="title" flex="dir:top main:center" flex-box="1">
            <h2>分享</h2>
            <p></p>
          </div>
          <span flex-box="0" @click="close" class="close"><span class="icon-cancel"></span></span>
        </header>
        <div class="planbox-content">
          <div class="liner"></div>
          <div class="waysItem" flex>
            <div class="waybox" @click.stop='qrShareShow'>
              <div class="icon-qrcode black"></div>
              <p>二维码分享</p>
            </div>
            <div class="waybox" @click.stop='configShareIfConfiged'>
              <div class="icon-wechat green"></div>
              <p>微信分享</p>
            </div>
            <div class="waybox" @click.stop='urlShare'>
              <div class="icon-link purple"></div>
              <p>通过链接分享</p>
            </div>
          </div>
          <!--
           <div class="waysItem" flex>
            <div class="waybox">
              <div class="icon-qq blue"></div>
              <p>QQ分享</p>
            </div>
            <div class="waybox">
              <div class="icon-message bluegreen"></div>
              <p>短信分享</p>
            </div>
            <div class="waybox">
              <div class="icon-wechat darkred"></div>
              <p>朋友圈分享</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="url-box" v-if='isShareUrlShow' @click='isShareUrlShow=false'>
      <i class="icon-cancel" @click='isShareUrlShow=false'></i>
      <div class="box">
        <h2 class="title">请复制下面的地址</h2>
        <textarea type="text" class="url-input" @click.stop='' :value='shareUrl' readonly="readonly" ref='urlInput'></textarea>
      </div>
    </div>
  </div>
</template>
<script>
  import qrCode from './qrCode.vue'
  import helper from '../../../utils/helper.js'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: 'http://www.google.com'
      }
    },
    data () {
      return {
        isQrShow:false,
        wxConfigTimer:null,
        isShareUrlShow:false,
        shareUrl:'',
      }
    },
    destroyed(){
      clearInterval(this.wxConfigTimer)
    },
    computed:{
      userInfo(){
        return this.$store.state.account
      },
      qrcode(){
        return this.userInfo.qrcodeUrl
      },
      shareSrc(){
        return this.userInfo.qrcodeShareUrl
      },
      uid(){
        return this.userInfo.userId
      },
    },
    created(){
      
    },
    methods: {

      configMenueShare() {
        console.log('%c configMenueShare','color:red',)
        // alert('configMenueShare cfg')
        let options={
          title: '禾管家', // 分享标题
          desc: '智能养卡，免费申请信用卡', // 分享描述
          // link: 'http://hzg.he577.com' + bus.relativeUrlTest + '/m/#/index/apply_borrow?uniqueId=' + bus.uniqueId + '&share=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link:helper.urlConcat('https://hgj.wd577.cn/static/share/share.html',{
            img:this.qrcode,
            // img:this.shareSrc,
            uid:this.uid
          }),
          imgUrl: 'https://hgj.wd577.cn/logo_share.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: () => {
            // alert('分享成功')
            console.log('%c 分享成功','color:red',)
          },
          cancel: () => {
            // alert('分享被取消')
            console.log('%c 分享被取消','color:red',)
          }
        }
        Object.assign(options,{
                })
        wx.onMenuShareAppMessage(options)
        wx.onMenuShareTimeline({
          title:'智能养卡，免费申请信用卡。全国招代理！',
          link:helper.urlConcat('https://hgj.wd577.cn/static/share/share.html',{
            img:this.qrcode,
            // img:this.shareSrc,
            uid:this.uid
          }),
          imgUrl: 'https://hgj.wd577.cn/logo_share.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: () => {
          },
          cancel: () => {
          }
        })
      },
      configShareIfConfiged(){
        // let configed=true
        // this.app_jsconfig()
        // this.hgjAlert({
        //   title:'点击右上角分享',
        //   content:'发送给朋友/分享到朋友圈'
        // })
        var u=navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isAndroid&&!this.$store.state.app.wxConfiged){
          this.app_jsconfig()
        }
        
        if(this.$store.state.app.isWX){
          if(this.wxConfigTimer){
            return
          }
          this.wxConfigTimer=setInterval(()=>{
            console.log('this.$store.state.app.wxConfiged',this.$store.state.app.wxConfiged)
            // alert(this.$store.state.app.wxConfiged)
            if(this.$store.state.app.wxConfiged){
              clearInterval(this.wxConfigTimer)
              this.wxConfigTimer=null
              this.configMenueShare()
              this.hgjAlert({
                title:'点击右上角分享',
                content:'发送给朋友/分享到朋友圈'
              })
            }
          },100)
        }
        
      },
      urlShare(){
        // http://hgj.wd577.cn/
        this.isShareUrlShow=true
        let oldPath=this.$route.fullPath
        let path=helper.urlConcat('https://hgj.wd577.cn/static/share/share.html',{
          img:this.qrcode,
          uid:this.uid
        })
        console.log('path',path)
        this.shareUrl=path
        console.log('this.$refs',this.$refs)
        this.$nextTick(()=>{
          this.$refs.urlInput.focus()
          this.$refs.urlInput.select()
        })
        // history.replaceState({}, "page 3", path);
        // history.pushState({}, "page 3", path);
        // this.hgjAlert({
        //   title:'',
        //   content:'分享当前链接',
        //   options:[{
        //     text:'确认',callback:()=>{
        //       history.replaceState({}, "page 3", oldPath);
        //     },
        //   }],
        // })
        // history.replace
      },
      close () {
        this.$store.commit('share_hide')
      },
      qrShareShow(){
        this.isQrShow=true
      },
      ...mapActions([
        'app_jsconfig',
        ]),
      ...mapMutations([
        'app_checkIsWX',
        ]),
    },
    components:{
      'qr-code':qrCode,
    },
  }
</script>
<style lang="scss" scoped>
.url-box{
  position:fixed;
  width: 100%;
  height:100%;
  background: #000;
  top: 0;
  right: 0;
  z-index: 99999;
  .icon-cancel{
    position: absolute;
    right: 0;top: 0;
    padding:0.2rem;
    color:#fff;
    font-size: 0.25rem;
  }
  .box{
    width: 80%;
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    margin:auto;
    height: 1.5rem;
    .title{
      color:#fff;
    }

  }
  .url-input{
    width: 100%;
    height: 1rem;
    word-break: break-all;
  }
}
  .popView {
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 9999;
    .popcontent {
      position: absolute;
      left: 0.2rem;
      right: 0.2rem;
      bottom: 0.2rem;
      .planbox-content {
        .waysItem {
          .waybox {
            width: 33%;
            text-align: center;
            padding: 0.15rem 0;
            div {
              font-size: 0.32rem;
              padding-bottom: 0.1rem;
            }
            p {
              font-size: 0.14rem;
              color: #7d7d7d;
              line-height: 1;
            }
          }
        }
      }
    }
    .close {
      font-size: 0.25rem;
      color: #a4a4a4;
    }
    .bluegreen {
      color: #51d59c;
    }
    .green {
      color: #61cb41;
    }
    .darkred {
      color: #cb4141;
    }
    .blue {
      color: #5186d5;
    }
     .purple {
      color: #bb51d5;
    }
    .black {
      color: #393939;
    }
  }
  .planbox{
    height: auto;
  }
</style>