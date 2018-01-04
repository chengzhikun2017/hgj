<template>
  <div class="paybankcard hgj-container" flex="dir:top">
    <app-nav flex-box="0">储蓄卡支付</app-nav>
    <div class="banner">
      <app-creditcard v-if="cardId!==null" :card="cardInfo"></app-creditcard>
      <div class="emptyCard" v-if="cardId===null" flex="dir:top main:center cross:center">
        <div class="note" flex="cross:center">
          <span class="icon-alert"></span>
          <p>请选择您要提现的银行卡</p>
        </div>
        <div class="btn3">选择银行卡</div>
      </div>
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
      <app-radio v-model='cardId' :label='card.cardId' v-for='card in cardsDC' :key='card.cardId'>
        <app-formitem3 :title="card.cardCode" :note="'(尾号：'+card.cardNoAfter4+')'" :last="true" :long="true">
          <div slot="icon">
            <div class="myicon">
              <app-cricleicon icon="icon-bankcard" bgcolor="bg-red"></app-cricleicon>
            </div>
          </div>
          <div slot="action">
            <app-check :value='cardId==card.cardId' :type='1' class='check-icon' />
          </div>
        </app-formitem3>
        <p @click='newCardPay'>使用新卡</p>
      </app-radio>
    </article>
  </div>
</template>
<script>
  import helper from '../utils/helper.js'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        // name:null,
        name:'黄树栋',
        cardId:null,
        // cardNo:null,
        cardNo:6214852109847213,
        phone:13816938525,
        // phone:null,
        // idCardNo:null,
        idCardNo:321282199201264216,
        code:null,
      }
    },
    methods:{
      // bindCardAndGetCode(){
      //   this.addCardDC_setValue(this)
      //   //validate infomation
      //   return new Promise((resolve,reject)=>{
      //     this.addCardDC_submit().then(res=>{
      //       resolve(res)
      //     })
      //   })
        
      // },
      payOrder(){
        
      },
      isValidated(){
        if(this.cardId===null){
          this.hgjToast('请选择支付的银行卡','warning')
          return false
        }
        return true
      },  
      getCode(countdown) {
        console.log('orderId,cardId',this.orderId,this.cardId)
        // return
        this.order_unspayPay({
          orderId:this.orderId,
          cardId:this.cardId,
          // name:this.name,
          // idCardNo:this.idCardNo,
          // cardNo:this.cardNo,
          // phone:this.phone,
        }).then(res=>{
          console.log('bindCardAndGetCode res',res)
        })
        return
        this.order_unspayGetCode({
          orderId: this.orderId,
          cardId: this.cardId,
        }).then(res => {
          console.log('res', res)
          countdown()
        })
      },
      newCardPay(){
        let path=helper.urlConcat('/paybankcard',{
          orderId:this.orderId
        })
        helper.goPage(path)
      },
      ...mapMutations([
        // 'addCardDC_setValue',
        ]),
      ...mapActions([
        'order_unspayPay',
        'order_unspayGetCode',
        'order_pay',
        'addCardDC_submit'
        ])
    },
    created(){
      if(!this.$route.query.orderId){
        //提示重新创建订单
      }
    },
    computed:{
      cardInfo(){
        if(!this.cardId){
          return {}
        }else{
          return this.cardsDC.find(item=>{
            console.log('item card',item,item.cardId==this.cardId)
            return item.cardId==this.cardId
          })
        }
      },
      pay(){
        let params={
          payType:'UNSPAY',
          orderId:this.orderId,
          cardId:this.cardId,
          verCode:this.code,
        }
        this.order_pay(params).then(res=>{
          console.log('res',res)
        })
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
  }
  
</style>