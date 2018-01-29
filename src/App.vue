<template>
  <div id="app" :class="{'show-foot':showFootNav}">
    <div class="announce-box" v-if='showAnnounce'>
      <div class="announce" ref='announce'>
        尊敬的各位用户，由于支付通道升级中，暂时关闭智能还卡以及相关功能，敬请谅解！
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" />
    
    <foot-nav ref='footNav'></foot-nav>
    <app-alert></app-alert>
    <app-toast></app-toast>
    <app-loading></app-loading>
    <app-share v-model="showShare"></app-share>
    <button @click='test' id='test-bttn' v-if='isDev'> test</button>
    <!-- <button @click='test2' id='test-bttn2'> 登出</button> -->
  </div>
</template>

<script>
import './css/styles.scss'
import './css/small_logo_sprite.css'
import router from './router'
import helper from './utils/helper.js'
import footNav from './footNav.vue'
import { mapGetters ,mapState,mapActions,mapMutations} from 'vuex'
import fetch from './utils/fetch.js'
export default {
  name: 'app',
  components:{
    footNav
  },

  computed:{
    showAnnounce(){
      return this.$route.path!=='/applycredit_list'
    },
    isDev(){
      return /localhost/.test(location.href)
    },
    showShare(){
      return this.$store.state.share.showShare
    },
    showFootNav(){
      let path=this.$route.path
      let navPaths=this.$store.state.router.navPaths
      let isFootNavPath=navPaths.indexOf(path)>=0
      // let isShowFootNavPath=this.showFootNavPaths.indexOf(path)>=0
      return isFootNavPath
    },
  },
  mounted(){
    this.announceMove()
  },
  created(){
    let query=this.$route.query
    // this.share_getCount()
    this.app_checkIsWX()
    var u=navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
      this.app_jsconfig()
    }
    this.account_shareInfoSet(query)
    // this.$store.commit('account_shareInfoSet',query)
    this.$nextTick(()=>{
      this.account_checkSession().then(res=>{
        if(res.data.data&&res.data.data.userId){
        }else{
          console.log('未登录')
        }
        console.log('res check session',res)
      })
    })
  },

  methods:{
    announceMove(){
      let announceMent=document.querySelector('.announce')
      console.log('announceMent',announceMent)
      console.log('announceMent',announceMent.clientWidth)
      console.log('announceMent',window.innerWidth)
      let width=announceMent.clientWidth*1.2,windowW=window.innerWidth
      let left=windowW
      announceMent.style.left=left+'px'
      this.announceTimer=setInterval(()=>{
        left--
        announceMent.style.left=left+'px'
        if(left<-width){
          left=windowW
        }
      },1000/60)
    },
    test(){
      console.log('vuex state',this.$store.state,this.$store)
      return
    },
    testAlert(){

    },
    test2(){
      this.account_logout()

    },
    pushRoutes(paths){
      let i=0
      while(i<paths.length){
        console.log('i',i)
        helper.goPage({path:paths[i],})
        i++
      }
    },

    ...mapMutations([
      'router_willBackToIndex',
      'router_setNewPath',
      'account_shareInfoSet',
      'app_checkIsWX',
    ]),
    ...mapActions([
      'app_jsconfig',
      'account_checkSession',
      'account_getUserInfo',
      'account_logout',
      'cards_getListCC',
      'cards_getListDC',
      'order_productsListGet',
      'share_getCount',
      ])

  },
}
</script>

<style lang='scss' scoped>
.show-foot{
  padding-bottom: 0.5rem;
}
.announce-box{
  z-index: 999999;
  position: fixed;
  top: 0.44rem;
  left: 0;
  background: #F4D43C;
  color:#F7FFDE;
  
  padding:0.05rem;
  .announce{
    position: relative;
    left: 0;
    white-space: nowrap;
    font-size: 0.14rem;
  }
}
#test-bttn{
  position: fixed;
  bottom: 0.5rem;
  right:0.1rem;
  z-index: 999999;
}#test-bttn2{
  position: fixed;
  bottom: 1.2rem;
  right:0.1rem;
  z-index: 999999;
}
#app {
  width:100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  font-family:'PingFangSC' ,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*margin-top: 60px;*/
}
</style>
