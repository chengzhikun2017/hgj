<template>
  <div class="cards" flex="dir:top">
    <nav flex="cross:center" flex-box="0">
      <span class="side" flex-box="0">
      </span>
      <div class="tabs" flex-box="1" flex="main:center">
        <span :class="{'active': choose == 0}" @click="choose=0">我的信用卡{{numCC}}</span>
        <span :class="{'active': choose == 1}" @click="choose=1">我的储蓄卡{{numDC}}</span>
      </div>
      <span class="side" flex-box="0"></span>
    </nav>

    <article v-if="choose == 0" flex-box="1">
      <!-- <div v-if="cardListCC.length === 0" class="empty">
        <img src="/static/img/creditcard.png" alt="">
      </div> -->
      <div v-for="item in cardListCC" class="cardItem">
        <app-creditcard :card="item" @click.native='goCardDetail(item)'></app-creditcard>
      </div>
      <div class="mybutton">
        <app-button class='add-bttn' :type='1' @click.native='goAddCreditCard'><span class="icon-add"></span>添加银行卡</app-button>
      </div>
    </article>
    <article v-if="choose == 1" flex-box="1">
     <!--  <div v-if="cardListDC.length === 0" class="empty">
        <img src="/static/img/bankcard.png" alt="">
      </div> -->
      <div v-for="item in cardListDC"  class="cardItem">
        <app-bankcard :card="item"></app-bankcard>
      </div>
      <div class="mybutton">
        <app-button class='add-bttn':type='1'  @click.native='goAddDC'><span class="icon-add"></span>添加银行卡</app-button>
        <div class="others" flex="main:justify">
          <span @click='goSCQA'>什么是结算卡？</span>
          <!-- <span>点击分享</span> -->
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import helper from '../utils/helper.js'
  import {mapMutations,mapActions,mapGetters} from 'vuex'
  import CR from '../utils/commonRemind.js'
  export default {
    data() {
      return {
        choose: 0
      }
    },
    created(){
      this.$nextTick(()=>{

      })
    },
    methods:{
      goCardDetail(item){
        let url=helper.urlConcat('/cardDetail',{cardId:item.cardId})
        helper.goPage(url)
      },
      goAddCreditCard(){
        if(!this.isLoged){
          CR.unloginRemind()
          return
        }
        helper.goPage('/addCreditcard1')
      },
      goAddDC(){
        if(!this.isLoged){
          CR.unloginRemind()
          return
        }
        helper.goPage('/addbankcard')
      },
      goSCQA(){
        this.qa_get_ansqwer({
          aim:'2-4',
          title:'什么是结算卡',
        })
        helper.goPage('/questions')
      },
      back(){//temp
        this.$router.go(-1)
      },
      ...mapMutations([
        'qa_get_ansqwer',
        ]),
      ...mapActions([
        'cards_getListCC',
        ]),
    },
    computed:{
      // cardListCC(){
      //   return this.$store.state.cards.cardListCC
      // },
      isLoged(){
        return this.$store.state.account.isLoged
      },
      numDC(){
        return '('+this.$store.state.cards.cardsListDC.length+')'
      },
      numCC(){
        return '('+this.$store.state.cards.cardsListCC.length+')'
      },

      ...mapGetters({
        cardListCC:'cards_listCC',
        cardListDC:'cards_listDC',
      })
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
    font-size: 0.34rem;
    line-height: 1;
    color:white;
    span {
      font-size: 0.18rem;
    }
  }
}
  .cards {
    width:100%;
    height: 100%;
    nav {
      height: 0.44rem;
      padding:0 0.15rem;
      background: #f3f3f3;
      h1 {
        text-align: center;
        font-size: 0.18rem;
      }
      .side {
        font-size: 0.14rem;
        .icon {
          width: 0.23rem;
          height: 0.23rem;
          border-radius: 50%;
          background-color: #383838;
          font-size: 0.10rem;
          font-weight: 1000;
          color: white;
          line-height: 1;
        }
      }
      .tabs {
        span {
          box-sizing: border-box;
          height: 0.44rem;
          display: inline-block;
          margin:0 0.225rem;
          line-height: 0.44rem;
          font-size: 0.15rem;
          font-weight: 700;
        }
        .active {
          color: #f84c4b;
          border-bottom: 0.03rem solid #f84c4b;
        }
      }
    }
    article {
      padding: 0.2rem;
      background: linear-gradient(to top, #2c2c33, #3d404b);
      overflow: auto;
      .empty {
        padding:1.58rem 0 1rem;
        text-align: center;
        img {
          width: 60%;
        }
      }
      .cardItem {
        margin-bottom: 0.1rem;
      }
      .mybutton {
        padding: 0.2rem 0;
        .add-bttn {
          width: 100%;
          height: 0.44rem;
          border-radius: 0.44rem;
          background: white;
          font-size: 0.18rem;
          color: #f84b4b;
          font-weight: 700;
          .icon-add {
            position: relative;
            top: 0.02rem;
            margin-right: 0.1rem;
          }
        }
        .others {
          padding:0.15rem 0 0;
          span {
            font-size: 0.13rem;
            color: #768bf5;
            line-height: 1;
          }
        }
      }
    }
  }
</style>
