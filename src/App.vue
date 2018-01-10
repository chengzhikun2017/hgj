<template>
  <div id="app" >
  <!-- <div class="test" @click='test'></div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
      <p>kaiwanxiao</p>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" />
    
    <foot-nav></foot-nav>
    <app-alert></app-alert>
    <app-toast></app-toast>
    <app-loading></app-loading>
    <button @click='test' id='test-bttn'> test</button>
    <button @click='test2' id='test-bttn2'> 登出</button>
  </div>
</template>

<script>
import './css/styles.scss'
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
  created(){
    // console.log('app store',this.$store)
  },
  computed:{
  },
  created(){
    this.$nextTick(()=>{
      this.account_checkSession().then(res=>{
        if(res.data.data&&res.data.data.userId){
          // this.cards_getListCC()
          // this.cards_getListDC()
          // this.order_productsListGet()
          helper.getInitialInfo()
        }else{
          console.log('未登录')
        }
        console.log('res check session',res)
      })
    })
  },
  methods:{
    test(){
      console.log('vuex state',this.$store.state,this.$store)
      return
      // this.router_setNewPath()
      // this.router_willBackToIndex()
      // router.go(-1)
      // fetch()
      // this.testAlert()
    },
    testAlert(){
      // let alert = {
      //   title: 'alert title',
      //   options: [{
      //     text: 'confirm',
      //     callback: () => {
      //       console.log('yes')
      //     }
      //   }]
      // }
      // this.hzgAlert(alert)
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
    ]),
    ...mapActions([
      'account_checkSession',
      'account_getUserInfo',
      'account_logout',
      'cards_getListCC',
      'cards_getListDC',
      'order_productsListGet',
      ])

  },
}
</script>

<style>
#test-bttn{
  position: fixed;
  bottom: 1rem;
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
  position: relative;
  font-family:'PingFangSC' ,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*margin-top: 60px;*/
}
</style>
