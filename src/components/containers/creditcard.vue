<template>
  <div class="creditcard">
    <div class="card" :class="bgcolor">
      <div class="floor" flex="main:justify">
        <div class="logo" flex-box="1">
          <img :src="'/static/img/title/'+card.cardCode+'.png'" alt="">
        </div>

        <span v-if='type===0'>
          <span class="btn2" v-if="card.planStatus == 'SUCCESS'" @click.stop='goNewPlan'>创建还款计划</span>
          <span class="btn2" v-if="card.planStatus == ''" @click.stop='goNewPlan'>创建还款计划</span>
          <span class="btn2" v-if="card.planStatus == 'FAILED'"  @click.stop='goNewPlan'>创建还款计划</span>
          <span class="btn2" v-if="card.planStatus == 'WAIT'"  @click.stop='cards_getListCC'>计划创建中，点击刷新</span>
          <span class="btn2" v-if="card.planStatus == 'DOING'" >计划执行中</span>
        </span>
      </div>
      <div class="floor floor2" flex="main:justify">
        <div class="left">
          <span>{{card.name}}</span>
          <span class="liner">|</span>
          <span>卡片尾号：{{card.cardNoAfter4}}</span>
        </div>
        <span v-if='type===2||type===0||type===3'>
          <!-- <span class="btn1" v-show="card.status === 'PLAN'">查看明细</span> -->
          <span class="btn1" v-show="card.status === 'DOING'" @click.stop='cards_getListCC'>绑定中，点击刷新</span>
          <span class="" v-show="card.status === 'FAILED'">绑定失败</span>
          <span class="btn1" v-show="card.status === 'FAILED'">重新绑定</span>
          <span class="btn1" v-show="card.status === 'SUCCESS'" @click.stop='goEdit'>修改</span>
        </span>
        <span v-if='type===2'>
          <span v-show="card.status === 'SUCCESS'" class="delete" @click.stop='deleteConfirm'>
            <span class="icon-trash"></span>
          </span>
        </span>
        <!-- <span class="btn2" v-show="card.planStatus !== 'DOING'" @click.stop='goNewPlan'>建立还款计划</span> -->
      </div>
      <div class="floor">
        <span v-if="card.status !== 'choose'" >账单日：每月{{card.billDate}}号 <span class="liner">|</span> 还款日：{{isRepaySameMonth?'每':'次'}}月{{card.repaymentDate}}号</span>
        <span class="btn3" v-show="card.status === 'choose'">重新选择银行卡</span>
      </div>
    </div>
  </div>
</template>
<script>
//todo 隔月还款

//todo 刷新功能
  import helper from './../../utils/helper.js'
  import {mapActions} from 'vuex'
  export default {
    props: {
      type:{
        default:0,
        //0 全部显示
        //1 不显示任何操作按钮
        //2 显示删除，不显示计划状态（信用卡详情页）
        //3 只显示编辑
      },
      card: {
        type: Object,
        default: function () {
          return {
            billDate:null,
            cardCode:null,
            cardId:null,
            cardNoAfter4:null,
            createTime:null,
            name:null,
            phone:null,
            planId:null,
            planStatus:null,
            repaymentDate:null,
            status:null,
          }
        }
      },
      // 颜色不能作为参数传入，考虑到数据接口并没有设计这块
      bgcolor: {
        type: String,
        default: 'cardbg-blue'
      }
    },
    methods:{
      goNewPlan(){
        // let url=helper.urlConcat('/plan',{
        //   cardId:this.card.cardId
        // })
        // console.log('go new plan',url)
        helper.goNewPlanPage(this.card)
      },
      deleteConfirm(){
        this.hgjAlert({
          content:'确认删除尾号为'+this.card.cardNoAfter4+'的信用卡',
        options: [{
          text: '确认',
          callback: this.deleteCard
        },{
          text:'取消',
        }],
      })
      },
      deleteCard(){
        console.log('delete')
        this.$store.dispatch('addCardCC_delete',this.card.cardId)
        .then(res=>{
          this.router_willBackToIndex()
          this.router_setNewPath(['/cards'])
          helper.goPage(-1)
          // console.log('delete CC card res',res)
        })
      },
      goEdit(){
        let temp={
          cardId:this.card.cardId,
          billDate:this.card.billDate,
          repaymentDate:this.card.repaymentDate,
        }
        let url=helper.urlConcat('/orderedit',this.card)
        helper.goPage(url,undefined,1)
      },
      ...mapActions([
        'router_willBackToIndex',
        'router_setNewPath',
        'cards_getListCC',
        ]),

    },
    computed:{
      isRepaySameMonth(){
        return Number(this.card.billDate)<Number(this.card.repaymentDate)
      },
    },
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card {
    box-sizing: border-box;
    width: 100%;
    height: 1.68rem;
    padding: 0.2rem 0.15rem;
    border-radius: 0.08rem;
    .floor {
        font-size: 0.13rem;
        color: white;
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
          box-sizing: border-box;
          line-height: 0.24rem;
          height: 0.67rem;
          padding-top: 0.265rem;
          padding-bottom: 0.15rem;
          border-bottom: 1px dashed white;
          margin-bottom: 0.15rem;
          .delete {
            font-size: 0.14rem;
          }
        }
      }
    .btn1 {
      display: block;
      padding:0 0.2rem;
      margin-left: 0.1rem;
      height: 0.25rem;
      border-radius: 0.125rem;
      background-color: #ffffff;
      box-shadow: 0px 0.015rem 0.065rem 0 rgba(13, 13, 13, 0.26);
      text-align: center;
      line-height: 0.25rem;
      font-size: 0.13rem;
      color: #676dea;
    }
    .btn2 {
      border:0.005rem solid white;
      padding:0.036rem 0.16rem;
      font-size: 0.13rem;
      line-height: 1;
      border-radius: 0.125rem;
      background: transparent;
      vertical-align:middle;
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
    },
    &.cardbg-lightpurple {
      background-image: linear-gradient(to right, #d449ed, #9d25db);
      box-shadow: 0px 26px 78px 0 rgba(13, 13, 13, 0.56);
      .btn1 {
        color: #9f26dc;
      }
    }
  }
</style>