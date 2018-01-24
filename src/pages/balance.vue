<template>
  <div class="balance hgj-container" flex="dir:top">
    <app-nav flex-box="0">余额提现</app-nav>
    <article flex-box="1">
      <div class="banner-card-choosed">
        <app-bankcard :type='2' v-if="!isEmpty" :card="choosedCardInfo"></app-bankcard>
        <div class="emptyCard" v-if="isEmpty" flex="dir:top main:center cross:center">
          <div class="note" flex="cross:center">
            <span class="icon-alert"></span>
            <p>请选择您要提现的银行卡</p>
          </div>
          <div class="btn3">选择银行卡</div>
        </div>
        <app-button class="card-choose-bttn" v-if='cardId' :type='1'@click.native='chooseCard' >
          重新选择银行卡
        </app-button>
      </div>
      <div class="balance-content">
        <app-formitem label="提现金额" :first="true">
          <app-input  class='form-input' :placeholder='"请输入提现金额"' v-model='amount'/>
        </app-formitem>
       <!--  <app-formitem label="联系手机号" :last="true">
          <app-input class='form-input' :placeholder='"请输入~"' v-model='phone'/>
        </app-formitem> -->
        <!-- <img src="/static/img/zxlogo.png" alt=""> -->
      </div>
      <app-description class='description'>
        工作时间提现金额2小时内到账
      </app-description>
      <div class="mybutton">
        <app-button @click.native='confirmSubmit'>提交</app-button>
      </div>
      <app-popview v-model="popFlag" title="选择银行卡" class="chooseCardsPopView">
        <div slot="icon" class="popicon">
          <app-cricleicon icon="icon-bankcard" size="0.28rem" circle="small"></app-cricleicon>
        </div>
        <div slot="content" class="chooseCardsContent">
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
        popFlag: false,
        // isEmpty: false
      }
    },
    created(){
    },
    beforeDestroy(){
      //todo: 存入store
    },
    methods: {
      chooseCard(){
        this.popFlag=true
      },
      confirmSubmit(){
        if(!this.checkValid()){
          return
        }
        if(this.amount<100){
          this.hgjAlert({
            title:'金额低于100元',
            content:'需收取2元提现手续费',
            options:[{text:'继续',callback:()=>{
              this.submit()
            }},{text:'取消'}],
          })
        }else{
          // let amount=this.amount
          this.hgjAlert({
            title:'提现'+Number(this.amount).toFixed(2)+"元",
            options:[{text:'继续',callback:()=>{
              this.submit()
            }},{text:'取消'}],
          })
        }

      },
      submit(){
        this.balance_cashApply({
          cardId:this.cardId,
          fee:this.amount*100,
          moneyType:'MONEY',
        }).then(res=>{
          this.hgjToast('提现成功')
          let feeMinus=this.amount*100
          this.$store.state.account.money-=feeMinus
        })
      },
      checkValid(){
        console.log(this.amount)
        if (isNaN(this.amount)) {
          this.hgjToast('请正确填写提现金额格式',1)
          return false
        }
        if(!this.amount){
          this.hgjToast('请填写提现金额',1)
          return false
        }
        if(this.amount < 10){
          this.hgjToast('提现金额最低10元',1)
          return false
        }
        if(this.amount - Math.floor(this.amount) > 0){
          this.hgjToast('只支持整额提现',1)
          return false
        }

        return true
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
      .description{
        margin:0.2rem 0.15rem;
        margin-bottom: 0;
      }
      .mybutton {
        padding:0 0.2rem;
        margin-top: 0.3rem;
      }
      .chooseCardsPopView {
        .popicon {
          margin-right: 0.1rem;
        }
        .liner {
          width: 100%;
          height: 1px;
          margin: 0.15rem 0;
          border:1px dashed #d3d3d3;
          transform: scaleY(.5);
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