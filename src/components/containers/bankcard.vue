<template>
  <div class="bankcard">
    <div class="card" :class="bgcolor">
      <div class="floor" flex="main:justify">
        <div class="logo" flex-box="1">
          <img :src="'/static/img/title/'+card.cardCode+'.png'" alt="">
        </div>
        <span v-if='type==0' style='text-align: center;'>
          <span class="btn1" v-show="card.settlementStatus === 'SUCCESS'">结算卡</span>
          <span class="btn1" v-if='!!!hasSC' v-show="card.settlementStatus === ''" @click='bindSC'>设为结算卡</span>
          <span class="btn1" v-show="card.settlementStatus === 'FAILED'">设为结算卡失败</span>
          <span class="btn1" v-show="card.settlementStatus === 'FAILED'">重新设置为结算卡</span>
        </span>
        <!-- <span class="btn1" v-show="card.settlementStatus === 'edit'">编辑</span> -->
      </div>
      <div class="floor floor2" flex="main:justify">
        <div class="left">
          <span>{{card.name}}</span>
          <span class="liner">|</span>
          <span>卡片尾号：{{card.cardNoAfter4}}</span>
        </div>
        <div class="right">
          <span class="delete" @click='deleteCard' v-if='type==0'>
            <span class="icon-trash"></span>
          </span>
        </div>
      </div>
      <div class="floor">
        <span class="cardtype" v-if='type!==2'>储蓄卡</span>
        <!-- <span v-if="card.status !== 'choose'" >账单日：每月{{card.billDate}}号 <span class="liner">|</span> 还款日：每月{{card.payDate}}号</span> -->
        <!-- <span class="btn3" v-show="card.status === 'choose'">重新选择银行卡</span> -->
        <slot name="floor"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import helper from '../../utils/helper.js'
  import {mapMutations,mapActions} from 'vuex'
  export default {
    props: {
      type:{
        default:0,
      },
      card: {
        type: Object,
        default: (function () {
          return {
            status: 'PLAN',
            name: '韩**',
            cardNoAfter4: '3638',
            cardCode: 'ABC'
          }
        })()
      },
      // 颜色不能作为参数传入，考虑到数据接口并没有设计这块
      bgcolor: {
        type: String,
        default: 'cardbg-blue'
      }
    },
    data () {
      return {
      }
    },
    computed:{
      hasSC(){
        return this.$store.state.cards.cardIdSC
      },
    },
    methods:{
      bindSC(){
        this.hgjAlert({
          title:'设为结算卡',
          options:[{text:'确定',callback:()=>{
            this.addCardDC_bindSC(this.card.cardId).then(res=>{
              this.hgjToast('已设为结算卡')
            })
          }},{text:'取消'}]
        })
        
      },
      deleteCard(){
        this.hgjAlert({
          title:'删除尾号为：'+this.card.cardNoAfter4+'的储蓄卡',
          options:[{text:'确定',callback:()=>{
            this.addCardDC_delete(this.card.cardId).then(res=>{
              this.hgjToast('已删除')
            })
          }},{text:'取消'}]
        })
      },

      ...mapActions([
        'addCardDC_bindSC',
        'addCardDC_delete',
        ])
    },
  }
</script>
<style lang="scss" scoped>
  .bankcard {
    .card {
      box-sizing: border-box;
      width: 100%;
      height: 1.68rem;
      padding: 0.2rem 0.15rem;
      border-radius: 0.08rem;
      .floor {
        font-size: 0.13rem;
        color: white;
        .right {
          .delete {
            font-size: 0.14rem;
          }
        }
        .cardtype { 
          /*color: rgba(19, 8, 248, 0.2);*/
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.2rem;
          font-weight: 700;
          letter-spacing: 0.08rem;
        }
        
        .logo {
          height: 0.25rem;
          img {
            height: 0.24rem;
          }
        }
        .liner {
          padding:0 0.06rem;
        }
        &.floor2 {
          line-height: 0.24rem;
          box-sizing: border-box;
          height: 0.67rem;
          padding-top: 0.265rem;
          padding-bottom: 0.15rem;
          border-bottom: 1px dashed white;
          margin-bottom: 0.15rem;
        }
      }
      .btn1 {
        display: block;
        padding:0 0.2rem;
        height: 0.25rem;
        border-radius: 0.125rem;
        background-color: #ffffff;
        box-shadow: 0px 0.015rem 0.065rem 0 rgba(13, 13, 13, 0.26);
        text-align: center;
        line-height: 0.25rem;
        font-size: 0.13rem;
      }
      .btn2 {
        display: inline-block;
        border:0.005rem solid white;
        padding:0.025rem 0.16rem;
        border-radius: 0.125rem;
        background: transparent;
        color: white;
      }
      .btn3 {
        display: table;
        margin:0 auto;
        border-radius: 0.125rem;
        padding: 0.06rem 0.3rem;
        font-size: 0.13rem;
        line-height: 1;
        color: #f84c4b;
        background-color: #ffffff;
        box-shadow: 0px 0.015px 0.065px 0 rgba(13, 13, 13, 0.26);
      }
      &.cardbg-blue {
        background-image: linear-gradient(to right, #64a6f8, #6767e8);
        box-shadow: 0px 26px 78px 0 rgba(13, 13, 13, 0.56);
        .btn1 {
          color: #676dea;
        }
      }
      &.cardbg-lightpurple {
        background-image: linear-gradient(to right, #d449ed, #9d25db);
        box-shadow: 0px 26px 78px 0 rgba(13, 13, 13, 0.56);
        .btn1 {
          color: #9f26dc;
        }
      }
    }
  }
</style>