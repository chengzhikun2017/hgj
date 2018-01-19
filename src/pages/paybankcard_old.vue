<template>
  <div class="paybankcard hgj-container" flex="dir:top">
    <app-nav flex-box="0">储蓄卡支付</app-nav>
    <div class="banner-card-choosed">
      <app-bankcard  :type='2' v-if="cardId!==null" :card="cardInfo"></app-bankcard>
      <div class="emptyCard" v-if="cardId===null" flex="dir:top main:center cross:center">
        <div class="note" flex="cross:center">
          <span class="icon-alert"></span>
          <p>请选择您要提现的银行卡</p>
        </div>
        <div class="btn3">选择银行卡</div>
      </div>
      <app-button class="card-choose-bttn" :type='1'@click.native='chooseCard' >
        重新选择银行卡
      </app-button>
    </div>
    <article flex-box="1">
      <app-formitem label="验证码" :last="true">
        <app-input class='form-input code-input' :placeholder='"请输入~~"' v-model='code' />
        <bttn-code :validateMethod='isValidated' :getCodeMethod='getCode'></bttn-code>
      </app-formitem>
      <div class="myprotocol">
        <app-protocol></app-protocol>
      </div>
      <div class="mybutton">
        <app-button @click.native='payOrder'>支付</app-button>
      </div>
      <app-popview v-model="popFlag" title="选择银行卡" class="chooseCardsPopView">
        <div slot="icon" class="popicon">
          <app-cricleicon icon="icon-bankcard" size="0.28rem" circle="small"></app-cricleicon>
        </div>
        <div slot="content" class="chooseCardsContent">
          <div class="liner"></div>
          <app-radio v-model='cardId' :label='card.cardId' v-for='card in cardsDC' :key='card.cardId'>
            <app-carditem :card='card' :choosedCardId='cardId'></app-carditem>
          </app-radio>
          <div @click='newCardPay' >使用新的银行卡</div>
        </div>
      </app-popview>
    </article>
  </div>
</template>
<script>
  import helper from '../utils/helper.js'
  import Regs from '../utils/reg.js'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        // name:null,
        name:'黄树栋',
        cardId:null,
        // cardNo:null,
        popFlag:false,
        cardNo:6214852109847213,
        phone:13816938525,
        // phone:null,
        // idCardNo:null,
        idCardNo:321282199201264216,
        code:null,
      }
    },
    methods:{
      payOrder(){
        if(!this.checkValid()){
          return
        }
        let params={
          payType:'UNSPAY',
          orderId:this.orderId,
          cardId:this.cardId,
          verCode:this.code,
        }
        this.order_pay(params).then(res=>{
          this.order_getStatusAfterPay(this.orderId)
          // .then(status=>{
            // if(status==='SUCCESS'&&res.productId==20000){
            //   this.account_setActived()
            // }
          // })
          // console.log('res',res)
        })
      },
      isValidated(){
        if(this.cardId===null){
          this.hgjToast('请选择支付的银行卡','warning')
          return false
        }
        return true
      }, 
      checkValid(){
         if(!this.codeValid){
          this.hgjToast('请输入6位验证码','warning')
          return false
        }
        return true
      }, 
      getCode(countdown) {
        // console.log('orderId,cardId',this.orderId,this.cardId)
        // return
        this.order_unspayPay({
          orderId:this.orderId,
          cardId:this.cardId,
        }).then(res=>{
          countdown()
        })
      },
      newCardPay(){
        let path=helper.urlConcat('/paybankcard',{
          orderId:this.orderId
        })
        helper.goPage(path)
      },
      chooseCard(){
        this.popFlag=true
      },
      ...mapMutations([
        // 'addCardDC_setValue',
        ]),
      ...mapActions([
        'order_unspayPay',
        'order_unspayGetCode',
        'addCardDC_submit',
        'order_pay',
        'order_getStatusAfterPay',
        ])
    },
    created(){
      if(!this.$route.query.orderId){
        //提示重新创建订单
      }
    },
    mounted(){
      this.cardId=this.cardsDC[0].cardId
    },
    computed:{
      cardInfo(){
        if(!this.cardId){
          return {}
        }else{
          return this.cardsDC.find(item=>{
            return item.cardId==this.cardId
          })
        }
      },
      codeValid(){
        return Regs.code6(this.code)
      },  
      orderId(){
        return this.$route.query.orderId
      },
      // cardId(){
      //   return this.query.cardId
      // },
      cardsDC(){
        return this.$store.state.cards.cardsListDC
      },
    },
  }
</script>
<style lang="scss" scoped>
  .paybankcard {
    .myprotocol {
      padding: 0.3rem 0;
    }
    .mybutton {
      padding:0 0.2rem;
    }
    .chooseCardsPopView {
      .liner {
        width: 100%;
        height: 1px;
        margin: 0.15rem 0;
        border:1px dashed #d3d3d3;
        transform: scaleY(.5);
      }
    }
  }

  
</style>