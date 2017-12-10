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
export default {
  name: 'app',

  components:{
    footNav
  },
  methods:{
    test(){
      console.log('test')
      router.push('/mine')
      this.$http.get('http://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=62178508000020445332').then(res=>{
        console.log('res',res)
      })
    },
    resetRoute(routeArr){//

    }
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
