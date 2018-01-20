<template>
  <div class="order" flex="dir:top">
    <app-nav flex-box="0">支付订单</app-nav>
    <article flex-box="1">
      <div class="banner" flex="dir:top main:center cross:center">
        <!-- <app-creditcard :card="card1"></app-creditcard> -->
        <!-- <div class="plan">
          <div class="note">
            养成计划：
          </div>
          <p>10天 / 5%保证金</p>
        </div> -->
        <span class="paymoney">支付金额</span>
        <div class="money">{{(productInfo.fee / 100).toFixed(0)}}<span>元</span></div>
        <div class="originBox">原价：<span class="originFee">{{(productInfo.originFee / 100).toFixed(0)}}</span></div>
        <!-- <p>{{productDscrp}}</p> -->

      </div>
      <div class="order-content">
        <!-- <app-radio v-model='payWay' :label='0'>
          <app-formitem3 title="信用卡付款" note="激活使用信用卡，付款99折，无需网银！" :first="true" :notePoint="true">
            <div class="header" slot="icon">
              <span class="icon icon-creditcard red"></span>
            </div>
            <div class="content" slot="action">
              <app-check :type='1' :value='payWay===0'/>
            </div>
          </app-formitem3>
        </app-radio> -->
        <!-- <app-formitem3 title="微信支付" note="需要微信客户端打开">
          <div class="header" slot="icon">
            <span class="icon icon-wechat green"></span>
          </div>
          <div class="content" slot="action">
          </div>
        </app-formitem3> -->
        <app-radio v-model='payWay' :label='2'>
          <app-formitem3 title="余额支付" :note="'余额'+balance+'元'">
            <div class="header" slot="icon">
              <span class="icon icon-money orange"></span>
            </div>
            <div class="content" slot="action">
              <app-check :type='1' :value='payWay===2'/>
            </div>
          </app-formitem3>
        </app-radio>
        <app-radio v-model='payWay' :label='3'>
          <app-formitem3 title="储蓄卡快捷支付" note="支持各大主流银行卡" :last="true">
            <div class="header" slot="icon">
              <span class="icon icon-bankcard blue"></span>
            </div>
            <div class="content" slot="action">
              <app-check :type='1' :value='payWay===3'/>
            </div>
          </app-formitem3>
        </app-radio>

        <div class="mybutton">
          <app-button @click.native='goPay'>确认</app-button>
        </div>

      </div>
    </article>
  </div>
</template>
<script>
  import {mapActions,mapMutations} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        payWay:null,
        card1: {
          status: 'PLAN',
          name: '韩**',
          cardNoAfter4: '3638',
          billDate: 3,
          repaymentDate: 13
        },
        orderStatus:{},
        cardId:null,
        payWays:[
          {
            title:'',
            note:'',
            icon:'',
            iconClass:'',
            value:0
          },
        ],
      }
    },
    computed:{
      balance(){
        let fee=this.$store.state.account.money/100
        return fee.toFixed(2)
      },
      productDscrp() {
        // if(!this.productId){
        //   return null
        // }
        // var products = this.$store.state.order.products
        if (!this.productInfo) {
          return ''
        }
        var productInfo = this.productInfo
        var orderDecrp = ''
        if(productInfo.productId===10000){
          return '智能还卡 '+ '支付：' +(productInfo.fee / 100).toFixed(0) + '元'
        }
        if (productInfo) {
          var isUpgrade
          if (this.productId == 20000) {
            isUpgrade = ''
          } else {
            isUpgrade = '升级'
          }
          orderDecrp = '购买服务：' + isUpgrade + productInfo.name + ' '
          return orderDecrp + '支付：' + (productInfo.fee / 100).toFixed(0) + '元'
        }


      },
      productInfo(){
        if(this.productId){
          var products = this.$store.state.order.products
          return products.find(item => {
            return item.productId == this.productId
          })
        }else if(this.orderStatus){
          return this.orderStatus
        }

      },
      productId(){
        return this.$route.query.productId
      },
      orderId(){
        return this.$route.query.orderId
      },
      cardsDC(){
        return this.$store.state.cards.cardsListDC
      },
    },
    created(){
      var products=this.$store.state.order.products
      console.log('products',products)
      if(!this.$route.query.orderId){
        console.log('%cno orderId','color:red')
      }
      if(!this.productId){
        this.getOrderStatus()
      }
    },
    methods:{
      getOrderStatus(){//todo:从上一页获取订单描述
        this.order_status(this.orderId).then(res=>{
          console.log('order status ',res)
          this.orderStatus=res
        })
      },
      payBalance(){
        let params={
          payType:'ACCOUNT_BALANCE',
          orderId:this.orderId,
          cardId:this.cardId,
          verCode:this.code,
        }
        this.order_pay(params).then(res=>{
          this.order_getStatusAfterPay(this.orderId)
          // .then(status=>{
            // if(status==='SUCCESS'&&this.productId==20000){
            //   this.account_setActived()
            // }
          // })
          console.log('res',res)
        })
      },
      payBalanceConfirm(){
        this.hgjAlert({
          title:'使用余额支付',
          options: [{
            text: '确认',
            callback: () => {
              this.payBalance()
            }
          }, {
            text: '取消',
          }]
        })
        
      },
      goPay(){
        if(this.payWay==2){
          this.payBalanceConfirm()
        }
        if(this.payWay==3){
          if(this.cardsDC.length===0){
            this.hgjAlert({
              content:'未绑定储蓄卡，是否使用新卡支付',
              options:[{text:'确认',callback:()=>{
                let url=helper.urlConcat('/paybankcard',{
                  orderId:this.orderId
                })
                helper.goPage(url)
              }},{text:'取消'}],
            })
            return
          }
          let orderId=this.orderId
          let url=helper.urlConcat('/paybankcard_old',{
            orderId,
          })
          helper.goPage(url)
          
        }
      },
      ...mapMutations([
        'account_setActived',
        ]),
      ...mapActions([
        'order_status',
        'order_pay',
        'order_getStatusAfterPay',
        ])
    },
  }
</script>
<style lang="scss" scoped>
  .order {
    width: 100%;
    height: 100%;
    article {
      background: #f3f3f3;
      overflow: auto;
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
          font-size: 0.34rem;
          line-height: 1;
          color:white;
          span {
            font-size: 0.18rem;
          }
        }
        .originBox {
          font-size: 0.12rem;
          color: white;
          .originFee {
            color: rgb(248, 75, 75);
            text-decoration: line-through;
          }
        }
      }
      .order-content {
        padding-top: 0.2rem;
        .header {
          .icon {
            display: inline-block;
            width: 0.38rem;
            font-size: 0.24rem;
          }
        }
      }
      .mybutton {
        padding: 0.36rem 0.2rem;
      }
    }
  }
  .red {
    color: #f84f4b;
  }
  .green {
    color: #33d656;
  }
  .orange {
    color: #ed7d4c;
  }
  .blue {
    color: #4c89ed;
  }

</style>