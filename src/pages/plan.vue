<template>
  <div class="plan" flex="dir:top">
    <app-nav flex-box="0">新建还款计划</app-nav>
    <article flex-box="1">
      <div class="photoDetail">
        <app-creditcard :card="cardInfo"></app-creditcard>
      </div>
      <div class="form">

        <app-formitem  label="选择开始时间">
            <app-select v-model='startDay' :options='startDaysAvailable' :filter='dayPaser' :optionFilter='startOptsPaser' :placeholder='"请选择开始日期"' />
        </app-formitem>
        <app-formitem  label="计划执行天数">
          <app-select v-model='duration' :disabled='!startDay' :optionFilter='durationOptsPaser' :options='durationAvailable' :placeholder='placeholderDuration' :filter='durationPaser' />
        </app-formitem>
        <app-formitem :last="true" label="还款金额">
          <app-input type="text" :placeholder='"请输入还款金额"' class='form-input' v-model='planAmount'/>
        </app-formitem>
        <div class="note" flex>
          <span class="icon-alert"></span>
          <p>结束时间必须在还款日前 2 天，起止时间最少间隔 1 天以上</p>
        </div>
        <app-formitem :last="true" label="选择保证金">
          <!-- | -->
          <p v-if='loadingPlanOpts'>loading...</p>
          <p v-if='!planOpts.length&&!loadingPlanOpts'>请填写以上信息</p>
          <!-- <app-button v-if='!planOpts.length' @click.native='getPlanOpts'>获取</app-button> -->
          <bttn-choose style='margin:0 0.05rem'  :actived='item.securityFee===choosedPlan.securityFee'  v-for='item in planOpts' @click.native='choosePlan(item)' :key='item.percent' v-if='planOpts.length'>{{(item.securityFee/100).toFixed(0)}}</bttn-choose>
         
        </app-formitem>

      </div>
      <app-protocol></app-protocol>
      <div class="mybutton">
        <app-button @click.native='viewPlan'>预览还款计划</app-button>
        <!-- <app-button @click.native='createPlan'>创建订单</app-button> -->

      </div>
    </article>
    <div class="popView" v-show="popFlag">
      <div class="popcontent">
        <div class="planbox">
          <header flex="cross:center">
            <span class="icon" flex="main:center cross:center" flex-box="0">
              <app-cricleicon bgcolor="bg-blue"></app-cricleicon>
            </span>
            <div class="title" flex="dir:top main:center" flex-box="1">
              <h2>您的还款计划</h2>
              <p></p>
            </div>
            <span flex-box="0" @click="popFlag=false">关闭</span>
          </header>
          <div class="planbox-content">
            <div class="liner"></div>
            <app-formitem2 label="计划还款：">
              <span class="msg">{{planAmountFee|moneyFilter}}</span>
            </app-formitem2>
             <app-formitem2 label="保证金：">
              <span class="msg">{{choosedPlan.securityFee|moneyFilter}}</span>
            </app-formitem2>
            <app-formitem2 label="服务费：">
              <span class="msg">{{choosedPlan.serviceFee|moneyFilter}}</span>
            </app-formitem2>
            <app-formitem2 label="总计：">
              <span class="msg red"><span class="total">{{((choosedPlan.serviceFee+choosedPlan.securityFee)/100).toFixed(2)}}</span>元</span>
            </app-formitem2>
            <div class="liner"></div>
            <app-formitem2 label="还款时间：">
              <span class="msg">{{startDate}} 至 {{endDate}}</span>
            </app-formitem2>
             <app-formitem2 label="还款周期：">
              <span class="msg">{{duration}}天/保证金{{choosedPlan.securityFee/100}}元/{{choosedPlan.period}}期还完</span>
            </app-formitem2>
          </div>
          <div class="footer">
            <app-button @click.native='createPlan'>开启还款计划</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//startDate 未过还款日？本月：下月 day=账单日之后，&&>=tmw
