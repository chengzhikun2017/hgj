<template>
  <div id="app" >
  <!-- <div class="test" @click='test'></div> -->
    <router-view/>
    <button @click='test' id='test-bttn'> test</button>
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
    setTimeout(() =>{
      this.pushRoutes(['/test1','/test2','/test3',])
    }, 3000);    
  },
  computed:{
    // backToIndex(){
    //   return this.$store.getters.backToIndex
    // },
    // 
    ...mapState([
      'backToIndex'
      ]),
    // ...mapGetters([
    //   'backToIndex',
    // ]),
  },
  methods:{
    test(){
      console.log('test')
      this.willBackToIndex()
      // this.routerBackToIndex()
      // router.go(-1)
      // router.beforeEach((to,from,next)=>{
      //   console.log('---')
      //   next()
      // })
    },
    routerBackToIndex(){

    },
    pushRoutes(paths){
      let i=0
      while(i<paths.length){
        console.log('i',i)
        router.push(paths[i])
        i++
      }
    },
    resetRoute(routeArr){//

    },
    ...mapMutations([
    'willBackToIndex',
    ])
  },
}
</script>

<style>
#test-bttn{
  position: fixed;
  bottom: 1rem;
  left:0.1rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*margin-top: 60px;*/
}
</style>
