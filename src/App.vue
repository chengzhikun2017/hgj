<template>
  <div id="app" >
  <!-- <div class="test" @click='test'></div> -->
    <router-view/>
    <button @click='test' id='test-bttn'> test</button>
    <button @click='test2' id='test-bttn2'> test2</button>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import './css/styles.scss'
import router from './router'
import footNav from './footNav.vue'
import { mapGetters ,mapState,mapActions,mapMutations} from 'vuex'
export default {
  name: 'app',

  components:{
    footNav
  },
  created(){
  },
  computed:{
    // backToIndex(){
    //   return this.$store.getters.backToIndex
    // },
    // 
    ...mapState([
      'backToIndex',
      ]),
    // ...mapGetters([
    //   'backToIndex',
    // ]),
  },
  methods:{
    test(){
      console.log('test')
      this.setNewPath()
      this.willBackToIndex()
      router.go(-1)
      
      // this.resetRoute()
      // this.routerBackToIndex()
      // router.go(-1)
      // router.beforeEach((to,from,next)=>{
      //   console.log('---')
      //   next()
      // })
    },
    test2(){
      this.pushRoutes(['/test1','/test2','/test3',])
    },
    routerBackToIndex(){

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
    ...mapMutations([
    'willBackToIndex',
    'setNewPath',
    ])
  },
}
</script>

<style>
#test-bttn{
  position: fixed;
  bottom: 1rem;
  right:0.1rem;
}#test-bttn2{
  position: fixed;
  bottom: 1.2rem;
  right:0.1rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*margin-top: 60px;*/
}
</style>
