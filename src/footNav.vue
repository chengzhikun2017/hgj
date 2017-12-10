<template>
  <div id="footNavVue" v-if='showFootNav'>
    <div class="container">
      <span class="cell" :class="{'active':activeIndex===0}" @click='clickNav(0)'>卡包</span>
      <span class="cell" :class="{'active':activeIndex===1}" @click='clickNav(1)'>分享</span>
      <span class="cell" :class="{'active':activeIndex===2}" @click='clickNav(2)'>我的</span>
    </div>
  </div>
</template>

<script>
import router from './router'
export default {
  data() {
    return {
      activeIndex:0,
      navPaths:['/cards','/promotion','/mine'],
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    clickNav(index){
      this.activeIndex=index
      router.push(this.navPaths[index])
    },
  },
  computed:{ 
    showFootNav(){
      console.log('this.$route',this.$route)
      return this.navPaths.indexOf(this.$route.path)>=0
    },
    
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.container{
  display: flex;
  position: fixed;
  width: 100%;
  height: 0.44rem;
  border:1px solid red;
  bottom: 0;
  left: 0;
  .cell{
    width: 50%;
    display: inline-block;
    border:1px solid red;
  }
  .active{
    color:red;
  }
}
</style>
