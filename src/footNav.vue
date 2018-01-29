<template>
  <div id="footNavVue" v-if='showFootNav' class="container" flex>
      <!-- <span class="cell " :class="{'active':activeIndex===0}" @click='clickNav(0)' flex-box="1">
        <div class="_icon-box icon left-icon">
          <i class="icon-wallet icon"></i>
          <p class="text">卡包</p>
        </div>
      </span> -->
       <span class="cell" :class="{'active':activeIndex==3}" flex="cross:center main:center"@click='clickNav(3)' >
<!--         <div class="share-bttn" >
          <i class="icon-share share-icon"></i>
        </div> -->
        <div class="_icon-box icon" >
          <i class="icon-creditcard icon"></i>
          <p class="text">信用卡</p>
        </div>
      </span>
      <span class="cell" :class="{'active':activeIndex===1}" flex="cross:center main:center"@click='clickNav(1)' >
<!--         <div class="share-bttn" >
          <i class="icon-share share-icon"></i>
        </div> -->
        <div class="_icon-box icon" >
          <i class="icon-share icon"></i>
          <p class="text">分享</p>
        </div>
      </span>
      
      <!-- <span class="cell" :class="{'active':activeIndex===1}" @click='clickNav(1)'>分享</span> -->
      <span class="cell " :class="{'active':activeIndex===2}" @click='clickNav(2)' flex-box="1">
        <div class="_icon-box">
          <i class="icon-person icon right-icon"></i>
          <p class="text">我的</p>
        </div>
      </span>
      
  </div>
</template>

<script>
import router from './router'
import {mapState,mapMutations} from 'vuex'
import commonRemind from './utils/commonRemind.js'
export default {
  data() {
    return {
      activeIndex:0,
    }
  },
  methods:{
    clickNav(index){
      if(index==1&&!this.userInfo.userId){
        commonRemind.unloginRemind()
        return
      }
      if(index==1){
        this.share_show()
      }
      this.activeIndex=index
      router.push(this.navPaths[index])
    },
    ...mapMutations([
      'share_show',
      ]),
  },
  created(){
    this.activeIndex=this.navPaths.indexOf(this.$route.path)
    router.beforeEach((to,from,next)=>{
      // console.log('to',to)
      this.activeIndex=this.navPaths.indexOf(to.path)
      next()
    })
  },
  computed:{ 
    userInfo(){
      return this.$store.state.account
    },
    showFootNav(){
      let path=this.$route.path
      // console.log('path',path,this.navPaths)
      let isFootNavPath=this.navPaths.indexOf(path)>=0
      // let isShowFootNavPath=this.showFootNavPaths.indexOf(path)>=0
      return isFootNavPath
    },
    ...mapState([
      // 'navPaths',
      // 'showFootNavPaths',
      ]),
    ...mapState({
      navPaths: s => {
        // console.log('state',s)
        return s.router.navPaths
      },
      // 'showFootNavPaths':router.showFootNavPaths,
    })

  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.container{
  background:#fff;
  /*display: flex;*/
  position: fixed;
  width: 100%;
  height: 0.5rem;
  border:0px solid #ccc;
  border-top-width: 1px;
  bottom: 0;
  left: 0;
  font-size: 0.11rem;
  color:#999;
  z-index: 9999;
  .share-bttn{
    display: inline-block;
    width: 0.54rem;
    height: 0.41rem;
    border-radius: 6px;
    background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);
    box-shadow: 0 13px 32px 0 rgba(248, 81, 75, 0.36);
    /*position: absolute;
    left: 0;right: 0;
    top: 0;bottom: 0;
    margin:auto;*/
    /*margin-bottom: 0.05rem;*/
    .share-icon{
      line-height: 0.41rem;
      text-align: center;
      display: block;
      color:#fff;
      font-size: 0.3rem;
    }
  }
  .cell{
    width: 50%;
    display: inline-block;
    text-align: center;
    /*border:1px solid red;*/
  }
  .cell:active{
    background: #fff;
  }
  .left-cell{
    padding-left: 0.65rem;
  }
  .right-cell{
    text-align: right;
    padding-right: 0.65rem;
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 0;*/
  }
  .active{
    color:#f84b4b;
  }
  .text{
    /*text-align: center;*/
  }
  ._icon-box{
    display: inline-block;
    width: 0.4rem;
    /*border:1px solid red;*/
    padding-top: 0.05rem;
    text-align: center;
    .icon{
      font-size: 0.2rem;
    }
  }

  .share-bttn2 {
    display: inline-block;
    border-radius: 6px;
    width: 0.6rem;
    padding-bottom: 0.05rem;
    background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);
    box-shadow: 0 13px 32px 0 rgba(248, 81, 75, 0.36);
    color: white;
  }
}
</style>
