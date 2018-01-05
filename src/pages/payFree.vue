<template>
  <div>
    <app-nav flex-box="0">{{title}}</app-nav>
    <div class="lv-treatment" style='border:1px solid red;'>
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
    <div>{{canBuyFree?'可以升级':'不可以免费升级'}}</div>
    <div class="activeaccount-content">
      <!-- <p class="info"></p> -->
      <p class="info">完成下面任务，即可免费升级</p>
      <app-formitem3 title="分享" note="已被浏览10次" :first="true">
        <div class="header" slot="icon">
          <app-cricleicon></app-cricleicon>
        </div>
        <div class="content" slot="action">
          去分享>
        </div>
      </app-formitem3>
      <app-formitem3 title="了解养成计划" note="详细了解养成计划">
        <div class="header" slot="icon">
          <app-cricleicon></app-cricleicon>
        </div>
        <div class="content" slot="action">
          未完成>
        </div>
      </app-formitem3>
      <app-formitem3 title="实名计划" note="请完成您的实名认证" :last="true">
        <div class="header" slot="icon">
          <app-cricleicon></app-cricleicon>
        </div>
        <div class="content" slot="action">
          未完成>
        </div>
      </app-formitem3>
      <app-button style='width:80%; margin: 0.1rem auto;' @click.native='pay'>立即升级</app-button>
      <!-- <app-button style='width:80%; margin: 0.1rem auto;' @click.native='go'>马上升级</app-button> -->
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
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
        console.log('res pay free',res)
      })
    },
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

</style>
