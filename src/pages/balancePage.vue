<template>
  <div >
    <app-nav flex-box="0">我的钱包</app-nav>
      <br>
    
    <div >
      <div class="fee-detail">可提现保证金：{{unfreezeMoneyText}}元</div>
      <div class="fee-detail">已冻结保证金：{{freezeMoney}}元</div>
      <div class="fee-detail">账户余额：{{balance}}元</div>
    </div>
      <br>

    <div class="temp-bttn">
      <app-button class='' @click.native='balanceWidthdraw'>提现</app-button>
      <br>
      <app-button class='' @click.native='confirmSecurityWidthDraw'>保证金提现</app-button>
      <div class='widthdraw-record' @click='goWidthdrawRecord'>提现记录</div>
    </div>
    <p class="dscrp">
      <i class="icon-alert"></i>
      短时间内进行过创建还款计划、终止还款计划、提取保证金等操作，信息显示不正确，可尝试点击
      <span class="refresh" @click='reGetUserInfo'>刷新</span>
      重新查看。
    </p>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
import {mapActions,mapMutations} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods:{
    goWidthdrawRecord(){
      helper.goPage('/balanceRecords')
    },
    reGetUserInfo(){
      this.account_getUserInfo({showLoading:true})
    },
    balanceWidthdraw(){
      helper.goPage('/balance')
    },
    confirmSecurityWidthDraw(){
      // if(this.cardIdSC==null){
      if(this.cardIdSC){
        this.hgjAlert({
          title:'无结算卡',
          content:'返回"卡包"页面选一张储蓄卡为结算卡',
          options:[{
            text:'确定',
            callback:()=>{
              this.router_willBackToIndex()
              this.router_setNewPath(['/cards'])
              helper.goPage(-1)

            },
          }]
        })
        return
      }
      this.hgjAlert({
        title:'提取保证金',
        content:'提取全部未冻结保证金'+this.unfreezeMoney+'元',
        options: [{
          text: '确认',
          callback: () => {
            this.securityWidthDraw()
          }
        }, {
          text: '取消'
        }],
      })
    },
    securityWidthDraw(){
      this.balance_cashApply({
        fee:this.unfreezeMoney,
        cardId:this.cardIdSC,
        moneyType:'UNFREEZE_MONEY',
      }).then(res=>{
        this.hgjToast('保证金提取成功')
        this.$store.state.account.unfreezeMoney=0
      })
    },
    ...mapMutations([
      'router_willBackToIndex',
      'router_setNewPath',
      ]),
    ...mapActions([
      'balance_cashApply',
      'account_getUserInfo',
      ])
  },
  computed:{
    cardIdSC(){
      return this.$store.state.cards.cardIdSC
    },
    balance() {
      let fee = this.userInfo.money / 100
      return fee.toFixed(2)
    },
    // jifen(){
    //   return this.userInfo.jf
    // },
    unfreezeMoney(){
      return this.userInfo.unfreezeMoney
    },
    unfreezeMoneyText(){
      let fee=(this.userInfo.unfreezeMoney)/100
      return fee.toFixed(2)
    },
    freezeMoney(){
      let fee=this.userInfo.freezeMoney/100
      return fee.toFixed(2)
    },
    userInfo(){
      return this.$store.state.account
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.fee-detail{
  font-size: 0.16rem;
  padding:0 0.15rem;
  line-height: 1.6;
  color:#333333;
}
.temp-bttn{
  width: 80%;
  margin: 0 auto;
}
.widthdraw-record{
  text-align: right;
  font-size: 0.14rem;
  color:#4585F5;
  padding:0.15rem 0;
}
.dscrp{
  color:#666666;
  font-size: 0.14rem;
  padding:0.15rem;
  line-height: 1.6;
  .refresh{
    font-size: 0.15rem;
    color:#4585F5;
  }
}

</style>
