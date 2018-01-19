<template>
  <div >
    <app-nav flex-box="0">我的钱包</app-nav>
      <app-dot-bg class='dot-bg '>
        <div class="balance-box">

          <div class="balance-text">账户余额</div>
          <p class="balance-money">
            {{balance}}<span>元</span>
          </p>
          <div class="security-box">
            <div class="fee-detail">
              <p class="money">{{unfreezeMoneyText}}<span>元</span></p>
              <p class="money-text">可提现保证金</p>
            </div>
            <div class="fee-detail">
              <p class="money">{{freezeMoney}}<span>元</span></p>
              <p class="money-text">已冻结保证金</p>
            </div>
          </div>
        </div> 
      </app-dot-bg>
    <div class="dscrp">
      <i class="icon icon-alert"></i>
      <p class="dscrp-text">
        短时间内进行过创建还款计划、终止还款计划、提取保证金等操作，信息显示不正确，可尝试点击
        <span class="refresh" @click='reGetUserInfo'>刷新</span>
        重新查看。
      </p>
    </div>
    <div class="bttn-box">
      <app-button class='bttn' @click.native='balanceWidthdraw'>提现</app-button>
      <app-button class='bttn' @click.native='confirmSecurityWidthDraw'>保证金提现</app-button>
    </div>
      <div class='widthdraw-record' @click='goWidthdrawRecord'>提现记录</div>
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
      if(this.cardsListDC.length===0){
        this.hgjAlert({
          title:'未绑定储蓄卡',
          content:'返回"卡包"页面绑定储蓄卡',
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
      helper.goPage('/balance')
    },
    confirmSecurityWidthDraw(){
      // if(this.cardIdSC==null){
      if(!this.cardIdSC){
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
          },{text:'取消'}]
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
    cardsListDC(){
      return this.$store.state.cards.cardsListDC
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
  .dot-bg{
    position: relative;
    height: 2.68rem;
    background-image: linear-gradient(to right, #4be2f8 1%, #4b84f8);
  }
.balance-box{

  width: 100%;
  height: 2.68rem;
  padding-top: 0.6rem;
  position: relative;
  .balance-text{
    margin: 0 auto;
    width: 0.8rem;
    height: 0.26rem;
    border-radius: 6px;
    border: solid 1px #ffffff;
    font-size: 0.13rem;
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .balance-money{
    font-size: 0.34rem;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    margin-top: 0.16rem;
    span{
      font-size: 0.18rem;
    }
  }
  .security-box{
    width: 100%;
    height: 0.8rem;
    background: rgba(0,0,0,0.56);
    position: absolute;
    bottom: 0;
    padding:0.22rem 0;
    display: flex;
    .fee-detail{
      &:last-child{
        border:0px solid rgba(255, 255, 255, 0.56);
        border-left-width: 1px;
      }
      flex-grow:1;
      /*border:1px solid red;*/
      font-family: PingFangSC;
      font-size: 0.23rem;
      font-weight: 600;
      text-align: center;
      color: #ffffff;
      .money{
        line-height: 1;
        /*border:1px solid red;*/
        span{
          font-size: 0.11rem;
        }
      }
      .money-text{
        width: 100%;
        /*border:1px solid red;*/
        line-height: 1;
        opacity: 0.56;
        font-size: 0.11rem;
        font-weight: 300;
        text-align: center;
        color: rgb(255, 255, 255);
      }
    }
    /*background-image: linear-gradient(to right, #4be2f8 1%, #4b84f8);*/
  }
}

.bttn-box{
  /*border:1px solid red;*/
  width: 100%;
  display: flex;
  margin: 0 auto;
  padding:0 0.1rem;
  padding-top: 0rem;
  .bttn{
    margin:0 0.1rem;
  }
}
.widthdraw-record{
  margin: 0 auto;
  margin-top: 0.95rem;
  display: flex;
  justify-content:center;
  align-items:center;
  width: 1.6rem;
  height: 0.28rem;
  border-radius: 0.14rem;
  /*background-color: #4ba8f8;*/
  /*box-shadow: 0 13px 32px 0 rgba(248, 81, 75, 0.36);*/
  border: solid 1px #4ba8f8;
  font-size: 0.13rem;
  text-align: center;
  color: #4ba8f8;
}
div.dscrp{
  display: flex;
  padding:0.3rem 0.15rem;
  .icon{
    font-size: 0.15rem;
    color:#a4a4a4;
    line-height: 1.5;
  }
  .dscrp-text{
    color:#a4a4a4;
    font-size: 0.14rem;
    line-height: 1.5;
    margin-left: 0.1rem;
    letter-spacing: -0.1px;
    text-align: justify;
    .refresh{
      font-size: 0.15rem;
      color:#4ba8f8;
    }
  }

}

</style>
