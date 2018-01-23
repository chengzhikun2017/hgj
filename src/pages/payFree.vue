<template>
  <div>
    <app-nav flex-box="0">{{title}}</app-nav>
    <div class="banner" flex="dir:top main:center cross:center">
      <!-- <span class="paymoney">支付金额</span> -->
      <!-- <div class="money">{{(productInfo.fee / 100).toFixed(0)}}<span>元</span></div> -->
      <!-- <p>{{productDscrp}}</p> -->
      <div class="paymoney">免费福利</div>
      <div class="money" v-if='!canBuyFree'>只需推广{{Math.ceil(productInfo.jf/10000)}}个注册用户</div>
      <div class="money sub" v-if='!canBuyFree'>还差{{Math.ceil(needJf/10000)}}个名额，再接再厉</div>
      <div class="money" v-if='canBuyFree'>推广更多用户，获得更多积分</div>
    </div>
<!--     <div class="lv-treatment" v-if='!canBuyFree' style='border:1px solid red;'>
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
    </div> -->

    <hr>
    <div class="activeaccount-content">
      <!-- <p class="info"></p> -->
      <p class="info" v-if='!canBuyFree'>完成下面任务，即可免费升级</p>
      <p class="info" v-if='canBuyFree'>可以继续完成下面任务，获取更多免费机会</p>
      <app-menulist v-model="menulistData"></app-menulist>
      <app-button style='width:80%; margin: 0.25rem auto;' @click.native='pay' v-if='canBuyFree'>立即升级</app-button>
      <!-- <app-button style='width:80%; margin: 0.1rem auto;' @click.native='go'>马上升级</app-button> -->
      <!-- {{ Regs.idCardNoUtil.checkIdCardNo("330382199202235931") }} -->
      <!-- <span @click="ceshi">测试</span> -->
    </div>
  </div>
</template>

<script>
import Regs from '@/utils/reg.js'
import {mapActions,mapMutations} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed:{
    sharePagePv(){
      // console.log('this.$store.state.share',this.$store.state.share)
      return this.$store.state.share.sharePagePv
    },
    menulistData(){
    return[
      {
        title: '分享链接，邀请好友注册',
        icon: 'icon-share',
        note: '已被浏览'+this.sharePagePv+'次',
        position: -1,
        notePoint: false,
        long: false,
        actionName: '去分享',
        action:  () =>{
          console.log('show share')
          this.share_show()
        }
      },
      // {
      //   title: '了解养成计划',
      //   icon: 'icon-date',
      //   note: '详细了解养成计划',
      //   position: 0,
      //   notePoint: false,
      //   long: false,
      //   actionName: '未完成',
      //   action: function () {
      //     console.log('hello2')
      //   }
      // },
      // {
      //   title: '实名计划',
      //   icon: 'icon-person',
      //   note: '请完成您的实名认证',
      //   position: 1,
      //   notePoint: false,
      //   long: false,
      //   actionName: '未完成',
      //   action: function () {
      //     console.log('hello3')
      //   }
      // }
    ]
    }, 

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
  methods: {
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
      'share_show',
      ]),
    ...mapActions([
      'order_pay',
      'order_getStatusAfterPay',
      'share_viewCount',
      ])
  },
  created(){
    this.share_viewCount()
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .banner {
    width: 100%;
    height: 1.78rem;
    background-image: linear-gradient(to right, #4b8cf8 1%, #884bf8);
    .paymoney {
      padding: 0.07rem 0.14rem;
      border:1px solid white;
      border-radius: 0.03rem;
      font-size: 0.13rem;
      color: white;
      line-height: 1;
    }
    .money {
      margin-top: 0.15rem;
      font-size: 0.18rem;
      line-height: 1;
      color:white;
      span {
        font-size: 0.18rem;
      }
    }
    .sub{
      font-size: 0.16rem;
    }
  }
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
