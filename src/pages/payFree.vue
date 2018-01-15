<template>
  <div>
    <app-nav flex-box="0">{{title}}</app-nav>
    <h1 style="text-align: center;padding:0.1rem">{{canBuyFree?'':'距离免费升级还差成功分享15次'}}</h1>
    <div class="lv-treatment" v-if='!canBuyFree' style='border:1px solid red;'>
      <h3 class="sub-title">
        当前等级（保时捷）权益
      </h3>
      <p class="treatment-detail">1.享受25%的激活码购买折扣，助您邀请更多同道中人。</p>
      <p class="treatment-detail">2.享受最高达35%的分润。</p>
      <p class="treatment-detail">3.享受多至两级的再次分润。</p>
    </div>
    <div class="lv-treatment" style='border:1px solid red;'>
      <h3 class="sub-title">
        下一等级（劳斯莱斯）权益
      </h3>
      <p class="treatment-detail">1.享受25%的激活码购买折扣，助您邀请更多同道中人。</p>
      <p class="treatment-detail">2.享受最高达35%的分润。</p>
      <p class="treatment-detail">3.享受多至两级的再次分润。</p>
    </div>

    <hr>
    <div class="activeaccount-content">
      <!-- <p class="info"></p> -->
      <p class="info" v-if='!canBuyFree'>完成下面任务，即可免费升级</p>
      <p class="info" v-if='canBuyFree'>可以继续完成下面任务，获取更多免费机会</p>
      <app-menulist v-model="menulistData"></app-menulist>
      <app-button style='width:80%; margin: 0.1rem auto;' @click.native='pay' v-if='canBuyFree'>立即升级</app-button>
      <!-- <app-button style='width:80%; margin: 0.1rem auto;' @click.native='go'>马上升级</app-button> -->
    </div>
  </div>
</template>

<script>
import {mapActions,mapMutations} from 'vuex'
export default {
  data() {
    return {
      menulistData: [
        {
          title: '分享',
          icon: 'icon-share',
          note: '已被浏览10次',
          position: -1,
          notePoint: false,
          long: false,
          actionName: '去分享',
          action: function () {
            alert("hello1")
            return
          }
        },
        {
          title: '了解养成计划',
          icon: 'icon-date',
          note: '详细了解养成计划',
          position: 0,
          notePoint: false,
          long: false,
          actionName: '未完成',
          action: function () {
            alert("hello2")
            return
          }
        },
        {
          title: '实名计划',
          icon: 'icon-person',
          note: '请完成您的实名认证',
          position: 1,
          notePoint: false,
          long: false,
          actionName: '未完成',
          action: function () {
            alert("hello3")
            return
          }
        }
      ]
    }
  },
  computed:{
    needJf(){
      return this.productInfo.jf-this.jfMine
    },
    title(){
      switch(this.pageType){
        case 'active':return '免费激活';break;
        case 'upgrade':return '免费升级';break;
      }
      return '免费'
    },
    pageType(){
      var type
      if(this.productId==20000){
        type='active'
      }else{
        type='upgrade'
      }
      return type
    },
    jfMine(){
      return this.$store.state.account.jf
    },
    productId(){
      return this.$route.query.productId
    },
    orderId(){
      return this.$route.query.orderId
    },
    canBuyFree(){
      return this.jfMine>=this.productInfo.jf
    },
    productInfo(){
      var products=this.$store.state.order.products
      if(products.length==0){
        return ''
      }
      var productInfo=products.find(item=>{
        return item.productId==this.productId
      })
      // return '购买服务：'+isUpgrade+productInfo.name+' 支付：'+(productInfo.fee/100).toFixed(0)+'元'
      return productInfo
    },
  },
  methods:{
    checkValid(){
      if(!this.canBuyFree){
        // this.hgjToast(`还需要${this.needJf}积分`,'warning')
        this.hgjToast(`还需完成更多任务`,'warning')
        return false
      }
      return true
    },
    pay(){
      if(!this.checkValid()){
        return
      }
      this.order_pay({
        payType:'ACCOUNT_JF',
        orderId:this.orderId,
      }).then(res=>{
        this.order_getStatusAfterPay(this.orderId)
        this.order_getStatusAfterPay(this.orderId ).then(status=>{
          if(status==='SUCCESS'&&this.productId==20000){
            this.account_setActived()
          }
        })
        console.log('res pay free',res)
      })
    },
    ...mapMutations([
      'account_setActived',
      ]),
    ...mapActions([
      'order_pay',
      'order_getStatusAfterPay',
      ])
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .treatment-detail{
    font-size: 0.15rem;
  }
  .lv-treatment{
    padding:0.05rem 0.15rem;
  }
  .activeaccount-content {
    padding-top: 0.2rem;
    .info {
      border-top: 1px solid #d3d3d3;
      font-size: 0.14rem;
      color: #a4a4a4;
      padding:0.13rem 0.2rem;
      background: white;
    }
    .header {
      padding-right: 0.15rem;
    }
    .content {
      font-size: 0.13rem;
      color: #a4a4a4;
    }
  }
</style>
