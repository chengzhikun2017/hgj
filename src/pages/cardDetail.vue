<template>
  <div class="cardDetail" flex="dir:top">
    <app-nav flex-box="0">信用卡详情</app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-creditcard :type='2' :card="cardInfo"></app-creditcard>
      </div>
      <!-- v-if='hasPlan' -->
      <div class="plan-record"   @click='viewPlanRecords'>查看历史计划</div>
      <div class="content" >
        <div class="planbox">
          <header flex="cross:center">
            <span class="icon" flex="main:center cross:center" flex-box="0">
              <!-- <span class="icon-plan"></span> -->
              <app-cricleicon icon="icon-plan" bgcolor="bg-blue" size="0.24rem" circle="small"></app-cricleicon>
            </span>
            <div class="title" flex="dir:top main:center" flex-box="1">
              <h2>计划执行记录</h2>
              <p>当前计划</p>
            </div>
            <span  @click='confirmEndPlan' v-if='crrtPlan' class='endplan'>终止计划</span>
          </header>
          <div class="liner"></div>
          <div class="planbox-content" v-if='crrtPlan'>
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
  <div class="planbox-content" v-if='!crrtPlan'>
    <p class="noplan-text">当前暂无执行计划</p>
  </div>
  <div class="footer">
    <app-button class='plan-bttn' @click.native='viewPlanDetail' v-if='crrtPlan'>查看还款计划</app-button>
    <app-button class='plan-bttn'  @click.native='goNewPlan' v-if='!crrtPlan'>开启还款计划</app-button>
  </div>
</div>
</div>
</article>
</div>
</template>
<script>
  import '@/css/components.scss'
  import {mapActions,mapMutations} from 'vuex'
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
      confirmEndPlan(){
        this.hgjAlert({
          title:'终止计划',
          options:[{text:'确定',callback:()=>{
            this.endPlan()
          }},{text:'取消'}]
        })
      },
      endPlan(){
        this.plan_end(this.crrtPlan.planId).then(res=>{
          this.polling=setInterval(()=>{
            this.plan_endStatus(res.actionId).then(res=>{
              if(res.status==='SUCCESS'||res.status==='FAILED'){
                clearInterval(this.polling)
                this.crrtPlan=null
                this.planReview()
                this.cards_updatePlanStatus({
                  cardId:this.cardInfo.cardId,
                  status:'FAILED',
                })
                this.hgjAlert({
                  title:res.statusRemark,
                })
              }
            })
          },300)
        })
      },
      ...mapMutations([
        'cards_updatePlanStatus',
        ]),
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
  .plan-record{
    font-size: 0.16rem;
    padding:0 0.15rem;
    padding-top: 0.15rem;
    color:#559BC5;
    text-align: right;
  }
  .endplan{
    position:absolute;
    top: 0.05rem;
    right: 0.05rem;
    padding:0.05rem;
    font-size: 0.14rem;
    color:#96929A;
    text-decoration: underline;
  }
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
        .icon {
          margin-right: 0.1rem;
        }
      }
    }
  }
</style>