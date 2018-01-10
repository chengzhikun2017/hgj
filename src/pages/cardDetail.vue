<template>
  <div class="cardDetail" flex="dir:top">
    <app-nav flex-box="0">信用卡详情</app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-creditcard :card="cardInfo"></app-creditcard>
      </div>
      <div style="font-size: 0.15rem;text-align: right;" v-if='hasPlan' @click='viewPlanRecords'>查看历史计划</div>
      <div class="content" v-if='crrtPlan'>
        <div class="planbox">
          <header flex="cross:center">
            <span class="icon" flex="main:center cross:center" flex-box="0">
              <span class="icon-plan"></span>
            </span>
            <div class="title" flex="dir:top main:center" flex-box="1">
              <h2>计划执行记录</h2>
              <p>当前计划</p>
            </div>
            <span @click='endPlan'>终止计划</span>
          </header>
          <div class="planbox-content" >
            <div class="liner"></div>
            <app-formitem2 label="计划还款：">
              <span class="msg">{{crrtPlan.taskFee|moneyFilter}}</span>
            </app-formitem2>
             <app-formitem2 label="计划时间：">
              <span class="msg">{{1+(crrtPlan.endDate-crrtPlan.beginDate)/24/3600000}}天</span>
            </app-formitem2>
            <app-formitem2 label="保证金：">
              <span class="msg">{{crrtPlan.securityFee|moneyFilter}}</span>
            </app-formitem2>
            <app-formitem2 label="服务费用：">
              <span class="msg">{{crrtPlan.serviceFee|moneyFilter}}</span>
            </app-formitem2>
          </div>
          <div class="footer">
            <app-button @click.native='viewPlanDetail' v-if='crrtPlan'>查看还款计划</app-button>
          </div>
        </div>
      </div>
      <app-button style='width:80%;margin: 0 auto;' @click.native='goNewPlan' v-if='!crrtPlan'>开启还款计划</app-button>
    </article>
  </div>
</template>
<script>
  import '@/css/components.scss'
  import {mapActions} from 'vuex'
  import helper from '../utils/helper.js'
  export default  {
    data () {
      return {
        crrtPlan:null,
        hasPlan:false,
        polling:null,
      }
    },
    methods:{
      viewPlanRecords(){
        let url=helper.urlConcat('/planrecords',{cardId:this.cardInfo.cardId})
        helper.goPage(url)
      },
      viewPlanDetail(){
        let url=helper.urlConcat('/planprocess',this.crrtPlan)
        helper.goPage(url)
      },
      goNewPlan(){
        helper.goNewPlanPage(this.cardInfo)
      },
      planReview(){
        this.plan_viewLatest(this.cardInfo.cardId).then(res=>{
          console.log('plan review',res)
          if (res[0]) {
            if (res[0].status === 'DOING') {
              this.crrtPlan = res[0]
            }
            this.hasPlan=true
          }
        })
      },
      endPlan(){
        this.plan_end(this.crrtPlan.planId).then(res=>{
          this.polling=setInterval(()=>{
            this.plan_endStatus(res.actionId).then(res=>{
              if(res.status==='SUCCESS'||res.status==='FAILED'){
                clearInterval(this.polling)
                this.planReview()
                this.hgjAlert({
                  title:res.statusRemark,
                })

              }
            })
          },300)
        })
      },
      ...mapActions([
        'plan_review',
        'plan_end',
        'plan_endStatus',
        'plan_viewLatest',
        ])
    },
    created(){
      this.planReview()
    },
    computed:{
      cardInfo(){
        return this.$route.query
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cardDetail  {
    width: 100%;
    height: 100%;
    article {
      background: #f3f3f3;
      overflow: auto;
      .banner {
        padding: 0.15rem 0.2rem;
        background-image: linear-gradient(to top, #2c2c33, #3d404b);
      }
      .content {
        padding: 0.2rem;
      }
    }
  }
</style>