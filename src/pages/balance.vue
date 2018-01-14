<template>
  <div class="balance hgj-container" flex="dir:top">
    <app-nav flex-box="0">余额提现</app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-bankcard v-if="!isEmpty" :card="choosedCardInfo"></app-bankcard>
        <div class="emptyCard" v-if="isEmpty" flex="dir:top main:center cross:center">
          <div class="note" flex="cross:center">
            <span class="icon-alert"></span>
            <p>请选择您要提现的银行卡</p>
          </div>
          <div class="btn3">选择银行卡</div>
        </div>
      </div>
      <div class="balance-content">
        <app-formitem label="提现金额" :first="true">
          <app-input class='form-input' :placeholder='"请输入~"' v-model='amount'/>
        </app-formitem>
       <!--  <app-formitem label="联系手机号" :last="true">
          <app-input class='form-input' :placeholder='"请输入~"' v-model='phone'/>
        </app-formitem> -->
        <!-- <img src="/static/img/zxlogo.png" alt=""> -->
      </div>
      <div class="mybutton">
        <app-button @click.native='submit'>提交</app-button>
      </div>
      <app-popview v-model="popFlag" title="选择银行卡" class="chooseCardsPopView planbox">
        <div slot="icon" class="popicon">
          <app-cricleicon icon="icon-bankcard" size="0.28rem" circle="small"></app-cricleicon>
        </div>
        <div slot="content" class="chooseCardsContent planbox-content">
          <div class="liner"></div>
          <app-radio v-model='cardId' :label='card.cardId' v-for='card in cards' :key='card.cardId'>
            <app-carditem :card='card' :choosedCardId='cardId'></app-carditem>
          </app-radio>
          <div @click='addNewDC' >使用新的银行卡</div>
          <div @click='popFlag=false'>确认选择</div>
        </div>
      </app-popview>
    </article>
  </div>
</template>
<script>
  import helper from '../utils/helper.js'
  import {mapGetters,mapActions} from 'vuex'
  export default {
    data () {
      return {
        cardId:null,
        // card1: {
        //   status: 'PLAN',
        //   name: '韩**',
        //   cardNoAfter4: '3638',
        //   billDate: 3,
        //   repaymentDate: 13,
        //   cardCode: 'ABC'
        // },
        amount:null,
        // phone:null,
        popFlag: true,
        // isEmpty: false
      }
    },
    created(){
    },
    beforeDestroy(){
      //todo: 存入store
    },
    methods: {
      submit(){
        this.balance_cashApply({
          cardId:this.cardId,
          fee:this.amount
        })
      },
      addNewDC(){
        let url=helper.urlConcat('/addbankcard',{
          willGoBack:1
        })
        helper.goPage(url)
      },
      ...mapActions([
        'balance_cashApply',
        ])
    },
    mounted(){
      this.cardId=this.cards[0].cardId
    },
    computed:{
      ...mapGetters([
        'cards_dict'
      ]),
      isEmpty(){
        if(!this.cardId){
          return true
        }else{
          return false
        }
      },
      choosedCardInfo(){
        if(!this.cardId){
          return null
        }else{
          return this.cards.find(item=>item.cardId===this.cardId)
        }
      },
      cards(){
        // return [{
        //   status: 'PLAN',
        //   name: '韩**',
        //   cardNoAfter4: '3638',
        //   billDate: 3,
        //   repaymentDate: 13,
        //   cardId:1,
        //   cardCode: 'ABC'
        // },{
        //   status: 'PLAN',
        //   name: '韩**',
        //   cardNoAfter4: '3638',
        //   billDate: 3,
        //   repaymentDate: 13,
        //   cardId:2,
        //   cardCode: 'CIB'
        // }] 
        return this.$store.state.cards.cardsListDC
      }
    },
  }
</script>
<style lang="scss">
  .balance {
    .check-icon{
      position: absolute;
      right: 0;
      top: 0;
    }
    article {
      position: relative;
      .banner {
        padding: 0.15rem 0.2rem;
        background-image: linear-gradient(to top, #2c2c33, #3d404b);
      }
      .mybutton {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0.3rem 0.2rem;
      }
      .chooseCardsPopView {
        .popicon {
          margin-right: 0.1rem;
        }
      }
      .emptyCard {
        width: 100%;
        height: 1.68rem;
        border: 1px dashed white;
        border-radius: 0.08rem;
        .note {
          padding-bottom: 0.1rem;
          color: #a4a4a4;
          font-size: 0.14rem;
          .icon-alert {
            margin-right: 0.085rem;
          }
          p {
            display: inline-block;
            font-size: 0.12rem;
            color: #a4a4a4;
          }
        }
        .btn3 {
          width: 1.94rem;
          height: 0.25rem;
          border-radius: 0.125rem;
          background: white;
          font-size: 0.13rem;
          line-height: 0.25rem;
          text-align: center;
          color: #f84c4b;
        }
      }
      .close {
        font-size: 0.25rem;
        color: #a4a4a4;
      }
    }
  }
</style>