//可选天数，还款日-startDay
  import '@/css/flex.css'
  import '@/css/components.scss'
  import {mapActions} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        loadingPlanOpts:false,
        planAmount:'',
        startDay:'',
        startDaysAvailable:[],
        duration:'',
        choosedPlan:{},
        planOpts:[],
        popFlag: false,
        nowDate:new Date(),
        getPlanOptsTimer:null,
      }
    },
    updated(){
      // console.log('updated')
      // let t=this
      // let allFilled=t.planAmount&&t.duration&&t.choosedPlan
      // if(allFilled){

      // }
    },
    watch:{
      planAmount(v){
        this.lazyGetPlanOpts()
      },
      duration(v){
        this.lazyGetPlanOpts()
      },
      startDay(v){
        this.lazyGetPlanOpts()
      },
    },
    beforeDestroy(){
      clearTimeout(this.getPlanOptsTimer)
    },
    methods:{

      resetPlan(){
        this.planOpts=[]
        this.choosedPlan={}
      },
      viewPlan(){
        this.popFlag=true
      },
      lazyGetPlanOpts(){
        clearTimeout(this.getPlanOptsTimer)
        this.getPlanOptsTimer=setTimeout(()=> {
          this.getPlanOpts()
        }, 300);
      },
      getPlanOpts(){
        if(!this.allFilled){
          return
        }
        this.loadingPlanOpts=true
        this.resetPlan()
        let fee=this.planAmountFee,
        startDate=this.startDate,
        endDate=this.endDate
        console.log('fee,startDate,endDate',fee,startDate,endDate)
        // return
        this.plan_calc({
          fee,
          startDate,
          endDate,
        }).then(res=>{
          for(let i=0;i<res.length;i++){
            let fee=res[i].percent*this.planAmountFee/100
            fee.toFixed(0)
            //todo: 非整数问题
            res[i].securityFee=fee
          }
          this.planOpts=res
          this.choosedPlan=res[0]
          this.loadingPlanOpts=false
        },rej=>{
          this.loadingPlanOpts=false
        })
      },
      durationPaser(v){
        return v+'天'
      },
      durationOptsPaser(v){
        return v+'天'
      },
      startOptsPaser(v){
        return v+'号'
      },
      dayPaser(v){
        // console.log('dayPaser this',this,this.today)
        // return v+'号'
        if(this.isPlanInCrrtMonth){
          // this.hgjToast('创建当月还款计划')
          var month=(this.today.month).toString().padStart(2,0)
          var dateString=this.today.year+'-'+month+'-'
        }
        return dateString+v
      },
      choosePlan(plan){
        this.choosedPlan=plan
      },
      createPlan(){
        if(!this.$store.state.account.isActive){
          helper.goPage('/activeaccount')
          return
        }
        let params={
          cardId:this.cardInfo.cardId,
          fee:this.planAmountFee,
          period:this.choosedPlan.period,
          percent:this.choosedPlan.percent,
          startDate:this.startDate,
          endDate:this.endDate,
        }
        this.order_createPlan(params).then(res=>{
          console.log('res orderId',res.orderId)
          let url=helper.urlConcat('/pay',{
            orderId:res.orderId
          })
          helper.goPage(url)
        })
      },
      calcStartDaysAvailable(){
        var dateArr=[],day=this.earlistStartDay
        while(day<=this.cardInfo.repaymentDate-2){
          dateArr.push({value:day})
          day++
        }
        this.startDaysAvailable=dateArr
      },
      ...mapActions([
        'plan_calc',
        'order_createPlan',
        ])
    },
    created(){
    },
    mounted(){
      this.calcStartDaysAvailable()
      this.startDay=this.earlistStartDay
    },
    computed:{
      allFilled(){
        let t=this
        let allFilled=t.planAmount>100&&t.duration&&t.startDay
        return !!allFilled
      },
      planAmountFee(){
        return this.planAmount*100||0
      },
      startDate(){
        if(!this.startDay){
          return null
        }
        let v=this.startDay
        // this.dayPaser(v)
        return this.dayPaser(v)
      },
      endDate(){
        if(!this.startDay||!this.duration){
          return null
        }
        let v=Number(this.startDay)+Number(this.duration)-1
        return this.dayPaser(v)
      },
      durationAvailable(){
        if(this.startDay){
          let opts=[]
          let maxD=this.cardInfo.repaymentDate-this.startDay
          let day=2
          while(day<=maxD){
            opts.push({value:day})
            day++
          }
          this.duration=day-1
          return opts
        }else{
          return []
        }
      },
      placeholderDuration(){
        if(!this.startDay){
          return "请先选择开始时间"
        }else{
          return '请选择执行天数'
        }
      },
      today(){
        var today={}
        today.day=this.nowDate.getDate()
        today.month=this.nowDate.getMonth()+1
        today.year=this.nowDate.getFullYear()
        return today
      },
      earlistStartDay(){
        if(this.isPlanInCrrtMonth){
          if(this.today.day<this.cardInfo.billDate){
            return this.cardInfo.billDate
          }else{
            return this.today.day+1
          }
        }else{
          // return this.cardInfo.billDate
        }

      },
      isPlanInCrrtMonth(){
        if(this.today.day<this.cardInfo.repaymentDate){
          return true
        }else{
          return false
        }
      },
      cardInfo(){
        return this.$route.query
      },
    },
  }
</script>
<style lang="scss" scoped>
  .plan {
    width: 100%;
    height: 100%;
    article {
      background: #f3f3f3;
      .photoDetail {
        padding: 0.15rem 0.2rem;
        background: black;
        overflow: hidden;
      }
      .form {
        padding-bottom: 0.2rem;
      }
      .mybutton {
        margin-top: 0.24rem;
        padding: 0.16rem 0.2rem;
      }
      .note {
        padding: 0.16rem 0.2rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        .icon-alert {
          position: relative;
          top: 0.03rem;
          padding-right: 0.1rem;
        }
      }
    }
    .popView {
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .8);
      .popcontent {
        position: absolute;
        left: 0.2rem;
        right: 0.2rem;
        bottom: 0.2rem;
        .planbox {
          .icon {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
</style>