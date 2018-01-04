<template>
  <div>
    <app-nav flex-box="0">推广</app-nav>
    <div class="lv-box">
      <p class="crrt-lv">当前级别：大众</p>
      <p class="next-lv">下一级别：保时捷</p>
      <!-- <p class="next-lv">下一级别：劳斯莱斯捷</p> -->
    </div>
    <div class="lv-treatment">
      <h3 class="sub-title">
        当前等级权益
      </h3>
      <p class="treatment-detail">1.享受25%的激活码购买折扣，助您邀请更多同道中人。</p>
      <p class="treatment-detail">2.享受最高达35%的分润。</p>
      <p class="treatment-detail">3.享受多至两级的再次分润。</p>
    </div>
    <h2 class="slogan" style="padding:0 0.15rem">马上升级获取更多权益</h2>
    <div class="active-box" >
      <app-button @click.native='upgradePay' style='margin:0 0.15rem'>升级</app-button>
      <app-button @click.native='upgradeFree' style='margin:0 0.15rem'>免费升级</app-button>
    </div>
    <div class="share-breif-box">
      <h3 class="sub-title" style='display:flex;justify-content:space-between;'>
        概览
        <span style='font-size: 0.15rem;color:#999'>更多>></span>
      </h3>
      <div class="share-breif">
        <p class="share-detail">一级推广人数：<span>10人</span></p>
        <p class="share-detail">二级推广人数：<span>34人</span></p>
        <p class="share-detail">推广总收入：<span>2371.92元</span></p>
      </div>
    </div>
    <app-button @click.native='share' style='width:80%;margin: 0 auto;'>分享有礼</app-button>
    <app-button @click.native='goJihuo' style='width:80%;margin: 0 auto;'>马上激活</app-button>

  </div>
</template>

<script>
import helper from '../utils/helper.js'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    upgradePay(){
      var productId=this.$store.state.order.products[0].productId
      this.order_createActive().then(res=>{
        var orderId=res.orderId
        let url =helper.urlConcat('/pay',{
          orderId:orderId
        })
        helper.goPage(url)
      })
      return
      
    },
    upgradeFree(){
      helper.goPage('/upgrade_free')
    },
    share(){
      
    },
    goJihuo(){
      helper.goPage('/activeaccount')
    },
    ...mapActions([
      'order_createActive',
      ])
  },
  events: {},
  components: {},

}
</script>

<style lang='scss' scoped>
.lv-box{
  background: #323232;
  text-align: center;
  padding:0.25rem 0;
  .crrt-lv{
    color:#f8d444;
    font-size: 0.15rem
  }
  .next-lv{
    color:#898D80;
    font-size: 0.12rem;
  }
  p{
    
  }
}
.active-box{
  display: flex;
  padding:0.1rem;
}
.lv-treatment{
  border:1px solid red;
  padding:0.15rem;
  p{
    font-size: 0.15rem;
     color:#333;
  }
}
.share-breif-box{
  border:1px solid red;
  padding: 0.15rem;
  .share-detail{
    font-size: 0.15rem;
    color:#333;
  }
}
</style>
