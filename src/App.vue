<template>
  <div id="app" >
  <!-- <div class="test" @click='test'></div> -->
    <router-view/>
    
    <foot-nav></foot-nav>
    <app-alert></app-alert>
    <app-toast></app-toast>
    <app-loading></app-loading>
    <button @click='test' id='test-bttn'> test</button>
    <button @click='test2' id='test-bttn2'> test2</button>
  </div>
</template>

<script>
import './css/styles.scss'
import router from './router'
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
  methods:{
    test(){
      console.log('vuex state',this.$store.state)
      return
      this.router_setNewPath()
      this.router_willBackToIndex()
      router.go(-1)
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
      this.pushRoutes(['/test1','/test2','/test3',])
    },
    pushRoutes(paths){
      let i=0
      while(i<paths.length){
        console.log('i',i)
        router.push({path:paths[i],})
        i++
      }
    },
    resetRoute(routeArr){//
      router.go(-3,()=>{
        console.warn('router go -3')
      })
      setTimeout(()=> {
        this.pushRoutes(['/mine','/test1','/test3',])
      }, 2000);
    },
    // ...mapMutations([
    //   'router_willBackToIndex',
    //   'router_setNewPath',
    // ]),
    ...mapMutations({
      router_willBackToIndex:'router_willBackToIndex',
      router_setNewPath:'router_setNewPath',
    }),
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
